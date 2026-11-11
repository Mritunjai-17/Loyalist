"use client";

import { getImageProps } from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { company, homeHero as hero } from "@/content/company";

const alt = "Aerial view over boreal forest, lakes and exposed bedrock in Northern Ontario";

// Art-directed sources: a 16:9 frame for tablet and desktop, a 4:5 crop for phones.
const common = { alt, sizes: "100vw", quality: 80, priority: true } as const;
const {
  props: { srcSet: desktopSrcSet },
} = getImageProps({ ...common, src: "/images/home/hero-boreal-aerial.jpg", width: 1920, height: 1080 });
const {
  props: { srcSet: mobileSrcSet, ...imgProps },
} = getImageProps({ ...common, src: "/images/home/hero-boreal-aerial-mobile.jpg", width: 864, height: 1080 });

/**
 * Full-bleed photograph, headline set low and left on an asymmetric grid, a single
 * call to action on the right, and a ruled base line with the scroll cue. Text
 * reveals are CSS keyframes so the headline paints without waiting for hydration.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, reduce ? 0 : 140]);

  return (
    <section className="hero-ed" data-tone="deep" aria-labelledby="hero-title">
      <motion.div className="hero-ed-media" style={{ y }} aria-hidden="true">
        <picture>
          <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
          <source media="(max-width: 767.98px)" srcSet={mobileSrcSet} />
          {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
          <img {...imgProps} />
        </picture>
      </motion.div>
      <div className="hero-ed-shade" aria-hidden="true" />

      <div className="container-site flex flex-1 flex-col pt-[calc(var(--header-h)+clamp(28px,6vh,72px))]">
        {/* Location label */}
        <div className="hero-ed-fade flex items-center gap-4 text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-ed-ivory/85">
          <span className="h-px w-10 bg-ed-rule" aria-hidden="true" />
          <span>Timmins, Ontario, Canada</span>
          <span className="hidden text-ed-ivory/55 sm:inline" aria-hidden="true">
            /
          </span>
          <span className="hidden tracking-[0.16em] text-ed-ivory/60 sm:inline">{company.coordinates.label}</span>
        </div>

        <div className="mt-auto grid gap-y-copy pb-10 pt-16 md:pb-14 lg:grid-cols-12 lg:items-end lg:gap-x-grid">
          <div className="lg:col-span-8">
            <Heading level={1} variant="display" id="hero-title">
              <span className="hero-ed-line">
                <span>{hero.title}</span>
              </span>
              <span className="hero-ed-line">
                <em className="heading-accent">{hero.accent}</em>
              </span>
            </Heading>
          </div>

          <div className="hero-ed-fade-late lg:col-span-4 lg:col-start-9 lg:pb-4 lg:pl-10 xl:pl-14">
            <span className="rule-brass" aria-hidden="true" />
            <p className="mt-6 max-w-[36ch] text-[1.0625rem] leading-[1.7] text-ed-ivory/88">{hero.lead}</p>
            <div className="mt-8">
              <Button size="lg" href={hero.primaryCta.href} icon={<ArrowRight aria-hidden />}>
                {hero.primaryCta.label}
              </Button>
            </div>
          </div>
        </div>

        {/* Base line: scroll cue and listing */}
        <div className="hero-ed-fade-late flex items-center justify-between gap-6 border-t border-ed-ivory/15 py-5 md:py-6">
          <a href="#about" className="scroll-cue">
            <span className="scroll-cue-track" aria-hidden="true" />
            <span>Scroll to discover</span>
          </a>
          <a
            href={company.quoteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-ed-ivory/80 transition-colors hover:text-ed-accent-light"
          >
            {company.exchange}: {company.ticker}
            <span className="sr-only"> (share price on TradingView, opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
