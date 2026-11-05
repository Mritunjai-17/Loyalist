"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers, MapPin } from "lucide-react";
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
  pin: { left: "79%", top: "28.5%" },
};

const projectVisuals: Record<string, ProjectVisual> = {
  tully: {
    image: "/images/projects/thumb-tully.jpg",
    alt: "Tully gold exploration drill rig at sunset",
    subtitle: "GOLD PROJECT",
    pin: { left: "79%", top: "28.5%" },
  },
  loveland: {
    image: "/images/projects/thumb-loveland.jpg",
    alt: "Loveland diamond drill core trays",
    subtitle: "NICKEL · COPPER · GOLD",
    pin: { left: "28.3%", top: "20.3%" },
  },
  "gold-rush": {
    image: "/images/projects/thumb-goldrush.jpg",
    alt: "Gold Rush quartz vein mineralized rock outcrop",
    subtitle: "GOLD · SILVER",
    pin: { left: "23%", top: "57.2%" },
  },
  desantis: {
    image: "/images/projects/thumb-desantis.jpg",
    alt: "DeSantis property landscape over Timmins greenstone belt",
    subtitle: "GOLD PROJECT",
    pin: { left: "55.5%", top: "69.2%" },
  },
};

/** Interactive Satellite map on the left, modern horizontal cards on the right; each highlights the other. */
export function ProjectIndex({ figureNumber: _figureNumber }: { figureNumber?: string } = {}) {
  const [active, setActive] = useState<Project["slug"] | null>(null);

  return (
    <div className="grid gap-6 lg:gap-8 lg:grid-cols-12 items-stretch relative z-10">
      {/* Left Column: Satellite Map Card */}
      <div className="lg:col-span-5 flex">
        <Reveal className="w-full flex">
          <figure
            className="projects-map-card relative w-full h-full min-h-[420px] lg:min-h-0"
            style={{ borderRadius: "20px", overflow: "hidden" }}
          >
            <div className="relative w-full h-full min-h-[420px] aspect-[1/1.08] lg:aspect-auto">
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
                    {/* Geological Sonar Ping Ring */}
                    <span
                      className={cn(
                        "pointer-events-none absolute h-7 w-7 rounded-full border border-gold transition-opacity duration-300",
                        isActive ? "animate-ping opacity-80" : "opacity-0 group-hover:opacity-40"
                      )}
                      aria-hidden="true"
                    />
                    {/* Central Highlight Ring */}
                    <span
                      className={cn(
                        "block h-5 w-5 rounded-full transition-all duration-300",
                        isActive
                          ? "scale-125 ring-4 ring-gold bg-gold/50 shadow-[0_0_24px_rgba(201,164,92,1)]"
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
      <div className="min-w-0 lg:col-span-7 flex flex-col justify-between gap-3 sm:gap-3.5">
        {projects.map((p, idx) => {
          const visual = projectVisuals[p.slug] ?? defaultVisual;
          const isActive = active === p.slug;

          return (
            <Reveal key={p.slug} delay={idx * 0.08}>
              <Link
                href={`/projects/${p.slug}`}
                className={cn(
                  "group projects-item-card w-full p-2.5 sm:p-3 flex flex-col sm:flex-row items-center",
                  isActive && "is-active"
                )}
                style={{ borderRadius: "20px" }}
                onMouseEnter={() => setActive(p.slug)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(p.slug)}
                onBlur={() => setActive(null)}
              >
                {/* Inset Thumbnail Photo */}
                <div
                  className="projects-thumb-box relative shrink-0"
                  style={{ borderRadius: "14px", overflow: "hidden" }}
                >
                  <Image
                    src={visual.image}
                    alt={visual.alt}
                    fill
                    sizes="(min-width: 640px) 280px, 100vw"
                    quality={90}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Card Content Columns */}
                <div className="flex-1 px-3 sm:px-4 py-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 min-w-0 w-full">
                  {/* Col 1: Numeral + Title + Subtitle */}
                  <div className="w-full sm:w-[140px] lg:w-[150px] xl:w-[160px] shrink-0 min-w-0">
                    <Heading level={3}>
                      <span className="flex items-center gap-2">
                        <span className="font-semibold text-gold text-base">{p.number}</span>
                        <span className="text-stone/30 select-none" aria-hidden="true">
                          |
                        </span>
                        <span className="text-ink font-bold text-base whitespace-nowrap">{p.name}</span>
                      </span>
                    </Heading>
                    <div className="text-[10px] xl:text-[11px] font-semibold text-gold tracking-widest uppercase mt-0.5">
                      {visual.subtitle}
                    </div>
                  </div>

                  {/* Col 2: Location & Area with Icons */}
                  <div className="w-full sm:w-[170px] lg:w-[185px] xl:w-[195px] shrink-0 min-w-0 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-ink leading-tight">
                      <MapPin className="w-3.5 h-3.5 text-gold shrink-0" aria-hidden="true" />
                      <span className="text-ink font-medium leading-tight">{p.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-ink leading-tight">
                      <Layers className="w-3.5 h-3.5 text-gold shrink-0" aria-hidden="true" />
                      <span className="font-bold text-ink">{formatNumber(p.areaHa)} ha</span>
                    </div>
                  </div>

                  {/* Col 3: Stage Pill Badge + Stage Text */}
                  <div className="flex-1 min-w-[140px]">
                    <span className="projects-stage-pill" style={{ borderRadius: "6px" }}>
                      Stage
                    </span>
                    <div className="text-xs font-bold text-ink leading-snug mt-1">
                      {p.stage}
                    </div>
                  </div>

                  {/* Col 4: Arrow Icon */}
                  <div className="hidden sm:flex shrink-0 items-center pr-1 sm:pr-2">
                    <ArrowRight
                      className="w-4 h-4 text-gold transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
