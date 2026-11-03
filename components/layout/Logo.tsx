import Link from "next/link";
import { cn } from "@/lib/cn";

// TODO(content): swap for the official vector mark when supplied. This is
// redrawn from the proportions of Source A's image/logo.webp (2917×903).
function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 306 304" aria-hidden className={cn("h-11 w-auto flex-none", className)}>
      <path d="M8 0h53v244h245v52a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8z" fill="var(--gold)" />
      <path d="M123 0h175a8 8 0 0 1 8 8v53H123z" fill="var(--ivory)" />
      <path d="M123 122h175a8 8 0 0 1 8 8v45a8 8 0 0 1-8 8H123z" fill="var(--ivory)" />
    </svg>
  );
}

function Letters({ word }: { word: string }) {
  return (
    <span aria-hidden className="flex justify-between">
      {[...word].map((letter, i) => (
        <span key={i}>{letter}</span>
      ))}
    </span>
  );
}

/** Mark plus a two-line wordmark whose lines are set to equal width. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex min-h-11 items-center gap-3", className)}>
      <LogoMark />
      <span className="sr-only">Loyalist Exploration, home</span>
      <span className="wordmark">
        <Letters word="LOYALIST" />
        <Letters word="EXPLORATION" />
      </span>
    </Link>
  );
}
