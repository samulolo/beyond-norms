import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import dinnerShowPerformance from "@/public/images/dinner-show-performance.jpg";

export function Harmony() {
  return (
    <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-tertiary">
      <Image
        src={dinnerShowPerformance}
        alt="Live saxophonist and painter performing on stage during the Dinner Show"
        fill
        placeholder="blur"
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-tertiary via-tertiary/10 to-transparent" />

      <Reveal className="relative z-10 mx-auto max-w-3xl px-8 pb-20 text-center lg:px-16 lg:pb-24">
        <p className="font-serif text-2xl italic leading-relaxed text-primary lg:text-3xl">
          &ldquo;A multi-sensory journey where gastronomy, art, and emotion
          meet, crafted to be felt, not forgotten.&rdquo;
        </p>
      </Reveal>
    </section>
  );
}
