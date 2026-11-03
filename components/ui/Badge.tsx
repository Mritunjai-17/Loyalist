import { cn } from "@/lib/cn";

export function Badge({ children, className }: { children: string; className?: string }) {
  return <span className={cn("badge", className)}>{children}</span>;
}
