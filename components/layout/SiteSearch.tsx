"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { footerNav, isGroup, primaryNav } from "@/content/navigation";
import type { NavLink } from "@/types";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const index = useMemo(buildIndex, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return index;
    return index.filter((e) => `${e.label} ${e.description ?? ""}`.toLowerCase().includes(q));
  }, [index, query]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [dropdownOpen]);

  return (
    <>
      {/* Desktop interactive search capsule */}
      <div ref={containerRef} className="relative hidden xl:block">
        <div className="navbar-search">
          <Search aria-hidden className="h-3.5 w-3.5 text-stone flex-none mr-2" strokeWidth={1.75} />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setDropdownOpen(true);
            }}
            onFocus={() => setDropdownOpen(true)}
            placeholder="Search projects, news..."
            aria-label="Search projects, news"
            className="w-36 xl:w-48 bg-transparent text-xs text-ivory placeholder:text-stone/70 focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setDropdownOpen(false);
              }}
              className="ml-1 text-stone hover:text-ivory p-0.5"
              aria-label="Clear search"
            >
              <X className="h-3 w-3" aria-hidden />
            </button>
          ) : null}
        </div>

        {dropdownOpen && query.trim().length > 0 && (
          <div className="search-dropdown">
            <ul className="max-h-[60vh] overflow-y-auto p-1" aria-live="polite">
              {results.length ? (
                results.slice(0, 8).map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      className="nav-item"
                      onClick={() => {
                        setDropdownOpen(false);
                        setQuery("");
                      }}
                    >
                      <span className="nav-item-title">{r.label}</span>
                      {r.description ? <span className="nav-item-desc">{r.description}</span> : null}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="px-3 py-3 text-xs text-stone">No results for &ldquo;{query}&rdquo;.</li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Compact search trigger for screens below xl */}
      <button
        type="button"
        className="navbar-search-btn-mobile xl:hidden"
        aria-label="Search the site"
        onClick={() => dialogRef.current?.showModal()}
      >
        <Search aria-hidden className="h-4 w-4" strokeWidth={1.75} />
      </button>

      {/* Accessible search modal */}
      <dialog
        ref={dialogRef}
        aria-labelledby="site-search-label"
        className="site-search"
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current.close();
        }}
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
            placeholder="Search projects, news..."
            className="min-h-11 w-full bg-transparent text-ivory placeholder:text-stone focus-visible:outline-none"
          />
          <button
            type="button"
            className="header-control w-11 flex-none"
            aria-label="Close search"
            onClick={() => dialogRef.current?.close()}
          >
            <X aria-hidden />
          </button>
        </div>
        <ul className="max-h-[60vh] overflow-y-auto p-3" aria-live="polite">
          {results.length ? (
            results.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="nav-item"
                  onClick={() => dialogRef.current?.close()}
                >
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
