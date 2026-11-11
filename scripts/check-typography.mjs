// Fails the build when heading typography is set anywhere except the tag
// selectors in app/globals.css, when a third font or monospace appears, when
// hex colours are hardcoded in components, or when lib/tokens.ts drifts from
// the CSS tokens.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const errors = [];
const report = (file, line, message) => errors.push(`${relative(root, file)}:${line}  ${message}`);

function walk(dir, exts, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, exts, out);
    else if (exts.some((ext) => name.endsWith(ext))) out.push(full);
  }
  return out;
}

const sources = [...walk(join(root, "app"), [".tsx", ".ts"]), ...walk(join(root, "components"), [".tsx", ".ts"])];
const headingComponent = join(root, "components", "ui", "Heading.tsx");
const fontsFile = join(root, "app", "fonts.ts");

const forbiddenOnHeading = [
  { re: /\btext-(xs|sm|base|lg|xl|[2-9]xl)\b/, why: "Tailwind font-size class" },
  { re: /\btext-\[[^\]]*(px|rem|em|vw|vh|clamp)[^\]]*\]/, why: "arbitrary font-size" },
  { re: /\bfont-(sans|serif|mono|body|heading)\b/, why: "font-family class" },
  { re: /\bleading-/, why: "line-height class" },
  { re: /\btracking-/, why: "letter-spacing class" },
];

for (const file of sources) {
  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((text, i) => {
    const n = i + 1;
    if (file !== headingComponent && /<h[1-6][\s>]/.test(text)) {
      report(file, n, "raw <h1>-<h6>; render headings through <Heading>");
    }
    if (/<Heading\b/.test(text)) {
      // Inspect the opening tag, which may span a few lines.
      const tag = lines.slice(i, i + 6).join(" ").split(">")[0];
      for (const rule of forbiddenOnHeading) {
        if (rule.re.test(tag)) report(file, n, `<Heading> with ${rule.why}`);
      }
      if (/style=\{\{[^}]*(fontFamily|fontSize|lineHeight|letterSpacing)/.test(tag)) {
        report(file, n, "<Heading> with inline font style");
      }
    }
    if (/\bfont-mono\b|monospace/i.test(text)) report(file, n, "monospace is not allowed");
    if (/fontFamily\s*:/.test(text)) report(file, n, "fontFamily set in a component");
    if (file !== fontsFile && /next\/font/.test(text)) report(file, n, "fonts are loaded only in app/fonts.ts");
    if (/["'`]#[0-9a-fA-F]{3,8}\b/.test(text)) report(file, n, "hardcoded hex colour; use a token");
  });
}

// Interior pages: Fraunces + Inter. Homepage editorial system: DM Serif Display + Manrope
// (re-pointed onto --font-heading / --font-body in globals.css; DM Serif also serves
// display numerals through --font-editorial).
const fontsSrc = readFileSync(fontsFile, "utf8");
const imported = [...fontsSrc.matchAll(/import\s*\{([^}]+)\}\s*from\s*["']next\/font\/google["']/g)]
  .flatMap((m) => m[1].split(",").map((s) => s.trim()))
  .filter(Boolean);
for (const family of imported) {
  if (!["Fraunces", "Inter", "DM_Serif_Display", "Manrope"].includes(family))
    report(fontsFile, 1, `font "${family}" is not allowed`);
}

// CSS: headings may only get the heading family; no other rule may target h1-h6 font properties.
const cssFile = join(root, "app", "globals.css");
const css = readFileSync(cssFile, "utf8");
const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
for (const match of css.matchAll(ruleRe)) {
  const selector = match[1].trim();
  const body = match[2];
  const line = css.slice(0, match.index).split("\n").length;
  const targetsHeading = /(^|[\s,>+~(])h[1-6](?![\w-])/.test(selector);
  if (/font-family\s*:/.test(body)) {
    const value = body.match(/font-family\s*:\s*([^;]+)/)[1];
    if (targetsHeading && !/var\(--font-heading\)/.test(value)) report(cssFile, line, "body font applied to a heading");
    if (!targetsHeading && /--font-heading/.test(value)) report(cssFile, line, "heading font applied to a non-heading");
  }
  const isScaleRule = /^h1(\[data-variant="display"\])?$|^h[1-6](,\s*h[1-6])*$/.test(selector);
  if (targetsHeading && !isScaleRule && /font-size|line-height|letter-spacing/.test(body)) {
    // Prose may space headings but not resize them.
    report(cssFile, line, `heading size set outside the type scale (${selector})`);
  }
}

// lib/tokens.ts must match the CSS tokens.
const tokensSrc = readFileSync(join(root, "lib", "tokens.ts"), "utf8");
const camelToKebab = (s) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
for (const [, key, hex] of tokensSrc.matchAll(/^\s+(\w+):\s*"(#[0-9A-Fa-f]{6})"/gm)) {
  const cssMatch = css.match(new RegExp(`--${camelToKebab(key)}:\\s*(#[0-9a-fA-F]{6})`));
  if (!cssMatch) report(join(root, "lib", "tokens.ts"), 1, `--${camelToKebab(key)} missing from globals.css`);
  else if (cssMatch[1].toLowerCase() !== hex.toLowerCase())
    report(join(root, "lib", "tokens.ts"), 1, `${key} ${hex} differs from globals.css ${cssMatch[1]}`);
}

if (errors.length) {
  console.error(`check-typography: ${errors.length} problem(s)\n` + errors.map((e) => `  ${e}`).join("\n"));
  process.exit(1);
}
console.log(`check-typography: ok (${sources.length} files)`);
