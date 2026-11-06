import Image from "next/image";
import { ChartColumnIncreasing, Layers, Pickaxe, Quote } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/shared/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { ceoStatement, strategySteps } from "@/content/strategy";

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
        {/* Top-right concentric contours */}
        <path d="M 1000 -50 C 1100 80, 1280 120, 1500 100" />
        <path d="M 920 -50 C 1040 120, 1240 180, 1500 150" />
        <path d="M 840 -50 C 980 160, 1200 240, 1500 200" />
        <path d="M 760 -50 C 920 200, 1160 300, 1500 250" />
        <path d="M 680 -50 C 860 240, 1120 360, 1500 300" />

        {/* Diagonal flowing contour bands across background */}
        <path d="M 600 -50 C 720 180, 950 320, 1300 480 C 1400 520, 1460 560, 1500 600" />
        <path d="M 520 -50 C 660 220, 890 380, 1240 540 C 1350 580, 1430 630, 1500 680" />
        <path d="M 440 -50 C 600 260, 830 440, 1180 600 C 1300 650, 1400 710, 1500 760" />
        <path d="M 360 -50 C 540 300, 770 500, 1120 660 C 1250 720, 1370 790, 1500 840" />

        {/* Bottom loops */}
        <path d="M -50 650 C 150 580, 350 640, 550 750 C 700 830, 850 820, 1000 850" />
        <path d="M -50 710 C 170 640, 370 700, 580 810 C 730 890, 870 880, 1020 910" />
        <path d="M -50 770 C 190 700, 390 760, 610 870" />

        {/* Elevation loops */}
        <ellipse cx="1320" cy="180" rx="200" ry="90" />
        <ellipse cx="1320" cy="180" rx="150" ry="65" />
        <ellipse cx="1320" cy="180" rx="100" ry="40" />
      </g>
    </svg>
  );
}

type StepVisual = {
  image: string;
  alt: string;
  icon: typeof Layers;
};

const defaultVisual: StepVisual = {
  image: "/images/strategy/acquire-ore.jpg",
  alt: "High-grade gold mineralization in quartz vein",
  icon: Layers,
};

const stepVisuals: readonly StepVisual[] = [
  {
    image: "/images/strategy/acquire-ore.jpg",
    alt: "High-grade gold mineralization in quartz vein",
    icon: Layers,
  },
  {
    image: "/images/strategy/explore-cores.jpg",
    alt: "Diamond drill core samples in core boxes",
    icon: Pickaxe,
  },
  {
    image: "/images/strategy/advance-rig.jpg",
    alt: "Drill rig actively operating on site at sunset",
    icon: ChartColumnIncreasing,
  },
];

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

      {/* 3 Step Cards */}
      <ol className="relative grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {strategySteps.map((step, idx) => {
          const visual = stepVisuals[idx] ?? defaultVisual;
          const Icon = visual.icon;

          return (
            <li key={step.title} className="h-full">
              <Reveal delay={idx * 0.1} className="h-full">
                <article
                  className="strategy-step-card group relative flex flex-col h-full"
                  style={{ borderRadius: "20px" }}
                >
                  {/* Card Photo Header */}
                  <div
                    className="relative h-40 sm:h-44 w-full overflow-hidden bg-black/10"
                    style={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}
                  >
                    <Image
                      src={visual.image}
                      alt={visual.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      quality={90}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                    {/* Top-Left Category Icon Badge */}
                    <div
                      className="absolute top-3.5 left-3.5 z-10 flex h-8 w-8 items-center justify-center border border-gold/40 bg-white/95 text-gold shadow-md backdrop-blur-sm"
                      style={{ borderRadius: "8px" }}
                    >
                      <Icon className="h-4 w-4 stroke-[1.75]" />
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <Heading level={3}>
                      <span className="flex items-center gap-3">
                        <span className="font-semibold text-gold">{step.numeral}</span>
                        <span className="text-black/20 select-none" aria-hidden="true">
                          |
                        </span>
                        <span className="text-ink">{step.title}</span>
                      </span>
                    </Heading>
                    <p className="mt-4 flex-1 text-sm sm:text-base leading-relaxed text-ink-soft">{step.body}</p>
                    <div className="mt-6 pt-2">
                      <TextLink href={step.link.href}>{step.link.label}</TextLink>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>

      {/* CEO Quote Card Banner */}
      <Reveal delay={0.2} className="mt-10 sm:mt-12">
        <figure
          className="strategy-quote-card relative flex flex-col md:flex-row items-stretch"
          style={{ borderRadius: "20px" }}
        >
          <div className="flex flex-1 items-center p-6 sm:p-8 lg:p-10 gap-5 sm:gap-7">
            <Quote className="h-8 w-8 text-gold fill-current shrink-0 rotate-180" aria-hidden="true" />
            <div className="hidden sm:block w-[2px] self-stretch bg-gold shrink-0" aria-hidden="true" />
            <div className="flex-1 min-w-0">
              <blockquote>
                <p className="text-base sm:text-lg text-ink italic leading-relaxed">
                  &ldquo;{ceoStatement.text}&rdquo;
                </p>
              </blockquote>
            </div>
            <div className="hidden lg:block w-[1px] self-stretch bg-black/10 shrink-0 mx-4" aria-hidden="true" />
            <figcaption className="shrink-0 hidden sm:block">
              <div className="font-medium text-ink text-base whitespace-nowrap">{ceoStatement.name}</div>
              <div className="text-sm text-ink-soft mt-0.5 whitespace-nowrap">{ceoStatement.title}</div>
            </figcaption>
          </div>

          {/* Mobile-only figcaption when sm is hidden */}
          <figcaption className="sm:hidden px-6 pb-6 pt-0 border-t border-black/10">
            <div className="font-medium text-ink text-base">{ceoStatement.name}</div>
            <div className="text-sm text-ink-soft mt-0.5">{ceoStatement.title}</div>
          </figcaption>

          {/* Angled Mineral Rock Photo on Right */}
          <div
            className="relative hidden md:block w-36 lg:w-48 xl:w-56 shrink-0 overflow-hidden"
            style={{ clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
            aria-hidden="true"
          >
            <Image
              src="/images/strategy/quote-ore.jpg"
              alt="Mineralized gold ore rock accent"
              fill
              sizes="(min-width: 1024px) 240px, 160px"
              quality={90}
              className="object-cover"
            />
          </div>
        </figure>
      </Reveal>
    </Section>
  );
}
