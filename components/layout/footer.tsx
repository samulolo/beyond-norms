import Link from "next/link";

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

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative flex flex-col items-center gap-2 border-t border-primary/10 px-8 py-10 text-center lg:px-16">
      <span className="font-serif text-xl tracking-[0.2em] text-primary">
        BEYOND NORMS
      </span>

      <p className="font-sans text-xs text-neutral">
        &copy; {year} BeyondNorms. All rights reserved. &middot;{" "}
        <Link
          href="/privacy-policy"
          className="underline underline-offset-4 transition-colors hover:text-primary"
        >
          Privacy Policy
        </Link>
      </p>

      <button
        onClick={async () => {
          try {
            await navigator.share({
              title: "BeyondNorms",
              text: "Checkout this incredible event",
              url: process.env.NEXT_PUBLIC_SITE_URL,
            });
          } catch {
            // Falha silenciosa: inclui o utilizador cancelar a partilha,
            // o que não é um erro real e não vale a pena registar.
          }
        }}
        type="button"
        aria-label="Share"
        className="absolute right-8 top-1/2 -translate-y-1/2 text-primary transition-colors hover:text-secondary lg:right-16"
      >
        <ShareIcon />
      </button>
    </footer>
  );
}
