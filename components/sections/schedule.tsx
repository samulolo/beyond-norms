import Image from "next/image";
import type { StaticImageData } from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { dinnerShowTime, soulSpeedDatingTime } from "@/utils/constant/const";
import soulSpeedDating from "@/public/images/soul-speed-dating.jpg";
import dinnerShowPerformance from "@/public/images/dinner-show-live-band.png";

type ScheduleItem = {
  time: string;
  title: string;
  tag: string;
  description: string;
  image: StaticImageData;
  alt: string;
};

const scheduleItems: ScheduleItem[] = [
  {
    time: soulSpeedDatingTime,
    title: "Soul Speed Dating",
    tag: "Beyond Norms",
    description:
      "A refined, immersive moment designed to encourage authentic conversation beyond appearances, meaningful exchanges, inspiring personalities, and genuine connection in a sophisticated setting.",
    image: soulSpeedDating,
    alt: "Guests enjoying Soul Speed Dating at candlelit rooftop tables at sunset",
  },
  {
    time: dinnerShowTime,
    title: "Dinner Show",
    tag: "Surprise",
    description:
      "Gastronomy, art, and emotion come together in a carefully curated dining experience enhanced by live performances and surprise artistic appearances throughout the night.",
    image: dinnerShowPerformance,
    alt: "Live band performing on stage while guests enjoy dinner in the candlelit venue",
  },
];

export function Schedule() {
  return (
    <section
      id="schedule"
      className="flex flex-col items-center gap-16 px-8 py-24 lg:px-16"
    >
      <Reveal className="flex flex-col items-center gap-4 text-center">
        <h2 className="font-serif text-4xl text-primary lg:text-5xl">
          One Evening, Two Experiences
        </h2>
        <span className="h-px w-10 bg-secondary" />
      </Reveal>

      <div className="flex w-full max-w-6xl flex-col gap-16">
        {scheduleItems.map((item, index) => (
          <Reveal
            key={item.title}
            delay={index * 120}
            className={`flex flex-col gap-8 border-b border-primary/10 pb-16 last:border-b-0 last:pb-0 lg:items-center lg:gap-16 ${
              index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
            }`}
          >
            <div className="relative h-[280px] w-full overflow-hidden lg:h-[420px] lg:flex-1">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                placeholder="blur"
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>

            <div className="flex flex-col gap-4 lg:flex-1">
              <span className="inline-flex w-fit border border-secondary px-4 py-2 font-sans text-xs uppercase tracking-widest text-secondary">
                {item.time}
              </span>
              <p className="font-sans text-xs uppercase tracking-widest text-neutral/60">
                {item.tag}
              </p>
              <h3 className="font-serif text-3xl text-primary lg:text-4xl">
                {item.title}
              </h3>
              <p className="font-sans text-base leading-relaxed text-neutral">
                {item.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
