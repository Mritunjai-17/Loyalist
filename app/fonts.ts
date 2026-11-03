import { Fraunces, Inter } from "next/font/google";

// next/font downloads these at build time and serves them from the app's own
// origin, with size-adjusted local fallbacks to avoid layout shift.
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
