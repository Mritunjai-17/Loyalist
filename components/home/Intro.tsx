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

const commitmentItems = [
  { icon: BullionIcon, label: commitments[0] },
  { icon: Pickaxe, label: commitments[1] },
  { icon: Leaf, label: commitments[2] },
  { icon: Users, label: commitments[3] },
];

export function Intro() {
  return (
    <Section tone="paper" id="about" labelledBy="about-title" className="relative overflow-hidden">
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
            {/* A 2:1 frame anchored to the bottom crops the sky band of this asset,
                which carries baked-in text, instead of masking it with a gradient. */}
            <div className="about-bleed-photo relative mt-8 aspect-[2/1] overflow-hidden lg:mt-10">
              <Image
                src="/images/about/landscape.jpg"
                alt="Panoramic view over the Timmins mining camp and boreal forest at sunset"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[left_bottom]"
                priority
              />
            </div>
          </Reveal>
        </div>

        <div className="flex min-w-0 flex-col justify-start lg:col-span-7 lg:pt-6">
          <Reveal delay={0.1}>
            <div className="max-w-[62ch] space-y-4 text-[1rem] leading-relaxed text-fg-body">
              {whoWeAre.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            {/* Commitments as a two-column list: whitespace, not rules, separates them. */}
            <ul className="mt-9 grid gap-x-10 gap-y-5 sm:grid-cols-2" aria-label="Our commitments">
              {commitmentItems.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-3.5">
                  <Icon className="mt-0.5 h-5 w-5 flex-none text-gold stroke-[1.5]" />
                  <span className="text-[0.9375rem] font-medium leading-snug text-fg">{label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
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
