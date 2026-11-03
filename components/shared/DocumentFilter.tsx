"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId, useMemo } from "react";
import { DocumentRow } from "./DocumentRow";

export type FilterableDocument = {
  type: string;
  title: string;
  date: string;
  href: string;
  sizeBytes: number | null;
  available: boolean;
  /** Filter year; defaults to the year of `date`. */
  year?: number;
};

type Facet = "year" | "type";

type DocumentFilterProps = {
  items: FilterableDocument[];
  facets: Facet[];
  /** Accessible name of the result list, e.g. "Financial statements and MD&A". */
  label: string;
};

const yearOf = (item: FilterableDocument) => String(item.year ?? item.date.slice(0, 4));

/** Year and type filters held in the URL (?year=2026&type=MD%26A), applied instantly. */
export function DocumentFilter({ items, facets, label }: DocumentFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const baseId = useId();

  const options = useMemo(
    () => ({
      year: [...new Set(items.map(yearOf))].sort((a, b) => b.localeCompare(a)),
      type: [...new Set(items.map((i) => i.type))].sort(),
    }),
    [items],
  );
  const shown = facets.filter((f) => options[f].length > 1);

  const selected = {
    year: params.get("year") ?? "",
    type: params.get("type") ?? "",
  };

  const results = items.filter(
    (item) =>
      (!selected.year || yearOf(item) === selected.year) && (!selected.type || item.type === selected.type),
  );

  function update(facet: Facet, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(facet, value);
    else next.delete(facet);
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  const active = Boolean(selected.year || selected.type);

  return (
    <div>
      {shown.length ? (
        <div className="filter-bar" role="search" aria-label={`Filter ${label}`}>
          {shown.map((facet) => (
            <div key={facet} className="filter-field">
              <label htmlFor={`${baseId}-${facet}`} className="field-label">
                {facet === "year" ? "Year" : "Type"}
              </label>
              <select
                id={`${baseId}-${facet}`}
                className="field filter-select"
                value={selected[facet]}
                onChange={(e) => update(facet, e.target.value)}
              >
                <option value="">{facet === "year" ? "All years" : "All types"}</option>
                {options[facet].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <p className="text-small filter-count" aria-live="polite">
            {results.length} of {items.length} {items.length === 1 ? "document" : "documents"}
          </p>
          {active ? (
            <button type="button" className="text-link filter-clear" onClick={() => router.replace(pathname, { scroll: false })}>
              Clear filters
            </button>
          ) : null}
        </div>
      ) : null}

      {results.length ? (
        <ul className="document-list" aria-label={label}>
          {results.map((item) => (
            <DocumentRow key={item.href + item.title} {...item} />
          ))}
        </ul>
      ) : (
        <div className="filter-empty">
          <p className="font-medium text-fg">No results.</p>
          <p className="text-small mt-2">No documents match these filters. Clear them to see the full list.</p>
        </div>
      )}
    </div>
  );
}

/** Server-rendered list shown before the filter loads, and without JavaScript. */
export function DocumentListFallback({ items, label }: { items: FilterableDocument[]; label: string }) {
  return (
    <ul className="document-list" aria-label={label}>
      {items.map((item) => (
        <DocumentRow key={item.href + item.title} {...item} />
      ))}
    </ul>
  );
}
