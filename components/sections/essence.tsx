import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";

export function Essence() {
  return (
    <section
      id="experience"
      className="grid gap-12 px-8 py-24 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-16"
    >
      <Reveal className="relative aspect-4/5 w-full overflow-hidden">
        <Image
          src="/images/venue-overview.jpg"
          alt="Beyond Norms venue set up with long candlelit tables and a red stage curtain"
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </Reveal>

      <Reveal delay={150} className="flex flex-col gap-6">
        <span className="h-px w-10 bg-secondary" />

        <h2 className="font-serif text-4xl text-primary lg:text-5xl">
          Curated Human Experiences
        </h2>

        <p className="font-sans text-sm font-semibold uppercase tracking-widest text-secondary">
          Drop social masks &middot; Feel safe to be authentic &middot;
          Connect beyond appearances &middot; Share presence, not performance
        </p>

        <div className="flex flex-col gap-4 font-sans text-base leading-relaxed text-neutral">
          <p>
            Get ready to dive into a unique event where we celebrate the
            beauty of human connection like never before. Whether you&apos;re
            looking to explore new stories, share your own, or just live new
            emotions, this is the place to be.
          </p>
          <p>
            Join us and experience moments that are thoughtfully crafted just
            for you &mdash; it&apos;s all about real people, real emotions,
            and real connections.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
