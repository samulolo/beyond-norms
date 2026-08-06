"use client";

import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";

type ReserveSeatButtonProps = Omit<
  ComponentProps<typeof Button>,
  "children" | "variant" | "href"
> & {
  href?: string;
};

export function ReserveSeatButton({
  href = "#tickets",
  ...props
}: ReserveSeatButtonProps) {
  return (
    <Button href={href} variant="gold-white" {...props}>
      Reserve your seat
    </Button>
  );
}
