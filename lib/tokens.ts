// Mirror of the hex tokens in app/globals.css, for places CSS variables cannot
// reach (viewport metadata, contrast checks). scripts/check-typography.mjs
// fails the build if the two drift apart.
export const palette = {
  // Forest & Earth palette
  forest: "#263B32",
  deepForest: "#1C2C25",
  cream: "#F4F0E6",
  softIvory: "#FAF8F2",
  bronze: "#B08A50",
  stoneBeige: "#D9D2C3",
  earthGrey: "#77776D",

  // Legacy names, re-pointed to the palette
  primaryGold: "#B08A50",
  softGold: "#C9A970",
  warmWhite: "#F4F0E6",
  champagne: "#ECE7DB",
  pureWhite: "#FFFFFF",
  charcoal: "#343B35",
  mutedGrey: "#77776D",

  carbon: "#263B32",
  black: "#1C2C25",
  ivory: "#F4F0E6",
  stone: "#77776D",
  gold: "#B08A50",
  graphite: "#3B5046",
  goldHover: "#C4A06A",
  goldPress: "#9A7642",
  onGold: "#1C2C25",
  paper: "#FAF8F2",
  ink: "#263B32",
  inkSoft: "#5C6157",
  goldInk: "#80612F",
  bronzeDisplay: "#9A7642",
  error: "#B3403A",
} as const;

export type PaletteKey = keyof typeof palette;

function channel(value: number): number {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const n = Number.parseInt(hex.slice(1), 16);
  return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
}

/** WCAG 2.x contrast ratio between two opaque colours. */
export function contrastRatio(foreground: string, background: string): number {
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

/** Blend an rgba foreground over an opaque background, returning hex. */
export function blend(hex: string, alpha: number, background: string): string {
  const f = Number.parseInt(hex.slice(1), 16);
  const b = Number.parseInt(background.slice(1), 16);
  const mix = (shift: number) =>
    Math.round(((f >> shift) & 255) * alpha + ((b >> shift) & 255) * (1 - alpha))
      .toString(16)
      .padStart(2, "0");
  return `#${mix(16)}${mix(8)}${mix(0)}`.toUpperCase();
}
