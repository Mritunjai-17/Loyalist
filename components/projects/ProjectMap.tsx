"use client";

import { useRouter } from "next/navigation";
import { mapAnchors, projects } from "@/content/projects";
import type { Metal, Project } from "@/types";
import { cn } from "@/lib/cn";

export type PinShape = "circle" | "diamond" | "triangle";

/** circle = Au, diamond = Au/Ag, triangle = Au/Ni/Cu. */
export function pinShape(metals: Metal[]): PinShape {
  if (metals.includes("Ni") || metals.includes("Cu")) return "triangle";
  if (metals.includes("Ag")) return "diamond";
  return "circle";
}

function Pin({ shape, x, y, r }: { shape: PinShape; x: number; y: number; r: number }) {
  if (shape === "circle") return <circle cx={x} cy={y} r={r} />;
  if (shape === "diamond") return <path d={`M${x} ${y - r * 1.3}L${x + r * 1.3} ${y}L${x} ${y + r * 1.3}L${x - r * 1.3} ${y}Z`} />;
  return <path d={`M${x} ${y - r * 1.4}L${x + r * 1.3} ${y + r}L${x - r * 1.3} ${y + r}Z`} />;
}

type ProjectMapProps = {
  active: Project["slug"] | null;
  onActiveChange: (slug: Project["slug"] | null) => void;
  figureNumber?: string;
};

export function ProjectMap({ active, onActiveChange, figureNumber = "1" }: ProjectMapProps) {
  const router = useRouter();
  const { timmins, kiddCreek } = mapAnchors;

  return (
    <figure className="project-map">
      <svg viewBox="0 0 320 320" role="group" aria-label="Schematic map of Loyalist projects around Timmins" className="block h-auto w-full">
        <rect x="0.5" y="0.5" width="319" height="319" rx="10" className="map-frame" />
        {[80, 160, 240].map((v) => (
          <g key={v} className="map-grid">
            <line x1={v} y1="1" x2={v} y2="319" />
            <line x1="1" y1={v} x2="319" y2={v} />
          </g>
        ))}
        <g className="map-north" aria-hidden>
          <line x1="292" y1="44" x2="292" y2="20" />
          <path d="M292 14l-5 9h10z" />
          <text x="292" y="58" textAnchor="middle">N</text>
        </g>

        {projects.map((p) => (
          <line key={p.slug} x1={timmins.x} y1={timmins.y} x2={p.map.x} y2={p.map.y} className={cn("map-spoke", active === p.slug && "is-active")} />
        ))}

        <g aria-hidden>
          <path d={`M${kiddCreek.x - 4} ${kiddCreek.y - 4}l8 8M${kiddCreek.x + 4} ${kiddCreek.y - 4}l-8 8`} className="map-marker" />
          <text x={kiddCreek.x} y={kiddCreek.y + 18} textAnchor="middle" className="map-label-muted">{kiddCreek.label}</text>
          <rect x={timmins.x - 4} y={timmins.y - 4} width="8" height="8" className="map-city" />
          <text x={timmins.x + 10} y={timmins.y + 4} className="map-label">{timmins.label}</text>
          <text x={timmins.x + 10} y={timmins.y + 17} className="map-label-muted">{timmins.coordinates}</text>
        </g>

        {projects.map((p) => {
          const isActive = active === p.slug;
          const labelLeft = p.map.labelSide === "left";
          return (
            <a
              key={p.slug}
              href={`/projects/${p.slug}`}
              className={cn("map-pin", isActive && "is-active")}
              onMouseEnter={() => onActiveChange(p.slug)}
              onMouseLeave={() => onActiveChange(null)}
              onFocus={() => onActiveChange(p.slug)}
              onBlur={() => onActiveChange(null)}
              onClick={(e) => {
                e.preventDefault();
                router.push(`/projects/${p.slug}`);
              }}
            >
              <circle cx={p.map.x} cy={p.map.y} r="16" className="map-hit" />
              <circle cx={p.map.x} cy={p.map.y} r="11" className="map-ring" />
              <Pin shape={pinShape(p.metals)} x={p.map.x} y={p.map.y} r={5} />
              <text x={labelLeft ? p.map.x - 14 : p.map.x + 14} y={p.map.y - 10} textAnchor={labelLeft ? "end" : "start"} className="map-label">
                {p.name}
              </text>
              <text x={labelLeft ? p.map.x - 14 : p.map.x + 14} y={p.map.y + 3} textAnchor={labelLeft ? "end" : "start"} className="map-label-muted">
                {` ${p.map.distanceKm} km ${p.map.direction}`}
              </text>
              {/* Completes the link's accessible name; sr-only has no effect inside SVG. */}
              <text x={p.map.x} y={p.map.y} className="map-sr">{` of Timmins, ${p.metalsLabel}`}</text>
            </a>
          );
        })}
      </svg>
      <figcaption className="mt-5 grid gap-4">
        <ul className="map-legend" aria-label="Legend">
          {(
            [
              ["circle", "Gold"],
              ["diamond", "Gold, silver"],
              ["triangle", "Gold, nickel, copper"],
            ] as const
          ).map(([shape, label]) => (
            <li key={shape}>
              <svg viewBox="0 0 16 16" aria-hidden className="h-4 w-4">
                <g className="map-legend-pin">
                  <Pin shape={shape} x={8} y={8.5} r={4.5} />
                </g>
              </svg>
              {label}
            </li>
          ))}
          <li>
            <svg viewBox="0 0 16 16" aria-hidden className="h-4 w-4">
              <rect x="4" y="4" width="8" height="8" className="map-city" />
            </svg>
            City
          </li>
        </ul>
        <p className="text-small">Figure {figureNumber}. Schematic. Relative positions, not to scale.</p>
      </figcaption>
    </figure>
  );
}
