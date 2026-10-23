"use client";

import Link from "next/link";
import { useActionState } from "react";

import { submitFeedback, type FeedbackState } from "@/app/actions/feedback";
import { Button } from "@/components/ui/button";

const initialState: FeedbackState = { status: "idle", message: "" };

const fieldClasses =
  "w-full border border-primary/20 bg-tertiary/50 px-5 py-4 font-sans text-sm text-primary outline-none transition-colors placeholder:text-neutral/60 focus:border-secondary";

export function FeedbackForm() {
  const [state, formAction] = useActionState(submitFeedback, initialState);

  if (state.status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-start gap-4 border border-secondary/50 bg-primary/5 p-8 sm:p-10"
      >
        <span className="h-px w-10 bg-secondary" />
        <h2 className="font-serif text-3xl text-primary">Thank you.</h2>
        <p className="max-w-md font-sans text-sm leading-relaxed text-neutral sm:text-base">
          Your words mean a lot to us &mdash; they help us shape the next
          chapter of Beyond Norms.
        </p>
        <div className="mt-2 flex flex-wrap gap-4">
          <Button href="/upcoming-events" variant="gold-white">
            See upcoming events
          </Button>
          <Button href="/" variant="outline">
            Back home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="flex flex-col gap-5 border border-secondary/50 bg-primary/5 p-8 sm:p-10"
    >
      <label className="flex flex-col gap-2 font-sans text-sm">
        <span className="text-neutral">Your name</span>
        <input
          type="text"
          name="name"
          required
          maxLength={100}
          autoComplete="name"
          placeholder="Jane Doe"
          className={fieldClasses}
        />
      </label>

      <label className="flex flex-col gap-2 font-sans text-sm">
        <span className="text-neutral">Your email</span>
        <input
          type="email"
          name="email"
          required
          maxLength={254}
          autoComplete="email"
          placeholder="jane@example.com"
          className={fieldClasses}
        />
      </label>

      <label className="flex flex-col gap-2 font-sans text-sm">
        <span className="text-neutral">Your message</span>
        <textarea
          name="message"
          required
          maxLength={2000}
          rows={6}
          placeholder="What was your favourite moment? How did the evening make you feel? What would you love to discover next time?"
          className={`${fieldClasses} resize-y leading-relaxed`}
        />
      </label>

      {/* Honeypot anti-spam: escondido de pessoas e de leitores de ecrã. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="border border-terracotta/60 bg-terracotta/10 px-4 py-3 font-sans text-sm leading-relaxed text-terracotta"
        >
          {state.message}
        </p>
      )}

      <Button
        type="submit"
        variant="gold-white"
        className="w-full sm:w-auto sm:self-start"
        loadingText="Sending..."
      >
        Send my thoughts
      </Button>

      <p className="font-sans text-xs leading-relaxed text-neutral/70">
        We&apos;ll only use your message to improve our experiences. See our{" "}
        <Link
          href="/privacy-policy"
          className="underline underline-offset-4 hover:text-primary"
        >
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
