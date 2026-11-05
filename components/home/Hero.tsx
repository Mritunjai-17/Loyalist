import Image from "next/image";
import { ArrowRight, Crosshair, Download, Layers, Mountain, Pickaxe, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/shared/Reveal";
import { homeHero as hero } from "@/content/company";
import type { HeroFeatureIcon } from "@/types";
import { HeroStrip } from "./HeroStrip";

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
      <polygon points="7 5 17 5 19 9 5 9" />
      <line x1="6.5" y1="7" x2="17.5" y2="7" />
      <polygon points="2 13 10.5 13 12 17 0.5 17" />
      <line x1="1.5" y1="15" x2="11" y2="15" />
      <polygon points="13.5 13 22 13 23.5 17 12 17" />
      <line x1="13" y1="15" x2="22.5" y2="15" />
    </svg>
  );
}

const featureIcons: Record<HeroFeatureIcon, LucideIcon | typeof BullionIcon> = {
  layers: Layers,
  mountain: Mountain,
  pickaxe: Pickaxe,
  crosshair: Crosshair,
  metals: BullionIcon,
};

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-photo" aria-hidden>
        <Image
          src={hero.photo.src}
          alt={hero.photo.alt}
          fill
          priority
          sizes="100vw"
          quality={92}
          placeholder="empty"
          className="object-cover"
          style={{ objectPosition: hero.focalPoint }}
        />
      </div>
      <div className="hero-overlay hero-overlay-left" aria-hidden />
      <div className="hero-overlay hero-overlay-top" aria-hidden />
      <div className="hero-overlay hero-overlay-bottom" aria-hidden />
      <div className="hero-overlay hero-overlay-uniform" aria-hidden />

      <Reveal duration={0.6} y={20} className="flex-1 flex flex-col justify-center">
        <Container className="hero-content">
          <div className="hero-copy">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <Heading level={1} variant="display" stacked accent={hero.accent} id="hero-title" className="hero-title">
              {hero.title}
            </Heading>
            <p className="hero-lead">{hero.lead}</p>
            <div className="hero-actions">
              <Button size="lg" href={hero.primaryCta.href} icon={<ArrowRight aria-hidden />}>
                {hero.primaryCta.label}
              </Button>
              <Button size="lg" variant="secondary" href={hero.secondaryCta.href} external icon={<Download aria-hidden />}>
                {hero.secondaryCta.label}
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </Button>
            </div>
            <ul className="hero-features">
              {hero.features.map(({ icon, lines }) => {
                const Icon = featureIcons[icon];
                return (
                  <li key={icon} className="hero-feature">
                    <Icon aria-hidden />
                    <span>
                      {lines[0]}
                      <br />
                      {lines[1]}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </Reveal>

      <HeroStrip items={hero.strip} />
    </section>
  );
}
