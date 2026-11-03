"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { ProjectMap } from "@/components/projects/ProjectMap";
import { projects } from "@/content/projects";
import { formatNumber } from "@/lib/format";
import type { Project } from "@/types";
import { cn } from "@/lib/cn";

/** Map on the left, ruled index on the right; each highlights the other. */
export function ProjectIndex({ figureNumber }: { figureNumber?: string }) {
  const [active, setActive] = useState<Project["slug"] | null>(null);

  return (
    <div className="grid gap-12 xl:grid-cols-12">
      <div className="max-w-xl xl:col-span-5 xl:max-w-none">
        <ProjectMap active={active} onActiveChange={setActive} figureNumber={figureNumber} />
      </div>
      <div className="min-w-0 xl:col-span-7">
        <div className="project-index-head" aria-hidden>
          <span>No.</span>
          <span>Name</span>
          <span>Location</span>
          <span className="text-right">Area</span>
          <span>Stage</span>
          <span />
        </div>
        <ol className="project-index">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/projects/${p.slug}`}
                className={cn("project-index-row", active === p.slug && "is-active")}
                onMouseEnter={() => setActive(p.slug)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(p.slug)}
                onBlur={() => setActive(null)}
              >
                <span className="project-index-no">{p.number}</span>
                <span className="project-index-name">{p.name}</span>
                <span className="project-index-cell">{p.location}</span>
                <span className="project-index-cell lg:text-right">{formatNumber(p.areaHa)} ha</span>
                <span className="project-index-cell">{p.stage}</span>
                <ArrowRight aria-hidden className="project-index-arrow" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
