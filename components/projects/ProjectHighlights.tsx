import type { Project } from "@/types";

/** Published highlight figures as a ruled list: value, then what it measures. */
export function ProjectHighlights({ project }: { project: Project }) {
  return (
    <dl className="highlight-list">
      {project.highlights.map((h) => (
        <div key={h.value}>
          <dt className="highlight-value">{h.value}</dt>
          <dd>{h.label}</dd>
        </div>
      ))}
    </dl>
  );
}
