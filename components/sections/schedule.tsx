import { Reveal } from "@/components/ui/reveal";

type ScheduleItem = {
  time: string;
  title: string;
  tag: string;
  description: string;
  accent: "sage" | "terracotta";
};

const accentClasses = {
  sage: "text-sage",
  terracotta: "text-terracotta",
} as const;

const scheduleItems: ScheduleItem[] = [
  {
    time: "07:00 PM – 08:30 PM",
    title: "Soul Speed Dating",
    tag: "Beyond Norms",
    description:
      "Experience a new approach to human connection through our Soul Speed Dating experience. An elegant and immersive moment designed to encourage authentic conversations beyond appearances. In a refined and welcoming atmosphere, guests will engage in meaningful exchanges, discover inspiring personalities, and create genuine connections through thoughtfully curated interactions. More than traditional speed dating, this experience celebrates vulnerability, energy, and emotional intelligence, offering a rare opportunity to meet like-minded souls in a sophisticated and unforgettable setting.",
    accent: "sage",
  },
  {
    time: "08:30 PM – 10:30 PM",
    title: "Dinner Show",
    tag: "Surprise",
    description:
      "Indulge in an unforgettable evening where gastronomy, art, and emotion come together through our exclusive Dinner Show experience. Guests will enjoy a carefully curated dining experience enhanced by live performances and surprise artistic appearances throughout the night.",
    accent: "terracotta",
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

      <div className="flex w-full max-w-3xl flex-col gap-12">
        {scheduleItems.map((item, index) => (
          <Reveal
            key={item.title}
            delay={index * 120}
            className="flex flex-col gap-2 border-b border-primary/10 pb-12 last:border-b-0 last:pb-0"
          >
            <p
              className={`font-sans text-sm font-semibold uppercase tracking-widest ${accentClasses[item.accent]}`}
            >
              {item.time}
            </p>
            <h3 className="font-serif text-2xl text-primary lg:text-3xl">
              {item.title}
            </h3>
            <p className="font-sans text-xs uppercase tracking-widest text-neutral/70">
              {item.tag}
            </p>
            <p className="mt-2 font-sans text-base leading-relaxed text-neutral">
              {item.description}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
