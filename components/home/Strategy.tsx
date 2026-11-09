import Image from "next/image";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/shared/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { ceoStatement, strategySteps } from "@/content/strategy";

/** Survey-style contour lines. The homepage uses this motif here only. */
function TopographicPattern() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full select-none opacity-[0.06]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      viewBox="0 0 1440 800"
      preserveAspectRatio="none"
      aria-hidden
    >
      <g className="text-gold">
        <path d="M 1000 -50 C 1100 80, 1280 120, 1500 100" />
        <path d="M 920 -50 C 1040 120, 1240 180, 1500 150" />
        <path d="M 840 -50 C 980 160, 1200 240, 1500 200" />
        <path d="M 760 -50 C 920 200, 1160 300, 1500 250" />
        <path d="M 680 -50 C 860 240, 1120 360, 1500 300" />
        <path d="M 600 -50 C 720 180, 950 320, 1300 480 C 1400 520, 1460 560, 1500 600" />
        <path d="M 520 -50 C 660 220, 890 380, 1240 540 C 1350 580, 1430 630, 1500 680" />
        <path d="M 440 -50 C 600 260, 830 440, 1180 600 C 1300 650, 1400 710, 1500 760" />
        <path d="M 360 -50 C 540 300, 770 500, 1120 660 C 1250 720, 1370 790, 1500 840" />
        <path d="M -50 650 C 150 580, 350 640, 550 750 C 700 830, 850 820, 1000 850" />
        <path d="M -50 710 C 170 640, 370 700, 580 810 C 730 890, 870 880, 1020 910" />
        <path d="M -50 770 C 190 700, 390 760, 610 870" />
        <ellipse cx="1320" cy="180" rx="200" ry="90" />
        <ellipse cx="1320" cy="180" rx="150" ry="65" />
        <ellipse cx="1320" cy="180" rx="100" ry="40" />
      </g>
    </svg>
  );
}

type StepVisual = { image: string; alt: string };

const defaultVisual: StepVisual = {
  image: "/images/strategy/acquire-ore.jpg",
  alt: "High-grade gold mineralization in quartz vein",
};

const stepVisuals: readonly StepVisual[] = [
  { image: "/images/strategy/acquire-ore.jpg", alt: "High-grade gold mineralization in quartz vein" },
  { image: "/images/strategy/explore-cores.jpg", alt: "Diamond drill core samples in core boxes" },
  { image: "/images/strategy/advance-rig.jpg", alt: "Drill rig actively operating on site at sunset" },
];

/** Three editorial columns (photograph, numbered title, text, link) and a pull quote. */
export function Strategy() {
  return (
    <Section tone="champagne" id="strategy" labelledBy="strategy-title" className="relative overflow-hidden">
      <TopographicPattern />
      <SectionHeader
        number="03"
        label="Strategy"
        id="strategy-title"
        title="From Acquisition "
        accent="to Advancement."
        lead="A disciplined, value-focused strategy to build and advance a portfolio of gold and strategic metals projects in the Timmins Mining District."
      />

      <ol className="relative grid grid-cols-1 gap-12 lg:grid-cols-3">
        {strategySteps.map((step, idx) => {
          const visual = stepVisuals[idx] ?? defaultVisual;
          const isLast = idx === strategySteps.length - 1;
          return (
            <li key={step.title}>
              <Reveal delay={idx * 0.08} className="h-full">
                <article className="group flex h-full flex-col md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-x-8 lg:flex">
                  {/* Sequence marker: one hairline runs through all three steps (bridging the
                      column gaps), so the order reads acquire → explore → advance. */}
                  <div className="mb-6 flex items-center gap-3 md:col-span-2">
                    <span className="h-2 w-2 flex-none rounded-full bg-gold" aria-hidden="true" />
                    <span className="text-sm font-semibold tabular-nums tracking-[0.08em] text-accent">{step.numeral}</span>
                    <span
                      className={
                        isLast
                          ? "h-px flex-1 bg-forest/20"
                          : "h-px flex-1 bg-forest/20 lg:-mr-12"
                      }
                      aria-hidden="true"
                    />
                  </div>
                  <div className="media-zoom relative aspect-[3/2] w-full overflow-hidden rounded bg-forest">
                    <Image
                      src={visual.image}
                      alt={visual.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      quality={90}
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-6 flex flex-1 flex-col md:mt-0 lg:mt-6">
                    <Heading level={3}>{step.title}</Heading>
                    <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">{step.body}</p>
                    <div className="mt-5">
                      <TextLink href={step.link.href}>{step.link.label}</TextLink>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>

      {/* Pull quote: ruled, typographic, with the ore specimen as a straight-edged plate. */}
      <Reveal delay={0.1} className="mt-16 sm:mt-20">
        <figure className="relative grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="md:pr-10">
            <blockquote className="border-l-2 border-gold pl-6 sm:pl-8">
              <p className="max-w-[46ch] text-lg italic leading-relaxed text-fg sm:text-xl">
                &ldquo;{ceoStatement.text}&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-5 pl-6 sm:pl-8">
              <span className="font-medium text-fg">{ceoStatement.name}</span>
              <span className="text-ink-soft"> · {ceoStatement.title}</span>
            </figcaption>
          </div>
          <div className="relative hidden aspect-[4/3] w-48 overflow-hidden rounded md:block lg:w-60" aria-hidden="true">
            <Image
              src="/images/strategy/quote-ore.jpg"
              alt="Mineralized gold ore rock accent"
              fill
              sizes="240px"
              quality={90}
              className="object-cover"
            />
          </div>
        </figure>
      </Reveal>
    </Section>
  );
}
