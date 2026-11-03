import Image from "next/image";
import { ArrowRight, Crosshair, Download, Layers, Pickaxe, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { homeHero as hero } from "@/content/company";
import type { HeroFeatureIcon } from "@/types";
import { HeroStrip } from "./HeroStrip";

const featureIcons: Record<HeroFeatureIcon, LucideIcon> = {
  layers: Layers,
  pickaxe: Pickaxe,
  crosshair: Crosshair,
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
          quality={85}
          placeholder="empty"
          className="object-cover"
          style={{ objectPosition: hero.focalPoint }}
        />
      </div>
      <div className="hero-overlay hero-overlay-left" aria-hidden />
      <div className="hero-overlay hero-overlay-top" aria-hidden />
      <div className="hero-overlay hero-overlay-bottom" aria-hidden />
      <div className="hero-overlay hero-overlay-uniform" aria-hidden />

      <Container className="hero-content">
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
      </Container>

      <HeroStrip items={hero.strip} />
    </section>
  );
}
