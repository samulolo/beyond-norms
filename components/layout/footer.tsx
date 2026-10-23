import Link from "next/link";

import { ShareButton } from "@/components/ui/share-button";

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

      <ShareButton className="absolute right-8 top-1/2 -translate-y-1/2 text-primary transition-colors hover:text-secondary lg:right-16" />
    </footer>
  );
}
