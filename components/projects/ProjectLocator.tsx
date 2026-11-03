"use client";

import { useState } from "react";
import { ProjectMap } from "./ProjectMap";
import type { Project } from "@/types";

/** The schematic map with one project held highlighted; hovering others previews them. */
export function ProjectLocator({ slug, figureNumber }: { slug: Project["slug"]; figureNumber: string }) {
  const [active, setActive] = useState<Project["slug"] | null>(null);
  return <ProjectMap active={active ?? slug} onActiveChange={setActive} figureNumber={figureNumber} />;
}
