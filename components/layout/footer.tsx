import Link from "next/link";

import {
  contactEmail as emailContact,
  contactPhoneDisplay as phoneDisplay,
  contactPhoneHref as phoneHref,
  eventAddress,
  instagramUrl,
  organizerName,
} from "@/utils/constant/const";



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

function ShareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="size-5"
      aria-hidden
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path strokeLinecap="round" d="m8.6 13.5 6.8 3.9M15.4 6.6 8.6 10.5" />
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

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-col gap-8 border-t border-primary/10 px-8 py-10 lg:flex-row lg:items-start lg:justify-between lg:px-16">
      <div className="flex flex-col gap-1">
        <span className="font-serif text-xl text-primary">BeyondNorms</span>
        <span className="font-sans text-xs text-neutral">
          &copy; {year} BeyondNorms. All rights reserved.
        </span>
      </div>

      <nav className="flex items-center gap-8">
        <Link
          href="/privacy-policy"
          className="font-sans text-xs uppercase tracking-widest text-primary/80 transition-colors hover:text-primary"
        >
          Privacy Policy
        </Link>
      </nav>

      <div className="flex flex-col gap-1 font-sans text-xs text-neutral">
        <span className="text-primary/80">Organized by {organizerName}</span>
        <span>{eventAddress}</span>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <a
            href={`tel:${phoneHref}`}
            className="transition-colors hover:text-secondary"
          >
            {phoneDisplay}
          </a>
          <span aria-hidden>&middot;</span>
          <a
            href={`mailto:${emailContact}`}
            className="transition-colors hover:text-secondary"
          >
            {emailContact}
          </a>
        </div>
      </div>

      <div className="flex items-center gap-4 text-primary">
        <button
        onClick={ async () => {

          try {
            await navigator.share({
              title: "BeyondNorms",
              text: "Checkout this incredible event",
              url: process.env.NEXT_PUBLIC_SITE_URL
            })
          } catch {
            // Falha silenciosa: inclui o utilizador cancelar a partilha,
            // o que não é um erro real e não vale a pena registar.
          }
        }}
          type="button"
          aria-label="Share"
          className="transition-colors hover:text-secondary"
        >
          <ShareIcon />
        </button>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="transition-colors hover:text-secondary"
        >
          <InstagramIcon />
        </a>
        <a href={`mailto:${emailContact}`}
          type="button"
          aria-label="Email"
          className="transition-colors hover:text-secondary"
        >
          <MailIcon />
        </a>
      </div>
    </footer>
  );
}
