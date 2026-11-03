import { ChartLine, Coins, MapPin, Mountain, type LucideIcon } from "lucide-react";
import type { HeroStripIcon, HomeHero } from "@/types";
import { cn } from "@/lib/cn";

// Lucide has no gold-bar glyph; Coins stands in for the metals cell.
const icons: Record<HeroStripIcon, LucideIcon> = {
  chart: ChartLine,
  pin: MapPin,
  mountain: Mountain,
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
