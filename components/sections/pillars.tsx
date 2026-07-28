import Image from "next/image";
import type { StaticImageData } from "next/image";

import { Reveal } from "@/components/ui/reveal";
import hostSpeaking from "@/public/images/host-speaking.jpg";
import soulSpeedDating from "@/public/images/soul-speed-dating.jpg";
import tableDecor from "@/public/images/table-decor.jpg";

type Pillar = {
  title: string;
  description: string;
  image: StaticImageData;
  alt: string;
  accent: "secondary" | "sage" | "terracotta";
};

const accentClasses = {
  secondary: "bg-secondary",
  sage: "bg-sage",
  terracotta: "bg-terracotta",
} as const;

const pillars: Pillar[] = [
  {
    title: "Luxury Experiences",
    description:
      "An elegant and immersive atmosphere designed for sophistication and comfort, from the first toast to the final note.",
    image: tableDecor,
    alt: "Candlelit table with white flowers and champagne glasses",
    accent: "secondary",
  },
  {
    title: "Authentic Connections",
    description:
      "Meaningful exchanges beyond appearances — conversations built on vulnerability, energy, and emotional intelligence.",
    image: soulSpeedDating,
    alt: "Guests connecting over Soul Speed Dating on a rooftop at sunset",
    accent: "sage",
  },
  {
    title: "Lasting Memories",
    description:
      "Curated moments crafted to be felt, not forgotten — the start of stories that continue long after the night ends.",
    image: hostSpeaking,
    alt: "Host speaking to guests on stage",
    accent: "terracotta",
  },
];

export function Pillars() {
  return (
    <section className="flex flex-col items-center gap-16 px-8 py-24 lg:px-16">
      <Reveal className="flex flex-col items-center gap-4 text-center">
        <h2 className="font-serif text-4xl text-primary lg:text-5xl">
          The Beyond Norms Promise
        </h2>
        <span className="h-px w-10 bg-secondary" />
      </Reveal>

      <div className="grid w-full gap-10 sm:grid-cols-3">
        {pillars.map((pillar, index) => (
          <Reveal
            key={pillar.title}
            delay={index * 120}
            className="flex flex-col gap-6"
          >
            <div className="relative aspect-4/5 w-full overflow-hidden">
              <Image
                src={pillar.image}
                alt={pillar.alt}
                fill
                placeholder="blur"
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
            </div>

            <div className="flex flex-col gap-2">
              <span
                className={`h-px w-10 ${accentClasses[pillar.accent]}`}
              />
              <h3 className="font-serif text-2xl text-primary">
                {pillar.title}
              </h3>
              <p className="font-sans text-base leading-relaxed text-neutral">
                {pillar.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
