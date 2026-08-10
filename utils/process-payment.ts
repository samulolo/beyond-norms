import { after } from "next/server";
import type Stripe from "stripe";

import { createAdminClient } from "@/supabase/admin";
import { getPostHogClient } from "@/utils/posthog-server";
import { sendEmailConfirmation, sendSaleNotification } from "@/email/resend";
import { eventDates } from "@/utils/constant/const";

export type ProcessCheckoutResult =
  | { status: "processed" }
  | { status: "skipped"; reason: "not_paid" | "no_email" | "already_sent" }
  | { status: "error"; error: unknown };

/**
 * Grava o pagamento em `payments` (idempotente, por `stripe_payment_id`) e
 * envia o email de confirmação ao cliente + aviso interno de venda.
 *
 * Chamado a partir de dois sítios:
 * 1. `app/api/stripe/webhook/route.ts` — o caminho "oficial", server-to-server.
 * 2. `app/payments/success/page.tsx` — rede de segurança. Pedidos vindos do
 *    servidor da Stripe para o webhook têm estado a falhar a ligação de
 *    forma persistente (ver MAINTENANCE.md, "Falhas de conectividade do
 *    webhook"). O pedido que o browser do próprio cliente faz ao ser
 *    redirecionado de volta do checkout chega sempre, por isso serve de
 *    caminho alternativo fiável — e continua a ser útil mesmo depois do
 *    webhook voltar a funcionar, como proteção extra.
 *
 * Seguro para chamar mais do que uma vez para a mesma sessão: a segunda
 * chamada deteta que o email já foi enviado e não duplica nada.
 */
export async function processCompletedCheckout(
  session: Stripe.Checkout.Session,
): Promise<ProcessCheckoutResult> {
  if (session.payment_status !== "paid") {
    console.log(
      "Sessão ainda não paga (método assíncrono a aguardar confirmação), a ignorar por agora: ",
      session.id,
      session.payment_status,
    );
    return { status: "skipped", reason: "not_paid" };
  }

  const email = session.customer_details?.email;

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

  const [eventDateLabel, eventYearLabel] = matchedEventDate
    ? matchedEventDate.full.split(", ")
    : [undefined, undefined];

  const ticketNumber = `BN-${session.id.slice(-8).toUpperCase()}`;

  if (!email) {
    console.log("Sessão sem email de cliente, a ignorar: ", session.id);
    return { status: "skipped", reason: "no_email" };
  }

  const supabase = createAdminClient();

  try {
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
          amount_total: session.amount_total,
          currency: session.currency,
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
      return { status: "error", error: insertError };
    }

    let shouldSendEmail = Boolean(inserted);

    if (!inserted) {
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
      return { status: "skipped", reason: "already_sent" };
    }

    const amountTotalLabel =
      session.amount_total != null && session.currency
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: session.currency.toUpperCase(),
          }).format(session.amount_total / 100)
        : undefined;

    await sendEmailConfirmation(
      email,
      customerName,
      eventDateLabel,
      eventYearLabel,
      ticketNumber,
    );

    await sendSaleNotification({
      customerEmail: email,
      customerName,
      customerPhone,
      eventDate: eventDateLabel,
      eventYear: eventYearLabel,
      orderId: ticketNumber,
      amountTotal: amountTotalLabel,
      dietaryRestrictions,
      dietaryOther,
      hasAllergies,
      allergyDetails,
    });

    const { error: emailSentUpdateError } = await supabase
      .from("payments")
      .update({ email_sent: true, status: "completed" })
      .eq("stripe_payment_id", session.id);

    if (emailSentUpdateError) {
      console.log(
        "Erro ao marcar email como enviado no Supabase: ",
        session.id,
        emailSentUpdateError,
      );
      return { status: "error", error: emailSentUpdateError };
    }

    after(async () => {
      try {
        const posthog = getPostHogClient();
        if (posthog) {
          posthog.capture({
            event: "payment_completed",
            properties: {
              event_date_id: eventDateId,
              amount_total: session.amount_total ?? undefined,
              currency: session.currency ?? undefined,
              payment_method: session.payment_method_types?.[0] ?? undefined,
            },
          });
          await posthog.shutdown();
        }
      } catch (err) {
        console.log(
          "Erro em background (posthog) após pagamento gravado: ",
          session.id,
          err,
        );
      }
    });

    return { status: "processed" };
  } catch (err) {
    console.log("Erro ao processar checkout.session.completed: ", session.id, err);
    return { status: "error", error: err };
  }
}
