import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { getStripeClient } from "@/utils/stripe";
import { processCompletedCheckout } from "@/utils/process-payment";

// Dá margem à função para cold starts e serviços externos. Emails são parte
// crítica do checkout e por isso são aguardados antes do 200; só analytics
// fica em background (ver utils/process-payment.ts).
export const maxDuration = 30;

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

  const relevantEventTypes = [
    "checkout.session.completed",
    "checkout.session.async_payment_succeeded",
  ];

  if (!relevantEventTypes.includes(event.type)) {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  console.log("Stripe webhook recebido: ", event.type, session.id);

  // Toda a lógica de gravação + envio de emails está em
  // utils/process-payment.ts, partilhada com app/payments/success/page.tsx
  // (a página de sucesso serve de rede de segurança enquanto o webhook
  // tiver falhas de conectividade — ver MAINTENANCE.md).
  const result = await processCompletedCheckout(session);

  if (result.status === "error") {
    return NextResponse.json(
      { error: "Erro no processamento" },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true, ...result });
}
