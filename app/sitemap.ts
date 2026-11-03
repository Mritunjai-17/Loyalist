import type { MetadataRoute } from "next";
import { pages } from "@/content/pages";
import { projects } from "@/content/projects";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...Object.values(pages).map((p) => p.path), ...projects.map((p) => `/projects/${p.slug}`)];
  return paths.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency: path === "/press-releases" || path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
