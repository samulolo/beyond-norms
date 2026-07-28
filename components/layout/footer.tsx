import Link from "next/link";

const footerLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Contact", href: "#" },
];

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
    <footer className="flex flex-col gap-6 border-t border-primary/10 px-8 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-16">
      <div className="flex flex-col gap-1">
        <span className="font-serif text-xl text-primary">BeyondNorms</span>
        <span className="font-sans text-xs text-neutral">
          &copy; {year} BeyondNorms. All rights reserved.
        </span>
      </div>

      <nav className="flex items-center gap-8">
        {footerLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="font-sans text-sm text-primary/80 transition-colors hover:text-primary"
          >
            {link.label}
          </Link>
        ))}
      </nav>

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
            console.log("Houve um erro ao partilhar dados")
          }
        }}
          type="button"
          aria-label="Share"
          className="transition-colors hover:text-secondary"
        >
          <ShareIcon />
        </button>
        <button
          type="button"
          aria-label="Email"
          className="transition-colors hover:text-secondary"
        >
          <MailIcon />
        </button>
      </div>
    </footer>
  );
}
