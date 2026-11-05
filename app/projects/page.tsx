import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectIndex } from "@/components/home/ProjectIndex";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Table, type Column } from "@/components/ui/Table";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/shared/Reveal";
import { locationMap, pages } from "@/content/pages";
import { portfolioAreaLabel, projects } from "@/content/projects";
import { formatNumber } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import type { Project } from "@/types";

const page = pages.projects;
export const metadata = pageMetadata(page);

function TopographicPatternTopRight() {
  return (
    <svg
      className="pointer-events-none absolute -top-12 -right-12 h-[450px] w-[500px] select-none opacity-[0.07]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      viewBox="0 0 500 450"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g className="text-gold">
        <path d="M 200 0 C 260 70, 340 120, 500 140" />
        <path d="M 140 0 C 210 95, 305 165, 500 195" />
        <path d="M 80 0 C 160 120, 270 210, 500 250" />
        <path d="M 20 0 C 110 145, 230 255, 500 305" />
        <path d="M 0 50 C 70 180, 190 300, 500 360" />
        <path d="M 0 130 C 50 220, 150 345, 500 415" />
        <ellipse cx="430" cy="70" rx="50" ry="25" />
      </g>
    </svg>
  );
}

const columns: Column<Project>[] = [
  {
    key: "project",
    header: "Project",
    render: (p) => (
      <Link href={`/projects/${p.slug}`} className="font-semibold text-fg hover:text-gold transition-colors inline-flex items-center gap-1.5">
        <span>{p.name}</span>
        <ArrowRight className="w-3.5 h-3.5 text-gold shrink-0" aria-hidden="true" />
      </Link>
    ),
  },
  { key: "location", header: "Location", render: (p) => p.location },
  { key: "area", header: "Area", numeric: true, render: (p) => `${formatNumber(p.areaHa)} ha` },
  {
    key: "metals",
    header: "Metals",
    render: (p) => (
      <span className="text-gold font-medium text-xs sm:text-sm">{p.metalsLabel}</span>
    ),
  },
  {
    key: "stage",
    header: "Stage",
    render: (p) => (
      <span className="inline-flex items-center rounded-md bg-white/10 px-2 py-0.5 text-xs font-semibold text-ivory">
        {p.stage}
      </span>
    ),
  },
  { key: "ownership", header: "Ownership", render: (p) => p.ownership },
];

export default function ProjectsPage() {
  return (
    <main id="main">
      {/* Editorial Page Header */}
      <header data-tone="paper" className="relative overflow-hidden bg-surface pt-[calc(var(--header-h)+28px)] pb-12 sm:pb-16">
        <TopographicPatternTopRight />
        <div className="container-site relative z-10">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <span aria-current="page">Projects</span>
              </li>
            </ol>
          </nav>

          <Reveal>
            <div className="mt-8 sm:mt-10 max-w-3xl">
              <div className="flex items-center gap-3 text-xs sm:text-[13px] font-semibold tracking-[0.18em] text-ink uppercase">
                <span className="w-8 h-[2px] bg-gold" aria-hidden="true" />
                <span>TIMMINS EXPLORATION PORTFOLIO</span>
              </div>

              <Heading
                level={1}
                className="mt-4 sm:mt-5 text-ink"
              >
                Four Key Projects in the{" "}
                <span className="block mt-1">
                  Prolific Timmins <em className="heading-accent">Camp.</em>
                </span>
              </Heading>

              <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed">
                A focused mineral portfolio spanning ~3,900 hectares of high-potential gold, nickel, copper, and silver
                claims in one of the world&apos;s greatest historical mineral endowments.
              </p>

              {/* Portfolio Quick Navigation */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border-t border-black/10 pt-6">
                {projects.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="group border-l-2 border-gold/40 pl-3.5 py-0.5 hover:border-gold transition-colors block"
                  >
                    <div className="text-[10px] font-bold text-gold uppercase tracking-wider">{p.number}</div>
                    <div className="text-sm font-semibold text-ink group-hover:text-gold transition-colors mt-0.5">
                      {p.name}
                    </div>
                    <div className="text-xs text-stone mt-0.5">{p.metalsLabel}</div>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      {/* 01 Locations (Interactive Map & Cards) */}
      <Section tone="paper" labelledBy="locations-title" className="pt-2 sm:pt-4">
        <Reveal>
          <SectionHeader
            number="01"
            label="Locations"
            id="locations-title"
            title="Where the four projects sit."
            lead="Explore projects on the interactive satellite map below. Select a project to review detailed technical data."
          />
          <ProjectIndex figureNumber="1" />
        </Reveal>
      </Section>

      {/* 02 Comparison Table */}
      <Section tone="carbon" labelledBy="comparison-title">
        <Reveal>
          <SectionHeader
            number="02"
            label="Comparison"
            id="comparison-title"
            title="The portfolio side by side."
            lead={`${portfolioAreaLabel} across four high-conviction exploration projects in the Timmins district.`}
          />
          <div className="overflow-x-auto">
            <Table
              label="Project comparison"
              columns={columns}
              rows={projects}
              rowKey={(p) => p.slug}
              caption="Areas and stages as published by the Company."
            />
          </div>
        </Reveal>
      </Section>

      {/* 03 Regional Map */}
      <Section tone="paper" labelledBy="map-title">
        <Reveal>
          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-12 items-start">
            <div className="lg:col-span-5">
              <SectionHeader
                number="03"
                label="Camp Map"
                id="map-title"
                title="Regional District Context."
                lead="Strategic land holdings positioned along major regional deformation corridors within the Abitibi Greenstone Belt."
                className="lg:mb-0"
              />
              <div className="mt-8 border-l-2 border-gold/40 pl-5 space-y-2.5 text-xs sm:text-[13px] text-ink-soft">
                <div className="font-semibold text-ink uppercase tracking-wider text-xs">Geological Infrastructure</div>
                <p>• Proximity to world-class past producers and operating milling infrastructure.</p>
                <p>• Highway and all-weather road access across all four project claim groups.</p>
                <p>• Year-round exploration drilling capability in the heart of Ontario mining country.</p>
              </div>
            </div>
            <figure className="min-w-0 lg:col-span-7">
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl bg-stone/5">
                <Image
                  src={locationMap.src}
                  width={locationMap.width}
                  height={locationMap.height}
                  alt={locationMap.alt}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="h-full w-full object-contain"
                />
              </div>
              <figcaption className="text-small mt-3 flex flex-wrap justify-between gap-x-6 gap-y-1 text-stone text-xs">
                <span>
                  <span className="font-semibold text-ink">Figure 2.</span> Location map, Timmins Mining Camp.
                </span>
                <span>Source: {locationMap.credit}</span>
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
