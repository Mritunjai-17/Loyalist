# Loyalist Exploration Limited website

Next.js (App Router), TypeScript strict, Tailwind mapped to CSS variables.

```
npm run dev          # http://localhost:3000, design system at /styleguide
npm run check:type   # typography and token guard (also runs in prebuild)
npm run check:hero   # hero photograph guard (also runs in prebuild)
```

## Hero photo

`npm run build` fails until `public/images/hero/timmins-hero.jpg` exists, is at
least 3200px wide, and has enough light and detail in its left 30%.
TODO(hero-photo): supply the real photograph.
