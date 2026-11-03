import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type AccentLevel = { level: 1 | 2; accent?: string };
type PlainLevel = { level: 3 | 4 | 5 | 6; accent?: never };

type HeadingProps = (AccentLevel | PlainLevel) & {
  children: ReactNode;
  /** Home hero only. */
  variant?: "display";
  /** Put the body and the accent phrase on separate lines (hero). */
  stacked?: boolean;
  id?: string;
  /** Layout only (margins, max-width). Family, size and tracking belong to globals.css. */
  className?: string;
};

/**
 * The only way headings are rendered. Size, family and tracking come from the
 * tag selectors in globals.css, so every h2 on the site is the same h2.
 */
export function Heading({ level, accent, children, variant, stacked, id, className }: HeadingProps) {
  const Tag = `h${level}` as const;
  const lineClass = stacked ? "block" : undefined;

  return (
    <Tag id={id} data-variant={variant} className={cn(className)}>
      {stacked ? <span className={lineClass}>{children}</span> : children}
      {accent ? (
        <>
          {stacked ? null : " "}
          <em className={cn("heading-accent", lineClass)}>{accent}</em>
        </>
      ) : null}
    </Tag>
  );
}
