import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FilteredDocuments } from "@/components/shared/FilteredDocuments";
import { Reveal } from "@/components/shared/Reveal";
import { pages } from "@/content/pages";
import { pressReleases } from "@/content/press-releases";
import { company } from "@/content/company";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

const page = pages.pressReleases;
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

export default function PressReleasesPage() {
  const items = pressReleases.map((r) => ({ ...r, type: r.tag }));
  const latest = pressReleases[0];

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
                <span aria-current="page">News & Announcements</span>
              </li>
            </ol>
          </nav>

          <Reveal>
            <div className="mt-8 sm:mt-10 max-w-3xl">
              <div className="flex items-center gap-3 text-xs sm:text-[13px] font-semibold tracking-[0.18em] text-ink uppercase">
                <span className="w-8 h-[2px] bg-gold" aria-hidden="true" />
                <span>CONTINUOUS DISCLOSURE</span>
              </div>

              <Heading level={1} className="mt-4 sm:mt-5 text-ink">
                Press Releases &{" "}
                <span className="block mt-1">
                  Corporate <em className="heading-accent">News.</em>
                </span>
              </Heading>

              <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed">
                Official regulatory disclosures, exploration updates, and corporate milestones filed by Loyalist
                Exploration Limited (CSE: PNGC).
              </p>
            </div>
          </Reveal>

          {/* Featured Latest Release Spotlight */}
          {latest ? (
            <Reveal delay={0.15}>
              <article className="mt-10 sm:mt-12 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
                <div className="grid gap-0 lg:grid-cols-12 items-stretch">
                  <div className="relative aspect-[16/10] lg:aspect-auto lg:col-span-5 min-h-[260px] overflow-hidden">
                    <Image
                      src="/images/news/featured-drill.jpg"
                      alt="Diamond drilling campaign at Tully Gold Project"
                      fill
                      sizes="(min-width: 1024px) 480px, 100vw"
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />
                    <div className="absolute bottom-3 left-3 text-[11px] font-medium text-white/90 lg:hidden">
                      Diamond Drill Rig · Timmins Camp
                    </div>
                  </div>

                  <div className="lg:col-span-7 p-6 sm:p-8 lg:p-9 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs font-semibold text-stone uppercase tracking-wider">
                        <span className="text-gold font-bold">Latest Release</span>
                        <span aria-hidden="true">·</span>
                        <time dateTime={latest.date}>{formatDate(latest.date)}</time>
                      </div>

                      <Heading level={2} className="mt-3 text-ink">
                        {latest.title}
                      </Heading>

                      <p className="mt-4 text-sm sm:text-[15px] text-ink-soft leading-relaxed">
                        Comprehensive grade-tonnage sensitivity calculations for the flagship Tully deposit evaluate
                        resource continuity across cut-off thresholds between 1.0 g/t and 3.0 g/t Au, in support of
                        the ongoing Preliminary Economic Assessment (PEA).
                      </p>
                    </div>

                    <div className="mt-7 pt-5 border-t border-black/10 flex flex-wrap items-center gap-4">
                      {latest.available && latest.href ? (
                        <Button
                          href={latest.href}
                          external
                          variant="primary"
                          icon={<Download className="h-4 w-4" aria-hidden="true" />}
                        >
                          Download Release (PDF)
                        </Button>
                      ) : null}
                      <Button
                        href="/projects/tully"
                        variant="secondary"
                        icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
                      >
                        View Tully Gold Project
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ) : null}
        </div>
      </header>

      {/* 01 News Release Archive */}
      <Section tone="carbon" id="archive" labelledBy="releases-title">
        <Reveal>
          <SectionHeader
            number="01"
            label="Archive"
            id="releases-title"
            title="Press Release Archive."
            lead={`${items.length} press releases and regulatory disclosures published. Filter by publication year.`}
          />
          <FilteredDocuments items={items} facets={["year"]} label="News releases" />
        </Reveal>
      </Section>

      {/* 02 Regulatory Disclosure & Contact */}
      <Section tone="paper" id="regulatory-contact" labelledBy="regulatory-title">
        <Reveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-black/10 pt-8">
            <div className="max-w-xl">
              <div className="text-xs font-bold text-gold uppercase tracking-wider">Regulatory Compliance</div>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                All news releases are disseminated via authorized newswires and filed concurrently on the System for
                Electronic Data Analysis and Retrieval (SEDAR+).
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Button
                href={company.sedarUrl}
                external
                variant="secondary"
                icon={<ExternalLink className="h-4 w-4" aria-hidden="true" />}
              >
                View on SEDAR+
              </Button>
              <Button href="/contact" variant="primary">
                Contact IR
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
