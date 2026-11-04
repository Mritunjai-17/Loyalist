import Image from "next/image";
import { ArrowRight, Download, Layers, MapPin, Pickaxe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/shared/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { type Column } from "@/components/ui/Table";
import { projects } from "@/content/projects";
import { tullyResource as mre } from "@/content/resource-tully";
import { formatDate, formatNumber } from "@/lib/format";
import type { ResourceRow } from "@/types";

export const resourceColumns: Column<ResourceRow>[] = [
  { key: "category", header: "Category", render: (r) => r.category },
  { key: "tonnes", header: "Tonnes", numeric: true, render: (r) => `${r.tonnesMt.toFixed(2)} Mt` },
  { key: "grade", header: "Grade", numeric: true, render: (r) => `${r.gradeGpt.toFixed(2)} g/t Au` },
  { key: "oz", header: "Contained gold", numeric: true, render: (r) => `${formatNumber(r.containedOz)} oz` },
];

export function resourceCaption() {
  return `Cut-off ${mre.cutOff}. Effective ${formatDate(mre.effectiveDate)}. ${mre.standard}, ${mre.author}`;
}

export function TullyResource() {
  const tully = projects.find((p) => p.slug === "tully")!;

  return (
    <Section tone="paper" id="resource" labelledBy="resource-title" className="relative overflow-hidden">
      {/* Decorative left-edge mineral rock photography with angled cut and gold accent rule */}
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-0 hidden w-[220px] overflow-hidden lg:block xl:w-[260px]">
        <Image
          src="/images/resource/tully-gold-rock.jpg"
          alt="Tully project mineralized gold rock"
          fill
          sizes="260px"
          quality={90}
          className="object-cover object-left"
          priority
        />
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden>
          <polygon points="84,0 100,0 100,100 58,100" fill="var(--paper)" />
          <line x1="84" y1="0" x2="58" y2="100" stroke="var(--gold)" strokeWidth="0.8" />
        </svg>
      </div>

      <div className="relative z-10 lg:pl-[170px] xl:pl-[210px]">
        <SectionHeader
          number="02"
          label="Resource"
          id="resource-title"
          title="Tully Gold Project:"
          accent="2026 Mineral Resource Estimate"
          lead="A cornerstone asset in the Timmins district, with a significant gold resource and continued growth potential."
          stacked
          className="mb-8 lg:mb-10"
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Main Floating Resource Card */}
          <Reveal className="min-w-0 lg:col-span-7 xl:col-span-8">
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:p-8">
            {/* Top KPI Box Row */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Indicated KPI Card */}
              <div className="flex items-center justify-between rounded-xl bg-black p-4 sm:p-5 text-white shadow-sm">
                <div>
                  <span className="block text-[0.7rem] font-semibold uppercase tracking-wider text-stone sm:text-[0.75rem]">
                    INDICATED
                  </span>
                  <span className="mt-1 block text-[1.4rem] font-bold text-gold sm:text-[1.65rem]">
                    <Counter value={164000} suffix=" oz Au" />
                  </span>
                </div>
                <Image
                  src="/images/resource/gold-cluster.png"
                  alt="Gold nuggets"
                  width={55}
                  height={42}
                  className="h-8 w-auto flex-none object-contain sm:h-9"
                />
              </div>

              {/* Inferred KPI Card */}
              <div className="rounded-xl bg-[rgba(237,231,221,0.9)] p-4 sm:p-5 text-ink shadow-sm">
                <span className="block text-[0.7rem] font-semibold uppercase tracking-wider text-inkSoft sm:text-[0.75rem]">
                  INFERRED
                </span>
                <span className="mt-1 block text-[1.4rem] font-bold text-ink sm:text-[1.65rem]">
                  <Counter value={62000} suffix=" oz Au" />
                </span>
              </div>
            </div>

            {/* Table */}
            <div className="mt-7 overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-black/10 text-[0.72rem] font-semibold uppercase tracking-wider text-inkSoft sm:text-[0.75rem]">
                    <th className="pb-3 pr-4 font-semibold">CATEGORY</th>
                    <th className="px-4 pb-3 text-right font-semibold">TONNES</th>
                    <th className="px-4 pb-3 text-right font-semibold">GRADE</th>
                    <th className="pb-3 pl-4 text-right font-semibold">CONTAINED GOLD</th>
                  </tr>
                </thead>
                <tbody className="text-[0.9rem] sm:text-[0.9375rem]">
                  {/* Indicated Row - Highlighted warm gold/cream pill */}
                  <tr className="bg-[rgba(201,164,92,0.18)] font-bold text-ink">
                    <td className="py-3 pl-4 pr-4 rounded-l-lg sm:py-3.5">Indicated</td>
                    <td className="px-4 py-3 text-right sm:py-3.5">1.62 Mt</td>
                    <td className="px-4 py-3 text-right sm:py-3.5">3.16 g/t Au</td>
                    <td className="py-3 pl-4 pr-4 text-right rounded-r-lg sm:py-3.5">164,000 oz</td>
                  </tr>
                  {/* Inferred Row */}
                  <tr className="font-medium text-ink">
                    <td className="py-3 pl-4 pr-4 sm:py-3.5">Inferred</td>
                    <td className="px-4 py-3 text-right sm:py-3.5">0.95 Mt</td>
                    <td className="px-4 py-3 text-right sm:py-3.5">2.03 g/t Au</td>
                    <td className="py-3 pl-4 pr-4 text-right sm:py-3.5">62,000 oz</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footnote */}
            <p className="mt-4 text-[0.8rem] text-inkSoft">
              Cut-off: 1.1 g/t Au. Effective June 15, 2026. NI 43-101, P&E Mining Consultants Inc.
            </p>

            {/* Action Buttons */}
            <div className="mt-7 flex flex-wrap gap-3 sm:gap-4">
              <Button
                href="/projects/tully#resource"
                icon={<ArrowRight aria-hidden className="h-4 w-4" />}
              >
                View Full Resource Table
              </Button>
              <Button
                href={mre.newsRelease.href}
                external
                variant="secondary"
                icon={<Download aria-hidden className="h-4 w-4" />}
              >
                Read the News Release
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Right Column Facts & Caution Note */}
        <Reveal delay={0.15} className="space-y-6 lg:col-span-5 xl:col-span-4 lg:pt-1">
          <div className="space-y-4">
              {/* Card 1: Ownership */}
              <div className="flex items-center gap-4 py-1">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-black/10 bg-white text-gold shadow-sm">
                  <Layers className="h-6 w-6 stroke-[1.5]" />
                </div>
                <div>
                  <span className="block text-[0.8rem] font-medium text-inkSoft">Ownership</span>
                  <span className="block text-[0.95rem] font-bold text-ink">{tully.ownership}</span>
                </div>
              </div>

              {/* Card 2: Area */}
              <div className="flex items-center gap-4 border-t border-black/10 pt-4">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-black/10 bg-white text-gold shadow-sm">
                  <MapPin className="h-6 w-6 stroke-[1.5]" />
                </div>
                <div>
                  <span className="block text-[0.72rem] font-semibold uppercase tracking-wider text-inkSoft">
                    AREA
                  </span>
                  <span className="block text-[0.92rem] font-bold leading-snug text-ink">
                    {formatNumber(tully.areaHa)} ha mining lease, one leased mining claim and 11 claims
                  </span>
                </div>
              </div>

              {/* Card 3: Deposit */}
              <div className="flex items-center gap-4 border-t border-black/10 pt-4">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-black/10 bg-white text-gold shadow-sm">
                  <Pickaxe className="h-6 w-6 stroke-[1.5]" />
                </div>
                <div>
                  <span className="block text-[0.72rem] font-semibold uppercase tracking-wider text-inkSoft">
                    DEPOSIT
                  </span>
                  <span className="block text-[0.92rem] font-bold text-ink">
                    Open along strike and at depth
                  </span>
                </div>
              </div>
            </div>

            {/* Cautionary note */}
            <div className="space-y-1 border-l-2 border-gold py-1 pl-4 text-[0.8rem] text-inkSoft">
              <p>Mineral Resources which are not Mineral Reserves do not have demonstrated economic viability.</p>
              <p>
                Details in the news release of{" "}
                <a
                  href={mre.newsRelease.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-goldInk underline underline-offset-2 hover:text-ink"
                >
                  July 7, 2026 (PDF)
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
