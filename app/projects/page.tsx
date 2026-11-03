import Image from "next/image";
import Link from "next/link";
import { ProjectIndex } from "@/components/home/ProjectIndex";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Table, type Column } from "@/components/ui/Table";
import { PageHeader } from "@/components/shared/PageHeader";
import { Reveal } from "@/components/shared/Reveal";
import { locationMap, pages } from "@/content/pages";
import { portfolioAreaLabel, projects } from "@/content/projects";
import { formatNumber } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import type { Project } from "@/types";

const page = pages.projects;
export const metadata = pageMetadata(page);

const columns: Column<Project>[] = [
  {
    key: "project",
    header: "Project",
    render: (p) => (
      <Link href={`/projects/${p.slug}`} className="table-link">
        {p.name}
      </Link>
    ),
  },
  { key: "location", header: "Location", render: (p) => p.location },
  { key: "area", header: "Area", numeric: true, render: (p) => `${formatNumber(p.areaHa)} ha` },
  { key: "metals", header: "Metals", render: (p) => p.metalsLabel },
  { key: "stage", header: "Stage", render: (p) => p.stage },
  { key: "ownership", header: "Ownership", render: (p) => p.ownership },
];

export default function ProjectsPage() {
  return (
    <main id="main">
      <PageHeader intro={page} />

      <Section tone="black" labelledBy="locations-title">
        <Reveal>
          <SectionHeader
            number="01"
            label="Locations"
            id="locations-title"
            title="Where the four projects sit."
            lead="Hover or focus a row to find it on the map. Select a project to open its page."
          />
          <ProjectIndex figureNumber="1" />
        </Reveal>
      </Section>

      <Section tone="paper" labelledBy="comparison-title">
        <Reveal>
          <SectionHeader
            number="02"
            label="Comparison"
            id="comparison-title"
            title="The portfolio side by side."
            lead={`${portfolioAreaLabel} across four projects in the Timmins district.`}
          />
          <Table
            label="Project comparison"
            columns={columns}
            rows={projects}
            rowKey={(p) => p.slug}
            caption="Areas and stages as published by the Company."
          />
        </Reveal>
      </Section>

      <Section tone="carbon" labelledBy="map-title">
        <Reveal>
          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-12">
            <SectionHeader
              number="03"
              label="Camp map"
              id="map-title"
              title="The Timmins Mining Camp."
              lead="The Company's location map, reproduced uncropped."
              className="lg:col-span-4 lg:mb-0"
            />
            <figure className="min-w-0 lg:col-span-8">
              <Image
                src={locationMap.src}
                width={locationMap.width}
                height={locationMap.height}
                alt={locationMap.alt}
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="h-auto w-full rounded-panel"
              />
              <figcaption className="text-small mt-4 flex flex-wrap justify-between gap-x-6 gap-y-1">
                <span>
                  <span className="text-fg">Figure 2.</span> Location map, Timmins Mining Camp.
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
