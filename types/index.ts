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

export type Metal = "Au" | "Ag" | "Cu" | "Ni";

export type Project = {
  slug: "tully" | "loveland" | "gold-rush" | "desantis";
  number: string;
  name: string;
  tagline: string;
  location: string;
  areaHa: number;
  claims: string;
  metals: Metal[];
  metalsLabel: string;
  stage: string;
  ownership: string;
  summary: string;
  overview: string[];
  status: string[];
  geology: string[];
  highlights: { value: string; label: string }[];
  hasResource: boolean;
  qualifiedPerson: string;
  historicalNote?: string;
  /** Schematic position on the ProjectMap viewBox (0 0 320 320). */
  map: { x: number; y: number; direction: string; distanceKm: number; labelSide: "left" | "right" };
};

export type TeamGroup = "management" | "directors" | "advisors";

export type TeamMember = {
  id: string;
  name: string;
  credentials?: string;
  title: string;
  group: TeamGroup;
  summary: string;
  bio: string[];
  portrait?: Photo;
};

export type PressRelease = {
  date: string;
  title: string;
  href: string;
  sizeBytes: number | null;
  tag: "News Release";
  available: boolean;
};

export type DocumentCategory = "financials" | "technical" | "annual-meeting" | "presentation";

export type DocumentItem = {
  category: DocumentCategory;
  type: string;
  title: string;
  date: string;
  href: string;
  sizeBytes: number | null;
  available: boolean;
  description?: string;
  project?: Project["slug"];
  meetingYear?: number;
};

export type ShareData = {
  asOf: string;
  capital: { label: string; value: string }[];
  ownership: { holder: string; percentage: string }[];
};

export type StrategyStep = { numeral: string; title: string; body: string; link: NavLink };

export type Quote = { text: string; name: string; title: string; source: string };

export type GlossaryTerm = { term: string; definition: string };

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
  cutOffValue: number;
  newsRelease: { date: string; href: string };
};

export type Breadcrumb = { label: string; href?: string };

export type PageIntro = {
  path: string;
  /** Short label for metadata and breadcrumbs. */
  title: string;
  eyebrow: string;
  heading: string;
  /** Final phrase of the h1, set in italic gold. */
  accent?: string;
  lead: string;
  description: string;
  breadcrumbs: Breadcrumb[];
  photo?: Photo & { focalPoint: string };
};

export type DisclaimerSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};
