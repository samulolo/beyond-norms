import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { eventYear } from "@/utils/constant/const";
import tableDecor from "@/public/images/table-decor.jpg";
import venueOverview from "@/public/images/venue-overview.jpg";

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="size-4"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path strokeLinecap="round" d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="size-3.5"
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

export function Hero() {
  return (
    <section className="grid gap-16 bg-tertiary px-8 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-16 lg:py-20">
      <Reveal className="relative h-[420px] w-full lg:h-[640px]">
        <Image
          src={venueOverview}
          alt="BeyondNorms venue set up with long candlelit tables and a red stage curtain"
          fill
          priority
          placeholder="blur"
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />

        <div className="absolute -bottom-8 -right-4 hidden w-48 flex-col gap-3 border border-primary/10 bg-tertiary p-3 shadow-xl sm:flex">
          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              src={tableDecor}
              alt="Candlelit table decor at the venue"
              fill
              placeholder="blur"
              className="object-cover"
              sizes="192px"
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="font-sans text-xs uppercase tracking-wide text-primary">
              Rooftop Ferroviario
              <br />
              Lisbon
            </p>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-tertiary">
              <PinIcon />
            </span>
          </div>
        </div>
      </Reveal>

      <div className="flex flex-col gap-6">
        <Reveal className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full border border-secondary text-secondary">
            <CalendarIcon />
          </span>
          <p className="font-sans text-sm font-semibold uppercase tracking-widest text-secondary">
            Lisbon &middot; {eventYear}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="font-serif text-6xl leading-[1.05] text-primary lg:text-7xl">
            Create.
            <br />
            Connect.
            <br />
            Celebrate.
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="max-w-md font-sans text-lg leading-relaxed text-neutral">
            Two unique experiences, one unforgettable evening &mdash; real
            people, real emotions, real connections.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-2 flex flex-wrap gap-4">
            <Button href="#tickets" icon>
              Request Invite
            </Button>
            <Button href="#experience" variant="outline">
              View Experience
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
