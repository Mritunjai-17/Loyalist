import type { PageIntro, Photo } from "@/types";

// Intros for every interior route. Leads use Source A wording where it exists;
// the rest describe plainly what the page holds.

const home = { label: "Home", href: "/" };
const about = { label: "About", href: "/about/company-profile" };
const investors = { label: "Investors", href: "/investors" };

// The same file as the home hero (supplied by the Company).
const siteStrip: NonNullable<PageIntro["photo"]> = {
  src: "/images/hero/hero.png",
  width: 1774,
  height: 887,
  alt: "",
  credit: "Loyalist Exploration Limited",
  licence: "Company photography",
  focalPoint: "68% 50%",
};

export const locationMap: Photo = {
  src: "/images/projects/timmins-camp-location-map.jpg",
  width: 1600,
  height: 1028,
  alt: "Location map of the Timmins Mining Camp showing the Loyalist Exploration project areas",
  credit: "Loyalist Exploration Limited (loyalistexploration.com)",
  licence: "TODO(content): confirm company ownership and licence",
};

export const pages = {
  companyProfile: {
    path: "/about/company-profile",
    title: "Company profile",
    eyebrow: "About",
    heading: "A buy Timmins strategy in",
    accent: "the Timmins Mining Camp.",
    lead: 'Loyalist Exploration Limited (CSE: PNGC) is a mineral exploration company focused on a "buy Timmins" strategy by acquiring and advancing high-potential gold and strategic metals projects in the prolific Timmins Mining Camp.',
    description:
      "Who Loyalist Exploration is, its acquire, explore and advance strategy, and the Timmins Mining Camp where its four projects sit.",
    breadcrumbs: [home, about, { label: "Company profile" }],
  },
  ourTeam: {
    path: "/about/our-team",
    title: "Our team",
    eyebrow: "About",
    heading: "Management, directors",
    accent: "and advisors.",
    lead: "The people behind Loyalist Exploration, in the order the Company lists them: management, then the board, then advisors.",
    description: "Management, board of directors and advisors of Loyalist Exploration Limited, with biographies.",
    breadcrumbs: [home, about, { label: "Our team" }],
  },
  projects: {
    path: "/projects",
    title: "Projects",
    eyebrow: "Projects",
    heading: "Four projects around",
    accent: "Timmins, Ontario.",
    lead: "Tully, Loveland, Gold Rush and DeSantis cover about 8,300 ha between 4.5 km and 45 km from Timmins, in the Abitibi Greenstone Belt.",
    description:
      "Tully, Loveland, Gold Rush and DeSantis: location, area, metals, stage and ownership of the four Loyalist Exploration projects near Timmins.",
    breadcrumbs: [home, { label: "Projects" }],
    photo: siteStrip,
  },
  investors: {
    path: "/investors",
    title: "Investors",
    eyebrow: "Investors",
    heading: "Investor",
    accent: "information.",
    lead: "Share structure, financial statements, technical reports and meeting materials for Loyalist Exploration Limited (CSE: PNGC).",
    description: "Share data, the latest filings and links to financial statements, technical reports and annual meeting documents.",
    breadcrumbs: [home, { label: "Investors" }],
  },
  corporateStructure: {
    path: "/investors/corporate-structure",
    title: "Corporate structure",
    eyebrow: "Investors",
    heading: "Corporate structure.",
    lead: "Capital structure and ownership as published by the Company.",
    description: "Common shares outstanding, LTIP grants, warrants and the ownership breakdown of Loyalist Exploration Limited.",
    breadcrumbs: [home, investors, { label: "Corporate structure" }],
  },
  financialStatements: {
    path: "/investors/financial-statements",
    title: "Financial statements & MD&A",
    eyebrow: "Investors",
    heading: "Financial statements",
    accent: "and MD&A.",
    lead: "Quarterly and annual financial statements with management's discussion and analysis, newest first.",
    description: "Financial statements and MD&A filed by Loyalist Exploration Limited, filterable by year and type.",
    breadcrumbs: [home, investors, { label: "Financial statements & MD&A" }],
  },
  technicalReports: {
    path: "/investors/technical-reports",
    title: "Technical reports",
    eyebrow: "Investors",
    heading: "Technical reports.",
    lead: "NI 43-101 technical reports on the Company's projects.",
    description: "NI 43-101 technical reports for the Loyalist Exploration projects.",
    breadcrumbs: [home, investors, { label: "Technical reports" }],
  },
  annualMeeting: {
    path: "/investors/annual-meeting",
    title: "Annual meeting documents",
    eyebrow: "Investors",
    heading: "Annual meeting documents.",
    lead: "Notices, circulars and proxy materials for shareholder meetings.",
    description: "Notice of meeting, management information circular and form of proxy for Loyalist Exploration shareholder meetings.",
    breadcrumbs: [home, investors, { label: "Annual meeting" }],
  },
  pressReleases: {
    path: "/press-releases",
    title: "Press releases",
    eyebrow: "News",
    heading: "Press releases.",
    lead: "News releases from Loyalist Exploration Limited, newest first. Each one opens as a PDF.",
    description: "All Loyalist Exploration Limited news releases, filterable by year.",
    breadcrumbs: [home, { label: "Press releases" }],
  },
  contact: {
    path: "/contact",
    title: "Contact",
    eyebrow: "Contact",
    heading: "Contact",
    accent: "Loyalist Exploration.",
    lead: "Questions about the projects, the share structure or the corporate presentation go to the head office in Toronto.",
    description: "Email, phone and head office address for Loyalist Exploration Limited, and a contact form.",
    breadcrumbs: [home, { label: "Contact" }],
  },
  disclaimer: {
    path: "/disclaimer",
    title: "Disclaimer",
    eyebrow: "Legal",
    heading: "Disclaimer.",
    lead: "Terms of use for this website, the cautionary note on forward-looking information and the privacy statement.",
    description: "Website terms, forward-looking information, disclaimer to United States investors and privacy statement.",
    breadcrumbs: [home, { label: "Disclaimer" }],
  },
} satisfies Record<string, PageIntro>;

// Date the investor content (filings, releases, share data) was last pulled from Source A.
export const investorsUpdated = "2026-11-03";

// Source A /page/company.html lists three projects. DeSantis was acquired later (Source B,
// February 26, 2026 release), so its line is written from the DeSantis project page.
// VERIFY against filed news release
export const profileProjectLines: { name: string; slug: string; line: string }[] = [
  { name: "Tully", slug: "tully", line: "A gold deposit ready for production permitting." },
  {
    name: "Loveland",
    slug: "loveland",
    line: "A large property with historic nickel/copper resources and high-grade gold drill intercepts and surface showings.",
  },
  { name: "Gold Rush", slug: "gold-rush", line: "An early-stage gold/silver property with high-grade drill intercepts." },
  {
    name: "DeSantis",
    slug: "desantis",
    line: "A past-producing gold mine along the Destor-Porcupine Deformation Zone, with 35,784 oz of historical production.",
  },
];
