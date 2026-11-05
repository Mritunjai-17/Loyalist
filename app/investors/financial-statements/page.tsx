import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FilteredDocuments } from "@/components/shared/FilteredDocuments";
import { Reveal } from "@/components/shared/Reveal";
import { company } from "@/content/company";
import { documents } from "@/content/documents";
import { pages } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";

const page = pages.financialStatements;
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

export default function FinancialStatementsPage() {
  const financialDocs = documents.filter((d) => d.category === "financials");

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
                <span aria-current="page">Financial Statements</span>
              </li>
            </ol>
          </nav>

          <Reveal>
            <div className="mt-8 sm:mt-10 max-w-3xl">
              <div className="flex items-center gap-3 text-xs sm:text-[13px] font-semibold tracking-[0.18em] text-ink uppercase">
                <span className="w-8 h-[2px] bg-gold" aria-hidden="true" />
                <span>FINANCIAL DISCLOSURE</span>
              </div>

              <Heading level={1} className="mt-4 sm:mt-5 text-ink">
                Financial Statements &{" "}
                <span className="block mt-1">
                  MD&A <em className="heading-accent">Reports.</em>
                </span>
              </Heading>

              <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed">
                Audited annual financial statements, quarterly interim financial reports, and accompanying Management&apos;s
                Discussion & Analysis (MD&A) filings.
              </p>
            </div>
          </Reveal>
        </div>
      </header>

      {/* 01 Financial Filings Archive */}
      <Section tone="carbon" id="filings" labelledBy="filings-title">
        <Reveal>
          {/* Institutional Metadata Bar */}
          <div className="mb-10 pb-6 border-b border-white/10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-stone">
            <div>
              <span className="text-white/40 uppercase tracking-wider block">Reporting Currency</span>
              <span className="text-ivory font-medium mt-0.5 block">Canadian Dollars (CAD)</span>
            </div>
            <div className="hidden sm:block h-7 w-[1px] bg-white/10" aria-hidden="true" />
            <div>
              <span className="text-white/40 uppercase tracking-wider block">Fiscal Year End</span>
              <span className="text-ivory font-medium mt-0.5 block">December 31</span>
            </div>
            <div className="hidden sm:block h-7 w-[1px] bg-white/10" aria-hidden="true" />
            <div>
              <span className="text-white/40 uppercase tracking-wider block">Accounting Standards</span>
              <span className="text-ivory font-medium mt-0.5 block">IFRS Compliant</span>
            </div>
            <div className="hidden sm:block h-7 w-[1px] bg-white/10" aria-hidden="true" />
            <div>
              <span className="text-white/40 uppercase tracking-wider block">Exchange Listing</span>
              <span className="text-gold font-bold mt-0.5 block">CSE: PNGC</span>
            </div>
          </div>

          <SectionHeader
            number="01"
            label="Filings"
            id="filings-title"
            title="Statements and MD&A."
            lead="Filter audited annual financial statements and quarterly MD&A reports by fiscal year and filing category."
          />
          <FilteredDocuments
            items={financialDocs}
            facets={["year", "type"]}
            label="Financial statements and MD&A"
          />
        </Reveal>
      </Section>

      {/* 02 SEDAR+ Regulatory Notice */}
      <Section tone="paper" id="sedar-notice" labelledBy="sedar-title">
        <Reveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-black/10 pt-8">
            <div className="max-w-2xl">
              <div className="text-xs font-bold text-gold uppercase tracking-wider">SEDAR+ Repository</div>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                All statutory filings, interim certifications (Form 52-109FV1 / 52-109FV2), and formal auditor statements
                are accessible under Loyalist Exploration Limited&apos;s public profile on the System for Electronic Document
                Analysis and Retrieval.
              </p>
            </div>
            <a
              href={company.sedarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary shrink-0"
            >
              <span>Search SEDAR+</span>
              <ExternalLink className="h-4 w-4 text-gold" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
