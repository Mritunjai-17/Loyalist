import type { NavLink, Quote, StrategyStep } from "@/types";

// Steps summarise Source A ("acquiring, exploring, and developing") with dates from the
// Source A press release list.
export const strategySteps: StrategyStep[] = [
  {
    numeral: "01",
    title: "Acquire",
    body: "Assemble quality gold and strategic metals properties in the Timmins Mining Camp. Loveland closed in June 2025, Tully in October 2025 and DeSantis in February 2026, alongside the option on Gold Rush.",
    link: { label: "See the four projects", href: "/projects" },
  },
  {
    numeral: "02",
    title: "Explore",
    body: "Put historical data and new work to use. A review of 488 historical DeSantis drill holes identified six priority targets, and an NI 43-101 technical report on Loveland was filed in April 2026.",
    link: { label: "Read about DeSantis", href: "/projects/desantis" },
  },
  {
    numeral: "03",
    title: "Advance",
    body: "Move Tully toward a production decision. The 2026 Mineral Resource Estimate was completed in July 2026, and a Preliminary Economic Assessment is underway with a December 2026 target.",
    link: { label: "Follow the Tully project", href: "/projects/tully" },
  },
];

// Source B, attributed to Errol Farr. Keep verbatim.
// TODO(content): the brief supplies only the opening of this statement, ending in "...".
// Replace with the full statement from the filed release.
export const ceoStatement: Quote = {
  text: "I want our logo and tagline to reflect Loyalist's focus on creating value through project advancement — we intend to be future miners.",
  name: "Errol Farr",
  title: "President & CEO",
  source: "Source B",
};

// Source A home page, "Who We Are". The first paragraph's project list is replaced with the
// current portfolio (Source B); Source A names only Gold Rush and Loveland.
// VERIFY against filed news release
export const whoWeAre: string[] = [
  "Loyalist Exploration Limited is a mineral exploration company concentrating on acquiring, exploring, and developing quality mineral properties in the Timmins Mining District. The Company's portfolio is the Tully, DeSantis, Loveland and Gold Rush projects, about 3,900 ha in all.",
  "We are committed to developing quality mining projects, delivering consistent value to our shareholders through fair mining practices and strong, collaborative relationships.",
];

export const commitments: string[] = [
  "Gold & silver-focused properties",
  "Nickel-copper exploration",
  "Environmentally responsible practices",
  "Transparent, investor-driven approach",
];

export const camp = {
  // Source A home page.
  ouncesProduced: "over 70 million ounces of gold",
  kiddCreek: "one of the world's largest volcanogenic massive sulfide (VMS) deposits, the Kidd Creek Mine",
  // Source A company profile.
  profile:
    'Loyalist Exploration Limited (CSE: PNGC) is a mineral exploration company focused on a "buy Timmins" strategy by acquiring and advancing high-potential gold and strategic metals projects in the prolific Timmins Mining Camp.',
  responsibility:
    "Loyalist is committed to responsible exploration practices and building strong relationships with local communities.",
};

export const companyProfileLink: NavLink = { label: "Read the company profile", href: "/about/company-profile" };
