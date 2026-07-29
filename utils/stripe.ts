import Stripe from "stripe";

// Fixa a mesma versão da API usada no destino de webhook criado no
// Dashboard da Stripe. Sem isto, o SDK usa a versão por omissão da
// conta, que pode divergir da versão do webhook e mudar sem aviso.
const STRIPE_API_VERSION = "2026-06-24.dahlia";

export function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error(
      "Missing STRIPE_SECRET_KEY. Add it to .env.local (see https://dashboard.stripe.com/test/apikeys).",
    );
  }

  return new Stripe(secretKey, {
    apiVersion: STRIPE_API_VERSION as Stripe.LatestApiVersion,
  });
}
