"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type MaskRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Edge the mask opens from. */
  from?: "bottom" | "left" | "right";
};

const closed = {
  bottom: "inset(18% 0% 0% 0%)",
  left: "inset(0% 22% 0% 0%)",
  right: "inset(0% 0% 0% 22%)",
} as const;

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Image reveal: the frame opens from one edge while the photograph settles from a
 * slight zoom. Without JavaScript (noscript rule) or with reduced motion the image
 * is simply shown.
 */
export function MaskReveal({ children, className, delay = 0, from = "bottom" }: MaskRevealProps) {
  // Reduced motion is handled in globals.css (!important beats the inline styles),
  // so server and client always render the same tree.
  return (
    <>
      <noscript>
        <style>{"[data-mask]{clip-path:none!important;opacity:1!important}[data-mask]>*{transform:none!important}"}</style>
      </noscript>
      <motion.div
        data-mask
        className={className}
        initial={{ clipPath: closed[from], opacity: 0.35 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
        viewport={{ once: true, amount: "some", margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.15, delay, ease }}
      >
        <motion.div
          className={cn("h-full w-full")}
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: "some", margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1.6, delay, ease }}
        >
          {children}
        </motion.div>
      </motion.div>
    </>
  );
}
