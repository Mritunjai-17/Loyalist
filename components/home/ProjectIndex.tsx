"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { projects } from "@/content/projects";
import { formatNumber } from "@/lib/format";
import type { Project } from "@/types";
import { cn } from "@/lib/cn";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/shared/Reveal";

type ProjectVisual = {
  image: string;
  alt: string;
  subtitle: string;
  pin: { left: string; top: string };
};

const defaultVisual: ProjectVisual = {
  image: "/images/projects/thumb-tully.jpg",
  alt: "Tully gold exploration drill rig at sunset",
  subtitle: "GOLD PROJECT",
  pin: { left: "70.2%", top: "32.8%" },
};

const projectVisuals: Record<string, ProjectVisual> = {
  tully: {
    image: "/images/projects/thumb-tully.jpg",
    alt: "Tully gold exploration drill rig at sunset",
    subtitle: "GOLD PROJECT",
    pin: { left: "70.2%", top: "32.8%" },
  },
  loveland: {
    image: "/images/projects/thumb-loveland.jpg",
    alt: "Loveland diamond drill core trays",
    subtitle: "NICKEL · COPPER · GOLD",
    pin: { left: "18.8%", top: "25.3%" },
  },
  "gold-rush": {
    image: "/images/projects/thumb-goldrush.jpg",
    alt: "Gold Rush quartz vein mineralized rock outcrop",
    subtitle: "GOLD · SILVER",
    pin: { left: "12.4%", top: "59.5%" },
  },
  desantis: {
    image: "/images/projects/thumb-desantis.jpg",
    alt: "DeSantis property landscape over Timmins greenstone belt",
    subtitle: "GOLD PROJECT",
    pin: { left: "55.9%", top: "69.3%" },
  },
};

/** Interactive Satellite map on the left, modern horizontal cards on the right; each highlights the other. */
export function ProjectIndex({ figureNumber: _figureNumber }: { figureNumber?: string } = {}) {
  const [active, setActive] = useState<Project["slug"] | null>(null);

  return (
    <div className="grid grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-12 items-start relative z-10">
      {/* Left Column: Satellite Map Card */}
      <div className="min-w-0 lg:col-span-5 flex">
        <Reveal className="w-full flex">
          <figure
            className="projects-map-card relative w-full max-w-[460px] lg:max-w-none"
          >
            <div className="relative w-full aspect-[1280/1408]">
              <Image
                src="/images/projects/satellite-map.png"
                alt="Satellite map of the Timmins Mining Camp showing Loyalist Exploration project locations"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                quality={92}
                className="object-cover"
                priority
              />

              {/* Interactive Pin Highlight Rings on Satellite Map */}
              {projects.map((p) => {
                const visual = projectVisuals[p.slug] ?? defaultVisual;
                const isActive = active === p.slug;

                return (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer p-4 z-10 flex items-center justify-center"
                    style={{ left: visual.pin.left, top: visual.pin.top }}
                    onMouseEnter={() => setActive(p.slug)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(p.slug)}
                    onBlur={() => setActive(null)}
                    aria-label={`View ${p.name} project`}
                  >
                    {/* Central Highlight Ring */}
                    <span
                      className={cn(
                        "block h-5 w-5 rounded-full transition-opacity duration-200",
                        isActive
                          ? "ring-2 ring-gold bg-gold/30"
                          : "opacity-0 group-hover:opacity-100 ring-2 ring-gold/80 bg-gold/25"
                      )}
                    />
                  </Link>
                );
              })}
            </div>
          </figure>
        </Reveal>
      </div>

      {/* Right Column: 4 Project Cards Stack */}
      <div className="min-w-0 lg:col-span-7 flex flex-col border-t border-stone-beige">
        {projects.map((p, idx) => {
          const visual = projectVisuals[p.slug] ?? defaultVisual;
          const isActive = active === p.slug;

          return (
            <Reveal key={p.slug} delay={idx * 0.08}>
              <Link
                href={`/projects/${p.slug}`}
                className={cn(
                  "group projects-item-card w-full gap-4 py-5 flex flex-col sm:flex-row sm:items-center sm:gap-6",
                  isActive && "is-active"
                )}
                onMouseEnter={() => setActive(p.slug)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(p.slug)}
                onBlur={() => setActive(null)}
              >
                <div className="projects-thumb-box media-zoom">
                  <Image
                    src={visual.image}
                    alt={visual.alt}
                    fill
                    sizes="(min-width: 640px) 200px, 100vw"
                    quality={90}
                    className="object-cover"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
                    <span className="tabular-nums">{p.number}</span>
                    <span aria-hidden="true"> · </span>
                    {visual.subtitle}
                  </div>
                  <Heading level={3} className="mt-1.5">
                    {p.name}
                  </Heading>
                  <p className="mt-2 text-sm text-ink-soft">
                    {p.location} · {formatNumber(p.areaHa)} ha
                  </p>
                  <p className="mt-1 text-sm text-fg">
                    <span className="projects-stage-pill">Stage</span> {p.stage}
                  </p>
                </div>

                <span className="hidden shrink-0 items-center gap-2 self-center text-sm font-medium text-fg sm:inline-flex">
                  <span className="underline decoration-gold/40 decoration-1 underline-offset-[6px] transition-colors group-hover:decoration-gold">
                    View project
                  </span>
                  <ArrowRight className="h-4 w-4 text-gold transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
