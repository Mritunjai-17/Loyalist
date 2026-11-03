import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { fraunces, inter } from "./fonts";
import { siteName, siteUrl } from "@/lib/seo";
import { palette } from "@/lib/tokens";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: `%s | ${siteName}` },
  description:
    "Loyalist Exploration Limited (CSE: PNGC) is building a portfolio of gold and strategic metals projects in the Timmins district of Ontario.",
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
        {children}
      </body>
    </html>
  );
}
