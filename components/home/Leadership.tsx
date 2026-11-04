import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Layers, Pickaxe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/shared/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getMember } from "@/content/team";

function TopographicPatternTopRight() {
  return (
    <svg
      className="pointer-events-none absolute -top-12 -right-12 h-[450px] w-[500px] select-none opacity-[0.08]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      viewBox="0 0 500 450"
      preserveAspectRatio="none"
      aria-hidden
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
    name: "Robert Brese",
    subtitle: "VP OPERATIONS & DIRECTOR – CET",
    bio: "45 years in mining, Timmins resident and former project manager on Tully.",
  },
];

export function Leadership() {
  const featured = getMember("errol-farr");

  return (
    <Section
      tone="paper"
      id="leadership"
      labelledBy="leadership-title"
      className="relative overflow-hidden pb-28 sm:pb-36 lg:pb-40"
    >
      <TopographicPatternTopRight />

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
          <Button
            href="/about/our-team"
            variant="secondary"
            icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
          >
            Meet the Full Team
          </Button>
        }
      />

        {/* Featured Leader: Errol Farr, CPA */}
        <Reveal>
          <article className="flex flex-col lg:flex-row items-stretch gap-6 relative z-10">
            {/* Left Column: Proportional framed portrait matching aimed design */}
            <div
              className="leadership-photo-card w-full lg:w-[280px] xl:w-[290px] shrink-0 min-h-[320px] lg:min-h-0"
              style={{ borderRadius: "20px", overflow: "hidden" }}
            >
              <Image
                src="/images/team/errol-farr-framed.jpg"
                alt="Errol Farr, CPA - President, CEO & Director"
                fill
                sizes="(min-width: 1024px) 300px, 100vw"
                quality={90}
                className="object-cover object-top"
                priority
              />
            </div>

            {/* Right Column: Bio Card with Soft Borders and Depth */}
            <div
              className="leadership-bio-card flex-1 min-w-0 p-6 sm:p-8 lg:p-9 flex flex-col justify-between"
              style={{ borderRadius: "20px" }}
            >
              <div>
                <div className="border-l-[3px] border-gold pl-4 sm:pl-5">
                  <Heading level={3}>
                    <span className="text-ink">
                      {featured.name}
                      {featured.credentials ? `, ${featured.credentials}` : null}
                    </span>
                  </Heading>
                  <div className="text-[11px] font-bold text-gold tracking-[0.14em] uppercase mt-1">
                    PRESIDENT, CEO & DIRECTOR
                  </div>
                </div>

                <p className="mt-4 text-[13px] sm:text-[14px] leading-relaxed text-ink-soft">
                  {featured.bio[0]}
                </p>
              </div>

              {/* Feature Badges Row */}
              <div className="mt-6 pt-5 border-t border-black/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-gold shrink-0 stroke-[1.75]" aria-hidden="true" />
                  <div>
                    <div className="text-[13px] sm:text-sm font-bold text-ink">35+ Years</div>
                    <div className="text-xs text-stone">Industry Experience</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Pickaxe className="w-6 h-6 text-gold shrink-0 stroke-[1.75]" aria-hidden="true" />
                  <div>
                    <div className="text-[13px] sm:text-sm font-bold text-ink">Mining Operations</div>
                    <div className="text-xs text-stone">& Development</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Layers className="w-6 h-6 text-gold shrink-0 stroke-[1.75]" aria-hidden="true" />
                  <div>
                    <div className="text-[13px] sm:text-sm font-bold text-ink">Capital Markets</div>
                    <div className="text-xs text-stone">& Corporate Strategy</div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        {/* 3 Team Cards Grid */}
        <ul className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 relative z-10">
          {teamCards.map((m, idx) => (
            <li key={m.id} className="h-full">
              <Reveal delay={idx * 0.1} className="h-full">
                <Link
                  href="/about/our-team"
                  className="group leadership-team-card h-full p-5 sm:p-6 flex flex-col justify-between block"
                  style={{ borderRadius: "20px" }}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Heading level={3}>
                          <span className="text-ink font-bold block whitespace-nowrap">{m.name}</span>
                        </Heading>
                        <div className="text-[10px] sm:text-[11px] font-bold text-gold tracking-wider uppercase mt-1 leading-tight">
                          {m.subtitle}
                        </div>
                      </div>
                      <ArrowRight
                        className="w-4 h-4 text-gold shrink-0 mt-1 transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </div>

                    <p className="mt-3.5 text-xs sm:text-[13px] text-ink-soft leading-relaxed">
                      {m.bio}
                    </p>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

      {/* Panoramic Rocky Outcrop Horizon at Bottom */}
      <div
        className="pointer-events-none absolute bottom-0 inset-x-0 h-20 sm:h-24 md:h-28 w-full overflow-hidden select-none z-0"
        aria-hidden="true"
      >
        <Image
          src="/images/team/bedrock-panorama.png"
          alt=""
          fill
          className="object-cover object-bottom"
          priority
        />
      </div>
    </Section>
  );
}
