import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { getStripeClient } from "@/utils/stripe";
import { supabase } from "@/supabase/server";
import { sendEmailConfirmation } from "@/email/resend";

export async function POST(request: Request) {
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

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const email = session.customer_details?.email;

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

    await sendEmailConfirmation(email);

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
