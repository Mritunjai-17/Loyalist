import { Coins, Layers, MapPin, Mountain, TrendingUp, type LucideIcon } from "lucide-react";
import type { HeroStripIcon, HomeHero } from "@/types";
import { cn } from "@/lib/cn";

// Lucide icons representing market ticker, location, project claims, and mined commodities
const icons: Record<HeroStripIcon, LucideIcon> = {
  chart: TrendingUp,
  pin: MapPin,
  mountain: Mountain,
  layers: Layers,
  metals: Coins,
};

export function HeroStrip({ items }: { items: HomeHero["strip"] }) {
  return (
    <div className="hero-strip">
      <ul className="hero-strip-grid">
        {items.map(({ icon, label, emphasis }) => {
          const Icon = icons[icon];
          return (
            <li key={label} className="hero-strip-cell">
              <Icon aria-hidden />
              <span className={cn(emphasis && "hero-strip-emphasis")}>{label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
