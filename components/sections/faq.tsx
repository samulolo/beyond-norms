"use client";

import { useState } from "react";

import { Reveal } from "@/components/ui/reveal";

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [

  {
    question: "How does the Soul Speed Dating format work?",
    answer:
      "You'll rotate through a series of short, one-on-one conversations guided by prompts crafted to go beyond small talk. No apps, no swiping, just real conversations, at your own pace.",
  },
  {
    question: "Is there an age requirement to attend?",
    answer:
      "Yes, this event is for guests aged 18 and over. We may ask for ID at check-in.",
  },
  {
    question: "Can you accommodate dietary restrictions?",
    answer:
      "Yes. Vegetarian, and allergy-friendly options are available for the Dinner Show just let us know your requirements before checkout and our team will take care of the rest.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Tickets are non-refundable but fully transferable. If you can no longer attend, you're welcome to pass your spot to someone else. Just reach out to our team with the new guest's details.",
  },
  {
    question: "Is the event recorded?",
    answer:
      "No. To preserve the privacy and openness of conversations, no photography, video, or audio recording takes place during the event. Photos will only be possible at the very end of the evening.",
  },
  {
    question: "What languages will be spoken at the event?",
    answer:
      "The evening is hosted primarily in English, with our team also fluent in Portuguese. Feel free to mix and match with fellow guests depending on what feels most natural.",
  },
  {
    question: "Can I bring a guest?",
    answer:
      "Each ticket grants access for one individual only. It is not possible to bring additional guests.",
  },
];

function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={`size-5 shrink-0 text-secondary transition-transform duration-300 ${
        open ? "rotate-45" : ""
      }`}
      aria-hidden
    >
      <path strokeLinecap="round" d="M12 5v14M5 12h14" />
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
                <PlusIcon open={isOpen} />
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
