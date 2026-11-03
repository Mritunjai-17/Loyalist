import type { Metadata } from "next";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://loyalistexploration.com";
export const siteName = "Loyalist Exploration Limited";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
};

export function pageMetadata({ title, description, path, noindex }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName,
      type: "website",
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: siteName }],
    },
    robots: noindex ? { index: false, follow: false } : undefined,
  };
}

/** schema.org Organization for the JSON-LD block in the root layout. */
export function organizationJsonLd(company: {
  legalName: string;
  email: string;
  phone: { href: string };
  exchange: string;
  ticker: string;
  headOffice: { street: string; city: string; region: string; postalCode: string; country: string };
  social: { href: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalName,
    url: siteUrl,
    logo: new URL("/images/logo.png", siteUrl).toString(),
    email: company.email,
    telephone: company.phone.href.replace("tel:", ""),
    tickerSymbol: `${company.exchange}: ${company.ticker}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.headOffice.street,
      addressLocality: company.headOffice.city,
      addressRegion: company.headOffice.region,
      postalCode: company.headOffice.postalCode,
      addressCountry: company.headOffice.country,
    },
    sameAs: company.social.map((s) => s.href),
  };
}
