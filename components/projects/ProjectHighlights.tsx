import type { Project } from "@/types";

/** Published highlight figures as architectural gold metric pillars (no AI box wrappers). */
export function ProjectHighlights({ project }: { project: Project }) {
  return (
    <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-4">
      {project.highlights.map((h) => (
        <div key={h.value} className="border-l-2 border-gold/60 pl-5 py-1.5">
          <dt className="font-serif text-2xl sm:text-3xl font-bold text-gold tabular-nums tracking-tight">
            {h.value}
          </dt>
          <dd className="text-xs sm:text-[13px] font-medium text-ink-soft leading-snug mt-1.5">
            {h.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}
