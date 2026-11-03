import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Lets a production build run beside a dev server: NEXT_DIST_DIR=.next-prod npx next build
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  reactStrictMode: true,
  poweredByHeader: false,
  // A package-lock.json in the parent folder would otherwise be taken as the workspace root.
  outputFileTracingRoot: path.join(__dirname),
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 768, 1024, 1280, 1440, 1672, 1920, 2560, 3840],
  },
};

export default nextConfig;
