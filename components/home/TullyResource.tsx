import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Table, type Column } from "@/components/ui/Table";
import { CautionNote } from "@/components/shared/CautionNote";
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

function OunceBars() {
  const max = Math.max(...mre.rows.map((r) => r.containedOz));
  return (
    <figure className="mt-12">
      <figcaption className="text-small">Contained gold by category</figcaption>
      <dl className="mt-4 grid gap-4">
        {mre.rows.map((r) => (
          <div key={r.category} className="grid gap-2 sm:grid-cols-[7rem_1fr] sm:items-center">
            <dt className="text-small text-fg">{r.category}</dt>
            <dd className="flex items-center gap-4">
              <span
                aria-hidden
                className={r.category === "Indicated" ? "ounce-bar ounce-bar-indicated" : "ounce-bar ounce-bar-inferred"}
                style={{ width: `${(r.containedOz / max) * 100}%` }}
              />
              <span className="whitespace-nowrap font-medium text-fg">{formatNumber(r.containedOz / 1000)} koz</span>
            </dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}

export function TullyResource() {
  const tully = projects.find((p) => p.slug === "tully")!;
  const facts = [
    { label: "Ownership", value: tully.ownership },
    { label: "Area", value: `${formatNumber(tully.areaHa)} ha mining lease, one leased mining claim and 11 claims` },
    { label: "Deposit", value: "Open along strike and at depth" },
  ];

  return (
    <Section tone="paper" id="resource" labelledBy="resource-title">
      <SectionHeader number="02" label="Resource" id="resource-title" title="Tully gold project: 2026 mineral resource estimate" />
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-7">
          <Table label="Tully 2026 mineral resource estimate" columns={resourceColumns} rows={mre.rows} rowKey={(r) => r.category} caption={resourceCaption()} />
          <OunceBars />
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/projects/tully#resource" icon={<ArrowRight aria-hidden />}>
              View full resource table
            </Button>
            <Button href={mre.newsRelease.href} external variant="secondary" icon={<Download aria-hidden />}>
              Read the news release
              <span className="sr-only"> (PDF, opens in a new tab)</span>
            </Button>
          </div>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <dl className="ruled-facts">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-small">{f.label}</dt>
                <dd className="mt-1 font-medium text-fg">{f.value}</dd>
              </div>
            ))}
          </dl>
          <CautionNote className="mt-10" />
        </div>
      </div>
    </Section>
  );
}
