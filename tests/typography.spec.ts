import { expect, test, type Page } from "@playwright/test";
import { at1440, routes } from "./routes";

type HeadingStyle = { tag: string; variant: string | null; size: number; lineHeight: string; tracking: string; family: string };

async function collect(page: Page) {
  return page.evaluate(() => {
    const px = (v: string) => Math.round(parseFloat(v) * 10) / 10;
    const headings = [...document.querySelectorAll<HTMLElement>("h1,h2,h3,h4,h5,h6")].map((h) => {
      const s = getComputedStyle(h);
      return {
        tag: h.tagName.toLowerCase(),
        variant: h.getAttribute("data-variant"),
        size: px(s.fontSize),
        lineHeight: s.lineHeight,
        tracking: s.letterSpacing,
        family: s.fontFamily,
      };
    });
    // Elements outside headings that render text in the heading face.
    const strayFraunces = [...document.body.querySelectorAll<HTMLElement>("*")]
      .filter((el) => !el.closest("h1,h2,h3,h4,h5,h6") && el.childNodes.length)
      .filter((el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent!.trim()))
      .filter((el) => /fraunces/i.test(getComputedStyle(el).fontFamily))
      .map((el) => `${el.tagName.toLowerCase()}.${el.className}`);
    const eyebrows = [...document.querySelectorAll<HTMLElement>("[data-eyebrow]")].map((el) => {
      const s = getComputedStyle(el);
      const rule = getComputedStyle(el, "::before");
      return {
        // Section 6: the home hero eyebrow alone scales with the hero; its style stays the same.
        size: el.closest(".hero") ? 13 : px(s.fontSize),
        transform: s.textTransform,
        tracking: Math.round((parseFloat(s.letterSpacing) / parseFloat(s.fontSize)) * 100) / 100,
        rule: `${px(rule.width)}x${px(rule.height)}`,
      };
    });
    // Eyebrow -> h2 -> lead gaps inside every section header.
    const headers = [...document.querySelectorAll<HTMLElement>("[data-section-header]")].map((header) => {
      const eyebrow = header.querySelector("[data-eyebrow]")!.getBoundingClientRect();
      const h2 = header.querySelector("h2")!.getBoundingClientRect();
      const lead = header.querySelector(".text-lead")?.getBoundingClientRect();
      return {
        order: eyebrow.bottom <= h2.top && (!lead || h2.bottom <= lead.top),
        eyebrowToH2: Math.round(h2.top - eyebrow.bottom),
        h2ToLead: lead ? Math.round(lead.top - h2.bottom) : null,
      };
    });
    const buttons = [...document.querySelectorAll<HTMLElement>(".btn, .header-btn")].map((b) => ({
      header: b.classList.contains("header-btn"),
      transform: getComputedStyle(b).textTransform,
      text: b.textContent?.trim(),
    }));
    return { headings, strayFraunces, eyebrows, headers, buttons };
  });
}

test("typography is identical on every route", async ({ page }, info) => {
  const is1440 = info.project.name === "1440x900";
  const byRole = new Map<string, Set<string>>();
  const record = (role: string, h: HeadingStyle) => {
    const key = `${h.size}|${h.lineHeight}|${h.tracking}`;
    byRole.set(role, (byRole.get(role) ?? new Set()).add(key));
  };

  for (const route of routes) {
    await page.goto(route);
    const data = await collect(page);
    const where = `${route} @ ${info.project.name}`;

    // The noindex styleguide shows both h1 specimens (page title and display) side by side.
    const h1Count = route === "/styleguide" ? 2 : 1;
    expect(data.headings.filter((h) => h.tag === "h1"), `${where}: h1 count`).toHaveLength(h1Count);
    let previous = 0;
    for (const h of data.headings) {
      const level = Number(h.tag[1]);
      expect(level, `${where}: no skipped level before ${h.tag}`).toBeLessThanOrEqual(previous + 1);
      previous = level;
      expect(h.family, `${where}: ${h.tag} family`).toMatch(/^"?Fraunces/i);
      if (h.tag === "h1") record(h.variant === "display" ? "display" : "pageTitle", h);
      else record(h.tag, h);
    }
    expect(data.strayFraunces, `${where}: Fraunces outside headings`).toEqual([]);

    for (const e of data.eyebrows) {
      expect(e, `${where}: eyebrow`).toEqual({ size: 13, transform: "uppercase", tracking: 0.14, rule: "28x2" });
    }
    for (const s of data.headers) {
      expect(s.order, `${where}: header order`).toBe(true);
      expect(Math.abs(s.eyebrowToH2 - 20), `${where}: eyebrow to h2 gap ${s.eyebrowToH2}`).toBeLessThanOrEqual(2);
      if (s.h2ToLead !== null) expect(Math.abs(s.h2ToLead - 20), `${where}: h2 to lead gap ${s.h2ToLead}`).toBeLessThanOrEqual(2);
    }
    for (const b of data.buttons) {
      expect(b.transform, `${where}: button "${b.text}"`).toBe(b.header ? "none" : "uppercase");
    }
  }

  for (const [role, values] of byRole) {
    expect([...values], `${role} styles across pages @ ${info.project.name}`).toHaveLength(1);
    if (is1440 && role in at1440) {
      const size = Number([...values][0]!.split("|")[0]);
      expect(Math.abs(size - at1440[role as keyof typeof at1440]), `${role} size ${size}`).toBeLessThanOrEqual(0.1);
    }
  }
  console.log(
    `[${info.project.name}] ` +
      [...byRole].map(([role, v]) => `${role}=${[...v][0]!.split("|")[0]}px`).join(" "),
  );
});
