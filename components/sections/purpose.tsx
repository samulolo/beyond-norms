import { Reveal } from "@/components/ui/reveal";

const commitments = [
  {
    title: "Carefully Curated",
    description: "Every detail is intentionally designed to create an exceptional evening.",
  },
  {
    title: "Meaningful Conversations",
    description: "Go beyond appearances through conversations that genuinely matter.",
  },
  {
    title: "Memories That Last",
    description: "An experience designed to stay with you long after the evening ends.",
  },
];

export function Purpose() {
  return (
    <section id="why-beyond" className="bg-primary/5 px-8 py-24 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal className="flex flex-col gap-5">
          <p className="font-sans text-sm font-semibold uppercase tracking-[0.3em] text-secondary">
            Why Beyond Norms?
          </p>

          <h2 className="font-serif text-4xl leading-tight text-primary lg:text-6xl">
            Human Connection,
            <br />
            Beautifully Curated.
          </h2>

          <span className="h-px w-10 bg-secondary" />
        </Reveal>

        <div className="flex flex-col gap-10">
          <Reveal delay={120} className="flex flex-col gap-6">
            <p className="font-serif text-2xl leading-snug text-primary lg:text-3xl">
              Beyond Norms isn&apos;t simply a night out.
              <br />
              It&apos;s an intentionally curated evening where conversation,
              hospitality, art and emotion come together to create genuine
              human connection.
            </p>

            <p className="max-w-2xl font-sans text-base leading-relaxed text-neutral">
              Modern cities are full of people, yet meaningful connection has
              become increasingly rare. We created Beyond Norms to slow things
              down—to offer a space where conversations happen naturally,
              strangers become familiar, and every detail is designed with
              intention.
            </p>

            <p className="max-w-2xl font-sans text-base leading-relaxed text-neutral">
              This is our inaugural experience in Lisbon. The beginning of a
              community built around authentic conversations, unforgettable
              evenings and meaningful human experiences.
            </p>
          </Reveal>

          <Reveal delay={220} className="grid gap-8 sm:grid-cols-3">
            {commitments.map((commitment) => (
              <div
                key={commitment.title}
                className="border-t border-secondary pt-5"
              >
                <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  {commitment.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-neutral">
                  {commitment.description}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
