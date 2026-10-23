import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ShareQr } from "@/components/ui/share-qr";
import { getUpcomingEvents } from "@/data/upcoming-events";
import { instagramHandle, instagramUrl } from "@/utils/constant/const";

export const metadata: Metadata = {
  title: "Upcoming Events",
  description:
    "The next Beyond Norms experiences in Lisbon — Soul Speed Dating & Dinner Show. See the dates and reserve your seat.",
};

// A página é estática, mas as datas passadas têm de desaparecer sozinhas
// sem precisar de novo deploy: regenera no máximo uma vez por hora.
export const revalidate = 3600;

export default function UpcomingEventsPage() {
  const events = getUpcomingEvents();

  return (
    <section className="flex flex-1 flex-col bg-tertiary">
      <div className="flex items-center justify-between px-8 py-6 lg:px-16">
        <Link
          href="/"
          className="font-serif text-xl tracking-[0.2em] text-primary"
        >
          BEYOND NORMS
        </Link>
        <Link
          href="/"
          className="font-sans text-xs uppercase tracking-widest text-neutral/70 transition-colors hover:text-secondary"
        >
          &larr; Home
        </Link>
      </div>

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-8 pb-24 pt-12 lg:px-16">
        <div className="flex flex-col gap-4">
          <span className="h-px w-10 bg-secondary" />
          <h1 className="font-serif text-4xl text-primary lg:text-5xl">
            Upcoming Events
          </h1>
          <p className="max-w-xl font-sans text-sm leading-relaxed text-neutral sm:text-base">
            The next chapters of Beyond Norms. Spots are strictly limited
            &mdash; reserve yours early.
          </p>
        </div>

        {events.length > 0 ? (
          <ul className="flex flex-col gap-6">
            {events.map((event) => (
              <li
                key={event.id}
                className="flex flex-col gap-6 border border-secondary/50 bg-primary/5 p-6 sm:flex-row sm:gap-8 sm:p-8"
              >
                <div className="flex shrink-0 flex-row items-baseline gap-3 sm:w-24 sm:flex-col sm:items-start sm:gap-1 sm:border-r sm:border-secondary/30 sm:pr-6">
                  <span className="font-serif text-5xl leading-none text-secondary">
                    {event.day}
                  </span>
                  <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    {event.month}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="font-sans text-xs uppercase tracking-widest text-secondary">
                      {event.full} &middot; {event.venue}
                    </p>
                    <h2 className="font-serif text-2xl text-primary sm:text-3xl">
                      {event.title}
                    </h2>
                  </div>

                  <p className="font-sans text-sm leading-relaxed text-neutral">
                    {event.description}
                  </p>

                  <dl className="flex flex-col gap-1 font-sans text-sm">
                    {event.schedule.map((item) => (
                      <div key={item.label} className="flex flex-wrap gap-x-3">
                        <dt className="text-neutral">{item.label}</dt>
                        <dd className="text-primary">{item.time}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-2 flex flex-wrap items-center gap-5">
                    <Button
                      href={`/checkout?date=${event.id}`}
                      variant="gold-white"
                    >
                      Reserve your seat
                    </Button>
                    {event.price && (
                      <span className="font-serif text-2xl text-primary">
                        &euro;{event.price}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-start gap-4 border border-secondary/50 bg-primary/5 p-8">
            <h2 className="font-serif text-2xl text-primary sm:text-3xl">
              New dates coming soon
            </h2>
            <p className="max-w-xl font-sans text-sm leading-relaxed text-neutral">
              We&apos;re preparing the next Beyond Norms experience. Join our
              community to be the first to know when dates are announced.
            </p>
            <div className="mt-2 flex flex-wrap gap-4">
              <Button href="/#newsletter" variant="gold-white">
                Join the community
              </Button>
              <Button href={instagramUrl} variant="outline">
                @{instagramHandle}
              </Button>
            </div>
          </div>
        )}

        <ShareQr />
      </div>
    </section>
  );
}
