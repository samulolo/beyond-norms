import type { Metadata } from "next";
import Link from "next/link";

import { FeedbackForm } from "@/components/feedback/feedback-form";

export const metadata: Metadata = {
  title: "Share your experience",
  description:
    "Tell us how you felt at Beyond Norms. Your thoughts help us shape the next chapter.",
};

export default function FeedbackPage() {
  return (
    <section className="relative flex flex-1 flex-col bg-tertiary">
      <div className="flex items-center justify-between px-8 py-6 lg:px-16">
        <Link
          href="/"
          className="font-serif text-xl tracking-[0.2em] text-primary"
        >
          BEYOND NORMS
        </Link>
        <Link
          href="/"
          className="font-sans text-xs uppercase tracking-widest text-neutral/70 transition-colors hover:text-secondary"
        >
          &larr; Home
        </Link>
      </div>

      <div className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-8 pb-24 pt-12 lg:px-0">
        <div className="flex flex-col gap-4">
          <span className="h-px w-10 bg-secondary" />
          <h1 className="font-serif text-4xl text-primary lg:text-5xl">
            We would love to hear from you.
          </h1>
          <p className="max-w-xl font-sans text-sm leading-relaxed text-neutral sm:text-base">
            Tell us what you felt, what stayed with you, and what you&apos;d
            love to discover next. Your thoughts help us shape the future of
            Beyond Norms.
          </p>
        </div>

        <FeedbackForm />
      </div>
    </section>
  );
}
