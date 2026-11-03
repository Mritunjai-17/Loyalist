import { Suspense } from "react";
import { DocumentFilter, DocumentListFallback, type FilterableDocument } from "./DocumentFilter";

type FilteredDocumentsProps = {
  items: FilterableDocument[];
  facets: ("year" | "type")[];
  label: string;
};

/** Newest first. The full list is server-rendered until the filter takes over. */
export function FilteredDocuments({ items, facets, label }: FilteredDocumentsProps) {
  const sorted = [...items].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <Suspense fallback={<DocumentListFallback items={sorted} label={label} />}>
      <DocumentFilter items={sorted} facets={facets} label={label} />
    </Suspense>
  );
}
