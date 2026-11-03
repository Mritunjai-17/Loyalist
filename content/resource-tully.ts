import type { ResourceEstimate } from "@/types";

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
  notes: ["Open along strike and at depth.", "About 73% of ounces are in the Indicated category."],
  // TODO(content): link to the Aug 21, 2026 news release PDF once press-releases.ts is populated from Source A.
  newsReleaseHref: null,
};
