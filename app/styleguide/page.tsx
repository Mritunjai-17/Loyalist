import type { Metadata } from "next";
import { ArrowRight, Download } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Input } from "@/components/ui/Input";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Table, type Column } from "@/components/ui/Table";
import { Textarea } from "@/components/ui/Textarea";
import { TextLink } from "@/components/ui/TextLink";
import { tullyResource } from "@/content/resource-tully";
import { formatDate, formatNumber } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { blend, contrastRatio, palette } from "@/lib/tokens";
import type { ResourceRow } from "@/types";

export const metadata: Metadata = pageMetadata({
  title: "Styleguide",
  description: "Design tokens and patterns for the Loyalist Exploration website.",
  path: "/styleguide",
  noindex: true,
});

const swatches: { name: string; token: string; hex: string; role: string }[] = [
  { name: "Forest Green", token: "--forest", hex: palette.forest, role: "Headings, primary buttons, investor band" },
  { name: "Deep Forest", token: "--deep-forest", hex: palette.deepForest, role: "Header, footer, hero strip, dark panels" },
  { name: "Warm Cream", token: "--cream", hex: palette.cream, role: "Primary light background" },
  { name: "Soft Ivory", token: "--soft-ivory", hex: palette.softIvory, role: "Alternate light background" },
  { name: "Muted Bronze", token: "--bronze", hex: palette.bronze, role: "Icons, rules, borders, highlights" },
  { name: "Stone Beige", token: "--stone-beige", hex: palette.stoneBeige, role: "Dividers, card and field borders" },
  { name: "Earth Grey", token: "--earth-grey", hex: palette.earthGrey, role: "Decorative neutrals" },
  { name: "Charcoal", token: "--charcoal", hex: palette.charcoal, role: "Body text on light surfaces" },
  { name: "Ink soft", token: "--ink-soft", hex: palette.inkSoft, role: "Secondary text on light surfaces" },
  { name: "Bronze text", token: "--gold-ink", hex: palette.goldInk, role: "Links, eyebrows, small bronze text" },
  { name: "Bronze display", token: "--bronze-display", hex: palette.bronzeDisplay, role: "Large heading accents on light" },
  { name: "Error", token: "--error", hex: palette.error, role: "Form errors only" },
];

const contrastPairs: { label: string; fg: string; bg: string; ruleOnly?: boolean; largeOnly?: boolean }[] = [
  { label: "Cream on forest", fg: palette.cream, bg: palette.forest },
  { label: "Cream 86% on forest (body)", fg: blend(palette.cream, 0.86, palette.forest), bg: palette.forest },
  { label: "Cream 66% on forest (muted)", fg: blend(palette.cream, 0.66, palette.forest), bg: palette.forest },
  { label: "Lifted bronze on forest", fg: palette.softGold, bg: palette.forest },
  { label: "Lifted bronze on deep forest", fg: palette.softGold, bg: palette.deepForest },
  { label: "Deep forest on bronze (header CTA)", fg: palette.deepForest, bg: palette.bronze },
  { label: "Deep forest on cream (button on forest)", fg: palette.deepForest, bg: palette.cream },
  { label: "Cream on forest (button on light)", fg: palette.cream, bg: palette.forest },
  { label: "Forest on soft ivory (headings)", fg: palette.forest, bg: palette.softIvory },
  { label: "Charcoal on warm cream (body)", fg: palette.charcoal, bg: palette.cream },
  { label: "Ink soft on warm cream", fg: palette.inkSoft, bg: palette.cream },
  { label: "Ink soft on champagne", fg: palette.inkSoft, bg: palette.champagne },
  { label: "Bronze text on warm cream", fg: palette.goldInk, bg: palette.cream },
  { label: "Bronze text on champagne", fg: palette.goldInk, bg: palette.champagne },
  { label: "Bronze display on champagne", fg: palette.bronzeDisplay, bg: palette.champagne, largeOnly: true },
  { label: "Error on white", fg: palette.error, bg: palette.pureWhite },
  { label: "Muted bronze on cream (rules only, not text)", fg: palette.bronze, bg: palette.cream, ruleOnly: true },
];

const typeScale = [
  { role: "Display (home hero only)", tag: "h1", spec: "clamp(2.75rem, min(5.4vw, 9.5vh), 5.75rem) · 1.04 · -0.02em" },
  { role: "Page title", tag: "h1", spec: "clamp(2.25rem, 3.8vw, 3.75rem) · 1.08 · -0.015em" },
  { role: "Primary heading", tag: "h2", spec: "clamp(1.875rem, 3vw, 2.875rem) · 1.12 · -0.012em" },
  { role: "Secondary heading", tag: "h3", spec: "clamp(1.375rem, 1.9vw, 1.75rem) · 1.2 · -0.005em" },
  { role: "Minor heading", tag: "h4", spec: "1.125rem · 600 · 1.3" },
];

const resourceColumns: Column<ResourceRow>[] = [
  { key: "category", header: "Category", render: (r) => r.category },
  { key: "tonnes", header: "Tonnes (Mt)", numeric: true, render: (r) => r.tonnesMt.toFixed(2) },
  { key: "grade", header: "Grade (g/t Au)", numeric: true, render: (r) => r.gradeGpt.toFixed(2) },
  { key: "oz", header: "Contained gold (oz)", numeric: true, render: (r) => formatNumber(r.containedOz) },
];

function Specimen({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-6 border-t border-rule py-10 lg:grid-cols-12">
      <p className="text-small min-w-0 lg:col-span-3">{title}</p>
      <div className="min-w-0 lg:col-span-9">{children}</div>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <main id="main" data-tone="carbon" className="bg-surface">
      <Container className="pb-16 pt-20">
        <Eyebrow>Internal · not indexed</Eyebrow>
        <Heading level={1} accent="and patterns." className="mt-5">
          Tokens
        </Heading>
        <p className="text-lead mt-5">
          Every colour, type size and component used on the site. If something is not on this page, it should not be
          on any other.
        </p>
      </Container>

      <Section tone="black" labelledBy="sg-colour">
        <SectionHeader
          number="01"
          label="Colour"
          id="sg-colour"
          title="Six core colours,"
          accent="nothing else."
          lead="Core palette first, then the derived values the system allows. Borders and dividers are always 1px graphite."
        />
        <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {swatches.map((s) => (
            <li key={s.token}>
              <div className="h-24 rounded-panel border border-rule" style={{ background: `var(${s.token})` }} />
              <p className="mt-4 font-medium text-ivory">{s.name}</p>
              <p className="text-small">
                {s.token} · {s.hex}
              </p>
              <p className="text-small">{s.role}</p>
            </li>
          ))}
        </ul>

        <div className="mt-20">
          <Heading level={3}>Contrast, every text pair</Heading>
          <p className="text-small mt-2">WCAG 2.2 AA: 4.5:1 for body text, 3:1 for large text and UI.</p>
          <Table
            className="mt-8"
            label="Contrast ratios"
            rowKey={(p) => p.label}
            rows={contrastPairs}
            columns={[
              { key: "pair", header: "Pair", render: (p) => p.label },
              {
                key: "sample",
                header: "Sample",
                render: (p) =>
                  p.ruleOnly ? (
                    <span className="flex h-7 w-40 items-center rounded-control px-3" style={{ background: p.bg }}>
                      <span className="block h-0.5 w-10" style={{ background: p.fg }} />
                    </span>
                  ) : (
                    <span
                      className={p.largeOnly ? "inline-block rounded-control px-3 py-1 text-2xl" : "inline-block rounded-control px-3 py-1"}
                      style={{ background: p.bg, color: p.fg }}
                    >
                      Timmins 48.48° N
                    </span>
                  ),
              },
              { key: "ratio", header: "Ratio", numeric: true, render: (p) => `${contrastRatio(p.fg, p.bg).toFixed(2)}:1` },
              {
                key: "result",
                header: "AA body",
                numeric: true,
                render: (p) =>
                  p.ruleOnly
                    ? "Not for text"
                    : p.largeOnly
                      ? contrastRatio(p.fg, p.bg) >= 3 ? "Large text only" : "Fail"
                      : contrastRatio(p.fg, p.bg) >= 4.5 ? "Pass" : "Fail",
              },
            ]}
          />
        </div>
      </Section>

      <Section tone="carbon" labelledBy="sg-type">
        <SectionHeader
          number="02"
          label="Type"
          id="sg-type"
          title="Fraunces for headings,"
          accent="Inter for the rest."
          lead="Headings are rendered only through the Heading component. Sizes come from the tag, never from a class."
        />
        {/* The one deliberate second h1 on the site: this page exists to show both h1 roles.
            tests/typography.spec.ts exempts /styleguide from the single-h1 rule. */}
        <Specimen title={typeScale[0]!.role + " · " + typeScale[0]!.spec}>
          <Heading level={1} variant="display" stacked accent="Mine Timmins.">
            Buy Timmins.
          </Heading>
        </Specimen>
        <Specimen title={typeScale[1]!.role + " · " + typeScale[1]!.spec}>
          <p className="text-small">The page title at the top of this page is the specimen.</p>
        </Specimen>
        {typeScale.slice(2).map((t) => (
          <Specimen key={t.role} title={`${t.role} · ${t.spec}`}>
            {t.tag === "h2" ? (
              <Heading level={2} accent="One mining district.">
                Four properties.
              </Heading>
            ) : t.tag === "h3" ? (
              <Heading level={3}>Loveland project</Heading>
            ) : (
              <Heading level={4}>Qualified person</Heading>
            )}
          </Specimen>
        ))}
        <Specimen title="Lead · Inter 400 · clamp(1.0625rem, 1.25vw, 1.25rem) · 1.6 · stone · 60ch">
          <p className="text-lead">
            Building a portfolio of gold and strategic metals projects in the Timmins district, with a focus on
            advancing the Tully project.
          </p>
        </Specimen>
        <Specimen title="Body · Inter 400 · 1.0625rem · 1.65 · ivory 80%">
          <p className="max-w-prose">
            Tully lies about 25 km north-northeast of Timmins on 458 ha: one leased mining claim and 11 claims, 100%
            owned. The 2026 estimate reports {formatNumber(164_000)} oz Indicated at 3.16 g/t Au.
          </p>
        </Specimen>
        <Specimen title="Small / caption · Inter 400 · 0.8125rem · 1.5 · stone">
          <p className="text-small">Plate 01. Quartz-carbonate vein, illustrative photograph.</p>
        </Specimen>
        <Specimen title="Eyebrow · Inter 500 · 13px · uppercase · 0.18em · 40×2 gold rule">
          <div className="flex flex-col gap-6">
            <Eyebrow number="01">About</Eyebrow>
            <Eyebrow>Timmins, Ontario · Abitibi Greenstone Belt</Eyebrow>
          </div>
        </Specimen>
        <Specimen title="Dates">
          <p>{formatDate("2026-10-19")}</p>
        </Specimen>
      </Section>

      <Section tone="black" labelledBy="sg-controls">
        <SectionHeader
          number="03"
          label="Controls"
          id="sg-controls"
          title="Buttons and links."
          action={<TextLink href="#sg-paper">Jump to paper section</TextLink>}
        />
        <Specimen title="Large · hero only">
          <div className="flex flex-wrap gap-4">
            <Button size="lg" href="/projects" icon={<ArrowRight aria-hidden />}>
              Explore projects
            </Button>
            <Button size="lg" variant="secondary" icon={<Download aria-hidden />}>
              Investor presentation
            </Button>
          </div>
        </Specimen>
        <Specimen title="Medium · everywhere else">
          <div className="flex flex-wrap gap-4">
            <Button>View full resource table</Button>
            <Button variant="secondary">Read the news release</Button>
          </div>
        </Specimen>
        <Specimen title="Text link">
          <TextLink href="/about/company-profile">Read the company profile</TextLink>
        </Specimen>
        <Specimen title="Badge">
          <div className="flex flex-wrap gap-3">
            <Badge>Resource stage</Badge>
            <Badge>News release</Badge>
          </div>
        </Specimen>
        <Specimen title="Form fields · 48px · label above · error in --error">
          <form className="grid max-w-xl gap-6" action="#">
            <Input label="Name" name="name" required autoComplete="name" />
            <Input label="Email" name="email" type="email" required error="Enter an email address, like name@example.com." />
            <Textarea label="Message" name="message" required />
          </form>
        </Specimen>
      </Section>

      <Section tone="paper" id="sg-paper" labelledBy="sg-paper-h">
        <SectionHeader
          number="04"
          label="Paper"
          id="sg-paper-h"
          title="Tables and long reading"
          accent="on paper."
          lead="At most two paper sections per page. Gold becomes gold ink for text; buttons use the unified button tokens."
        />
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7">
            <Table
              label="Tully mineral resource estimate"
              rows={tullyResource.rows}
              rowKey={(r) => r.category}
              columns={resourceColumns}
              caption={`Cut-off ${tullyResource.cutOff}. Effective ${formatDate(tullyResource.effectiveDate)}. ${tullyResource.standard}, ${tullyResource.author}`}
            />
          </div>
          <div className="min-w-0 lg:col-span-5">
            <Prose>
              <p>Paper sections use ink text, soft ink for secondary lines and gold ink for links.</p>
              <p>
                <a href="#sg-paper">An inline link in prose</a> keeps a 4px underline offset.
              </p>
            </Prose>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button>View full resource table</Button>
              <Button variant="secondary">Read the news release</Button>
            </div>
            <div className="mt-6">
              <TextLink href="/projects/tully">Go to the Tully project</TextLink>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
