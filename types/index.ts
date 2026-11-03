export type Tone = "carbon" | "black" | "paper";

export type NavLink = { label: string; href: string; description?: string };
export type NavGroup = { label: string; items: NavLink[]; overview?: NavLink };

export type Photo = {
  src: string;
  width: number;
  height: number;
  /** Empty only when decorative. */
  alt: string;
  credit: string;
  licence: string;
};

export type HeroFeatureIcon = "layers" | "pickaxe" | "crosshair";
export type HeroStripIcon = "chart" | "pin" | "mountain" | "metals";

export type HomeHero = {
  eyebrow: string;
  title: string;
  accent: string;
  lead: string;
  primaryCta: NavLink;
  secondaryCta: NavLink;
  /** Each feature is set on exactly two lines. */
  features: { icon: HeroFeatureIcon; lines: [string, string] }[];
  strip: { icon: HeroStripIcon; label: string; emphasis?: boolean }[];
  photo: Photo;
  /** CSS object-position; the subject sits in the right third. */
  focalPoint: string;
};

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
