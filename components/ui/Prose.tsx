import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("prose-site", className)}>{children}</div>;
}
