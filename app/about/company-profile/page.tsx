import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { presentationDocument } from "@/components/home/InvestorPanel";
import { DocumentRow } from "@/components/shared/DocumentRow";
import { Term } from "@/components/shared/Glossary";
import { Reveal } from "@/components/shared/Reveal";
import { CompanyProfileHero } from "@/components/about/CompanyProfileHero";
import { company } from "@/content/company";
import { pages, profileProjectLines } from "@/content/pages";
import { camp, ceoStatement, commitments, strategySteps, whoWeAre } from "@/content/strategy";
import { pageMetadata } from "@/lib/seo";

const page = pages.companyProfile;
export const metadata = pageMetadata(page);

export default function CompanyProfilePage() {
  return (
    <main id="main">
      {/* Editorial Hero with Boreal Landscape Visual and 4-Column KPI Stats */}
      <CompanyProfileHero />

      {/* 01 Who We Are */}
      <Section tone="carbon" labelledBy="who-title">
        <Reveal>
          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-12">
            <SectionHeader
              number="01"
              label="Who we are"
              id="who-title"
              title="Who we are."
              lead="Concentrating on acquiring, exploring, and developing quality mineral properties in Timmins."
              className="lg:col-span-5 lg:mb-0"
            />
            <div className="min-w-0 lg:col-span-7 lg:pt-4">
              <div className="max-w-prose space-y-5 text-fg-muted leading-relaxed">
                {whoWeAre.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              <div className="mt-8">
                <div className="text-xs font-semibold tracking-wider text-stone uppercase mb-3">
                  Our Portfolio Properties
                </div>
                <ol className="profile-projects" aria-label="The Company's projects">
                  {profileProjectLines.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/projects/${p.slug}`} className="profile-project-link">
                        <span className="font-semibold text-fg">{p.name}</span>
                        <span>{p.line}</span>
                        <ArrowRight aria-hidden className="project-index-arrow" />
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 02 Strategy */}
      <Section tone="paper" labelledBy="strategy-title">
        <Reveal>
          <SectionHeader
            number="02"
            label="Strategy"
            id="strategy-title"
            title="Acquire, explore,"
            accent="advance."
            lead="Acquiring, exploring, and developing quality mineral properties in the Timmins Mining District."
          />
          <ol className="strategy-rows">
            {strategySteps.map((step) => (
              <li key={step.title} className="strategy-row">
                <Heading level={3}>
                  <span aria-hidden className="strategy-row-numeral">
                    {step.numeral}
                  </span>
                  {step.title}
                </Heading>
                <div>
                  <p className="max-w-prose text-ink-soft leading-relaxed">{step.body}</p>
                  <div className="mt-4">
                    <TextLink href={step.link.href}>{step.link.label}</TextLink>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <figure className="mt-14 sm:mt-16 border-l-2 border-gold pl-6 sm:pl-8 lg:ml-[25%] max-w-2xl">
            <blockquote className="pull-quote">
              <p>“{ceoStatement.text}”</p>
            </blockquote>
            <figcaption className="text-small mt-4 flex items-center justify-between pt-3 text-stone">
              <div>
                <span className="font-semibold text-ink">{ceoStatement.name}</span>
                <span> · {ceoStatement.title}</span>
              </div>
              <Image
                src="/images/logo.png"
                alt="Loyalist Exploration"
                width={32}
                height={32}
                className="opacity-60"
              />
            </figcaption>
          </figure>
        </Reveal>
      </Section>

      {/* 03 The Camp */}
      <Section tone="carbon" labelledBy="camp-title">
        <Reveal>
          <SectionHeader
            number="03"
            label="The camp"
            id="camp-title"
            title="The Timmins Mining Camp."
            lead="A tier-one jurisdiction with deep geological endowment and continuous production infrastructure."
          />
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            <dl className="ruled-facts lg:col-span-5">
              <div>
                <dt className="text-small">Historical gold produced</dt>
                <dd className="highlight-value mt-1 text-gold text-2xl font-bold">70M+ oz Au</dd>
              </div>
              <div>
                <dt className="text-small">Base metals anchor</dt>
                <dd className="mt-1 font-semibold text-fg">Kidd Creek Mine (Glencore)</dd>
              </div>
              <div>
                <dt className="text-small">Regional coordinates</dt>
                <dd className="mt-1 font-medium text-fg">{company.coordinates.label}</dd>
              </div>
            </dl>
            <div className="max-w-prose space-y-5 lg:col-span-6 lg:col-start-7 text-fg-muted leading-relaxed">
              <p>
                The Timmins Mining Camp has produced {camp.ouncesProduced}. It also hosts one of the world&apos;s largest{" "}
                <Term term="vms">volcanogenic massive sulfide (VMS)</Term> deposits, the Kidd Creek Mine.
              </p>
              <p>
                All four Loyalist projects lie within 45 km of Timmins, from DeSantis 4.5 km southwest of the city to
                Loveland 45 km by road to the northwest.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 04 Commitments */}
      <Section tone="paper" labelledBy="commitments-title">
        <Reveal>
          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-12">
            <div className="lg:col-span-5">
              <SectionHeader
                number="04"
                label="Commitments"
                id="commitments-title"
                title="What we commit to."
                lead={camp.responsibility}
                className="lg:mb-0"
              />
            </div>
            <div className="lg:col-span-7">
              <ul className="divide-y divide-black/10 border-y border-black/10" aria-label="Company commitments">
                {commitments.map((c, i) => (
                  <li key={c} className="py-5 sm:py-6 flex items-baseline gap-5">
                    <span className="font-serif text-sm font-bold text-gold tabular-nums select-none" aria-hidden="true">
                      0{i + 1}
                    </span>
                    <span className="text-base sm:text-lg font-medium text-ink leading-relaxed">
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 05 Presentation */}
      <Section tone="carbon" labelledBy="presentation-title">
        <Reveal>
          <SectionHeader
            number="05"
            label="Presentation"
            id="presentation-title"
            title="Corporate presentation."
            lead="The current corporate presentation, with project detail, share structure and management."
          />
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <ul className="document-list lg:col-span-7" aria-label="Corporate presentation">
              <DocumentRow {...presentationDocument()} />
            </ul>
            <div className="lg:col-span-4 lg:col-start-9">
              <Button href={company.presentation.href} external icon={<Download className="h-4 w-4" aria-hidden="true" />}>
                Download the presentation
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
