// Mirror of the hex tokens in app/globals.css, for places CSS variables cannot
// reach (viewport metadata, contrast checks). scripts/check-typography.mjs
// fails the build if the two drift apart.
export const palette = {
  primaryGold: "#C49A43",
  softGold: "#E1C27A",
  warmWhite: "#F7F5EF",
  champagne: "#F2EBDD",
  pureWhite: "#FFFFFF",
  charcoal: "#20201D",
  mutedGrey: "#77736B",

  carbon: "#20201D",
  black: "#171816",
  ivory: "#F7F5EF",
  stone: "#77736B",
  gold: "#C49A43",
  graphite: "#383733",
  goldHover: "#D8B877",
  goldPress: "#B38F47",
  onGold: "#20201D",
  paper: "#FFFFFF",
  ink: "#20201D",
  inkSoft: "#77736B",
  goldInk: "#C49A43",
  error: "#D9534F",
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
