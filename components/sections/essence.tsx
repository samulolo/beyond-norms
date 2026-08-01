import { Reveal } from "@/components/ui/reveal";

export function Essence() {
  return (
    <section
      id="experience"
      className="flex flex-col items-center gap-10 px-8 py-24 text-center lg:px-16"
    >
      <Reveal className="flex flex-col items-center gap-4">
        <p className="font-sans text-sm font-semibold uppercase tracking-[0.3em] text-secondary">
          The Experience
        </p>
        <h2 className="font-serif text-4xl text-primary lg:text-6xl">
          Curated Human Experiences
        </h2>
        <span className="h-px w-10 bg-secondary" />
      </Reveal>

      <Reveal
        delay={150}
        className="flex max-w-2xl flex-col gap-6 font-sans text-base leading-relaxed text-neutral"
      >
        <p>
          Drop the social masks. Feel safe to be authentic. Connect beyond
          appearances, and share presence rather than performance.
        </p>
        <p>
          Every detail of the evening is thoughtfully crafted, an invitation
          to explore new stories, share your own, and feel emotions worth
          remembering.
        </p>
      </Reveal>
    </section>
  );
}
