import { ArrowRight, Download, FileText, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/shared/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { company } from "@/content/company";
import { documents, shareData } from "@/content/documents";
import { formatDate, formatFileSize } from "@/lib/format";
import type { DocumentItem } from "@/types";

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

/** Analytical rather than decorative: a share-data panel and a document ledger. */
export function InvestorPanel() {
  const capital = (label: string) => shareData.capital.find((c) => c.label === label)?.value ?? "Not reported";
  const float = shareData.ownership.find((o) => o.holder === "Float")?.percentage ?? "Not reported";
  const docs = latestDocuments(4);
  const metrics = [
    { label: "Common Shares Outstanding", value: capital("Common Shares Outstanding") },
    { label: "Warrants", value: capital("Warrants") },
    { label: "Public Float", value: float },
  ];

  return (
    <Section tone="carbon" id="investors" labelledBy="investors-title" className="relative">
      <SectionHeader
        number="06"
        label="Investors"
        id="investors-title"
        title="Investor "
        accent="Information."
        lead="Key market information, reports and presentations for current and prospective investors."
        action={
          <Button href="/investors" variant="secondary" icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
            Go to the Investor Page
          </Button>
        }
      />

      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Share data */}
        <div className="lg:col-span-5">
          <Reveal>
            <div className="investor-market-card">
              <div className="pb-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">MARKET OVERVIEW</div>
                <div className="mt-2 text-3xl font-semibold tracking-tight text-ivory sm:text-4xl">{company.ticker}</div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-muted">CSE SYMBOL</div>
              </div>

              {/* Figures lead; labels sit above them in a smaller, quieter voice. */}
              <dl className="grid grid-cols-2 gap-x-8 gap-y-7 pt-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                {metrics.map((m) => (
                  <div key={m.label} className="flex flex-col">
                    <dt className="order-2 mt-2 text-xs font-medium leading-snug text-fg-muted">{m.label}</dt>
                    <dd className="order-1 text-[2rem] font-medium leading-none tracking-[-0.02em] tabular-nums text-accent sm:text-[2.25rem]">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex items-center gap-2 text-xs text-fg-muted">
                <Info className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span>As of {formatDate(shareData.asOf)}.</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Document ledger */}
        <div className="min-w-0 lg:col-span-7">
          <Reveal delay={0.1}>
            <Heading level={3}>
              <span className="font-normal text-ivory">Investor Resources</span>
            </Heading>

            <ul className="mt-5 border-t border-white/15" aria-label="Latest documents">
              {docs.map((d) => (
                <li key={d.href + d.title} className="border-b border-white/10">
                  <a
                    href={d.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-4 sm:py-5"
                  >
                    <div className="flex min-w-0 items-start gap-3.5 sm:gap-4">
                      <FileText className="mt-0.5 h-5 w-5 shrink-0 stroke-[1.5] text-gold" aria-hidden="true" />
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-ivory transition-colors group-hover:text-accent sm:text-base">
                          {d.title}
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-fg-muted">
                          <span>{d.type}</span>
                          <span className="select-none text-white/20">|</span>
                          <span>{formatDate(d.date)}</span>
                          {d.sizeBytes && (
                            <>
                              <span className="select-none text-white/20">|</span>
                              <span>PDF, {formatFileSize(d.sizeBytes)}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center text-ivory/80 transition-colors group-hover:text-accent">
                      <Download className="h-4 w-4 stroke-[2]" aria-hidden="true" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
