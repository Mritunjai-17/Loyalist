"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

const grouped = (decimals: number) =>
  new Intl.NumberFormat("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

type StatNumberProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Seconds. */
  duration?: number;
  className?: string;
};

/**
 * A figure that counts up once when it scrolls into view.
 *
 * The final value is what the server renders and what stays on screen in every
 * case where animation cannot run cleanly: JavaScript disabled, reduced motion,
 * printing, or a figure that is already on screen at load (it is never reset to
 * zero in view). Only a figure that starts below the fold is primed to zero, and
 * only while it is off screen. An invisible copy of the final value reserves the
 * width, so the count never shifts the layout. Screen readers get the final value.
 */
export function StatNumber({ value, decimals = 0, prefix = "", suffix = "", duration = 1.6, className }: StatNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = grouped(decimals);
  const finalText = `${prefix}${format.format(value)}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) return;

    const fmt = grouped(decimals);
    const render = (n: number) => {
      el.textContent = `${prefix}${fmt.format(n)}${suffix}`;
    };
    const restore = () => {
      el.textContent = finalText;
    };

    let frame = 0;
    render(0);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min((now - start) / (duration * 1000), 1);
          const eased = 1 - (1 - t) ** 3;
          if (t < 1) {
            render(value * eased);
            frame = requestAnimationFrame(step);
          } else {
            restore();
          }
        };
        frame = requestAnimationFrame(step);
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(el);
    window.addEventListener("beforeprint", restore);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("beforeprint", restore);
      restore();
    };
  }, [value, decimals, prefix, suffix, duration, finalText]);

  return (
    <span className={cn("stat-stack tabular-nums", className)}>
      <span data-ghost aria-hidden="true">
        {finalText}
      </span>
      <span ref={ref} aria-hidden="true">
        {finalText}
      </span>
      <span className="sr-only">{finalText}</span>
    </span>
  );
}
