import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Table, type Column } from "@/components/ui/Table";
import { Reveal } from "@/components/shared/Reveal";
import { company } from "@/content/company";
import { shareData } from "@/content/documents";
import { pages } from "@/content/pages";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

const page = pages.corporateStructure;
export const metadata = pageMetadata(page);

type CapitalRow = (typeof shareData.capital)[number];
type OwnershipRow = (typeof shareData.ownership)[number];

const capitalColumns: Column<CapitalRow>[] = [
  { key: "label", header: "Security Class", render: (r) => r.label },
  { key: "value", header: "Number of Securities", numeric: true, render: (r) => r.value },
];

const ownershipColumns: Column<OwnershipRow>[] = [
  { key: "holder", header: "Shareholder Group", render: (r) => r.holder },
  { key: "percentage", header: "Percentage of Common Shares", numeric: true, render: (r) => r.percentage },
];

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

export default function CorporateStructurePage() {
  const asOf = `As of ${formatDate(shareData.asOf)}`;

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
                <span aria-current="page">Corporate Structure</span>
              </li>
            </ol>
          </nav>

          <Reveal>
            <div className="mt-8 sm:mt-10 max-w-3xl">
              <div className="flex items-center gap-3 text-xs sm:text-[13px] font-semibold tracking-[0.18em] text-ink uppercase">
                <span className="w-8 h-[2px] bg-gold" aria-hidden="true" />
                <span>CAPITALIZATION & FLOAT</span>
              </div>

              <Heading level={1} className="mt-4 sm:mt-5 text-ink">
                Corporate Structure &{" "}
                <span className="block mt-1">
                  Share <em className="heading-accent">Capital.</em>
                </span>
              </Heading>

              <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed">
                Overview of Loyalist Exploration Limited&apos;s capital structure, outstanding equity securities,
                warrants, and beneficial ownership distribution.
              </p>
            </div>
          </Reveal>
        </div>
      </header>

      {/* 01 Share Capitalization */}
      <Section tone="paper" id="share-capital" labelledBy="capital-title">
        <Reveal>
          {/* Subtle Key Metrics Strip */}
          <div className="mb-10 grid grid-cols-1 sm:grid-cols-3 gap-6 border-b border-black/10 pb-8">
            {shareData.capital.map((c) => (
              <div key={c.label} className="border-l-2 border-gold/40 pl-4">
                <div className="text-xs text-stone uppercase tracking-wider">{c.label}</div>
                <div className="mt-1 font-serif text-3xl font-bold text-ink">{c.value}</div>
                <div className="mt-0.5 text-[11px] text-stone">{asOf}</div>
              </div>
            ))}
          </div>

          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-12 items-start">
            <div className="lg:col-span-5">
              <SectionHeader
                number="01"
                label="Capital"
                id="capital-title"
                title="Share Capital."
                lead={`${asOf}. Reported in millions (M). Reflects current issued and outstanding equity securities.`}
              />
            </div>
            <div className="min-w-0 lg:col-span-7">
              <Table
                label="Share capital"
                columns={capitalColumns}
                rows={shareData.capital}
                rowKey={(r) => r.label}
                caption={`${asOf}. M = millions of securities.`}
                className="min-w-0"
              />
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 02 Ownership Distribution */}
      <Section tone="warm" id="ownership" labelledBy="ownership-title">
        <Reveal>
          <SectionHeader
            number="02"
            label="Distribution"
            id="ownership-title"
            title="Beneficial Ownership."
            lead={`${asOf}. Breakdown of common shareholdings across insider, corporate, and public float holders.`}
          />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
            <div className="min-w-0 lg:col-span-7">
              <Table
                label="Ownership"
                columns={ownershipColumns}
                rows={shareData.ownership}
                rowKey={(r) => r.holder}
                caption={`${asOf}.`}
                className="min-w-0"
              />
            </div>

            {/* Ownership Progress Bars */}
            <div className="lg:col-span-5 border-l border-black/10 pl-0 lg:pl-8 pt-6 lg:pt-0">
              <div className="text-xs font-semibold text-stone uppercase tracking-wider mb-5">
                Float Distribution
              </div>

              <dl className="space-y-4">
                {shareData.ownership.map((o) => (
                  // dt/dd must be direct children of the group; the bar sits inside the dd.
                  <div key={o.holder} className="grid grid-cols-[1fr_auto] items-center gap-y-1.5 text-xs">
                    <dt className="text-ink font-medium">{o.holder}</dt>
                    <dd className="text-gold font-bold">{o.percentage}</dd>
                    <dd className="col-span-2 h-1.5 w-full overflow-hidden rounded-full bg-black/[0.08]" aria-hidden="true">
                      <div
                        className="h-full rounded-full bg-gold transition-all duration-500"
                        style={{ width: o.percentage }}
                      />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 03 Trading & Registrar Identifiers */}
      <Section tone="paper" id="trading-identifiers" labelledBy="trading-title">
        <Reveal>
          <div className="border-t border-black/10 pt-8">
            <div className="text-xs font-semibold text-gold tracking-wider uppercase mb-6">
              Listing & Transfer Agent
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-xs">
              <div>
                <span className="text-stone uppercase tracking-wider block">Listing Exchange</span>
                <span className="text-ink font-medium mt-1 block">Canadian Securities Exchange</span>
                <span className="text-gold font-semibold mt-0.5 block">CSE: PNGC</span>
              </div>
              <div>
                <span className="text-stone uppercase tracking-wider block">Security Class</span>
                <span className="text-ink font-medium mt-1 block">Common Shares</span>
                <span className="text-stone mt-0.5 block">No Par Value</span>
              </div>
              <div>
                <span className="text-stone uppercase tracking-wider block">Transfer Agent</span>
                <span className="text-ink font-medium mt-1 block">TSX Trust Company</span>
                <span className="text-stone mt-0.5 block">Toronto, Ontario</span>
              </div>
              <div>
                <span className="text-stone uppercase tracking-wider block">Regulatory Filings</span>
                <span className="text-ink font-medium mt-1 block">SEDAR+ Database</span>
                <a
                  href={company.sedarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent font-medium hover:underline inline-flex items-center gap-1 mt-0.5"
                >
                  <span>Search Profile</span>
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
