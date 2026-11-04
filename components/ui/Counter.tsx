"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { formatNumber } from "@/lib/format";

type CounterProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

export function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.2,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        setDisplay(latest);
      },
    });

    return () => controls.stop();
  }, [isInView, value, duration]);

  const finalFormatted =
    decimals > 0 ? value.toFixed(decimals) : formatNumber(Math.round(value));
  const animatedFormatted =
    decimals > 0 ? display.toFixed(decimals) : formatNumber(Math.round(display));

  return (
    <span
      ref={ref}
      className={className}
      suppressHydrationWarning
      aria-label={`${prefix}${finalFormatted}${suffix}`}
    >
      <span aria-hidden="true">
        {prefix}
        {isInView ? animatedFormatted : "0"}
        {suffix}
      </span>
    </span>
  );
}

