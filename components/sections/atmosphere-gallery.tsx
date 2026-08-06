import Image from "next/image";
import type { StaticImageData } from "next/image";

import { Reveal } from "@/components/ui/reveal";
import champagneGathering from "@/public/images/atmosphere-champagne-gathering.png";
import conversationCards from "@/public/images/atmosphere-conversation-cards.png";
import dinnerTable from "@/public/images/atmosphere-dinner-table.png";
import livePerformance from "@/public/images/atmosphere-live-performance.png";
import rooftopCommunity from "@/public/images/atmosphere-rooftop-community.png";

type GalleryImage = {
  title: string;
  src: StaticImageData;
  alt: string;
  quote: string;
  imageClassName: string;
  sizes: string;
};

const galleryImages: GalleryImage[] = [
  {
    title: "Arrival",
    src: rooftopCommunity,
    alt: "Guests arriving and connecting on a rooftop with city lights behind them",
    quote: "A beautiful evening begins with a simple conversation.",
    imageClassName: "aspect-[16/9] max-w-5xl",
    sizes: "(min-width: 1024px) 80vw, 100vw",
  },
  {
    title: "Meaningful Conversations",
    src: conversationCards,
    alt: "Guests smiling during a guided Beyond Norms conversation",
    quote: "No awkward introductions. Just genuine curiosity.",
    imageClassName: "aspect-[4/3] max-w-3xl",
    sizes: "(min-width: 1024px) 56vw, 100vw",
  },
  {
    title: "Dinner Experience",
    src: dinnerTable,
    alt: "Guests sharing an intimate candlelit dinner around a long table",
    quote: "Every course becomes part of the conversation.",
    imageClassName: "aspect-[16/9] max-w-5xl",
    sizes: "(min-width: 1024px) 80vw, 100vw",
  },
  {
    title: "Live Performance",
    src: livePerformance,
    alt: "A live singer and saxophonist performing during an intimate dinner show",
    quote: "Music creates the moments words cannot.",
    imageClassName: "aspect-[4/3] max-w-3xl",
    sizes: "(min-width: 1024px) 56vw, 100vw",
  },
  {
    title: "The Evening Ends",
    src: champagneGathering,
    alt: "Elegant guests connecting over champagne in a warm evening atmosphere",
    quote: "Some evenings stay with you long after they end.",
    imageClassName: "aspect-[16/9] max-w-5xl",
    sizes: "(min-width: 1024px) 80vw, 100vw",
  },
];

export function AtmosphereGallery() {
  return (
    <section className="px-8 py-24 lg:px-16">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
        <p className="font-sans text-sm font-semibold uppercase tracking-[0.3em] text-secondary">
          Atmosphere
        </p>
        <h2 className="font-serif text-4xl text-primary lg:text-5xl">
          A Glimpse of the Atmosphere
        </h2>
        <p className="font-serif text-xl italic leading-relaxed text-neutral lg:text-2xl">
          A visual preview of the experience we&apos;re creating for our
          inaugural Beyond Norms evening.
        </p>
      </Reveal>

      <div className="mx-auto mt-16 flex max-w-6xl flex-col">
        {galleryImages.map((image, index) => (
          <Reveal
            key={image.alt}
            delay={index * 80}
            className="border-t border-secondary/30 py-14 last:border-b"
          >
            <article className="flex flex-col items-center text-center">
              <h3 className="font-serif text-3xl text-primary lg:text-4xl">
                {image.title}
              </h3>

              <div
                className={`group relative mt-8 w-full overflow-hidden border border-primary/10 bg-primary/5 ${image.imageClassName}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  placeholder="blur"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes={image.sizes}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tertiary/35 via-transparent to-transparent" />
              </div>

              <p className="mt-8 max-w-2xl font-serif text-2xl italic leading-snug text-primary lg:text-3xl">
                &ldquo;{image.quote}&rdquo;
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
