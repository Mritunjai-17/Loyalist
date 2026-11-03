import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { fraunces, inter } from "./fonts";
import { company } from "@/content/company";
import { organizationJsonLd, siteName, siteUrl } from "@/lib/seo";
import { palette } from "@/lib/tokens";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: `%s | ${siteName}` },
  description:
    "Loyalist Exploration Limited (CSE: PNGC) is building a portfolio of gold and strategic metals projects in the Timmins district of Ontario.",
  alternates: { canonical: "/" },
  openGraph: {
    siteName,
    type: "website",
    url: "/",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: siteName }],
  },
};

export const viewport: Viewport = {
  themeColor: palette.black,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-CA" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-gold focus:px-4 focus:py-3 focus:text-on-gold"
        >
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(company)) }}
        />
      </body>
    </html>
  );
}
