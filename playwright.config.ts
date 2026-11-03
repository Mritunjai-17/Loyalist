import { defineConfig } from "@playwright/test";

const port = Number(process.env.PORT ?? 3200);
const baseURL = process.env.BASE_URL ?? `http://localhost:${port}`;

// Section 18 viewports. Runs against a production build: `npx next build`, then `npm run test:e2e`.
const viewports = [
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1672x941", width: 1672, height: 941 },
  { name: "1280x720", width: 1280, height: 720 },
  { name: "390x844", width: 390, height: 844 },
];

export default defineConfig({
  testDir: "tests",
  timeout: 180_000,
  fullyParallel: true,
  workers: 4,
  reporter: [["list"]],
  use: { baseURL, browserName: "chromium" },
  projects: viewports.map((v) => ({ name: v.name, use: { viewport: { width: v.width, height: v.height } } })),
  webServer: process.env.BASE_URL
    ? undefined
    : { command: `npx next start -p ${port}`, url: baseURL, reuseExistingServer: true, timeout: 120_000 },
});
