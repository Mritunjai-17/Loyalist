import type { NavGroup, NavLink } from "@/types";

// Structure from Source A's menu. Project locations and metals from Source B (section 13).
export const primaryNav: (NavGroup | NavLink)[] = [
  {
    label: "About",
    items: [
      { label: "Company profile", href: "/about/company-profile", description: "Who we are and our strategy in the Timmins camp" },
      { label: "Our team", href: "/about/our-team", description: "Management, board and advisors" },
    ],
  },
  {
    label: "Projects",
    items: [
      { label: "Tully", href: "/projects/tully", description: "25 km NNE of Timmins · Gold" },
      { label: "Loveland", href: "/projects/loveland", description: "45 km NW of Timmins · Gold, copper, nickel" },
      { label: "Gold Rush", href: "/projects/gold-rush", description: "30 km W of Timmins · Gold, silver" },
      { label: "DeSantis", href: "/projects/desantis", description: "4.5 km SW of Timmins · Gold" },
    ],
    overview: { label: "All projects", href: "/projects" },
  },
  {
    label: "Investors",
    items: [
      { label: "Investor overview", href: "/investors", description: "Share data and the latest filings" },
      { label: "Corporate structure", href: "/investors/corporate-structure", description: "Shares, warrants and public float" },
      { label: "Financial statements & MD&A", href: "/investors/financial-statements", description: "Quarterly and annual filings" },
      { label: "Technical reports", href: "/investors/technical-reports", description: "NI 43-101 reports by project" },
      { label: "Annual meeting", href: "/investors/annual-meeting", description: "Notices, circulars and proxy materials" },
    ],
  },
  { label: "News", href: "/press-releases" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavLink[] = [
  { label: "Company profile", href: "/about/company-profile" },
  { label: "Our team", href: "/about/our-team" },
  { label: "Projects", href: "/projects" },
  { label: "Investors", href: "/investors" },
  { label: "Press releases", href: "/press-releases" },
  { label: "Contact", href: "/contact" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export function isGroup(entry: NavGroup | NavLink): entry is NavGroup {
  return "items" in entry;
}
