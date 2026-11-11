"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * A vertical hairline that fills in brass as its container scrolls through the
 * viewport. The faint base line is always present, so nothing is lost without
 * JavaScript or with reduced motion (where the brass line is drawn in full).
 */
export function ProgressLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div ref={ref} aria-hidden="true" className={cn("pointer-events-none", className)}>
      <div className="absolute inset-0 bg-ed-deep/15" />
      <motion.div
        className="absolute inset-0 origin-top bg-ed-rule"
        style={{ scaleY: reduce ? 1 : scaleY }}
      />
    </div>
  );
}
