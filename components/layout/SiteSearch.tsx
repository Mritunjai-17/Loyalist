"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { footerNav, isGroup, primaryNav } from "@/content/navigation";
import type { NavLink } from "@/types";

// Site pages only for now; documents and releases join the index as their content files land.
function buildIndex(): NavLink[] {
  const seen = new Set<string>();
  const entries: NavLink[] = [];
  const add = (link: NavLink) => {
    if (seen.has(link.href)) return;
    seen.add(link.href);
    entries.push(link);
  };
  for (const entry of primaryNav) {
    if (isGroup(entry)) {
      entry.items.forEach(add);
      if (entry.overview) add(entry.overview);
    } else add(entry);
  }
  footerNav.forEach(add);
  return entries;
}

export function SiteSearch() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const index = useMemo(buildIndex, []);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return index;
    return index.filter((e) => `${e.label} ${e.description ?? ""}`.toLowerCase().includes(q));
  }, [index, query]);

  return (
    <>
      <button type="button" className="header-control w-12" aria-label="Search the site" onClick={() => dialogRef.current?.showModal()}>
        <Search aria-hidden />
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby="site-search-label"
        className="site-search"
        onClick={(e) => { if (e.target === dialogRef.current) dialogRef.current.close(); }}
        onClose={() => setQuery("")}
      >
        <div className="flex items-center gap-3 border-b border-graphite p-4">
          <label id="site-search-label" htmlFor="site-search-input" className="sr-only">
            Search the site
          </label>
          <Search aria-hidden className="h-5 w-5 flex-none text-gold" strokeWidth={1.5} />
          <input
            id="site-search-input"
            type="search"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Projects, reports, pages"
            className="min-h-11 w-full bg-transparent text-ivory placeholder:text-stone focus-visible:outline-none"
          />
          <button type="button" className="header-control w-11 flex-none" aria-label="Close search" onClick={() => dialogRef.current?.close()}>
            <X aria-hidden />
          </button>
        </div>
        <ul className="max-h-[60vh] overflow-y-auto p-3" aria-live="polite">
          {results.length ? (
            results.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="nav-item" onClick={() => dialogRef.current?.close()}>
                  <span className="nav-item-title">{r.label}</span>
                  {r.description ? <span className="nav-item-desc">{r.description}</span> : null}
                </Link>
              </li>
            ))
          ) : (
            <li className="px-3 py-4 text-stone">No results for &ldquo;{query}&rdquo;.</li>
          )}
        </ul>
      </dialog>
    </>
  );
}
