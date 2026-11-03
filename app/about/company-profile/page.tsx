import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { presentationDocument } from "@/components/home/InvestorPanel";
import { DocumentRow } from "@/components/shared/DocumentRow";
import { Term } from "@/components/shared/Glossary";
import { PageHeader } from "@/components/shared/PageHeader";
import { Reveal } from "@/components/shared/Reveal";
import { company } from "@/content/company";
import { pages, profileProjectLines } from "@/content/pages";
import { camp, ceoStatement, commitments, strategySteps, whoWeAre } from "@/content/strategy";
import { pageMetadata } from "@/lib/seo";

const page = pages.companyProfile;
export const metadata = pageMetadata(page);

export default function CompanyProfilePage() {
  return (
    <main id="main">
      <PageHeader intro={page} />

      <Section tone="black" labelledBy="who-title">
        <Reveal>
          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-12">
            <SectionHeader number="01" label="Who we are" id="who-title" title="Who we are." className="lg:col-span-5 lg:mb-0" />
            <div className="min-w-0 lg:col-span-7 lg:pt-8">
              <div className="max-w-prose space-y-5">
                {whoWeAre.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              <ol className="profile-projects mt-10" aria-label="The Company's projects">
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
        </Reveal>
      </Section>

      <Section tone="carbon" labelledBy="strategy-title">
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
                  <p className="max-w-prose">{step.body}</p>
                  <div className="mt-4">
                    <TextLink href={step.link.href}>{step.link.label}</TextLink>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <figure className="mt-16 lg:ml-[33.333%]">
            <blockquote className="pull-quote">
              <p>“{ceoStatement.text}”</p>
            </blockquote>
            <figcaption className="text-small mt-5">
              <span className="text-fg">{ceoStatement.name}</span>, {ceoStatement.title}
            </figcaption>
          </figure>
        </Reveal>
      </Section>

      <Section tone="paper" labelledBy="camp-title">
        <Reveal>
          <SectionHeader number="03" label="The camp" id="camp-title" title="The Timmins Mining Camp." />
          <div className="grid gap-12 lg:grid-cols-12">
            <dl className="ruled-facts lg:col-span-5">
              <div>
                <dt className="text-small">Gold produced</dt>
                <dd className="highlight-value mt-1">70M+ oz</dd>
              </div>
              <div>
                <dt className="text-small">Base metals</dt>
                <dd className="mt-1 font-medium text-fg">Kidd Creek Mine</dd>
              </div>
              <div>
                <dt className="text-small">Coordinates</dt>
                <dd className="mt-1 font-medium text-fg">{company.coordinates.label}</dd>
              </div>
            </dl>
            <div className="max-w-prose space-y-5 lg:col-span-6 lg:col-start-7">
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

      <Section tone="black" labelledBy="commitments-title">
        <Reveal>
          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-12">
            <div className="lg:col-span-7">
              <SectionHeader number="04" label="Commitments" id="commitments-title" title="What we commit to." lead={camp.responsibility} />
            </div>
            <ul className="ruled-list lg:col-span-5 lg:mt-8" aria-label="Our commitments">
              {commitments.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      <Section tone="carbon" labelledBy="presentation-title">
        <Reveal>
          <SectionHeader
            number="05"
            label="Presentation"
            id="presentation-title"
            title="Corporate presentation."
            lead="The current corporate presentation, with project detail, share structure and management."
          />
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <ul className="document-list lg:col-span-7" aria-label="Corporate presentation">
              <DocumentRow {...presentationDocument()} />
            </ul>
            <div className="lg:col-span-4 lg:col-start-9">
              <Button href={company.presentation.href} external icon={<Download aria-hidden />}>
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
