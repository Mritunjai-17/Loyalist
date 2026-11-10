import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Layers, MapPin, Mountain } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/shared/Reveal";
import { AnimatedNumber } from "@/components/shared/AnimatedNumber";
import { company } from "@/content/company";

function BullionIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polygon points="7 5 17 5 19 9 5 9" />
      <line x1="6.5" y1="7" x2="17.5" y2="7" />
      <polygon points="2 13 10.5 13 12 17 0.5 17" />
      <line x1="1.5" y1="15" x2="11" y2="15" />
      <polygon points="13.5 13 22 13 23.5 17 12 17" />
      <line x1="13" y1="15" x2="22.5" y2="15" />
    </svg>
  );
}

function TopographicPatternTopRight() {
  return (
    <svg
      className="pointer-events-none absolute -top-12 -right-12 h-[450px] w-[500px] select-none opacity-[0.07]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      viewBox="0 0 500 450"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g className="text-gold">
        <path d="M 200 0 C 260 70, 340 120, 500 140" />
        <path d="M 140 0 C 210 95, 305 165, 500 195" />
        <path d="M 80 0 C 160 120, 270 210, 500 250" />
        <path d="M 20 0 C 110 145, 230 255, 500 305" />
        <path d="M 0 50 C 70 180, 190 300, 500 360" />
        <path d="M 0 130 C 50 220, 150 345, 500 415" />
        <ellipse cx="430" cy="70" rx="50" ry="25" />
      </g>
    </svg>
  );
}

const companyStats = [
  {
    icon: Layers,
    value: "4",
    num: 4,
    label: "Projects in the Timmins district",
    isLargeNum: true,
  },
  {
    icon: MapPin,
    value: "Timmins, Ontario",
    label: "Established mining camp",
    isLargeNum: false,
  },
  {
    icon: BullionIcon,
    value: "Gold & Strategic Metals",
    label: "Exploration and project development",
    isLargeNum: false,
  },
  {
    icon: Mountain,
    value: "~3,900 ha",
    num: 3900,
    prefix: "~",
    suffix: " ha",
    label: "Total land position",
    isLargeNum: true,
  },
];

export function CompanyProfileHero() {
  return (
    <header data-tone="paper" className="relative overflow-hidden bg-surface pt-[calc(var(--header-h)+28px)] pb-14 sm:pb-16 lg:pb-20">
      <TopographicPatternTopRight />

      <div className="container-site relative z-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb">
          <ol className="breadcrumb">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about/company-profile">About</Link>
            </li>
            <li>
              <span aria-current="page">Company Profile</span>
            </li>
          </ol>
        </nav>

        {/* Hero Content Grid: Left Column Text & CTAs, Right Column Visual */}
        <div className="mt-8 sm:mt-10 grid gap-10 lg:grid-cols-12 lg:gap-10 xl:gap-14 items-center">
          {/* Left Column: Heading, Lead & Action Buttons */}
          <div className="lg:col-span-6 xl:col-span-6">
            <Reveal>
              <div className="flex items-center gap-3 text-xs sm:text-[13px] font-semibold tracking-[0.18em] text-ink uppercase">
                <span className="w-8 h-[2px] bg-gold" aria-hidden="true" />
                <span>ABOUT LOYALIST</span>
              </div>

              <Heading
                level={1}
                className="mt-4 sm:mt-5 text-ink"
              >
                A Focused Exploration{" "}
                <span className="block mt-1">
                  Company <em className="heading-accent">in Timmins.</em>
                </span>
              </Heading>

              <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed max-w-xl">
                Loyalist Exploration Limited (CSE: PNGC) is building a portfolio of gold and strategic metals projects in
                the Timmins Mining Camp, with a clear strategy to acquire, explore and advance quality assets.
              </p>

              {/* Action Buttons */}
              <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-4">
                <Button
                  href="/projects"
                  icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
                >
                  Explore Our Projects
                </Button>
                <Button
                  href={company.presentation.href}
                  external
                  variant="secondary"
                  icon={<Download className="h-4 w-4" aria-hidden="true" />}
                >
                  Corporate Presentation
                  <span className="sr-only"> (PDF, opens in a new tab)</span>
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Visual Composition with Boreal Landscape & Gold Ore Specimen */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end">
            <Reveal delay={0.15} className="w-full max-w-[560px]">
              {/* Real landscape photograph in a plain frame. The previous asset was a
                  pre-composed mockup (skewed frames, inset specimen) baked into one PNG.
                  The 2:1 crop is anchored to the bottom to drop the sky band. */}
              <div className="relative w-full aspect-[2/1] overflow-hidden rounded bg-forest">
                <Image
                  src="/images/about/landscape.jpg"
                  alt="Panoramic view over the Timmins mining camp and boreal forest at sunset"
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-bottom"
                />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom 4-Column KPI Stats Bar */}
        <Reveal delay={0.25}>
          <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-black/[0.08] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {companyStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`flex items-start gap-4 ${
                    idx !== 0 ? "lg:border-l lg:border-black/[0.08] lg:pl-6 xl:pl-8" : ""
                  }`}
                >
                  <div className="shrink-0 text-gold pt-0.5">
                    <Icon className="h-7 w-7 stroke-[1.4]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <div
                      className={`font-bold text-ink leading-tight ${
                        stat.isLargeNum ? "text-2xl sm:text-[26px]" : "text-base sm:text-lg"
                      }`}
                    >
                      {stat.num ? (
                        <>
                          {stat.prefix}
                          <AnimatedNumber value={stat.num} />
                          {stat.suffix}
                        </>
                      ) : (
                        stat.value
                      )}
                    </div>
                    <div className="text-xs sm:text-[13px] text-stone mt-1 leading-snug">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>

    </header>
  );
}
