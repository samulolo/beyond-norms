"use client";

import { useEffect } from "react";

type VideoModalProps = {
  open: boolean;
  src: string;
  title: string;
  onClose: () => void;
};

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="size-6"
      aria-hidden
    >
      <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function VideoModal({ open, src, title, onClose }: VideoModalProps) {
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-tertiary/95 px-4 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-5xl border border-secondary/50 bg-tertiary shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center border border-primary/20 bg-tertiary/80 text-primary transition-colors hover:border-secondary hover:text-secondary"
          aria-label="Close video"
        >
          <CloseIcon />
        </button>

        <video
          src={src}
          title={title}
          controls
          autoPlay
          className="aspect-video w-full bg-black"
        />
      </div>
    </div>
  );
}
