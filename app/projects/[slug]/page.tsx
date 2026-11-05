import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Table } from "@/components/ui/Table";
import { TextLink } from "@/components/ui/TextLink";
import { Badge } from "@/components/ui/Badge";
import { resourceCaption, resourceColumns } from "@/components/home/TullyResource";
import { ProjectDocuments } from "@/components/projects/ProjectDocuments";
import { ProjectFacts } from "@/components/projects/ProjectFacts";
import { ProjectHighlights } from "@/components/projects/ProjectHighlights";
import { ProjectLocator } from "@/components/projects/ProjectLocator";
import { CautionNote } from "@/components/shared/CautionNote";
import { Term } from "@/components/shared/Glossary";
import { Reveal } from "@/components/shared/Reveal";
import { locationMap } from "@/content/pages";
import { getProject, projects } from "@/content/projects";
import { tullyResource as mre } from "@/content/resource-tully";
import { formatNumber } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import type { Project } from "@/types";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.name} project`,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

function nextProject(project: Project): Project {
  const index = projects.findIndex((p) => p.slug === project.slug);
  return projects[(index + 1) % projects.length]!;
}

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

export default async function ProjectPage({ params }: Params) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const next = nextProject(project);
  const n = (i: number) => String(i).padStart(2, "0");
  let section = 0;

  return (
    <main id="main">
      {/* Editorial Project Header */}
      <header data-tone="paper" className="relative overflow-hidden bg-surface pt-[calc(var(--header-h)+28px)] pb-12 sm:pb-16">
        <TopographicPatternTopRight />
        <div className="container-site relative z-10">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/projects">Projects</Link>
              </li>
              <li>
                <span aria-current="page">{project.name}</span>
              </li>
            </ol>
          </nav>

          <Reveal>
            <div className="mt-8 sm:mt-10 max-w-4xl">
              <div className="flex items-center gap-3 text-xs sm:text-[13px] font-semibold tracking-[0.18em] text-ink uppercase">
                <span className="w-8 h-[2px] bg-gold" aria-hidden="true" />
                <span>
                  PROJECT {project.number} · {project.location}
                </span>
              </div>

              <Heading
                level={1}
                className="mt-4 sm:mt-5 text-ink"
              >
                {project.name}{" "}
                <span className="block mt-1">
                  Exploration <em className="heading-accent">Project.</em>
                </span>
              </Heading>

              <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl">
                {project.summary}
              </p>

              {/* Key Technical Metadata Strip */}
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs sm:text-sm text-ink-soft border-t border-black/10 pt-5">
                <div>
                  <span className="text-stone uppercase text-[11px] font-semibold tracking-wider block">Stage</span>
                  <span className="font-semibold text-ink mt-0.5 block">{project.stage}</span>
                </div>
                <div className="h-7 w-[1px] bg-black/10 hidden sm:block" aria-hidden="true" />
                <div>
                  <span className="text-stone uppercase text-[11px] font-semibold tracking-wider block">Land Position</span>
                  <span className="font-semibold text-ink mt-0.5 block">{formatNumber(project.areaHa)} ha ({project.claims})</span>
                </div>
                <div className="h-7 w-[1px] bg-black/10 hidden sm:block" aria-hidden="true" />
                <div>
                  <span className="text-stone uppercase text-[11px] font-semibold tracking-wider block">Location</span>
                  <span className="font-semibold text-ink mt-0.5 block">{project.location}</span>
                </div>
                <div className="h-7 w-[1px] bg-black/10 hidden sm:block" aria-hidden="true" />
                <div>
                  <span className="text-stone uppercase text-[11px] font-semibold tracking-wider block">Ownership</span>
                  <span className="font-semibold text-ink mt-0.5 block">{project.ownership}</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      {/* 01 Overview, Status & Geology (Architectural Ruled Layout - No Chunky AI Boxes) */}
      <Section tone="carbon" labelledBy="overview-title">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left Column: Natural Sticky Project Facts (No floating border box) */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)]">
              <ProjectFacts project={project} />
            </div>
          </div>

          {/* Right Column: Editorial Text & Ruled Highlights */}
          <div className="min-w-0 lg:col-span-8 lg:col-start-5 xl:col-span-8 xl:col-start-5">
            <Reveal>
              <SectionHeader
                number={n(++section)}
                label="Overview"
                id="overview-title"
                title={project.tagline}
              />
              <div className="max-w-prose space-y-5 text-fg-muted leading-relaxed">
                {project.overview.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>

              {/* Natural Ruled Status List */}
              <div className="mt-12 max-w-prose">
                <div className="text-xs font-semibold text-gold tracking-wider uppercase mb-2">
                  Current Program Status
                </div>
                <ul className="ruled-list mt-4">
                  {project.status.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Geology Section */}
            <Reveal className="sub-section">
              <SectionHeader
                number={n(++section)}
                label="Geology"
                id="geology-title"
                title="Geology and setting."
              />
              <div className="max-w-prose space-y-5 text-fg-muted leading-relaxed">
                {project.geology.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </Reveal>

            {/* Published Highlights: Pure Editorial Ruled List (No Chunky Box Wrapper) */}
            <Reveal className="sub-section">
              <SectionHeader
                number={n(++section)}
                label="Highlights"
                id="highlights-title"
                title="Published historical results."
              />
              <ProjectHighlights project={project} />
              <p className="text-small mt-6 text-stone">
                Grades are given in <Term term="gpt" /> (grams per tonne).
              </p>
              {project.historicalNote ? (
                <p className="text-small mt-4 max-w-prose text-stone/80 italic">{project.historicalNote}</p>
              ) : null}
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 02 Mineral Resource Estimate (Tully specific) */}
      {project.hasResource ? (
        <Section tone="paper" id="resource" labelledBy="resource-title">
          <Reveal>
            <SectionHeader
              number={n(++section)}
              label="Resource"
              id="resource-title"
              title="2026 Mineral Resource Estimate."
              lead={`An ${mre.standard} Mineral Resource Estimate by ${mre.author}, effective June 15, 2026, at a cut-off of ${mre.cutOff}.`}
            />
            <div className="grid gap-12 lg:grid-cols-12 items-start">
              <div className="min-w-0 lg:col-span-7">
                <Table
                  label="Tully 2026 mineral resource estimate"
                  columns={resourceColumns}
                  rows={mre.rows}
                  rowKey={(r) => r.category}
                  caption={resourceCaption()}
                />
                <ul className="ruled-list mt-10">
                  {mre.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
                <p className="mt-8 max-w-prose text-sm text-ink-soft leading-relaxed">
                  Resources are reported in the <Term term="indicated" /> and <Term term="inferred" /> categories. The{" "}
                  <Term term="mre">MRE</Term> was prepared under <Term term="ni43101" />. A{" "}
                  <Term term="pea">Preliminary Economic Assessment</Term> is underway, with a December 2026 target.
                </p>
                <div className="mt-10">
                  <Button href={mre.newsRelease.href} external icon={<Download className="h-4 w-4" aria-hidden="true" />}>
                    Read the news release
                    <span className="sr-only"> (PDF, opens in a new tab)</span>
                  </Button>
                </div>
              </div>
              <div className="lg:col-span-4 lg:col-start-9">
                <CautionNote />
              </div>
            </div>
          </Reveal>
        </Section>
      ) : null}

      {/* 03 Maps & Figures */}
      <Section tone="carbon" labelledBy="figures-title">
        <Reveal>
          <SectionHeader
            number={n(++section)}
            label="Maps"
            id="figures-title"
            title="Maps and figures."
            lead={`${project.name} sits ${project.location}.`}
          />
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12 items-start">
            <div className="max-w-xl lg:col-span-5 lg:max-w-none">
              <ProjectLocator slug={project.slug} figureNumber="1" />
            </div>
            <figure className="min-w-0 lg:col-span-7">
              <Image
                src={locationMap.src}
                width={locationMap.width}
                height={locationMap.height}
                alt={locationMap.alt}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="h-auto w-full rounded-panel"
              />
              <figcaption className="text-small mt-4 flex flex-wrap justify-between gap-x-6 gap-y-1 text-stone">
                <span>
                  <span className="text-fg font-medium">Figure 2.</span> Location map, Timmins Mining Camp.
                </span>
                <span>Source: {locationMap.credit}</span>
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </Section>

      {/* 04 Documents & Qualified Person */}
      <Section tone="paper" labelledBy="documents-title">
        <Reveal>
          <SectionHeader
            number={n(++section)}
            label="Documents"
            id="documents-title"
            title="Reports and releases."
            lead="Official technical reports, drill assays, and continuous disclosure releases."
          />
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12 items-start">
            <div className="min-w-0 lg:col-span-7">
              <ProjectDocuments project={project} />
            </div>
            <div className="lg:col-span-4 lg:col-start-9 border-l-2 border-gold/40 pl-5">
              <Heading level={3}>Qualified person</Heading>
              <p className="text-small mt-3 text-ink-soft leading-relaxed">{project.qualifiedPerson}</p>
            </div>
          </div>
          <div className="next-project">
            <span className="text-small">Next project</span>
            <TextLink href={`/projects/${next.slug}`}>{`${next.name}, ${next.location}`}</TextLink>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
