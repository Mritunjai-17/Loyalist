import type { ReactNode } from "react";
import type { Tone } from "@/types";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

type SectionProps = {
  tone: Tone;
  children: ReactNode;
  id?: string;
  labelledBy?: string;
  className?: string;
};

export function Section({ tone, children, id, labelledBy, className }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-tone={tone}
      className={cn("section-pad bg-surface", className)}
    >
      <Container>{children}</Container>
    </section>
  );
}
