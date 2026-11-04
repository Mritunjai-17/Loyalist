"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { isGroup, primaryNav } from "@/content/navigation";
import type { NavGroup } from "@/types";
import { cn } from "@/lib/cn";

const CLOSE_DELAY_MS = 140;

function isLinkActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Dropdown({
  group,
  open,
  onOpen,
  onClose,
  pathname,
}: {
  group: NavGroup;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  pathname: string;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const panelId = `nav-${group.label.toLowerCase()}`;
  const links = [...group.items, ...(group.overview ? [group.overview] : [])];
  const groupActive = links.some((l) => isLinkActive(pathname, l.href));

  const cancelClose = () => window.clearTimeout(closeTimer.current);
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => onClose(), CLOSE_DELAY_MS);
  };

  const focusItem = (index: number) => {
    const items = panelRef.current?.querySelectorAll<HTMLAnchorElement>("a");
    if (!items?.length) return;
    items[(index + items.length) % items.length]?.focus();
  };

  const onPanelKeyDown = (event: React.KeyboardEvent) => {
    const items = [...(panelRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [])];
    const current = items.indexOf(document.activeElement as HTMLAnchorElement);
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusItem(current + 1);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      focusItem(current - 1);
    }
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      buttonRef.current?.focus();
    }
  };

  return (
    <li
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") {
          cancelClose();
          onOpen();
        }
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") scheduleClose();
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className={cn("nav-link", groupActive && "nav-link-active")}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? onClose() : onOpen())}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            onOpen();
            requestAnimationFrame(() => focusItem(0));
          }
        }}
      >
        {group.label}
      </button>
      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        className="nav-panel"
        onKeyDown={onPanelKeyDown}
        onBlur={(e) => {
          const next = e.relatedTarget as Node | null;
          if (next && !e.currentTarget.parentElement?.contains(next)) onClose();
        }}
      >
        <ul>
          {group.items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="nav-item"
                aria-current={isLinkActive(pathname, item.href) ? "page" : undefined}
                onClick={() => onClose()}
              >
                <span className="nav-item-title">{item.label}</span>
                {item.description ? <span className="nav-item-desc">{item.description}</span> : null}
              </Link>
            </li>
          ))}
        </ul>
        {group.overview ? (
          <Link
            href={group.overview.href}
            className="nav-overview"
            aria-current={isLinkActive(pathname, group.overview.href) ? "page" : undefined}
            onClick={() => onClose()}
          >
            {group.overview.label}
          </Link>
        ) : null}
      </div>
    </li>
  );
}

export function NavMenu() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const close = useCallback(() => setOpenGroup(null), []);

  useEffect(close, [pathname, close]);

  useEffect(() => {
    if (!openGroup) return;
    const onDocPointer = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) close();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("pointerdown", onDocPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDocPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [openGroup, close]);

  return (
    <nav ref={navRef} aria-label="Primary" className="hidden lg:block">
      <ul className="nav-list">
        {primaryNav.map((entry) => {
          if (isGroup(entry)) {
            return (
              <Dropdown
                key={entry.label}
                group={entry}
                pathname={pathname}
                open={openGroup === entry.label}
                onOpen={() => setOpenGroup(entry.label)}
                onClose={() => setOpenGroup((current) => (current === entry.label ? null : current))}
              />
            );
          }
          const isItemActive = isLinkActive(pathname, entry.href);

          return (
            <li key={entry.href}>
              <Link
                href={entry.href}
                className={cn("nav-link", isItemActive && "nav-link-active")}
                aria-current={isItemActive ? "page" : undefined}
              >
                {entry.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
