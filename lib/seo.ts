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
