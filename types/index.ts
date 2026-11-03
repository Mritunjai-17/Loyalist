export type Tone = "carbon" | "black" | "paper";

export type ResourceRow = {
  category: "Indicated" | "Inferred";
  tonnesMt: number;
  gradeGpt: number;
  containedOz: number;
};

export type ResourceEstimate = {
  project: string;
  effectiveDate: string;
  standard: string;
  author: string;
  cutOff: string;
  rows: ResourceRow[];
  notes: string[];
  newsReleaseHref: string | null;
};
