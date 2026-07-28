"use server";

import { redirect } from "next/navigation";
import { getStripeClient } from "@/utils/stripe";

const TICKET_PRICE_EUR = 85;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function createCheckoutSession() {
  const stripe = getStripeClient();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "eur",
          unit_amount: TICKET_PRICE_EUR * 100,
          product_data: {
            images: [`${siteUrl}/images/product-image.jpeg`],
            name: "BeyondNorms — Full Evening Access",
            description:
              "Soul Speed Dating + Dinner Show & Surprise Artists — one individual ticket.",
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${siteUrl}/payments/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/#tickets`,
  });

  if (!session.url) {
    throw new Error("Stripe did not return a checkout URL.");
  }

  redirect(session.url);
}
