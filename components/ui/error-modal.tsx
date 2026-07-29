"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

function WarningIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="size-6"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a1 1 0 0 0 .86 1.5h18.64a1 1 0 0 0 .86-1.5L13.71 3.86a1 1 0 0 0-1.72 0Z"
      />
    </svg>
  );
}

type ErrorModalProps = {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
  actionLabel?: string;
};

export function ErrorModal({
  open,
  title,
  message,
  onClose,
  actionLabel = "Choose another date",
}: ErrorModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-tertiary/90 px-4 py-8 backdrop-blur-sm"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="error-modal-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-sm border border-terracotta/50 bg-tertiary p-8 text-center shadow-2xl">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full border border-terracotta text-terracotta">
          <WarningIcon />
        </span>

        <h3
          id="error-modal-title"
          className="mt-6 font-serif text-2xl text-primary"
        >
          {title}
        </h3>

        <p className="mt-3 font-sans text-sm leading-relaxed text-neutral">
          {message}
        </p>

        <Button type="button" className="mt-8 w-full" onClick={onClose}>
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}
