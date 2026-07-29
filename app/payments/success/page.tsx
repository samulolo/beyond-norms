
import type { Metadata } from "next";
import Link from "next/link";

import { getStripeClient } from "@/utils/stripe";

export const metadata: Metadata = {
  title: "Booking Confirmed",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

async function getCustomerEmail(sessionId: string | undefined) {
  if (!sessionId) return null;

  try {
    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return session.customer_details?.email ?? null;
  } catch {
    return null;
  }
}

export default async function PaymentSuccessPage({
  searchParams,
}: PageProps) {
  const { session_id } = await searchParams;
  const email = await getCustomerEmail(session_id);

  // O email de confirmação é enviado pelo webhook da Stripe
  // (app/api/stripe/webhook/route.ts), com idempotência garantida pela
  // tabela `payments` no Supabase. Esta página é só apresentação — pode
  // ser recarregada/revisitada sem disparar novos envios.

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-6 bg-tertiary px-8 py-24 text-center lg:px-16">
      <span className="flex p-2 items-center justify-center border border-secondary font-serif font-bold text-lg text-primary">
        BeyondNorms
      </span>

      <span className="h-px w-10 bg-secondary" />

      <h1 className="max-w-xl font-serif text-4xl text-primary lg:text-5xl">
        Welcome to the community.
      </h1>

      <p className="max-w-md font-sans text-base leading-relaxed text-neutral">
        {email ? (
          <>
            We&apos;ve saved your spot, <span className="text-primary">{email}</span>.
          </>
        ) : (
          "We've saved your spot."
        )}{" "}
        You&apos;re officially part of <span className="text-secondary font-serif">BeyondNorms</span> &mdash; get ready for real
        people, real emotions, and real connections. Keep an eye on your inbox,
        we&apos;ll be in touch with everything you need before the night.
      </p>

      <Link
        href="/"
        className="mt-4 font-sans text-sm font-medium uppercase tracking-wider text-primary underline underline-offset-4 hover:text-secondary"
      >
        Back to home
      </Link>
    </section>
  );
}
