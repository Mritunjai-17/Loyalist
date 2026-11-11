"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { MaskReveal } from "@/components/shared/MaskReveal";
import { Reveal } from "@/components/shared/Reveal";
import { ProjectMap } from "@/components/projects/ProjectMap";
import { projects } from "@/content/projects";
import { tullyResource } from "@/content/resource-tully";
import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";
import { SectionIntro } from "./SectionIntro";
import type { Project } from "@/types";

// Existing project imagery for the three exploration properties.
const thumbs: Partial<Record<Project["slug"], { src: string; alt: string }>> = {
  loveland: { src: "/images/projects/thumb-loveland.jpg", alt: "Diamond drill core laid out in core trays" },
  "gold-rush": { src: "/images/projects/thumb-goldrush.jpg", alt: "Quartz vein in a mineralized rock outcrop" },
  desantis: { src: "/images/projects/thumb-desantis.jpg", alt: "Boreal landscape over the Timmins greenstone belt" },
};

/**
 * Tully as a full-width photographic feature; the other three projects as ruled
 * editorial rows beside the schematic district map. Hovering or focusing a row
 * highlights its pin and spoke, and the reverse.
 */
export function ProjectPortfolio() {
  const [active, setActive] = useState<Project["slug"] | null>(null);
  const tully = projects.find((p) => p.slug === "tully");
  const others = projects.filter((p) => p.slug !== "tully");
  const indicated = tullyResource.rows.find((r) => r.category === "Indicated");
  if (!tully) return null;

  const bind = (slug: Project["slug"]) => ({
    onMouseEnter: () => setActive(slug),
    onMouseLeave: () => setActive(null),
    onFocus: () => setActive(slug),
    onBlur: () => setActive(null),
  });

  const tullyFacts = [
    { label: "Location", value: tully.location },
    { label: "Mineral", value: tully.metalsLabel },
    { label: "Status", value: tully.stage },
    ...(indicated ? [{ label: "Indicated", value: `${formatNumber(indicated.containedOz)} oz Au` }] : []),
  ];

  return (
    <section id="projects" aria-labelledby="projects-title" data-tone="stone" className="section-pad relative bg-surface">
      <div className="container-site">
        <SectionIntro
          index="04"
          label="Project portfolio"
          id="projects-title"
          title="Four projects"
          accent="in the Timmins camp."
          lead="A portfolio of four projects in the Timmins Mining District, providing exposure to gold and strategic metals."
          action={
            <Link href="/projects" className="link-ed">
              <span>Compare all four projects</span>
              <ArrowRight aria-hidden />
            </Link>
          }
        />

        {/* Featured: Tully */}
        <article className="portfolio-feature group relative mt-block" {...bind("tully")}>
          <MaskReveal className="frame-ed relative aspect-square w-full sm:aspect-[16/10] lg:aspect-[21/10]">
            <Image
              src="/images/home/project-tully-drill-pad-aerial.jpg"
              alt="Aerial view of a diamond drill pad in boreal forest above a lake"
              fill
              sizes="(min-width: 1440px) 1300px, 100vw"
              className="object-cover"
            />
          </MaskReveal>
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgb(var(--ed-deep-rgb)/0.92)_0%,rgb(var(--ed-deep-rgb)/0.55)_38%,rgb(var(--ed-deep-rgb)/0)_70%)]"
            aria-hidden="true"
          />
          <div data-tone="deep" className="absolute inset-x-0 bottom-0 p-card lg:p-12">
            <p className="label-ed">
              <span className="label-ed-index">{tully.number}</span>
              <span className="label-ed-rule" aria-hidden="true" />
              <span>Flagship gold project</span>
            </p>
            <div className="mt-5 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
              <div>
                <Heading level={3}>
                  <Link href={`/projects/${tully.slug}`} className="after:absolute after:inset-0">
                    {tully.name}
                  </Link>
                </Heading>
                <p className="mt-3 max-w-[46ch] text-[1rem] text-ed-ivory/85">{tully.tagline}.</p>
              </div>
              <span className="link-ed text-ed-ivory" aria-hidden="true">
                <span>Explore Tully</span>
                <ArrowRight />
              </span>
            </div>
            <dl className="mt-8 hidden grid-cols-4 gap-8 border-t border-ed-ivory/20 pt-6 md:grid">
              {tullyFacts.map((f) => (
                <div key={f.label}>
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-ed-label-dark">{f.label}</dt>
                  <dd className="mt-2 text-[0.9375rem] text-ed-ivory">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </article>
        <dl className="mt-6 grid grid-cols-2 gap-6 md:hidden">
          {tullyFacts.map((f) => (
            <div key={f.label}>
              <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-accent">{f.label}</dt>
              <dd className="mt-1 text-[0.9375rem] text-fg">{f.value}</dd>
            </div>
          ))}
        </dl>
        <p className="caption-ed mt-3">Tully: illustrative aerial image of an exploration drill pad.</p>

        {/* Map + other projects */}
        <div className="mt-block grid gap-y-block lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-stretch lg:gap-x-col">
          <Reveal className="lg:h-full">
            <div data-tone="deep" className="home-map flex max-w-[560px] flex-col bg-surface p-card lg:h-full lg:max-w-none">
              <p className="label-ed">
                <span className="label-ed-rule" aria-hidden="true" />
                <span>The district</span>
              </p>
              <div className="mt-6 flex flex-1 flex-col justify-center">
                <ProjectMap active={active} onActiveChange={setActive} figureNumber="1" />
              </div>
            </div>
          </Reveal>

          <ol className="border-t border-rule" aria-label="Exploration projects">
            {others.map((p, idx) => {
              const thumb = thumbs[p.slug];
              const isActive = active === p.slug;
              return (
                <li key={p.slug} className="border-b border-rule">
                  <Reveal delay={idx * 0.08}>
                    <Link
                      href={`/projects/${p.slug}`}
                      className={cn(
                        "portfolio-row group grid items-center gap-5 py-7 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-x-grid",
                        isActive && "is-active",
                      )}
                      {...bind(p.slug)}
                    >
                      {thumb ? (
                        <div className="frame-ed relative aspect-[3/2]">
                          <Image src={thumb.src} alt={thumb.alt} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 100vw" className="object-cover" />
                        </div>
                      ) : null}
                      <div className="flex min-w-0 flex-col">
                        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-accent">
                          <span className="tabular-nums">{p.number}</span>
                          <span aria-hidden="true"> · </span>
                          {p.metalsLabel}
                        </p>
                        <Heading level={3} className="mt-3">
                          <span
                            className={cn(
                              "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]",
                              isActive && "bg-[length:100%_1px]",
                            )}
                          >
                            {p.name}
                          </span>
                        </Heading>
                        <dl className="mt-4 grid gap-1 text-[0.875rem]">
                          <div className="flex gap-2">
                            <dt className="sr-only">Location</dt>
                            <dd className="text-fg">
                              {p.location} · {formatNumber(p.areaHa)} ha
                            </dd>
                          </div>
                          <div className="flex gap-2">
                            <dt className="text-fg-muted">Status</dt>
                            <dd className="text-fg">{p.stage}</dd>
                          </div>
                        </dl>
                        <span className="link-ed mt-auto pt-4" aria-hidden="true">
                          <span>View project</span>
                          <ArrowRight />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
