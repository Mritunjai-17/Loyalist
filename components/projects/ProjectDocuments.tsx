import { DocumentRow } from "@/components/shared/DocumentRow";
import { documents } from "@/content/documents";
import { pressReleases } from "@/content/press-releases";
import type { Project } from "@/types";

/** Technical reports for the project, then releases that name it in the title. */
export function projectDocuments(project: Project) {
  const reports = documents.filter((d) => d.project === project.slug);
  const pattern = new RegExp(`\\b${project.name.replace(/\s+/g, "\\s+")}\\b`, "i");
  const releases = pressReleases.filter((r) => pattern.test(r.title)).map((r) => ({ ...r, type: r.tag }));
  return [...reports, ...releases].sort((a, b) => b.date.localeCompare(a.date));
}

export function ProjectDocuments({ project, limit = 8 }: { project: Project; limit?: number }) {
  const items = projectDocuments(project).slice(0, limit);
  if (!items.length) return <p className="text-small">No documents published for this project yet.</p>;
  return (
    <ul className="document-list" aria-label={`${project.name} documents`}>
      {items.map((d) => (
        <DocumentRow key={d.href + d.title} type={d.type} title={d.title} date={d.date} href={d.href} sizeBytes={d.sizeBytes} available={d.available} />
      ))}
    </ul>
  );
}
