"use server";

import { redirect } from "next/navigation";
import { getStripeClient } from "@/utils/stripe";
import { eventsPlans } from "@/data/plans";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function createCheckoutSession(formData: FormData) {
  const stripe = getStripeClient();


  const plan = eventsPlans[0];
  const ticketPriceEur = Number(plan.price);

  const customerName = String(formData.get("customerName") ?? "").trim();
  const customerPhone = String(formData.get("customerPhone") ?? "").trim();
  const eventDateId = String(formData.get("eventDate") ?? "");
  const dietaryRestrictions = formData.getAll("dietaryRestrictions").map(String);
  const dietaryOther = String(formData.get("dietaryOther") ?? "").trim();
  const hasAllergies = formData.get("hasAllergies") === "yes";
  const allergyDetails = hasAllergies
    ? String(formData.get("allergyDetails") ?? "").trim()
    : "";


  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    metadata: {
      customer_name: customerName,
      customer_phone: customerPhone,
      event_date: eventDateId,
      dietary_restrictions: JSON.stringify(dietaryRestrictions),
      dietary_other: dietaryOther,
      has_allergies: hasAllergies ? "true" : "false",
      allergy_details: allergyDetails,
    },
    line_items: [
      {
        price_data: {
          currency: "eur",
          unit_amount: Math.round(ticketPriceEur * 100),
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
