import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import dinnerShowPerformance from "@/public/images/dinner-show-performance.jpg";

export function Harmony() {
  return (
    <section className="grid gap-12 bg-primary/5 px-8 py-24 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-16">
      <Reveal className="relative aspect-4/5 w-full overflow-hidden">
        <Image
          src={dinnerShowPerformance}
          alt="Live saxophonist and painter performing on stage during the Dinner Show"
          fill
          placeholder="blur"
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </Reveal>

      <Reveal delay={150} className="flex flex-col gap-6">
        <span className="h-px w-10 bg-secondary" />

        <h2 className="font-serif text-4xl text-primary lg:text-5xl">
          Dinner Show &amp; Surprise Artists
        </h2>

        <div className="flex flex-col gap-4 font-sans text-base leading-relaxed text-neutral">
          <p>
            Indulge in an unforgettable evening where gastronomy, art, and
            emotion come together. In an intimate and sophisticated
            atmosphere, guests will enjoy a carefully curated dining
            experience enhanced by live performances and surprise artistic
            appearances throughout the night.
          </p>
          <p>
            From captivating music to unexpected creative moments, every
            detail is designed to inspire connection, wonder, and
            celebration. A multi-sensory journey crafted to create
            lasting memories.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
