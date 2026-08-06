"use client";
import { useActionState } from "react";

import { subscribeToNewsletter } from "@/app/actions/newsletter";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

function FeedbackIcon({ status }: { status: "success" | "error" }) {
  if (status === "success") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="size-5 shrink-0"
        aria-hidden
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="size-5 shrink-0"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8v5M12 17h.01M10.3 4.6 2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 4.6a2 2 0 0 0-3.4 0Z"
      />
    </svg>
  );
}

export function Newsletter() {
  const [state, formAction] = useActionState(subscribeToNewsletter, {
    status: "idle" as const,
    message: "",
  });

  return (
    <section className="px-8 py-24 lg:px-16">
      <Reveal className="mx-auto flex max-w-4xl flex-col gap-8 border border-secondary/50 bg-primary/5 p-8 text-left shadow-[0_24px_80px_rgba(0,0,0,0.2)] sm:p-10 lg:grid lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-12">
        <div>
          <p className="font-sans text-sm font-semibold uppercase tracking-[0.3em] text-secondary">
            Newsletter
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-primary lg:text-5xl">
            Be part of the Beyond Norms experience.
          </h2>
          <p className="mt-5 font-sans text-base leading-relaxed text-neutral">
            Be updated about new experiences, intimate dinners, curated encounters,
            artist moments, and the stories shaping our community.
          </p>
        </div>

        <form action={formAction} className="flex flex-col gap-4">
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            required
            placeholder="Your email address"
            className="w-full border border-primary/20 bg-tertiary/50 px-5 py-4 font-sans text-sm text-primary outline-none transition-colors placeholder:text-neutral/60 focus:border-secondary"
          />
          <Button
            type="submit"
            variant="gold-white"
            className="w-full"
            loadingText="Joining..."
          >
            Keep me updated
          </Button>
          {state.status !== "idle" && state.message && (
            <div
              role="status"
              aria-live="polite"
              className={`flex items-start gap-3 border px-4 py-3 font-sans text-sm leading-relaxed ${
                state.status === "success"
                  ? "border-sage/60 bg-sage/10 text-sage"
                  : "border-terracotta/60 bg-terracotta/10 text-terracotta"
              }`}
            >
              <FeedbackIcon status={state.status} />
              <p>{state.message}</p>
            </div>
          )}
          <p className="font-sans text-xs leading-relaxed text-neutral/70">
            No noise. Just invitations, upcoming dates, and meaningful moments
            worth knowing about.
          </p>
        </form>
      </Reveal>
    </section>
  );
}
