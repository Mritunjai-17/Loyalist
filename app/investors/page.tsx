import Link from "next/link";
import { ArrowRight, Download, ExternalLink, FileBadge, FileText, Layers, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { keyShareData, latestDocuments } from "@/components/home/InvestorPanel";
import { DocumentRow } from "@/components/shared/DocumentRow";
import { Reveal } from "@/components/shared/Reveal";
import { company } from "@/content/company";
import { shareData } from "@/content/documents";
import { isGroup, primaryNav } from "@/content/navigation";
import { investorsUpdated, pages } from "@/content/pages";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

const page = pages.investors;
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

const subPages = primaryNav
  .filter(isGroup)
  .find((g) => g.label === "Investors")!
  .items.filter((item) => item.href !== "/investors");

const subpageIcons: Record<string, any> = {
  "/investors/technical-reports": FileBadge,
  "/investors/financial-statements": FileText,
  "/investors/corporate-structure": Layers,
  "/investors/annual-meeting": Users,
};

export default function InvestorsPage() {
  const shareMetrics = keyShareData();

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
                <span aria-current="page">Investors</span>
              </li>
            </ol>
          </nav>

          <Reveal>
            <div className="mt-8 sm:mt-10 max-w-3xl">
              <div className="flex items-center gap-3 text-xs sm:text-[13px] font-semibold tracking-[0.18em] text-ink uppercase">
                <span className="w-8 h-[2px] bg-gold" aria-hidden="true" />
                <span>INVESTOR RELATIONS & CAPITAL MARKETS</span>
              </div>

              <Heading
                level={1}
                className="mt-4 sm:mt-5 text-ink"
              >
                Investor Information{" "}
                <span className="block mt-1">
                  & Continuous <em className="heading-accent">Disclosure.</em>
                </span>
              </Heading>

              <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed">
                Official regulatory filings, NI 43-101 technical reports, financial statements, and share structure
                information for Loyalist Exploration Limited (CSE: {company.ticker}).
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-stone">
                <span className="rounded-md bg-black/[0.04] px-2.5 py-1 font-semibold text-ink border border-black/[0.06]">
                  CSE: {company.ticker}
                </span>
                <span>•</span>
                <span>
                  Last updated: <time dateTime={investorsUpdated}>{formatDate(investorsUpdated)}</time>
                </span>
                <span>•</span>
                <span>SEDAR+ Verified Disclosures</span>
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      {/* 01 Share Structure & Market Overview */}
      <Section tone="carbon" labelledBy="shares-title">
        <Reveal>
          <SectionHeader
            number="01"
            label="Capital Structure"
            id="shares-title"
            title="Market & Share Data."
            lead={`Loyalist Exploration trades on the Canadian Securities Exchange under the ticker symbol ${company.ticker}.`}
            action={
              <Button href={company.quoteUrl} external variant="secondary" icon={<TrendingUp className="h-4 w-4" aria-hidden="true" />}>
                Live Quote on TradingView
              </Button>
            }
          />
          <div className="grid gap-8 lg:grid-cols-12 items-start border-t border-white/10 pt-8">
            {/* Left Column: Symbol & Exchange */}
            <div className="lg:col-span-5 border-l-2 border-gold/40 pl-5 space-y-4">
              <div className="text-xs font-bold text-stone tracking-wider uppercase">Listed Symbol</div>
              <div className="text-4xl sm:text-5xl font-bold text-ivory tracking-tight font-serif">
                {company.ticker}
              </div>
              <div className="text-xs font-semibold text-gold tracking-widest uppercase">
                Canadian Securities Exchange
              </div>
              <p className="text-xs sm:text-sm text-stone leading-relaxed max-w-sm">
                As of <time dateTime={shareData.asOf}>{formatDate(shareData.asOf)}</time>. Official filings are verified
                concurrently on the SEDAR+ repository.
              </p>
              <div className="pt-2">
                <TextLink href="/investors/corporate-structure">View Full Corporate Structure Details</TextLink>
              </div>
            </div>

            {/* Right Column: Key Metrics Grid (Hairline Architectural Lines) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8">
              {shareMetrics.map((d) => (
                <div key={d.label} className="border-l border-white/10 pl-4 py-1">
                  <div className="text-xs text-stone uppercase tracking-wider">{d.label}</div>
                  <div className="text-2xl sm:text-3xl font-bold text-gold font-serif mt-1">{d.value}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 02 Latest Documents */}
      <Section tone="paper" labelledBy="latest-title">
        <Reveal>
          <SectionHeader
            number="02"
            label="Documents"
            id="latest-title"
            title="Latest Reports & Filings."
            lead="Recent corporate presentations, technical reports, and interim financial statements."
          />
          <ul className="document-list border-t border-black/10" aria-label="Latest documents">
            {latestDocuments(6).map((d) => (
              <DocumentRow key={d.href + d.title} {...d} />
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* 03 Continuous Disclosure Navigation */}
      <Section tone="carbon" labelledBy="filings-title">
        <Reveal>
          <SectionHeader
            number="03"
            label="Filings"
            id="filings-title"
            title="Continuous Disclosure Archive."
            lead="Access specific categories of company filings and shareholder documentation."
            action={
              <Button href={company.sedarUrl} external variant="secondary" icon={<ExternalLink className="h-4 w-4" aria-hidden="true" />}>
                Search SEDAR+
              </Button>
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 border-t border-white/10 pt-8">
            {subPages.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group block border-l-2 border-white/15 pl-5 py-1 transition-colors hover:border-gold"
              >
                <div className="flex items-center justify-between">
                  <div className="text-base sm:text-lg font-bold text-ivory font-serif group-hover:text-gold transition-colors">
                    {item.label}
                  </div>
                  <ArrowRight className="h-4 w-4 text-gold transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </div>
                <p className="text-xs sm:text-sm text-stone mt-1.5 leading-relaxed">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
