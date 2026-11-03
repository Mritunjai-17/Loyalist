"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Fades its children up 12px over 400ms, once, the first time they scroll into view.
 * globals.css cancels it under prefers-reduced-motion, and the <noscript> rule keeps
 * the content visible without JavaScript.
 */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <>
      <noscript>
        <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
      </noscript>
      <motion.div
        data-reveal
        className={className}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
