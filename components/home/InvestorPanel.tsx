import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, FileBadge, FileText, Info, Layers, PieChart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
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

export function InvestorPanel() {
  const capital = (label: string) => shareData.capital.find((c) => c.label === label)?.value ?? "Not reported";
  const float = shareData.ownership.find((o) => o.holder === "Float")?.percentage ?? "Not reported";
  const docs = latestDocuments(4);

  function renderAnimatedMetric(raw: string) {
    const matchNum = raw.match(/^([0-9.]+)(.*)$/);
    if (!matchNum || !matchNum[1]) return raw;
    const numPart = matchNum[1];
    const num = parseFloat(numPart);
    const suffix = matchNum[2] ?? "";
    const decimals = numPart.includes(".") ? (numPart.split(".")[1]?.length ?? 0) : 0;
    return <Counter value={num} decimals={decimals} suffix={suffix} />;
  }

  return (
    <Section
      tone="carbon"
      id="investors"
      labelledBy="investors-title"
      className="relative overflow-hidden pb-28 sm:pb-36 lg:pb-40"
    >
      <SectionHeader
        number="06"
        label="Investors"
        id="investors-title"
        title="Investor "
        accent="Information."
        lead="Key market information, reports and presentations for current and prospective investors."
        action={
          <Button
            href="/investors"
            variant="secondary"
            icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
          >
            Go to the Investor Page
          </Button>
        }
      />

      <div className="grid gap-8 lg:gap-10 lg:grid-cols-12 items-start relative z-10">
        {/* Left Column: Market Overview Card */}
        <div className="lg:col-span-5">
          <Reveal>
            <div
              className="investor-market-card relative rounded-2xl bg-carbon border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.4)] overflow-hidden"
              style={{ borderRadius: "20px" }}
            >
              {/* Top Header: Symbol on Left, Angled Ore Image on Right */}
              <div className="relative flex items-stretch justify-between min-h-[140px] border-b border-white/10">
                <div className="p-6 sm:p-7 z-10 flex flex-col justify-center">
                  <div className="text-[11px] font-bold text-stone tracking-[0.14em] uppercase">
                    MARKET OVERVIEW
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-ivory mt-2 tracking-tight">
                    {company.ticker}
                  </div>
                  <div className="text-[11px] font-bold text-stone tracking-[0.14em] uppercase mt-1">
                    CSE SYMBOL
                  </div>
                </div>

                {/* Angled Mineral Rock Photo on Right */}
                <div
                  className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden pointer-events-none"
                  style={{ clipPath: "polygon(28% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
                  aria-hidden="true"
                >
                  <Image
                    src="/images/strategy/quote-ore.jpg"
                    alt="Mineralized gold ore rock"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-carbon via-transparent to-transparent opacity-80" />
                </div>
              </div>

              {/* Middle Rows: Share Data Metrics */}
              <div className="p-6 sm:p-7 space-y-6">
                {/* Common Shares Outstanding */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <Layers className="w-5 h-5 text-gold shrink-0 stroke-[1.75]" aria-hidden="true" />
                    <span className="text-sm sm:text-[15px] font-medium text-ivory truncate">
                      Common Shares Outstanding
                    </span>
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-ivory tabular-nums shrink-0">
                    {renderAnimatedMetric(capital("Common Shares Outstanding"))}
                  </span>
                </div>

                {/* Warrants */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <FileBadge className="w-5 h-5 text-gold shrink-0 stroke-[1.75]" aria-hidden="true" />
                    <span className="text-sm sm:text-[15px] font-medium text-ivory truncate">
                      Warrants
                    </span>
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-ivory tabular-nums shrink-0">
                    {renderAnimatedMetric(capital("Warrants"))}
                  </span>
                </div>

                {/* Public Float */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <PieChart className="w-5 h-5 text-gold shrink-0 stroke-[1.75]" aria-hidden="true" />
                    <span className="text-sm sm:text-[15px] font-medium text-ivory truncate">
                      Public Float
                    </span>
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-ivory tabular-nums shrink-0">
                    {renderAnimatedMetric(float)}
                  </span>
                </div>

                {/* Bottom As Of Date */}
                <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-stone">
                  <Info className="w-4 h-4 text-stone/80 shrink-0" aria-hidden="true" />
                  <span>As of {formatDate(shareData.asOf)}.</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Investor Resources */}
        <div className="min-w-0 lg:col-span-7 flex flex-col justify-start">
          <Reveal delay={0.15}>
            <div className="w-7 h-[2px] bg-gold mb-2.5" />
            <Heading level={3}>
              <span className="text-ivory font-normal block">
                Investor Resources
              </span>
            </Heading>

            <ul className="mt-5 space-y-3.5 sm:space-y-4" aria-label="Latest documents">
              {docs.map((d) => (
                <li key={d.href + d.title}>
                  <a
                    href={d.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group investor-resource-card p-3.5 sm:px-5 sm:py-4 flex items-center justify-between gap-3 sm:gap-4 block"
                    style={{ borderRadius: "16px" }}
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                      {/* Gold Document Icon Badge */}
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold/40 bg-black/60 text-gold"
                        style={{ borderRadius: "10px" }}
                      >
                        <FileText className="h-5 w-5 stroke-[1.75]" aria-hidden="true" />
                      </div>

                      {/* Title & Metadata */}
                      <div className="min-w-0">
                        <div className="text-sm sm:text-base font-bold text-ivory transition-colors group-hover:text-gold truncate">
                          {d.title}
                        </div>
                        <div className="text-xs text-stone mt-1 flex items-center gap-2 flex-wrap">
                          <span>{d.type}</span>
                          <span className="text-white/20 select-none">|</span>
                          <span>{formatDate(d.date)}</span>
                          {d.sizeBytes && (
                            <>
                              <span className="text-white/20 select-none">|</span>
                              <span>PDF, {formatFileSize(d.sizeBytes)}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Download Icon Button */}
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/15 bg-white/5 text-ivory transition-all group-hover:border-gold/60 group-hover:bg-gold/10 group-hover:text-gold"
                      style={{ borderRadius: "8px" }}
                    >
                      <Download className="h-4 w-4 stroke-[2]" aria-hidden="true" />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* Panoramic Rocky Outcrop Horizon at Bottom of Investors */}
      <div
        className="pointer-events-none absolute bottom-0 inset-x-0 h-20 sm:h-24 md:h-28 w-full overflow-hidden select-none z-0"
        aria-hidden="true"
      >
        <Image
          src="/images/team/bedrock-panorama.png"
          alt=""
          fill
          className="object-cover object-bottom"
          priority
        />
      </div>
    </Section>
  );
}
