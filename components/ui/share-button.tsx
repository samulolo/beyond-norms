"use client";

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

export function ShareButton({ className = "" }: { className?: string }) {
  return (
    <button
      onClick={async () => {
        try {
          await navigator.share({
            title: "BeyondNorms",
            text: "Discover this incredible experience",
            url: process.env.NEXT_PUBLIC_SITE_URL,
          });
        } catch {
          // Falha silenciosa: inclui o utilizador cancelar a partilha,
          // o que não é um erro real e não vale a pena registar.
        }
      }}
      type="button"
      aria-label="Share"
      className={className}
    >
      <ShareIcon />
    </button>
  );
}
