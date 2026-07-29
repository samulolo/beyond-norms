import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { getStripeClient } from "@/utils/stripe";
import { createClient } from "@/supabase/server";
import { sendEmailConfirmation } from "@/email/resend";
import { eventDates } from "@/utils/constant/const";

export async function POST(request: Request) {
  // Nota (Agente 1): supabase/server.ts passou a expor `createClient()`
  // assíncrono (SSR com cookies) em vez do antigo `export const supabase`.
  // Este webhook não tem sessão de utilizador (chamada servidor-a-servidor
  // da Stripe), pelo que o cliente atua como antes: sem sessão autenticada,
  // sujeito às mesmas policies de RLS da tabela `payments`.
  const supabase = await createClient();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.log("Falta configurar STRIPE_WEBHOOK_SECRET no .env.local");
    return NextResponse.json(
      { error: "Webhook não configurado" },
      { status: 500 },
    );
  }

  const signature = request.headers.get("stripe-signature");
  const body = await request.text();

  if (!signature) {
    return NextResponse.json(
      { error: "Assinatura em falta" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripeClient();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.log("Assinatura do webhook inválida: ", err);
    return NextResponse.json(
      { error: "Assinatura inválida" },
      { status: 400 },
    );
  }

  // "checkout.session.completed" cobre métodos síncronos (cartão) — já
  // vem com payment_status "paid". Métodos assíncronos (ex: MB WAY,
  // Multibanco, transferência) também disparam este evento, mas ainda
  // "unpaid" nessa altura; só ficam "paid" mais tarde, via
  // "checkout.session.async_payment_succeeded". Por isso ouvimos os
  // dois e confirmamos sempre payment_status antes de processar.
  const relevantEventTypes = [
    "checkout.session.completed",
    "checkout.session.async_payment_succeeded",
  ];

  if (!relevantEventTypes.includes(event.type)) {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (session.payment_status !== "paid") {
    console.log(
      "Sessão ainda não paga (método assíncrono a aguardar confirmação), a ignorar por agora: ",
      session.id,
      session.payment_status,
    );
    return NextResponse.json({ received: true, skipped: true });
  }

  const email = session.customer_details?.email;
  // Nome e telefone vêm do nosso formulário em /checkout (via metadata),
  // não dos custom_fields da Stripe — a Stripe só trata do pagamento.
  const customerName = session.metadata?.customer_name || undefined;
  const customerPhone = session.metadata?.customer_phone || undefined;

  let dietaryRestrictions: string[] = [];
  try {
    dietaryRestrictions = JSON.parse(
      session.metadata?.dietary_restrictions ?? "[]",
    );
  } catch {
    dietaryRestrictions = [];
  }

  const dietaryOther = session.metadata?.dietary_other || null;
  const hasAllergies = session.metadata?.has_allergies === "true";
  const allergyDetails = session.metadata?.allergy_details || null;

  const eventDateId = session.metadata?.event_date || null;
  const matchedEventDate = eventDates.find((date) => date.id === eventDateId);
  // "full" vem como "August 20, 2026" — separamos em duas partes porque é
  // assim que o EmailTemplate espera (props eventDate / eventYear).
  const [eventDateLabel, eventYearLabel] = matchedEventDate
    ? matchedEventDate.full.split(", ")
    : [undefined, undefined];

  if (!email) {
    console.log("Sessão sem email de cliente, a ignorar: ", session.id);
    return NextResponse.json({ received: true });
  }

  try {
    // Tenta "reclamar" esta sessão inserindo a linha. Se já existir
    // (evento repetido pela Stripe), o insert é ignorado e não devolve linha.
    const { data: inserted, error: insertError } = await supabase
      .from("payments")
      .upsert(
        {
          stripe_payment_id: session.id,
          customer_email: email,
          status: session.payment_status ?? "completed",
          email_sent: false,
          customer_name: customerName,
          customer_phone: customerPhone,
          event_date_id: eventDateId,
          dietary_restrictions: dietaryRestrictions,
          dietary_other: dietaryOther,
          has_allergies: hasAllergies,
          allergy_details: allergyDetails,
        },
        { onConflict: "stripe_payment_id", ignoreDuplicates: true },
      )
      .select()
      .maybeSingle();

    if (insertError) {
      console.log("Erro ao gravar pagamento no Supabase: ", insertError);
      return NextResponse.json({ error: "Erro Supabase" }, { status: 500 });
    }

    let shouldSendEmail = Boolean(inserted);

    if (!inserted) {
      // Já existia uma linha para este session_id: só reenviamos o email
      // se uma tentativa anterior falhou antes de o marcar como enviado.
      const { data: existing } = await supabase
        .from("payments")
        .select("email_sent")
        .eq("stripe_payment_id", session.id)
        .maybeSingle();

      shouldSendEmail = existing ? !existing.email_sent : false;
    }

    if (!shouldSendEmail) {
      console.log(
        "Email já enviado anteriormente para esta sessão, a ignorar: ",
        session.id,
      );
      return NextResponse.json({ received: true, skipped: true });
    }

    await sendEmailConfirmation(
      email,
      customerName,
      eventDateLabel,
      eventYearLabel,
    );

    await supabase
      .from("payments")
      .update({ email_sent: true, status: "completed" })
      .eq("stripe_payment_id", session.id);
  } catch (err) {
    console.log("Erro ao processar checkout.session.completed: ", err);
    return NextResponse.json({ error: "Erro no processamento" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
