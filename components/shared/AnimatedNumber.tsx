import { StatNumber } from "./StatNumber";

type AnimatedNumberProps = {
  value: number;
  duration?: number;
  className?: string;
};

/**
 * Counts up to `value` once when scrolled into view. The final value is rendered
 * on the server and is never replaced by zero while visible; see StatNumber.
 */
export function AnimatedNumber({ value, duration = 1.6, className }: AnimatedNumberProps) {
  return <StatNumber value={value} duration={duration} className={className} />;
}
