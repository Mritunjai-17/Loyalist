"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { glossary, type GlossaryKey } from "@/content/glossary";
import { cn } from "@/lib/cn";

type TermProps = {
  /** Key in content/glossary.ts. */
  term: GlossaryKey;
  /** Visible text; defaults to the glossary term. */
  children?: ReactNode;
};

/**
 * A dotted-underline term whose definition opens on hover, focus or tap.
 * Hover and focus are handled in CSS, so the definition still shows without JavaScript.
 */
export function Term({ term, children }: TermProps) {
  const entry = glossary[term];
  const id = useId();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent ? event.key === "Escape" : !ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  if (!entry) return <>{children}</>;

  return (
    <span ref={ref} className={cn("term", open && "is-open")}>
      <button type="button" className="term-trigger" aria-describedby={id} onClick={() => setOpen((v) => !v)}>
        {children ?? entry.term}
      </button>
      <span role="tooltip" id={id} className="term-tip">
        <span className="term-tip-title">{entry.term}.</span> {entry.definition}
      </span>
    </span>
  );
}
