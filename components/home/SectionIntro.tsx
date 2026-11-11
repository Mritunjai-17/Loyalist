import type { ReactNode } from "react";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/cn";
import { EditorialLabel } from "./EditorialLabel";

type HeadingBlockProps = {
  index: string;
  label: string;
  id: string;
  title: string;
  accent?: string;
  /** Put title and accent on separate lines (default). */
  stacked?: boolean;
  className?: string;
};

/** Eyebrow label and section heading with the shared label-to-heading spacing. */
export function HeadingBlock({ index, label, id, title, accent, stacked = true, className }: HeadingBlockProps) {
  return (
    <div className={className}>
      <EditorialLabel index={index}>{label}</EditorialLabel>
      <Heading level={2} id={id} stacked={stacked} accent={accent} className="mt-label">
        {title}
      </Heading>
    </div>
  );
}

/**
 * The opening of a homepage section: heading on the left, an optional lead and
 * action on the right, bottom-aligned to the heading. One definition, so every
 * section starts at the same position with the same proportions.
 */
export function SectionIntro({
  lead,
  action,
  className,
  ...heading
}: HeadingBlockProps & { lead?: ReactNode; action?: ReactNode }) {
  return (
    <div
      className={cn(
        "grid gap-y-copy lg:items-end lg:gap-x-col",
        // With a lead, the right column holds a paragraph; with only an action it shrinks to fit.
        lead ? "lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]" : "lg:grid-cols-[minmax(0,1fr)_auto]",
        className,
      )}
    >
      <Reveal>
        <HeadingBlock {...heading} />
      </Reveal>
      {lead || action ? (
        <Reveal delay={0.1} className="lg:pb-2">
          {lead ? <p className="lead-ed max-w-[44ch]">{lead}</p> : null}
          {action ? <div className={lead ? "mt-6" : undefined}>{action}</div> : null}
        </Reveal>
      ) : null}
    </div>
  );
}
