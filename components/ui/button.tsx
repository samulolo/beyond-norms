"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";

type ButtonVariant = "primary" | "outline";
type ButtonSize = "sm" | "md";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-tertiary hover:opacity-90",
  outline:
    "border border-primary text-primary hover:bg-primary hover:text-tertiary",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-6 py-2.5 text-xs",
  md: "px-8 py-4 text-sm",
};

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  icon?: boolean;
  loadingText?: string;
};

const iconWrapperClasses: Record<ButtonVariant, string> = {
  primary: "bg-tertiary text-primary",
  outline: "bg-primary text-tertiary",
};

const spinnerClasses: Record<ButtonVariant, string> = {
  primary: "border-tertiary/30 border-t-tertiary",
  outline: "border-primary/30 border-t-primary",
};

function ButtonIcon({ variant }: { variant: ButtonVariant }) {
  return (
    <span
      className={`ml-3 flex size-6 shrink-0 items-center justify-center rounded-full ${iconWrapperClasses[variant]}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="size-3"
        aria-hidden
      >
        <path strokeLinecap="round" d="M12 5v14M5 12h14" />
      </svg>
    </span>
  );
}

function ButtonSpinner({ variant }: { variant: ButtonVariant }) {
  return (
    <span
      className={`mr-3 size-4 shrink-0 animate-spin rounded-full border-2 ${spinnerClasses[variant]}`}
      aria-hidden
    />
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  onClick,
  type = "button",
  icon = false,
  loadingText,
}: ButtonProps) {
  // Quando este botão está dentro de um <form action={...}> (Server Action),
  // useFormStatus reflete o estado desse submit. Fora de um form, "pending"
  // fica sempre false, por isso é seguro chamar isto sempre.
  const { pending } = useFormStatus();
  const isPending = type === "submit" && pending;

  const classes = [
    "inline-flex items-center justify-center whitespace-nowrap font-sans font-medium uppercase tracking-wider transition-colors",
    variantClasses[variant],
    sizeClasses[size],
    isPending ? "cursor-not-allowed opacity-70" : "",
    className,
  ].join(" ");

  const content = (
    <>
      {isPending && <ButtonSpinner variant={variant} />}
      {isPending ? (loadingText ?? children) : children}
      {icon && !isPending && <ButtonIcon variant={variant} />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isPending}
      className={classes}
    >
      {content}
    </button>
  );
}
