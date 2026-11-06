import type { Config } from "tailwindcss";

// Every value maps to a CSS variable in app/globals.css. The default palette,
// font stacks, radii and shadows are replaced, not extended, so nothing outside
// the design tokens can be used by accident.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit",
      // Exact design system tokens
      "primary-gold": "var(--primary-gold)",
      "soft-gold": "var(--soft-gold)",
      "warm-white": "var(--warm-white)",
      champagne: "var(--champagne)",
      "pure-white": "var(--pure-white)",
      charcoal: "var(--charcoal)",
      "muted-grey": "var(--muted-grey)",
      // Core palette & derived aliases
      carbon: "var(--carbon)",
      black: "var(--black)",
      ivory: "var(--ivory)",
      "ivory-80": "var(--ivory-80)",
      stone: "var(--stone)",
      gold: "var(--gold)",
      "gold-hover": "var(--gold-hover)",
      "gold-press": "var(--gold-press)",
      "on-gold": "var(--on-gold)",
      graphite: "var(--graphite)",
      paper: "var(--paper)",
      ink: "var(--ink)",
      "ink-soft": "var(--ink-soft)",
      "gold-ink": "var(--gold-ink)",
      error: "var(--error)",
      // Tone-aware aliases: resolve differently inside [data-tone="paper"].
      surface: "var(--surface)",
      fg: "var(--fg)",
      "fg-body": "var(--fg-body)",
      "fg-muted": "var(--fg-muted)",
      accent: "var(--accent-text)",
      rule: "var(--border)",
    },
    fontFamily: {
      sans: ["var(--font-body)", "system-ui", "sans-serif"],
    },
    borderRadius: {
      none: "0",
      control: "10px",
      panel: "20px",
      lg: "12px",
      xl: "16px",
      "2xl": "20px",
      "3xl": "24px",
      full: "9999px",
    },
    boxShadow: {
      none: "none",
      sm: "0 2px 8px rgba(0, 0, 0, 0.04)",
      md: "0 6px 20px rgba(0, 0, 0, 0.05)",
      lg: "0 12px 32px rgba(0, 0, 0, 0.07)",
      xl: "0 20px 40px rgba(0, 0, 0, 0.09)",
    },
    extend: {
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
