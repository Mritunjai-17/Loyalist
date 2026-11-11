"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

/**
 * The header bar. On the homepage it sits transparent over the hero photograph
 * and turns solid midnight once the page is scrolled; everywhere else it is solid.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const isHome = usePathname() === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const update = () => setScrolled(window.scrollY > 32);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [isHome]);

  return (
    <header className="site-header" data-overlay={isHome && !scrolled ? "true" : undefined}>
      {children}
    </header>
  );
}
