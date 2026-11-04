"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";
import { Heading } from "./Heading";

type SectionHeaderProps = {
  number: string;
  label: string;
  title: ReactNode;
  /** Final phrase of the title, set in italic gold. */
  accent?: string;
  /** Put the body and the accent phrase on separate lines. */
  stacked?: boolean;
  lead?: string;
  /** Text link or button at the right end of the heading row (desktop). */
  action?: ReactNode;
  /** Id for the h2, used by the section's aria-labelledby. */
  id: string;
  className?: string;
};

const headerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.02,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Eyebrow, 20px, h2, 20px, optional lead, 56px, content. Animated on scroll. */
export function SectionHeader({
  number,
  label,
  title,
  accent,
  stacked,
  lead,
  action,
  id,
  className,
}: SectionHeaderProps) {
  return (
    <>
      <noscript>
        <style>{"[data-section-header]{opacity:1!important;transform:none!important}"}</style>
      </noscript>
      <motion.header
        data-section-header
        className={cn("mb-14", className)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={headerVariants}
      >
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-12">
          <div>
            <motion.div variants={itemVariants}>
              <Eyebrow number={number}>{label}</Eyebrow>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Heading level={2} id={id} accent={accent} stacked={stacked} className="mt-5">
                {title}
              </Heading>
            </motion.div>
          </div>
          {action ? (
            <motion.div variants={itemVariants} className="hidden shrink-0 lg:block">
              {action}
            </motion.div>
          ) : null}
        </div>
        {lead ? (
          <motion.div variants={itemVariants}>
            <p className="text-lead mt-5">{lead}</p>
          </motion.div>
        ) : null}
        {action ? (
          <motion.div variants={itemVariants} className="mt-5 lg:hidden">
            {action}
          </motion.div>
        ) : null}
      </motion.header>
    </>
  );
}
