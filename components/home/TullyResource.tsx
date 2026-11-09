import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
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

/**
 * Presented as a report page, not a card: headline figures on a ruled band,
 * the estimate table, the qualifying note, then the supporting facts.
 */
export function TullyResource() {
  const tully = projects.find((p) => p.slug === "tully")!;

  return (
    <Section tone="warm" id="resource" labelledBy="resource-title" className="relative overflow-hidden">
      {/* Core-sample photograph along the left edge: a straight cut with a bronze hairline. */}
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-0 hidden w-[160px] overflow-hidden border-r border-gold/50 lg:block xl:w-[200px]">
        <Image
          src="/images/resource/tully-gold-rock.jpg"
          alt="Tully project mineralized gold rock"
          fill
          sizes="200px"
          quality={90}
          className="object-cover object-left"
          priority
        />
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
          className="mb-10 lg:mb-12"
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <Reveal className="min-w-0 lg:col-span-7 xl:col-span-8">
            {/* Headline figures */}
            {/* Headline figures on a soft panel: background contrast, not rules, sets them apart. */}
            <div className="grid grid-cols-2 gap-4 rounded bg-soft-ivory px-5 py-6 sm:gap-10 sm:px-8 sm:py-8">
              <div>
                <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-accent">
                  INDICATED
                </span>
                <span className="mt-3 block whitespace-nowrap text-[1.35rem] font-medium leading-none tracking-[-0.02em] text-gold tabular-nums sm:text-[2.6rem]">
                  {formatNumber(164000)} oz Au
                </span>
              </div>
              <div>
                <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-fg-muted">
                  INFERRED
                </span>
                <span className="mt-3 block whitespace-nowrap text-[1.35rem] font-medium leading-none tracking-[-0.02em] text-fg tabular-nums sm:text-[2.6rem]">
                  {formatNumber(62000)} oz Au
                </span>
              </div>
            </div>

            {/* Estimate table: one rule under the header; the Indicated tint carries the emphasis. */}
            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-left tabular-nums">
                <thead>
                  <tr className="border-b border-stone-beige text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-fg-muted sm:text-[0.72rem] sm:tracking-[0.12em]">
                    <th className="pb-3 pr-2 font-semibold sm:pr-4">CATEGORY</th>
                    <th className="px-2 pb-3 text-right font-semibold sm:px-4">TONNES</th>
                    <th className="px-2 pb-3 text-right font-semibold sm:px-4">GRADE</th>
                    <th className="pb-3 pl-2 text-right font-semibold sm:pl-4">CONTAINED GOLD</th>
                  </tr>
                </thead>
                <tbody className="text-[0.85rem] sm:text-[0.9375rem]">
                  <tr className="bg-gold/10 font-semibold text-fg">
                    <td className="py-3.5 pl-3 pr-2 sm:pr-4">Indicated</td>
                    <td className="px-2 py-3.5 text-right sm:px-4">1.62 Mt</td>
                    <td className="px-2 py-3.5 text-right sm:px-4">3.16 g/t Au</td>
                    <td className="py-3.5 pl-2 pr-3 text-right sm:pl-4">164,000 oz</td>
                  </tr>
                  <tr className="font-medium text-fg">
                    <td className="py-3.5 pl-3 pr-2 sm:pr-4">Inferred</td>
                    <td className="px-2 py-3.5 text-right sm:px-4">0.95 Mt</td>
                    <td className="px-2 py-3.5 text-right sm:px-4">2.03 g/t Au</td>
                    <td className="py-3.5 pl-2 pr-3 text-right sm:pl-4">62,000 oz</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-[0.8rem] text-ink-soft">
              Cut-off: 1.1 g/t Au. Effective June 15, 2026. NI 43-101, P&E Mining Consultants Inc.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <Button href="/projects/tully#resource" icon={<ArrowRight aria-hidden className="h-4 w-4" />}>
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
          </Reveal>

          {/* Supporting facts and the cautionary note */}
          <Reveal delay={0.1} className="lg:col-span-5 xl:col-span-4">
            <dl className="space-y-6 lg:pt-2">
              <div>
                <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-fg-muted">Ownership</dt>
                <dd className="mt-1.5 text-[1.05rem] font-semibold text-fg">{tully.ownership}</dd>
              </div>
              <div>
                <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-fg-muted">AREA</dt>
                <dd className="mt-1.5 text-[1.05rem] font-semibold leading-snug text-fg">
                  {formatNumber(tully.areaHa)} ha mining lease, one leased mining claim and 11 claims
                </dd>
              </div>
              <div>
                <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-fg-muted">DEPOSIT</dt>
                <dd className="mt-1.5 text-[1.05rem] font-semibold text-fg">Open along strike and at depth</dd>
              </div>
            </dl>

            <div className="mt-9 space-y-1 border-l-2 border-gold py-1 pl-4 text-[0.8rem] text-ink-soft">
              <p>Mineral Resources which are not Mineral Reserves do not have demonstrated economic viability.</p>
              <p>
                Details in the news release of{" "}
                <a
                  href={mre.newsRelease.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent underline underline-offset-2 hover:text-fg"
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
