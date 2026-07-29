import type { Metadata } from "next";
import Link from "next/link";

import { CheckoutForm } from "@/components/checkout/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <section className="flex flex-1 flex-col items-center bg-tertiary px-8 py-24 lg:px-16">
      <div className="w-full max-w-lg">
        <Link
          href="/#tickets"
          className="font-sans text-xs uppercase tracking-widest text-neutral/70 transition-colors hover:text-secondary"
        >
          &larr; Back
        </Link>

        <div className="mt-8 flex flex-col items-start gap-4">
          <span className="h-px w-10 bg-secondary" />
          <h1 className="font-serif text-3xl text-primary lg:text-4xl">
            Before we confirm your spot
          </h1>
          <p className="font-sans text-sm leading-relaxed text-neutral">
            Help us prepare the Dinner Show for you &mdash; let us know about
            any dietary needs before you check out.
          </p>
        </div>


        <CheckoutForm />
      </div>
    </section>
  );
}
