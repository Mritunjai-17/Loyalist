import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { MaskReveal } from "@/components/shared/MaskReveal";
import { Reveal } from "@/components/shared/Reveal";
import { getMember } from "@/content/team";
import { HeadingBlock } from "./SectionIntro";

// One-line summaries per Source B (see content/team.ts).
const roster = [
  {
    id: "david-drinkwater",
    name: "David Drinkwater",
    role: "Chairman of the Board",
    bio: "Extensive business and legal experience in corporate finance, M&A, and board governance.",
  },
  {
    id: "len-mackenzie",
    name: "Len Mackenzie",
    role: "VP Exploration, M.Sc.",
    bio: "35+ years in exploration, 15 in the Timmins Camp, formerly Exploration & GIS Lead at Agnico Eagle.",
  },
  {
    id: "robert-bresee",
    name: "Robert Bresee",
    role: "VP Operations & Director, CET",
    bio: "45 years in mining, Timmins resident and former project manager on Tully.",
  },
];

const ceoFacts = [
  // Both from the CEO biography in content/team.ts.
  { value: "35+", label: "Years in financial management, operations and strategy" },
  { value: "3", label: "Former CFO and CEO roles at Anaconda, Adex and MagIndustries" },
];

/**
 * Paragraphs for display. The biography is stored as one block of text; it is
 * broken before each sentence that starts "He " so it reads as a lead sentence
 * and short paragraphs. The wording is unchanged.
 */
function paragraphs(bio: string[]): string[] {
  return bio.flatMap((p) => p.split(/(?<=\.)\s+(?=He )/));
}

/**
 * Two-column editorial profile. Desktop: portrait on the left, its top aligned
 * with the eyebrow; heading and profile on the right. Mobile: heading, portrait,
 * profile. Then the senior team as a typographic roster (no portraits on file
 * for them, and none are generated).
 */
export function Leadership() {
  const ceo = getMember("errol-farr");
  const [leadSentence, ...rest] = paragraphs(ceo.bio);

  return (
    <section id="leadership" aria-labelledby="leadership-title" data-tone="deep" className="section-pad relative bg-surface">
      <div className="container-site">
        <div className="grid gap-y-block lg:grid-cols-[minmax(0,9fr)_minmax(0,13fr)] lg:grid-rows-[auto_1fr] lg:gap-x-col lg:gap-y-0">
          <Reveal className="lg:col-start-2 lg:row-start-1">
            <HeadingBlock index="05" label="Leadership" id="leadership-title" title="Leadership with" accent="Timmins experience." />
          </Reveal>

          <div className="lg:sticky lg:top-[calc(var(--header-h)+var(--space-group))] lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-start">
            <MaskReveal className="frame-ed relative mx-auto aspect-[4/5] w-full max-w-[480px] lg:mx-0 lg:max-w-none" from="bottom">
              <Image
                src="/images/team/errol-farr.jpg"
                alt={`Portrait of ${ceo.name}, ${ceo.title}`}
                fill
                sizes="(min-width: 1440px) 540px, (min-width: 1024px) 40vw, 480px"
                className="origin-bottom scale-[1.015] object-cover object-[50%_22%]"
              />
            </MaskReveal>
          </div>

          <Reveal delay={0.1} className="lg:col-start-2 lg:row-start-2 lg:pt-group">
            <div className="border-t border-rule pt-group">
              <div className="leader-name">
                <Heading level={3}>
                  {ceo.name}
                  {ceo.credentials ? `, ${ceo.credentials}` : null}
                </Heading>
              </div>
              <p className="mt-3 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-accent">{ceo.title}</p>

              <div className="mt-copy max-w-[60ch] space-y-4">
                {leadSentence ? <p className="lead-ed text-fg">{leadSentence}</p> : null}
                {rest.map((p) => (
                  <p key={p.slice(0, 32)} className="body-ed">
                    {p}
                  </p>
                ))}
              </div>

              <dl className="mt-group grid grid-cols-2 gap-x-grid border-t border-rule pt-8">
                {ceoFacts.map((f) => (
                  <div key={f.label} className="flex flex-col">
                    <dt className="order-2 mt-2 max-w-[28ch] text-[0.8125rem] leading-snug text-fg-muted">{f.label}</dt>
                    <dd className="font-editorial order-1 text-[clamp(2.5rem,4vw,3.5rem)] leading-none text-fg">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        {/* Roster */}
        <ul className="mt-block grid gap-y-10 md:grid-cols-3 md:gap-x-grid">
          {roster.map((m, idx) => (
            <li key={m.id}>
              <Reveal delay={idx * 0.08} className="h-full">
                <Link
                  href="/about/our-team"
                  className="group block h-full border-t border-fg/25 pt-7 transition-colors duration-300 hover:border-ed-accent"
                >
                  <div className="leader-name">
                    <Heading level={3}>
                      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                        {m.name}
                      </span>
                    </Heading>
                  </div>
                  <p className="mt-3 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-accent">{m.role}</p>
                  <p className="mt-5 max-w-[40ch] text-[0.9375rem] leading-relaxed text-fg-body">{m.bio}</p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <Link href="/about/our-team" className="link-ed mt-10">
            <span>Meet the full team</span>
            <ArrowRight aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
