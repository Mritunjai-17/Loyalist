"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Download, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { company } from "@/content/company";
import { isGroup, primaryNav } from "@/content/navigation";
import { cn } from "@/lib/cn";
import { formatFileSize } from "@/lib/format";

export function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      // Keep Tab inside the panel and the close button while open.
      if (event.key === "Tab" && panelRef.current) {
        const focusable = [toggleRef.current, ...panelRef.current.querySelectorAll<HTMLElement>("a, button")].filter(
          (el): el is HTMLElement => !!el && el.offsetParent !== null,
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        className="header-control relative z-[60] w-12"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X aria-hidden /> : <Menu aria-hidden />}
      </button>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-50 overflow-y-auto border-t border-graphite bg-black"
      >
        <nav aria-label="Mobile" className="container-site flex min-h-full flex-col py-6">
          <ul className="divide-y divide-graphite border-b border-graphite">
            {primaryNav.map((entry) =>
              isGroup(entry) ? (
                <li key={entry.label}>
                  <button
                    type="button"
                    className="mobile-nav-row"
                    aria-expanded={expanded === entry.label}
                    aria-controls={`mobile-${entry.label.toLowerCase()}`}
                    onClick={() => setExpanded((v) => (v === entry.label ? null : entry.label))}
                  >
                    {entry.label}
                    <ChevronDown aria-hidden className={cn("h-5 w-5 text-gold transition-transform", expanded === entry.label && "rotate-180")} />
                  </button>
                  <ul id={`mobile-${entry.label.toLowerCase()}`} hidden={expanded !== entry.label} className="pb-4">
                    {[...entry.items, ...(entry.overview ? [entry.overview] : [])].map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className="mobile-nav-sub" aria-current={pathname === item.href ? "page" : undefined}>
                          <span className="text-ivory">{item.label}</span>
                          {item.description ? <span className="text-small">{item.description}</span> : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={entry.href}>
                  <Link href={entry.href} className="mobile-nav-row" aria-current={pathname === entry.href ? "page" : undefined}>
                    {entry.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
          <div className="mt-auto grid gap-3 pt-10">
            <a href={company.quoteUrl} target="_blank" rel="noopener noreferrer" className="header-btn header-btn-outline w-full">
              {company.exchange}: {company.ticker}
            </a>
            <a href={company.presentation.href} target="_blank" rel="noopener noreferrer" className="header-btn header-btn-gold w-full">
              Corporate Presentation
              <Download aria-hidden />
              <span className="sr-only">(PDF, {formatFileSize(company.presentation.sizeBytes)})</span>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
