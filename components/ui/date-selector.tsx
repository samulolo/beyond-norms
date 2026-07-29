"use client";

import type { EventDateOption } from "@/utils/constant/const";

type DateSelectorProps = {
  options: EventDateOption[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
};

export function DateSelector({
  options,
  value,
  onChange,
  className = "",
}: DateSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Choose event date"
      className={`inline-flex flex-wrap items-center gap-2 ${className}`}
    >
      {options.map((option) => {
        const isActive = option.id === value;

        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(option.id)}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider transition-colors ${
              isActive
                ? "border-secondary bg-secondary text-tertiary"
                : "border-primary/20 text-primary/70 hover:border-secondary/60 hover:text-primary"
            }`}
          >
            <span className="font-serif text-sm normal-case tracking-normal">
              {option.day}
            </span>
            {option.month}
          </button>
        );
      })}
    </div>
  );
}
