"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type AnimatedNumberProps = {
  value: number;
  duration?: number;
  formatFn?: (value: number) => string;
  className?: string;
};

/**
 * Smoothly animates a number from 0 to `value` once when scrolled into view.
 * Respects prefers-reduced-motion by rendering the final value immediately.
 */
export function AnimatedNumber({
  value,
  duration = 1.6,
  formatFn,
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Check for prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(value);
      return;
    }

    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out cubic
      const easeProgress = 1 - (1 - progress) ** 3;
      const current = Math.round(easeProgress * value);

      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, value, duration]);

  const formatted = formatFn ? formatFn(displayValue) : displayValue.toLocaleString();

  return (
    <span ref={ref} className={className} tabular-nums="true">
      {formatted}
    </span>
  );
}

