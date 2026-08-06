"use client";

type SeatsAvailableProps = {
  count?: number;
  className?: string;
  layout?: "inline" | "stacked";
};

export function SeatsAvailable({
  count = 50,
  className = "",
  layout = "inline",
}: SeatsAvailableProps) {
  if (layout === "stacked") {
    return (
      <div
        className={`border border-secondary/50 bg-tertiary/35 p-5 ${className}`}
      >
        <p className="font-serif text-5xl leading-none text-secondary">
          {count}
        </p>
        <p className="mt-2 font-sans text-[0.68rem] font-semibold uppercase leading-relaxed tracking-[0.18em] text-primary">
          seats available
        </p>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-4 border border-secondary/60 bg-tertiary/45 px-4 py-3 backdrop-blur-sm ${className}`}
    >
      <span className="font-serif text-4xl leading-none text-secondary">
        {count}
      </span>
      <span className="max-w-[14ch] font-sans text-xs font-semibold uppercase leading-relaxed tracking-[0.2em] text-primary">
        seats available
      </span>
    </div>
  );
}
