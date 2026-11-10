import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/shared/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getMember } from "@/content/team";

const teamCards = [
  {
    id: "david-drinkwater",
    name: "David Drinkwater",
    subtitle: "CHAIRMAN OF THE BOARD",
    bio: "Extensive business and legal experience in corporate finance, M&A, and board governance.",
  },
  {
    id: "len-mackenzie",
    name: "Len Mackenzie",
    subtitle: "VP EXPLORATION – M.Sc.",
    bio: "35+ years in exploration, 15 in the Timmins Camp, formerly Exploration & GIS Lead at Agnico Eagle.",
  },
  {
    id: "robert-bresee",
    name: "Robert Bresee",
    subtitle: "VP OPERATIONS & DIRECTOR – CET",
    bio: "45 years in mining, Timmins resident and former project manager on Tully.",
  },
];

const ceoFacts = [
  { title: "35+ Years", detail: "Industry Experience" },
  { title: "Mining Operations", detail: "& Development" },
  { title: "Capital Markets", detail: "& Corporate Strategy" },
];

/** A roster, not a card grid: the CEO with portrait and biography, then three directors on ruled columns. */
export function Leadership() {
  const featured = getMember("errol-farr");

  return (
    <Section tone="warm" id="leadership" labelledBy="leadership-title" className="relative">
      <SectionHeader
        number="05"
        label="Leadership"
        id="leadership-title"
        title={
          <>
            Leadership with <em className="heading-accent">Timmins</em> experience.
          </>
        }
        lead="A proven team with deep exploration, development and capital markets experience."
        action={
          <Button href="/about/our-team" variant="secondary" icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
            Meet the Full Team
          </Button>
        }
      />

      <Reveal>
        <article className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[300px_minmax(0,1fr)]">
          <div className="leadership-photo-card aspect-[4/5] w-full max-w-[260px] sm:max-w-[300px] lg:max-w-none">
            <Image
              src="/images/team/errol-farr.jpg"
              alt="Errol Farr, CPA - President, CEO & Director"
              fill
              sizes="(min-width: 1024px) 300px, 340px"
              quality={90}
              className="object-cover object-top"
              priority
            />
          </div>

          <div className="flex min-w-0 flex-col lg:pt-1">
            <Heading level={3}>
              {featured.name}
              {featured.credentials ? `, ${featured.credentials}` : null}
            </Heading>
            <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
              PRESIDENT, CEO & DIRECTOR
            </div>

            <p className="mt-5 max-w-[68ch] text-[0.9375rem] leading-relaxed text-ink-soft">{featured.bio[0]}</p>

            <dl className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-6 lg:mt-auto lg:pt-8">
              {ceoFacts.map((f) => (
                <div key={f.title} className="py-2 sm:py-0">
                  <dt className="text-sm font-semibold text-fg">{f.title}</dt>
                  <dd className="text-xs text-fg-muted">{f.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </article>
      </Reveal>

      <ul className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
        {teamCards.map((m, idx) => (
          <li key={m.id}>
            <Reveal delay={idx * 0.08} className="h-full">
              <Link
                href="/about/our-team"
                className="group block h-full border-t border-stone-beige pt-5 transition-colors duration-200 hover:border-gold"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Heading level={3}>{m.name}</Heading>
                    <div className="mt-1.5 text-[11px] font-semibold uppercase leading-tight tracking-[0.1em] text-accent">
                      {m.subtitle}
                    </div>
                  </div>
                  <ArrowRight
                    className="mt-2 h-4 w-4 shrink-0 text-gold transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{m.bio}</p>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
