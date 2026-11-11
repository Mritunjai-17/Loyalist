import { DM_Serif_Display, Fraunces, Inter, Manrope } from "next/font/google";

// next/font downloads these at build time and serves them from the app's own
// origin, with size-adjusted local fallbacks to avoid layout shift.

// Interior pages: Fraunces headings, Inter body.
export const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
  variable: "--font-heading",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-body",
});

// Homepage editorial system: DM Serif Display for statements and display
// figures, Manrope for body, navigation and data. globals.css re-points
// --font-heading / --font-body to these when the homepage is rendered.
export const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-dm-serif",
});

export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-manrope",
});
