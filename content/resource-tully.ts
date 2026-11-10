import type { Column } from "@/components/ui/Table";
import { formatDate, formatNumber } from "@/lib/format";
import type { ResourceEstimate, ResourceRow } from "@/types";

// Source B (prompt section 13). Not on Source A, which predates the 2026 estimate.
// VERIFY against filed news release
export const tullyResource: ResourceEstimate = {
  project: "Tully",
  effectiveDate: "2026-06-15",
  standard: "NI 43-101",
  author: "P&E Mining Consultants Inc.",
  cutOff: "1.1 g/t Au",
  rows: [
    { category: "Indicated", tonnesMt: 1.62, gradeGpt: 3.16, containedOz: 164_000 },
    { category: "Inferred", tonnesMt: 0.95, gradeGpt: 2.03, containedOz: 62_000 },
  ],
  cutOffValue: 1.1,
  notes: ["Open along strike and at depth.", "About 73% of ounces are in the Indicated category."],
  // The Aug 21, 2026 filing release returns 404 on Source A, so this links the July 7, 2026 release
  // that announced the same estimate. TODO(content): restore the Aug 21 PDF.
  newsRelease: { date: "2026-07-07", href: "https://loyalistexploration.com/api/pdf/view/6a4cfbb4a79e5a6c69fefc67" },
};

export const resourceColumns: Column<ResourceRow>[] = [
  { key: "category", header: "Category", render: (r) => r.category },
  { key: "tonnes", header: "Tonnes", numeric: true, render: (r) => `${r.tonnesMt.toFixed(2)} Mt` },
  { key: "grade", header: "Grade", numeric: true, render: (r) => `${r.gradeGpt.toFixed(2)} g/t Au` },
  { key: "oz", header: "Contained gold", numeric: true, render: (r) => `${formatNumber(r.containedOz)} oz` },
];

export function resourceCaption() {
  return `Cut-off ${tullyResource.cutOff}. Effective ${formatDate(tullyResource.effectiveDate)}. ${tullyResource.standard}, ${tullyResource.author}`;
}
