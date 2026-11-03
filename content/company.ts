import type { Company } from "@/types";

export const company: Company = {
  legalName: "Loyalist Exploration Limited",
  shortName: "Loyalist Exploration",
  exchange: "CSE",
  ticker: "PNGC",
  slogan: "Buy Timmins, Mine Timmins",
  // Source A, home page "Who We Are".
  summary:
    "Loyalist Exploration Limited is a mineral exploration company concentrating on acquiring, exploring, and developing quality mineral properties in the Timmins Mining District.",
  // Source A obfuscates the address behind Cloudflare email protection; Source B gives it in full.
  // VERIFY against filed news release
  email: "info@loyalistexploration.com",
  phone: { display: "+1-647-296-1270", href: "tel:+16472961270" },
  headOffice: {
    street: "110 Yonge Street, Suite 1601",
    city: "Toronto",
    region: "Ontario",
    postalCode: "M5C 1T4",
    country: "Canada",
  },
  coordinates: { label: "48.48° N 81.33° W", lat: 48.48, lon: -81.33, place: "Timmins, Ontario" },
  quoteUrl: "https://www.tradingview.com/symbols/CSE-PNGC/",
  sedarUrl: "https://www.sedarplus.ca/",
  social: [
    { network: "LinkedIn", href: "https://www.linkedin.com/company/loyalist-exploration-limited/" },
    { network: "X", href: "https://x.com/LoyalistExp" },
    { network: "Facebook", href: "https://www.facebook.com/people/Loyalist-Exploration/61575711082978/" },
    { network: "YouTube", href: "https://www.youtube.com/@LoyalistExploration" },
    { network: "Instagram", href: "https://www.instagram.com/loyalistexploration/" },
  ],
  // Source A links "image/loyalist.pdf"; size and date from the file's HTTP headers (Oct 28, 2026).
  presentation: {
    title: "Corporate presentation",
    href: "https://loyalistexploration.com/image/loyalist.pdf",
    date: "2026-10-28",
    sizeBytes: 9_660_301,
  },
};
