import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: string;
  /** Section number, e.g. "01". Rendered as part of the same text. */
  number?: string;
  className?: string;
};

export function Eyebrow({ children, number, className }: EyebrowProps) {
  const text = number ? `${number}  ${children}` : children;
  return (
    <p data-eyebrow className={cn("eyebrow", className)}>
      {text}
    </p>
  );
}
