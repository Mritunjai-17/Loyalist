import Link from "next/link";
import { ArrowRight, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FilteredDocuments } from "@/components/shared/FilteredDocuments";
import { Reveal } from "@/components/shared/Reveal";
import { documents } from "@/content/documents";
import { pages } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";

const page = pages.technicalReports;
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

export default function TechnicalReportsPage() {
  const technicalDocs = documents.filter((d) => d.category === "technical");

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
                <Link href="/investors">Investors</Link>
              </li>
              <li>
                <span aria-current="page">Technical Reports</span>
              </li>
            </ol>
          </nav>

          <Reveal>
            <div className="mt-8 sm:mt-10 max-w-3xl">
              <div className="flex items-center gap-3 text-xs sm:text-[13px] font-semibold tracking-[0.18em] text-ink uppercase">
                <span className="w-8 h-[2px] bg-gold" aria-hidden="true" />
                <span>NI 43-101 STANDARDS OF DISCLOSURE</span>
              </div>

              <Heading level={1} className="mt-4 sm:mt-5 text-ink">
                Technical Reports &{" "}
                <span className="block mt-1">
                  Resource <em className="heading-accent">Estimates.</em>
                </span>
              </Heading>

              <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed">
                Independent National Instrument 43-101 technical reports prepared by Qualified Persons (QPs), providing
                geological data, mineral resource statements, and QA/QC verification protocols.
              </p>
            </div>
          </Reveal>
        </div>
      </header>

      {/* 01 Flagship Technical Summary */}
      <Section tone="carbon" id="flagship-report" labelledBy="flagship-title">
        <Reveal>
          <div className="border-t border-b border-white/10 py-10">
            <div className="grid gap-8 lg:grid-cols-12 items-start">
              <div className="lg:col-span-7">
                <div className="text-xs font-semibold text-gold tracking-wider uppercase">
                  Flagship Resource Disclosure
                </div>
                <Heading level={2} className="mt-2 text-ivory">
                  Tully Gold Project: 2026 Mineral Resource Estimate
                </Heading>
                <p className="mt-3 text-sm text-stone leading-relaxed max-w-xl">
                  Prepared in accordance with CIM Definition Standards by P&E Mining Consultants Inc. Effective date:
                  June 15, 2026. The deposit remains open along strike and at depth.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-6 border-t border-white/10 pt-6 max-w-lg">
                  <div>
                    <div className="text-xs text-stone uppercase tracking-wider">Indicated Mineral Resource</div>
                    <div className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-gold">164,000 oz Au</div>
                    <div className="text-xs text-stone mt-0.5">1.62 Mt @ 3.16 g/t Au (1.1 g/t cut-off)</div>
                  </div>
                  <div>
                    <div className="text-xs text-stone uppercase tracking-wider">Inferred Mineral Resource</div>
                    <div className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-ivory">62,000 oz Au</div>
                    <div className="text-xs text-stone mt-0.5">0.95 Mt @ 2.03 g/t Au (1.1 g/t cut-off)</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between self-stretch border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8">
                <div>
                  <div className="text-xs font-semibold text-stone uppercase tracking-wider">Resource Documentation</div>
                  <p className="mt-2 text-xs sm:text-[13px] text-stone leading-relaxed">
                    View the full grade-tonnage sensitivity distribution, geological cross-sections, and interactive
                    project locator on the Tully Gold Project profile.
                  </p>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row lg:flex-col gap-3">
                  <Button
                    href="/projects/tully#resource"
                    variant="primary"
                    icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
                  >
                    View Tully Resource Table
                  </Button>
                  <Button
                    href="/projects/tully"
                    variant="secondary"
                  >
                    Project Details & Map
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 02 Technical Documents Archive */}
      <Section tone="paper" id="reports" labelledBy="reports-title">
        <Reveal>
          <SectionHeader
            number="01"
            label="Documents"
            id="reports-title"
            title="NI 43-101 Technical Reports."
            lead="Technical reports and qualifying documentation. Filter by year and document type."
          />
          <FilteredDocuments
            items={technicalDocs}
            facets={["year", "type"]}
            label="Technical reports"
          />
        </Reveal>
      </Section>

      {/* 03 Qualified Person Statement */}
      <Section tone="carbon" id="qp-statement" labelledBy="qp-title">
        <Reveal>
          <div className="border-l-2 border-gold pl-5 sm:pl-6 max-w-4xl">
            <div className="text-xs font-semibold text-gold tracking-wider uppercase">
              Qualified Persons Disclosure
            </div>
            <p className="mt-2 text-xs sm:text-sm text-stone leading-relaxed">
              Scientific and technical disclosures have been reviewed by Qualified Persons in accordance with National
              Instrument 43-101. Mineral Resources that are not Mineral Reserves do not have demonstrated economic
              viability. Inferred Mineral Resources are considered too geologically speculative to apply economic
              considerations that would categorize them as Mineral Reserves.
            </p>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
