import Image from "next/image";
import { ArrowRight, Leaf, Pickaxe, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { commitments, companyProfileLink, whoWeAre } from "@/content/strategy";

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
      aria-hidden
    >
      {/* Top ingot */}
      <polygon points="7 5 17 5 19 9 5 9" />
      <line x1="6.5" y1="7" x2="17.5" y2="7" />

      {/* Bottom left ingot */}
      <polygon points="2 13 10.5 13 12 17 0.5 17" />
      <line x1="1.5" y1="15" x2="11" y2="15" />

      {/* Bottom right ingot */}
      <polygon points="13.5 13 22 13 23.5 17 12 17" />
      <line x1="13" y1="15" x2="22.5" y2="15" />
    </svg>
  );
}

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

const commitmentItems = [
  { icon: BullionIcon, label: commitments[0] },
  { icon: Pickaxe, label: commitments[1] },
  { icon: Leaf, label: commitments[2] },
  { icon: Users, label: commitments[3] },
];

export function Intro() {
  return (
    <Section tone="carbon" id="about" labelledBy="about-title" className="relative overflow-hidden">
      <TopographicPattern />
      <div className="relative z-10 grid gap-y-10 lg:grid-cols-12 lg:gap-x-12">
        <div className="relative flex flex-col lg:col-span-5">
          <SectionHeader
            number="01"
            label="About"
            id="about-title"
            title="Four Properties."
            accent="One Mining District."
            stacked
            className="relative z-10 mb-0"
          />
          <Reveal delay={0.1}>
            <div className="about-bleed-photo relative z-0 -mt-3 h-[320px] overflow-hidden border-b border-r border-graphite/40 shadow-2xl sm:h-[360px] lg:-mt-6 lg:h-[400px]">
              <Image
                src="/images/about/landscape.jpg"
                alt="Panoramic view over the Timmins mining camp and boreal forest at sunset"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-left-bottom transition-transform duration-700 hover:scale-105"
                priority
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-carbon via-carbon/60 to-transparent" />
            </div>
          </Reveal>
        </div>

        <div className="flex min-w-0 flex-col justify-start lg:col-span-7 lg:pt-6">
          <Reveal delay={0.1}>
            <div className="space-y-4 text-[0.9375rem] leading-relaxed text-fg-body">
              {whoWeAre.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <ul className="mt-6 divide-y divide-graphite/40 border-b border-graphite/40" aria-label="Our commitments">
              {commitmentItems.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-4 py-3">
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-gold/40 bg-black/50 text-gold shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[0.9375rem] text-ivory">{label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <Button
                href={companyProfileLink.href}
                icon={<ArrowRight aria-hidden className="h-4 w-4" />}
              >
                {companyProfileLink.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
