"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * A data bar whose width is set from the data and rendered on the server; on
 * scroll it grows from the left. data-reveal ties it to the global noscript and
 * reduced-motion rules, which force the final state.
 */
export function GrowBar({ percent, className, delay = 0 }: { percent: number; className?: string; delay?: number }) {
  return (
    <motion.span
      data-reveal
      aria-hidden="true"
      className={cn("block", className)}
      style={{ width: `${percent}%`, transformOrigin: "left center" }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
