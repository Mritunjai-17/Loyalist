import { formatNumber } from "@/lib/format";
import type { Project } from "@/types";

/** Architectural project specifications dossier, sticky beside the project text on desktop. */
export function ProjectFacts({ project }: { project: Project }) {
  const facts = [
    { label: "Location", value: project.location },
    { label: "Land Area", value: `${formatNumber(project.areaHa)} ha` },
    { label: "Tenure / Claims", value: project.claims },
    { label: "Target Commodities", value: project.metalsLabel },
    { label: "Equity Ownership", value: project.ownership },
  ];
  return (
    <aside
      aria-label={`${project.name} key specifications`}
      className="project-facts bg-white rounded-xl border border-black/[0.04] border-t-2 border-t-gold p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_6px_20px_rgba(32,32,29,0.03)]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-black/[0.06] pb-4">
        <div>
          <span className="text-[10px] font-bold text-gold tracking-[0.16em] uppercase block">
            Technical Dossier
          </span>
          <span className="text-sm font-bold text-ink font-serif mt-0.5 block">
            Key Specifications
          </span>
        </div>
        <span className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-bold tracking-wider bg-champagne text-gold border border-gold/30 uppercase">
          {project.stage}
        </span>
      </div>

      <dl className="mt-4 divide-y divide-black/[0.06]">
        {facts.map((f) => (
          <div key={f.label} className="py-3">
            <dt className="text-[11px] font-semibold text-stone uppercase tracking-wider">{f.label}</dt>
            <dd className="mt-0.5 font-semibold text-ink text-sm leading-snug">{f.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
