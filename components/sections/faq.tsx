"use client";

import { useState } from "react";

import { Reveal } from "@/components/ui/reveal";

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: "How does the selection process work?",
    answer:
      "After requesting an invite, our team reviews each candidate's professional profile and goals. We aim for a balance across industries and seniority levels to ensure the best possible experience.",
  },
  {
    question: "Is the event recorded?",
    answer:
      "No. To preserve the privacy and openness of conversations, no photography, video, or audio recording takes place during the event.",
  },
  {
    question: "Can I bring a guest?",
    answer:
      "Additional seats are limited and subject to curation. Please indicate a guest in your invite request and our team will confirm availability.",
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={`size-5 shrink-0 text-primary transition-transform ${
        open ? "rotate-180" : ""
      }`}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="flex flex-col items-center gap-4 px-8 py-24 lg:px-16">
      <Reveal className="flex flex-col items-center gap-4">
        <h2 className="font-serif text-4xl text-primary lg:text-5xl">
          Frequently Asked Questions
        </h2>
        <span className="h-px w-10 bg-secondary" />
      </Reveal>

      <Reveal delay={150} className="mt-8 w-full max-w-2xl">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={faq.question} className="border-b border-primary/10 py-6">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 text-left font-serif text-lg text-primary"
                aria-expanded={isOpen}
              >
                {faq.question}
                <ChevronIcon open={isOpen} />
              </button>

              <div
                className={`grid overflow-hidden transition-all duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <p className="overflow-hidden pt-4 font-sans text-base leading-relaxed text-neutral">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
