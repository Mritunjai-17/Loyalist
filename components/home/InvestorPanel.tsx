import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/shared/Reveal";
import { company } from "@/content/company";
import { documents, shareData } from "@/content/documents";
import { pressReleases } from "@/content/press-releases";
import { formatDate, formatFileSize } from "@/lib/format";
import type { DocumentItem } from "@/types";
import { SectionIntro } from "./SectionIntro";
import { latestReleases } from "./NewsList";

export function presentationDocument(): DocumentItem {
  return {
    category: "presentation",
    type: "Presentation",
    title: "Corporate presentation",
    date: company.presentation.date,
    href: company.presentation.href,
    sizeBytes: company.presentation.sizeBytes,
    available: true,
  };
}

export function latestDocuments(count: number): DocumentItem[] {
  return [presentationDocument(), ...documents].sort((a, b) => b.date.localeCompare(a.date)).slice(0, count);
}

export function keyShareData(): { label: string; value: string }[] {
  const capital = (label: string) => shareData.capital.find((c) => c.label === label)?.value ?? "Not reported";
  const float = shareData.ownership.find((o) => o.holder === "Float")?.percentage ?? "Not reported";
  return [
    { label: "CSE symbol", value: company.ticker },
    { label: "Common shares outstanding", value: capital("Common Shares Outstanding") },
    { label: "Warrants", value: capital("Warrants") },
    { label: "Public float", value: float },
  ];
}

const shortDate = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

type LedgerItem = { href: string; date: string; title: string; kind: string; meta: string; download: boolean };

/**
 * A titled group of documents. Every row has the same structure: date column,
 * title with its document type, then file details and a download or open icon.
 */
function LedgerGroup({ title, items }: { title: string; items: LedgerItem[] }) {
  return (
    <div className="ledger-head">
      <div className="flex items-baseline justify-between gap-6 border-b border-fg/50 pb-4">
        <Heading level={3}>{title}</Heading>
        <span className="text-[0.75rem] text-fg-muted">
          {items.length} {items.length === 1 ? "document" : "documents"}
        </span>
      </div>
      <ul>
        {items.map((it) => (
          <li key={it.href} className="border-b border-rule">
            <a
              href={it.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-x-6 gap-y-1.5 py-5 sm:grid-cols-[6.5rem_minmax(0,1fr)_auto] sm:items-baseline"
            >
              <time dateTime={it.date} className="text-[0.75rem] font-semibold tabular-nums tracking-[0.06em] text-fg-muted">
                {shortDate.format(new Date(`${it.date}T00:00:00Z`))}
              </time>
              <span className="min-w-0">
                <span className="block text-[0.9375rem] font-medium leading-snug text-fg transition-colors group-hover:text-accent">
                  {it.title}
                </span>
                <span className="mt-1.5 block text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-accent">{it.kind}</span>
              </span>
              <span className="inline-flex items-center gap-3 whitespace-nowrap text-[0.75rem] text-fg-muted">
                {it.meta}
                {it.download ? (
                  <Download className="h-4 w-4 text-ed-rule transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
                ) : (
                  <ArrowUpRight className="h-4 w-4 text-ed-rule transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                )}
              </span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Ivory band with a charcoal presentation panel. Share structure as large editorial figures with their as-of
 * date; a featured corporate presentation; a ledger of the latest filings and
 * announcements. No price chart is drawn: there is no price data in the site's
 * sources, so live trading is linked out instead of approximated.
 */
export function InvestorPanel() {
  const [, ...figures] = keyShareData();
  const filings = documents
    .filter((d) => d.available)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);
  // Financing and corporate releases not already shown in the news section below.
  const inNews = new Set(latestReleases().map((r) => r.href));
  const announcements = pressReleases
    .filter((r) => r.available && !inNews.has(r.href))
    .filter((r) => /placement|financing|tranche|shares for debt|stock options|meeting/i.test(r.title))
    .slice(0, 2);
  const { presentation } = company;

  return (
    <section id="investors" aria-labelledby="investors-title" data-tone="ivory" className="section-pad relative bg-surface">
      <div className="container-site">
        <SectionIntro
          index="06"
          label="Investors"
          id="investors-title"
          title="Information"
          accent="for shareholders."
          lead="Key market information, reports and presentations for current and prospective investors."
          action={
            <Link href="/investors" className="link-ed">
              <span>Go to the investor centre</span>
              <ArrowRight aria-hidden />
            </Link>
          }
        />

        {/* Market figures */}
        <Reveal delay={0.05}>
          <div className="mt-block grid gap-y-10 border-t border-rule pt-10 sm:grid-cols-2 sm:gap-x-grid lg:grid-cols-4">
            <div>
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-accent">Listing</p>
              <p className="investor-figure mt-4">{company.ticker}</p>
              <a
                href={company.quoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-ed mt-3 text-fg"
              >
                <span>{company.exchange} · Live share price</span>
                <ArrowUpRight aria-hidden />
                <span className="sr-only"> (TradingView, opens in a new tab)</span>
              </a>
            </div>
            {figures.map((f) => (
              <div key={f.label}>
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-accent">{f.label}</p>
                <p className="investor-figure mt-4 tabular-nums">{f.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[0.8125rem] text-fg-muted">
            Share structure as of <time dateTime={shareData.asOf}>{formatDate(shareData.asOf)}</time>, from company disclosure.
          </p>
        </Reveal>

        <div className="mt-block grid gap-y-block lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-x-col">
          {/* Corporate presentation: the featured document, top-aligned with the ledger */}
          <Reveal>
            <a
              href={presentation.href}
              target="_blank"
              rel="noopener noreferrer"
              data-tone="deep"
              className="group flex flex-col justify-between gap-12 lg:min-h-[340px] bg-ed-deep p-card transition-colors duration-300 hover:bg-ed-deep-2"
            >
              <div>
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-ed-label-dark">Corporate presentation</p>
                <p className="font-editorial mt-6 text-[clamp(2rem,3vw,2.75rem)] leading-[1.1] text-ed-ivory">
                  The Loyalist story, in one document.
                </p>
              </div>
              <div className="flex items-end justify-between gap-6 border-t border-ed-ivory/15 pt-6 text-[0.8125rem] text-ed-ivory/75">
                <span>
                  Updated <time dateTime={presentation.date}>{formatDate(presentation.date)}</time>
                  <br />
                  PDF, {formatFileSize(presentation.sizeBytes)}
                </span>
                <span className="inline-flex h-12 w-12 items-center justify-center border border-ed-accent/60 text-ed-accent-light transition-colors group-hover:bg-ed-accent group-hover:text-ed-deep">
                  <Download className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Reveal>

          {/* Ledger: filings, then financing and corporate announcements */}
          <Reveal delay={0.1} className="space-y-group">
            <LedgerGroup
              title="Latest filings"
              items={filings.map((d) => ({
                href: d.href,
                date: d.date,
                title: d.title,
                kind: d.type,
                meta: d.sizeBytes ? `PDF, ${formatFileSize(d.sizeBytes)}` : "PDF",
                download: true,
              }))}
            />
            <LedgerGroup
              title="Financing & corporate"
              items={announcements.map((r) => ({
                href: r.href,
                date: r.date,
                title: r.title,
                kind: r.tag,
                meta: r.sizeBytes ? `PDF, ${formatFileSize(r.sizeBytes)}` : "PDF",
                download: false,
              }))}
            />
          </Reveal>
        </div>

        <p className="mt-block max-w-[90ch] border-t border-rule pt-6 text-[0.75rem] leading-relaxed text-fg-muted">
          Share information is provided for reference only, is current as of the date shown and may have changed since. It is not
          an offer or a solicitation to buy or sell securities. Investors should review the Company&rsquo;s continuous disclosure
          filings on{" "}
          <a href={company.sedarUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-ed-rule/60 underline-offset-4 hover:text-fg">
            SEDAR+
          </a>{" "}
          and the{" "}
          <Link href="/disclaimer" className="underline decoration-ed-rule/60 underline-offset-4 hover:text-fg">
            site disclaimer
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
