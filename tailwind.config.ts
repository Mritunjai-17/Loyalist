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
      control: "6px",
      panel: "10px",
    },
    boxShadow: {
      none: "none",
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
