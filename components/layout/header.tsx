"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Schedule", href: "#schedule" },
  { label: "Contact", href: "#contact" },
];

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="size-6"
      aria-hidden
    >
      <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="size-6"
      aria-hidden
    >
      <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-primary/10 px-8 py-6 lg:px-16">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-2xl tracking-wide text-primary"
        >
          BeyondNorms
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-sm text-primary/80 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Button href="#tickets" size="sm">
              Buy a Ticket
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="text-primary md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div
        className={`grid transition-all duration-300 ease-out md:hidden ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-6 overflow-hidden pt-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-serif text-2xl text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Button
            href="#tickets"
            onClick={() => setIsOpen(false)}
            className="mt-2 w-full max-w-xs"
          >
            Buy Ticket
          </Button>
        </nav>
      </div>
    </header>
  );
}
