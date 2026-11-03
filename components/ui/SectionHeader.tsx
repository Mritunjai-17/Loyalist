import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";
import { Heading } from "./Heading";

type SectionHeaderProps = {
  number: string;
  label: string;
  title: string;
  /** Final phrase of the title, set in italic gold. */
  accent?: string;
  /** Put the body and the accent phrase on separate lines. */
  stacked?: boolean;
  lead?: string;
  /** Text link or button at the right end of the heading row (desktop). */
  action?: ReactNode;
  /** Id for the h2, used by the section's aria-labelledby. */
  id: string;
  className?: string;
};

/** Eyebrow, 20px, h2, 20px, optional lead, 56px, content. No variants. */
export function SectionHeader({ number, label, title, accent, stacked, lead, action, id, className }: SectionHeaderProps) {
  return (
    <header data-section-header className={cn("mb-14", className)}>
      <div className="lg:flex lg:items-end lg:justify-between lg:gap-12">
        <div>
          <Eyebrow number={number}>{label}</Eyebrow>
          <Heading level={2} id={id} accent={accent} stacked={stacked} className="mt-5">
            {title}
          </Heading>
        </div>
        {action ? <div className="hidden shrink-0 lg:block">{action}</div> : null}
      </div>
      {lead ? <p className="text-lead mt-5">{lead}</p> : null}
      {action ? <div className="mt-5 lg:hidden">{action}</div> : null}
    </header>
  );
}
