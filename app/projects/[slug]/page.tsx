import Image from "next/image";
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
import { PageHeader } from "@/components/shared/PageHeader";
import { Reveal } from "@/components/shared/Reveal";
import { locationMap } from "@/content/pages";
import { getProject, projects } from "@/content/projects";
import { tullyResource as mre } from "@/content/resource-tully";
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

export default async function ProjectPage({ params }: Params) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const next = nextProject(project);
  const n = (i: number) => String(i).padStart(2, "0");
  let section = 0;

  return (
    <main id="main">
      <PageHeader
        number={project.number}
        intro={{
          eyebrow: "Project",
          heading: project.name,
          accent: "project.",
          lead: project.summary,
          breadcrumbs: [
            { label: "Home", href: "/" },
            { label: "Projects", href: "/projects" },
            { label: project.name },
          ],
        }}
        meta={
          <>
            <Badge>{project.stage}</Badge>
            <span className="text-small">
              {project.location} · {project.metalsLabel}
            </span>
          </>
        }
      />

      <Section tone="black" labelledBy="overview-title">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)]">
              <ProjectFacts project={project} />
            </div>
          </div>

          <div className="min-w-0 lg:col-span-8 lg:col-start-5 xl:col-span-8 xl:col-start-5">
            <Reveal>
              <SectionHeader number={n(++section)} label="Overview" id="overview-title" title={project.tagline} />
              <div className="max-w-prose space-y-5">
                {project.overview.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
              <div className="mt-12 max-w-prose">
                <Heading level={3}>Current status</Heading>
                <ul className="ruled-list mt-6">
                  {project.status.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal className="sub-section">
              <SectionHeader number={n(++section)} label="Geology" id="geology-title" title="Geology and setting." />
              <div className="max-w-prose space-y-5">
                {project.geology.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal className="sub-section">
              <SectionHeader number={n(++section)} label="Highlights" id="highlights-title" title="Published results." />
              <ProjectHighlights project={project} />
              <p className="text-small mt-6">
                Grades are given in <Term term="gpt" />.
              </p>
              {project.historicalNote ? <p className="text-small mt-4 max-w-prose">{project.historicalNote}</p> : null}
            </Reveal>
          </div>
        </div>
      </Section>

      {project.hasResource ? (
        <Section tone="paper" id="resource" labelledBy="resource-title">
          <Reveal>
            <SectionHeader
              number={n(++section)}
              label="Resource"
              id="resource-title"
              title="2026 mineral resource estimate."
              lead={`An ${mre.standard} Mineral Resource Estimate by ${mre.author}, effective June 15, 2026, at a cut-off of ${mre.cutOff}.`}
            />
            <div className="grid gap-12 lg:grid-cols-12">
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
                <p className="mt-8 max-w-prose">
                  Resources are reported in the <Term term="indicated" /> and <Term term="inferred" /> categories. The{" "}
                  <Term term="mre">MRE</Term> was prepared under <Term term="ni43101" />. A{" "}
                  <Term term="pea">Preliminary Economic Assessment</Term> is underway, with a December 2026 target.
                </p>
                <div className="mt-10">
                  <Button href={mre.newsRelease.href} external icon={<Download aria-hidden />}>
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

      <Section tone="carbon" labelledBy="figures-title">
        <Reveal>
          <SectionHeader
            number={n(++section)}
            label="Maps"
            id="figures-title"
            title="Maps and figures."
            lead={`${project.name} sits ${project.location}.`}
          />
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
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

      <Section tone="black" labelledBy="documents-title">
        <Reveal>
          <SectionHeader number={n(++section)} label="Documents" id="documents-title" title="Reports and releases." />
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-7">
              <ProjectDocuments project={project} />
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <Heading level={3}>Qualified person</Heading>
              <p className="text-small mt-3">{project.qualifiedPerson}</p>
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
