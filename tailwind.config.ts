import type { Config } from "tailwindcss";

// Every value maps to a CSS variable in app/globals.css. The default palette,
// font stacks, radii and shadows are replaced, not extended, so nothing outside
// the design tokens can be used by accident.

type ColorFn = (args: { opacityValue?: string }) => string;

/**
 * A token colour that also supports Tailwind opacity modifiers (`border-black/10`,
 * `from-surface`, `bg-gold/15`). Plain `var()` strings cannot take an alpha value,
 * so those classes were silently dropped; color-mix gives them a real colour.
 */
function token(name: string): ColorFn {
  return ({ opacityValue }) =>
    opacityValue === undefined || opacityValue === "1"
      ? `var(--${name})`
      : `color-mix(in srgb, var(--${name}) calc(${opacityValue} * 100%), transparent)`;
}

const colors = {
  // Forest & Earth palette
  forest: token("forest"),
  "deep-forest": token("deep-forest"),
  cream: token("cream"),
  "soft-ivory": token("soft-ivory"),
  bronze: token("bronze"),
  "stone-beige": token("stone-beige"),
  "earth-grey": token("earth-grey"),
  white: token("pure-white"),
  // Editorial roles. Charcoal / gold / ivory on the homepage; the forest values
  // everywhere else (see the --ed-* tokens in globals.css).
  "ed-deep": token("ed-deep"),
  "ed-deep-2": token("ed-deep-2"),
  "ed-accent": token("ed-accent"),
  "ed-accent-light": token("ed-accent-light"),
  "ed-rule": token("ed-rule"),
  "ed-label": token("ed-label"),
  "ed-label-dark": token("ed-label-dark"),
  "ed-ivory": token("ed-ivory"),
  "ed-stone": token("ed-stone"),
  "ed-sand": token("ed-sand"),
  "ed-ink": token("ed-ink"),
  "ed-steel": token("ed-steel"),
  // Legacy names, re-pointed to the palette in globals.css
  "primary-gold": token("primary-gold"),
  "soft-gold": token("soft-gold"),
  "warm-white": token("warm-white"),
  champagne: token("champagne"),
  "pure-white": token("pure-white"),
  charcoal: token("charcoal"),
  "muted-grey": token("muted-grey"),
  carbon: token("carbon"),
  black: token("black"),
  ivory: token("ivory"),
  "ivory-80": token("ivory-80"),
  stone: token("stone"),
  gold: token("gold"),
  "gold-hover": token("gold-hover"),
  "gold-press": token("gold-press"),
  "on-gold": token("on-gold"),
  graphite: token("graphite"),
  paper: token("paper"),
  ink: token("ink"),
  "ink-soft": token("ink-soft"),
  "gold-ink": token("gold-ink"),
  error: token("error"),
  // Tone-aware aliases: resolve differently inside each [data-tone].
  surface: token("surface"),
  fg: token("fg"),
  "fg-body": token("fg-body"),
  "fg-muted": token("fg-muted"),
  accent: token("accent-text"),
  rule: token("border"),
};

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit",
      // Tailwind accepts colour functions at runtime; its types only list strings.
      ...(colors as unknown as Record<string, string>),
    },
    fontFamily: {
      sans: ["var(--font-body)", "system-ui", "sans-serif"],
    },
    // Restrained radii: controls and media are nearly square; only true pills
    // (status dots, avatars) use `full`.
    borderRadius: {
      none: "0",
      sm: "2px",
      DEFAULT: "4px",
      control: "4px",
      panel: "6px",
      lg: "6px",
      xl: "6px",
      "2xl": "8px",
      "3xl": "8px",
      full: "9999px",
    },
    boxShadow: {
      none: "none",
      xs: "0 1px 2px rgba(28, 44, 37, 0.05)",
      sm: "0 2px 8px rgba(28, 44, 37, 0.05)",
      md: "0 6px 20px rgba(28, 44, 37, 0.06)",
      lg: "0 12px 32px rgba(28, 44, 37, 0.08)",
      xl: "0 20px 40px rgba(28, 44, 37, 0.1)",
    },
    extend: {
      // Homepage layout tokens (values in globals.css): mt-block, gap-x-col, p-card…
      spacing: {
        col: "var(--col-gap)",
        grid: "var(--grid-gap)",
        label: "var(--space-label)",
        copy: "var(--space-copy)",
        group: "var(--space-group)",
        block: "var(--space-block)",
        card: "var(--space-card)",
      },
      // A bare `border` uses the tone's hairline instead of currentColor.
      borderColor: { DEFAULT: "var(--border)" },
      maxWidth: {
        container: "1440px",
        prose: "64ch",
        lead: "60ch",
      },
      height: {
        header: "var(--header-h)",
      },
    },
  },
  plugins: [],
};

export default config;
