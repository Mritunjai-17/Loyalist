import { StatNumber } from "@/components/shared/StatNumber";

type CounterProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/** Counts up once in view; renders the correct final value without JavaScript. See StatNumber. */
export function Counter({ value, decimals = 0, prefix = "", suffix = "", duration = 1.2, className }: CounterProps) {
  return (
    <StatNumber value={value} decimals={decimals} prefix={prefix} suffix={suffix} duration={duration} className={className} />
  );
}
