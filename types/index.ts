export type Tone = "carbon" | "black" | "paper";

export type NavLink = { label: string; href: string; description?: string };
export type NavGroup = { label: string; items: NavLink[]; overview?: NavLink };

export type SocialNetwork = "LinkedIn" | "X" | "Facebook" | "YouTube" | "Instagram";

export type Company = {
  legalName: string;
  shortName: string;
  exchange: string;
  ticker: string;
  slogan: string;
  summary: string;
  email: string;
  phone: { display: string; href: string };
  headOffice: { street: string; city: string; region: string; postalCode: string; country: string };
  coordinates: { label: string; lat: number; lon: number; place: string };
  quoteUrl: string;
  sedarUrl: string;
  social: { network: SocialNetwork; href: string }[];
  presentation: { title: string; href: string; date: string; sizeBytes: number };
};

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
