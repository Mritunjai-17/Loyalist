import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { routes } from "./routes";

async function revealAll(page: Page) {
  // Sections fade in on first view; scroll through so every one has been seen.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);
}

for (const route of routes) {
  test(`page health ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(e.message));

    await page.goto(route, { waitUntil: "networkidle" });
    await revealAll(page);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, "horizontal overflow").toBeLessThanOrEqual(0);

    const axe = await new AxeBuilder({ page }).analyze();
    const serious = axe.violations
      .filter((v) => v.impact === "serious" || v.impact === "critical")
      .map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(", ")}`);
    expect(serious, "axe serious/critical").toEqual([]);

    expect(errors, "console errors").toEqual([]);
  });
}

test("internal links resolve", async ({ page, request }, info) => {
  test.skip(info.project.name !== "1440x900", "once is enough");
  const hrefs = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    const found = await page.$$eval("a[href^='/']", (as) => as.map((a) => a.getAttribute("href")!.split("#")[0]!));
    found.forEach((h) => hrefs.add(h || "/"));
  }
  const broken: string[] = [];
  for (const href of hrefs) {
    const res = await request.get(href);
    if (res.status() >= 400) broken.push(`${href} ${res.status()}`);
  }
  expect(broken).toEqual([]);
});

test("home hero fits the viewport", async ({ page }, info) => {
  await page.goto("/");
  const m = await page.evaluate(() => {
    const rect = (sel: string) => document.querySelector(sel)!.getBoundingClientRect();
    const header = rect(".site-header");
    const hero = rect(".hero");
    const strip = rect(".hero-strip");
    const h1 = document.querySelector<HTMLElement>(".hero h1")!;
    const lead = document.querySelector<HTMLElement>(".hero-lead")!;
    const lines = (el: HTMLElement) => Math.round(el.getBoundingClientRect().height / parseFloat(getComputedStyle(el).lineHeight));
    const left = (sel: string) => Math.round(document.querySelector(sel)!.getBoundingClientRect().left);
    return {
      innerHeight: window.innerHeight,
      innerWidth: window.innerWidth,
      headerPlusHero: Math.round(header.height + hero.height),
      stripBottom: Math.round(strip.bottom),
      h1Lines: lines(h1),
      leadLines: lines(lead),
      edges: {
        logo: left(".site-header a[href='/']"),
        eyebrow: left(".hero [data-eyebrow]"),
        h1: left(".hero h1"),
        lead: left(".hero-lead"),
        buttons: left(".hero-actions"),
        features: left(".hero-features"),
      },
    };
  });
  console.log(`[${info.project.name}] hero`, JSON.stringify(m));

  const desktop = m.innerWidth >= 1024;
  if (desktop) {
    expect(Math.abs(m.headerPlusHero - m.innerHeight), "header + hero = viewport").toBeLessThanOrEqual(1);
    expect(m.stripBottom, "strip above the fold").toBeLessThanOrEqual(m.innerHeight);
    expect(m.h1Lines, "hero h1 lines").toBe(2);
  } else {
    expect(m.headerPlusHero).toBeGreaterThanOrEqual(m.innerHeight - 1);
  }
  if (m.innerWidth >= 1280) expect(m.leadLines, "lead lines").toBe(2);

  const values = Object.values(m.edges);
  expect(Math.max(...values) - Math.min(...values), `left edges ${JSON.stringify(m.edges)}`).toBeLessThanOrEqual(4);
});
