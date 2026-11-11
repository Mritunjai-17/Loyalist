import { cn } from "@/lib/cn";

/** Small uppercase section label: index, brass hairline, text. */
export function EditorialLabel({ index, children, className }: { index?: string; children: string; className?: string }) {
  return (
    <p className={cn("label-ed", className)}>
      {index ? <span className="label-ed-index">{index}</span> : null}
      <span className="label-ed-rule" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
