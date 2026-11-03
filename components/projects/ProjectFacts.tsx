import { Badge } from "@/components/ui/Badge";
import { formatNumber } from "@/lib/format";
import type { Project } from "@/types";

/** Key facts, sticky beside the project text on desktop. */
export function ProjectFacts({ project }: { project: Project }) {
  const facts = [
    { label: "Location", value: project.location },
    { label: "Area", value: `${formatNumber(project.areaHa)} ha` },
    { label: "Claims", value: project.claims },
    { label: "Metals", value: project.metalsLabel },
    { label: "Ownership", value: project.ownership },
  ];
  return (
    <aside aria-label={`${project.name} key facts`} className="project-facts">
      <p className="text-small">Key facts</p>
      <div className="mt-4">
        <Badge>{project.stage}</Badge>
      </div>
      <dl className="ruled-facts mt-6">
        {facts.map((f) => (
          <div key={f.label}>
            <dt className="text-small">{f.label}</dt>
            <dd className="mt-1 font-medium text-fg">{f.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
