export default function Loading() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-6 bg-tertiary px-8 py-24 text-center lg:px-16">
      <span className="flex p-2 items-center justify-center border border-secondary font-serif font-bold text-lg text-primary">
        BeyondNorms
      </span>

      <span className="h-px w-10 bg-secondary" />

      <div
        className="size-10 animate-spin rounded-full border-2 border-secondary/25 border-t-secondary"
        role="status"
        aria-label="A confirmar a tua reserva"
      />

      <p className="max-w-md font-sans text-base leading-relaxed text-neutral">
        Confirming your reservation&hellip;
      </p>
    </section>
  );
}
