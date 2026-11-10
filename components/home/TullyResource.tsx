"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, ChevronDown, Download, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimatedNumber } from "@/components/shared/AnimatedNumber";
import { projects } from "@/content/projects";
import {
  resourceCaption,
  resourceColumns,
  tullyResource as mre,
} from "@/content/resource-tully";
import { formatNumber } from "@/lib/format";

export { resourceCaption, resourceColumns };

type MetricMode = "ounces" | "tonnes" | "grade";

/**
 * Tully 2026 Mineral Resource Estimate presentation:
 * Interactive metric modes, animated counters, Indicated vs Inferred ratio bar,
 * NI 43-101 compliant estimate table, and expandable technical disclosures.
 */
export function TullyResource() {
  const tully = projects.find((p) => p.slug === "tully")!;
  const [metricMode, setMetricMode] = useState<MetricMode>("ounces");
  const [techDetailsOpen, setTechDetailsOpen] = useState(false);

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
          className="mb-8 lg:mb-10"
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <Reveal className="min-w-0 lg:col-span-7 xl:col-span-8">
            {/* Interactive Metric Switcher Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-4" role="tablist" aria-label="Resource Metric Mode">
              <button
                type="button"
                role="tab"
                aria-selected={metricMode === "ounces"}
                onClick={() => setMetricMode("ounces")}
                className={`px-3.5 py-1.5 rounded text-xs font-semibold tracking-wider uppercase transition-colors ${
                  metricMode === "ounces"
                    ? "bg-forest text-ivory shadow-xs"
                    : "bg-forest/10 text-fg hover:bg-forest/15"
                }`}
              >
                Contained Gold (oz)
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={metricMode === "tonnes"}
                onClick={() => setMetricMode("tonnes")}
                className={`px-3.5 py-1.5 rounded text-xs font-semibold tracking-wider uppercase transition-colors ${
                  metricMode === "tonnes"
                    ? "bg-forest text-ivory shadow-xs"
                    : "bg-forest/10 text-fg hover:bg-forest/15"
                }`}
              >
                Tonnage (Mt)
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={metricMode === "grade"}
                onClick={() => setMetricMode("grade")}
                className={`px-3.5 py-1.5 rounded text-xs font-semibold tracking-wider uppercase transition-colors ${
                  metricMode === "grade"
                    ? "bg-forest text-ivory shadow-xs"
                    : "bg-forest/10 text-fg hover:bg-forest/15"
                }`}
              >
                Grade (g/t Au)
              </button>
            </div>

            {/* Headline figures on soft panel with Animated Numerical Counters */}
            <div className="rounded bg-soft-ivory p-5 sm:p-7 border border-stone-beige/40">
              <div className="grid grid-cols-2 gap-4 sm:gap-10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
                    <span className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-accent">
                      INDICATED RESOURCE
                    </span>
                  </div>
                  <div className="mt-2.5 text-[1.45rem] font-bold leading-none tracking-tight text-gold sm:text-[2.6rem]">
                    {metricMode === "ounces" && (
                      <>
                        <AnimatedNumber value={164000} /> oz Au
                      </>
                    )}
                    {metricMode === "tonnes" && <>1.62 Mt</>}
                    {metricMode === "grade" && <>3.16 g/t Au</>}
                  </div>
                  <span className="block text-xs text-ink-soft mt-1.5">
                    {metricMode === "ounces" ? "1.62 Mt @ 3.16 g/t Au (73% of total)" : "164,000 contained oz"}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-fg-muted" aria-hidden="true" />
                    <span className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-fg-muted">
                      INFERRED RESOURCE
                    </span>
                  </div>
                  <div className="mt-2.5 text-[1.45rem] font-bold leading-none tracking-tight text-fg sm:text-[2.6rem]">
                    {metricMode === "ounces" && (
                      <>
                        <AnimatedNumber value={62000} /> oz Au
                      </>
                    )}
                    {metricMode === "tonnes" && <>0.95 Mt</>}
                    {metricMode === "grade" && <>2.03 g/t Au</>}
                  </div>
                  <span className="block text-xs text-ink-soft mt-1.5">
                    {metricMode === "ounces" ? "0.95 Mt @ 2.03 g/t Au (27% of total)" : "62,000 contained oz"}
                  </span>
                </div>
              </div>

              {/* Indicated vs Inferred Visual Proportion Bar */}
              <div className="mt-6 pt-5 border-t border-stone-beige/40">
                <div className="flex justify-between items-center text-xs text-fg font-medium mb-2">
                  <span>Resource Confidence Distribution</span>
                  <span className="text-accent font-semibold">73% Indicated Quality</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-forest/10 overflow-hidden flex" aria-hidden="true">
                  <div
                    className="h-full bg-gold transition-all duration-700"
                    style={{ width: "72.6%" }}
                    title="Indicated: 72.6% (164,000 oz)"
                  />
                  <div
                    className="h-full bg-earth-grey/60 transition-all duration-700"
                    style={{ width: "27.4%" }}
                    title="Inferred: 27.4% (62,000 oz)"
                  />
                </div>
                <div className="flex justify-between text-[11px] text-fg-muted mt-1.5">
                  <span>■ Indicated: 164,000 oz (73%)</span>
                  <span>■ Inferred: 62,000 oz (27%)</span>
                </div>
              </div>
            </div>

            {/* Formal NI 43-101 Estimate Table */}
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

            {/* Expandable Technical Resource Details Accordion */}
            <div className="mt-5 border border-stone-beige/40 rounded bg-soft-ivory/60 overflow-hidden">
              <button
                type="button"
                onClick={() => setTechDetailsOpen(!techDetailsOpen)}
                className="w-full flex items-center justify-between p-3.5 text-xs font-semibold uppercase tracking-wider text-fg hover:text-accent transition-colors"
                aria-expanded={techDetailsOpen}
              >
                <span className="flex items-center gap-2">
                  <Info className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                  Technical Parameters & QP Disclosures
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-gold transition-transform duration-200 ${
                    techDetailsOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              {techDetailsOpen ? (
                <div className="p-4 pt-1 text-xs text-ink-soft space-y-2 border-t border-stone-beige/30 leading-relaxed">
                  <p>• <strong>Cut-Off Grade:</strong> 1.1 g/t Au, evaluated at gold price of US$1,950/oz with 85% metallurgical recovery.</p>
                  <p>• <strong>Standard:</strong> Prepared in accordance with CIM Definition Standards by P&E Mining Consultants Inc., effective June 15, 2026.</p>
                  <p>• <strong>Deposit Extent:</strong> Open along strike and at depth; narrow-vein high-grade geological model.</p>
                  <p>• <strong>Development Milestone:</strong> Preliminary Economic Assessment (PEA) actively underway with target completion December 2026.</p>
                </div>
              ) : null}
            </div>

            <p className="mt-4 text-[0.8rem] text-ink-soft">
              Cut-off: 1.1 g/t Au. Effective June 15, 2026. NI 43-101 compliant, P&E Mining Consultants Inc.
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
