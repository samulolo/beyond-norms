
import type { ComponentType } from "react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import {
  contactEmail,
  contactPhoneDisplay,
  contactPhoneHref,
  eventAddress,
  instagramHandle,
  instagramUrl,
  organizerName,
} from "@/utils/constant/const";


function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="size-5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z"
      />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="size-5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="size-5"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m3 7 9 6 9-6" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="size-5"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

type ContactDetail = {
  label: string;
  value: string;
  href?: string;
  icon: ComponentType;
};

const contactDetails: ContactDetail[] = [
  {
    label: "Venue",
    value: eventAddress,
    icon: PinIcon,
  },
  {
    label: "Phone",
    value: contactPhoneDisplay,
    href: `tel:${contactPhoneHref}`,
    icon: PhoneIcon,
  },
  {
    label: "Email",
    value: contactEmail,
    href: `mailto:${contactEmail}`,
    icon: MailIcon,
  },
  {
    label: "Instagram",
    value: `@${instagramHandle}`,
    href: instagramUrl,
    icon: InstagramIcon,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-primary/5 px-8 py-24 lg:px-16"
    >
   
      <Reveal className="relative mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
        <span className="h-px w-10 bg-secondary" />
        <p className="font-sans text-sm font-semibold uppercase tracking-widest text-secondary">
          Get in Touch
        </p>
        <h2 className="font-serif text-4xl text-primary lg:text-5xl">
          We&apos;d Love to Hear From You
        </h2>
        <p className="font-sans text-base leading-relaxed text-neutral">
          Questions about the evening, group bookings, or press inquiries
          &mdash; our team is here to help.
        </p>
      </Reveal>

      <div className="relative mx-auto mt-16 grid w-full max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {contactDetails.map((detail, index) => {
          const Icon = detail.icon;
          const isExternal = detail.href?.startsWith("http");

          return (
            <Reveal
              key={detail.label}
              delay={index * 100}
              className="flex flex-col items-center gap-4 border border-primary/10 bg-tertiary/40 px-6 py-10 text-center transition-colors hover:border-secondary/60"
            >
              <span className="flex size-12 items-center justify-center rounded-full border border-secondary text-secondary">
                <Icon />
              </span>

              <div className="flex flex-col gap-1">
                <span className="font-sans text-xs uppercase tracking-widest text-neutral/70">
                  {detail.label}
                </span>

                {detail.href ? (
                  <a
                    href={detail.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="font-sans text-sm text-primary transition-colors hover:text-secondary"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <span className="max-w-[16ch] font-sans text-sm leading-snug text-primary">
                    {detail.value}
                  </span>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal
        delay={400}
        className="relative mt-16 flex flex-col items-center gap-6"
      >
        <span className="font-sans text-xs uppercase tracking-widest text-neutral/60">
          Organized by {organizerName}
        </span>
        <Button href={`mailto:${contactEmail}`} icon>
          Email Us
        </Button>
      </Reveal>
    </section>
  );
}
