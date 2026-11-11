import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { MaskReveal } from "@/components/shared/MaskReveal";
import { Reveal } from "@/components/shared/Reveal";
import { StatNumber } from "@/components/shared/StatNumber";
import { projects } from "@/content/projects";
import { resourceCaption, tullyResource as mre } from "@/content/resource-tully";
import { formatDate, formatNumber } from "@/lib/format";
import type { ResourceRow } from "@/types";
import { SectionIntro } from "./SectionIntro";
import { GrowBar } from "./GrowBar";

type Metric = { label: string; unit: string; get: (r: ResourceRow) => number; format: (n: number) => string };

const metrics: Metric[] = [
  { label: "Contained gold", unit: "oz Au", get: (r) => r.containedOz, format: formatNumber },
  { label: "Tonnage", unit: "Mt", get: (r) => r.tonnesMt, format: (n) => n.toFixed(2) },
  { label: "Average grade", unit: "g/t Au", get: (r) => r.gradeGpt, format: (n) => n.toFixed(2) },
];

/**
 * The Tully 2026 Mineral Resource Estimate on warm charcoal. Every figure,
 * bar length and percentage is derived from content/resource-tully.ts; nothing
 * is typed in here. Counters render their final value on the server.
 */
export function TullyResource() {
  const tully = projects.find((p) => p.slug === "tully");
  const indicated = mre.rows.find((r) => r.category === "Indicated");
  const inferred = mre.rows.find((r) => r.category === "Inferred");
  if (!tully || !indicated || !inferred) return null;

  const totalOz = indicated.containedOz + inferred.containedOz;
  const indicatedShare = (indicated.containedOz / totalOz) * 100;
  const caption = resourceCaption();
  const pea = tully.status.find((s) => /Preliminary Economic Assessment/i.test(s));

  const headline = [
    { row: indicated, dot: "bg-ed-accent" },
    { row: inferred, dot: "bg-ed-steel" },
  ];

  return (
    <section id="resource" aria-labelledby="resource-title" data-tone="deep" className="section-pad relative bg-surface">
      <div className="container-site">
        <SectionIntro
          index="02"
          label="Mineral resource"
          id="resource-title"
          title="Tully Gold Project."
          accent="2026 Mineral Resource Estimate"
          lead={
            <>
              A high-grade underground gold project {tully.location}, {tully.ownership.toLowerCase()}. {mre.notes[0]}
            </>
          }
        />

        <div className="mt-block grid gap-y-block lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-x-col">
          {/* Figures, comparison and disclosures */}
          <div className="lg:col-start-2 lg:row-start-1">
            <Reveal>
              <div className="grid border-y border-ed-ivory/15 sm:grid-cols-2">
                {headline.map(({ row, dot }, i) => (
                  <div
                    key={row.category}
                    className={i === 0 ? "py-8 sm:pr-grid" : "border-t border-ed-ivory/15 py-8 sm:border-l sm:border-t-0 sm:pl-grid"}
                  >
                    <p className="flex items-center gap-3 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-ed-ivory/75">
                      <span className={`h-2 w-2 rounded-full ${dot}`} aria-hidden="true" />
                      {row.category}
                    </p>
                    <p className="font-editorial mt-5 text-[clamp(3rem,4.8vw,4.75rem)] leading-[0.9] text-ed-ivory">
                      <StatNumber value={row.containedOz} />
                    </p>
                    <p className="mt-3 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-ed-ivory/75">Ounces gold</p>
                    <dl className="mt-6 grid grid-cols-2 gap-x-6 border-t border-ed-ivory/10 pt-5">
                      <div>
                        <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-ed-steel">Tonnage</dt>
                        <dd className="mt-1.5 whitespace-nowrap text-[clamp(1rem,1.5vw,1.25rem)] font-medium tabular-nums text-ed-ivory">{row.tonnesMt.toFixed(2)} Mt</dd>
                      </div>
                      <div>
                        <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-ed-steel">Grade</dt>
                        <dd className="mt-1.5 whitespace-nowrap text-[clamp(1rem,1.5vw,1.25rem)] font-medium tabular-nums text-ed-ivory">{row.gradeGpt.toFixed(2)} g/t Au</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Share of contained ounces */}
            <Reveal delay={0.05}>
              <figure className="mt-group">
                <figcaption className="flex flex-wrap items-baseline justify-between gap-2 text-[0.8125rem] text-ed-ivory/75">
                  <span className="font-semibold uppercase tracking-[0.18em]">Share of contained ounces</span>
                  <span>
                    <span className="font-semibold tabular-nums text-ed-accent-light">{indicatedShare.toFixed(1)}%</span> Indicated of{" "}
                    <span className="tabular-nums">{formatNumber(totalOz)}</span> oz in total
                  </span>
                </figcaption>
                <div className="resource-split mt-4">
                  <GrowBar percent={indicatedShare} className="bg-ed-accent" />
                  <GrowBar percent={100 - indicatedShare} className="bg-ed-ivory/70" delay={0.15} />
                </div>
              </figure>
            </Reveal>

            {/* Indicated vs Inferred, metric by metric */}
            <Reveal delay={0.1}>
              <div className="mt-group grid gap-8 border-t border-ed-ivory/15 pt-8 sm:grid-cols-3 sm:gap-x-8">
                {metrics.map((m) => {
                  const a = m.get(indicated);
                  const b = m.get(inferred);
                  const max = Math.max(a, b);
                  return (
                    <figure key={m.label}>
                      <figcaption className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-ed-ivory/75">
                        {m.label} <span className="normal-case tracking-normal text-ed-ivory/70">({m.unit})</span>
                      </figcaption>
                      <ul className="mt-4 space-y-4">
                        {[
                          { row: indicated, v: a, bar: "bg-ed-accent" },
                          { row: inferred, v: b, bar: "bg-ed-ivory/70" },
                        ].map(({ row, v, bar }, i) => (
                          <li key={row.category}>
                            <p className="flex items-baseline justify-between text-[0.875rem]">
                              <span className="text-ed-ivory/75">{row.category}</span>
                              <span className="font-semibold tabular-nums text-ed-ivory">
                                {m.format(v)}
                                <span className="sr-only"> {m.unit}</span>
                              </span>
                            </p>
                            <div className="resource-bar mt-2">
                              <GrowBar percent={(v / max) * 100} className={`h-full ${bar}`} delay={i * 0.1} />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </figure>
                  );
                })}
              </div>
            </Reveal>

            {/* Technical disclosures */}
            <Reveal delay={0.1}>
              <div className="mt-group border-t border-ed-ivory/15 pt-8">
                <ul className="divide-y divide-ed-ivory/10 text-[0.8125rem] leading-relaxed text-ed-ivory/75">
                  <li className="pb-3">{caption.endsWith(".") ? caption : `${caption}.`}</li>
                  {pea ? <li className="py-3">{pea}.</li> : null}
                  <li className="pt-3">Mineral Resources which are not Mineral Reserves do not have demonstrated economic viability.</li>
                </ul>
                <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-1">
                  <Link href="/projects/tully#resource" className="link-ed">
                    <span>View the full resource table</span>
                    <ArrowRight aria-hidden />
                  </Link>
                  <a href={mre.newsRelease.href} target="_blank" rel="noopener noreferrer" className="link-ed text-ed-ivory/85">
                    <span>News release, {formatDate(mre.newsRelease.date)}</span>
                    <ArrowUpRight aria-hidden />
                    <span className="sr-only"> (PDF, opens in a new tab)</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Drill core photograph: a full column beside the data, top-aligned with it */}
          <figure className="lg:sticky lg:top-[calc(var(--header-h)+var(--space-group))] lg:col-start-1 lg:row-start-1">
            <MaskReveal className="frame-ed relative aspect-[4/3] w-full sm:aspect-[3/2] lg:aspect-[4/5]" from="bottom" delay={0.1}>
              <Image
                src="/images/home/resource-drill-core.jpg"
                alt="Split diamond drill core laid out in wooden core boxes"
                fill
                sizes="(min-width: 1440px) 560px, (min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[50%_40%]"
              />
            </MaskReveal>
            <figcaption className="caption-ed mt-3">Diamond drill core. Illustrative image, not Tully core.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
