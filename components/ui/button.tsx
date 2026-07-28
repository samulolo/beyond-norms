import Link from "next/link";
import type { ReactNode } from "react";

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
};

const iconWrapperClasses: Record<ButtonVariant, string> = {
  primary: "bg-tertiary text-primary",
  outline: "bg-primary text-tertiary",
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

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  onClick,
  type = "button",
  icon = false,
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center whitespace-nowrap font-sans font-medium uppercase tracking-wider transition-colors",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(" ");

  const content = (
    <>
      {children}
      {icon && <ButtonIcon variant={variant} />}
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
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
