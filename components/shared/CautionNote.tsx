import { tullyResource } from "@/content/resource-tully";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/cn";

/** Shown next to every view of resource figures. */
export function CautionNote({ className }: { className?: string }) {
  const release = tullyResource.newsRelease;
  return (
    <aside aria-label="Cautionary note" className={cn("border-l-2 border-[color:var(--accent-rule)] pl-5", className)}>
      <p className="text-small text-fg">
        Mineral Resources which are not Mineral Reserves do not have demonstrated economic viability.
      </p>
      <p className="text-small mt-2">
        Details in the{" "}
        <a href={release.href} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">
          news release of {formatDate(release.date)} (PDF)
        </a>
        .
      </p>
    </aside>
  );
}
