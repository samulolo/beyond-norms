"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ReserveSeatButton } from "@/components/ui/reserve-seat-button";
import { SeatsAvailable } from "@/components/ui/seats-available";
import { VideoModal } from "@/components/ui/video-modal";
import { eventDates, eventYear } from "@/utils/constant/const";
import heroDinner from "@/public/images/hero-dinner.jpg";

const navLinks = [
  { label: "Why Beyond", href: "#why-beyond" },
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

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-3"
      aria-hidden
    >
      <path d="M8 5.5v13l10-6.5-10-6.5Z" />
    </svg>
  );
}

export function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-tertiary">
      <Image
        src={heroDinner}
        alt="Guests laughing and sharing a candlelit dinner at a long communal table"
        fill
        priority
        placeholder="blur"
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-tertiary/85 via-tertiary/35 to-tertiary/90" />

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex items-center justify-between px-8 py-6 lg:px-16">
          <Link
            href="/"
            className="font-serif text-xl tracking-[0.2em] text-primary"
          >
            BEYOND NORMS
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm text-primary/90 transition-colors hover:text-secondary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <ReserveSeatButton size="sm" />
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
            isOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <nav className="flex flex-col items-center gap-6 overflow-hidden px-8 pb-8">
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
            <ReserveSeatButton
              onClick={() => setIsOpen(false)}
              className="mt-2 w-full max-w-xs"
            />
          </nav>
        </div>

        <div className="hidden justify-center px-8 pt-4 lg:flex lg:px-16">
          <div className="flex items-center gap-2 border border-primary/20 bg-tertiary/40 px-4 py-2 backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-secondary" aria-hidden />
            <span className="font-sans text-xs uppercase tracking-widest text-primary">
              Rooftop Ferroviário, Lisbon
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center px-8 py-10 sm:py-14 lg:px-16 lg:py-10">
          <div className="max-w-3xl text-left">
            <Reveal>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-secondary sm:text-sm">
                Lisbon &middot;{" "}
                {eventDates.map((date) => date.label).join(" & ")},{" "}
                {eventYear}
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.06] text-primary sm:text-6xl lg:text-7xl">
                Luxury Soul Speed Dating &amp; Dinner Show{" "}
                <span className="block text-secondary">Experience</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-4 font-serif text-2xl leading-tight text-primary sm:text-3xl">
                Create. Connect. Celebrate.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-primary/85 sm:text-lg">
                Meet inspiring people through guided conversations before
                enjoying an intimate dinner show with live surprise artists.
              </p>
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-8 flex flex-col items-start gap-5">
                <div className="grid w-full max-w-3xl gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap lg:items-center lg:gap-4">
                  <ReserveSeatButton className="w-full lg:w-auto" />
                  <Button
                    href="#experience"
                    variant="outline"
                    className="w-full lg:w-auto"
                  >
                    View Experience
                  </Button>
                  <SeatsAvailable className="w-full max-w-xs sm:w-auto" />
                  <button
                    type="button"
                    onClick={() => setIsVideoOpen(true)}
                    className="inline-flex w-full items-center justify-center whitespace-nowrap border border-primary px-8 py-4 font-sans text-sm font-medium uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-tertiary sm:col-span-2 lg:w-auto"
                  >
                    <span className="mr-3 flex size-6 items-center justify-center rounded-full border border-current">
                      <PlayIcon />
                    </span>
                    Watch 30s Experience
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="border-y border-secondary/20 bg-tertiary/95 px-8 py-4 lg:px-16">
          <p className="text-center font-sans text-xs uppercase tracking-[0.3em] text-secondary sm:text-sm">
            Soul Speed Dating
            <span className="mx-3 text-secondary/50">&times;</span>
            Dinner Show &amp; Surprise Artists
          </p>
        </div>
      </div>
      <VideoModal
        open={isVideoOpen}
        src="/BeyondNorms.mp4"
        title="Beyond Norms atmosphere film"
        onClose={() => setIsVideoOpen(false)}
      />
    </section>
  );
}
