import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { MaskReveal } from "@/components/shared/MaskReveal";
import { Reveal } from "@/components/shared/Reveal";
import { pressReleases } from "@/content/press-releases";
import { SectionIntro } from "./SectionIntro";
import { formatDate, formatFileSize } from "@/lib/format";

/** The releases shown on the homepage: newest first, only those whose PDF resolves. */
export function latestReleases(count = 4) {
  return pressReleases.filter((r) => r.available).slice(0, count);
}

/**
 * Publication layout: the lead announcement with a photograph and an oversized
 * headline, then a dated, numbered list. Releases carry no photographs of their
 * own, so only the lead story is illustrated.
 */
export function NewsList() {
  const [featured, ...rest] = latestReleases();
  if (!featured) return null;

  return (
    <section id="news" aria-labelledby="news-title" data-tone="deep" className="section-pad relative bg-surface">
      <div className="container-site">
        <SectionIntro
          index="07"
          label="News"
          id="news-title"
          title="Latest"
          accent="announcements."
          stacked={false}
          action={
            <Link href="/press-releases" className="link-ed">
              <span>All press releases</span>
              <ArrowRight aria-hidden />
            </Link>
          }
        />

        <div className="mt-block grid gap-y-block border-t border-fg/30 pt-group lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-x-col">
          {/* Lead story */}
          <article className="news-feature group relative">
            <MaskReveal className="frame-ed relative aspect-[16/9] w-full">
              <Image
                src="/images/home/news-drill-core-boxes.jpg"
                alt="Split drill core laid out in wooden core boxes on bedrock"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </MaskReveal>
            <p className="caption-ed mt-3">Illustrative image.</p>
            <Reveal delay={0.1}>
              <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-accent">
                <span>Lead announcement</span>
                <span className="h-px w-8 bg-ed-rule" aria-hidden="true" />
                <time dateTime={featured.date} className="text-fg-muted">
                  {formatDate(featured.date)}
                </time>
              </p>
              <Heading level={3} className="mt-4 max-w-[30ch]">
                <a href={featured.href} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0">
                  {featured.title}
                  <span className="sr-only"> (PDF, opens in a new tab)</span>
                </a>
              </Heading>
              <span className="link-ed mt-6" aria-hidden="true">
                <span>Read the release{featured.sizeBytes ? ` · PDF, ${formatFileSize(featured.sizeBytes)}` : ""}</span>
                <ArrowUpRight />
              </span>
            </Reveal>
          </article>

          {/* Headline list */}
          <Reveal delay={0.1}>
            <ol aria-label="Recent press releases">
              {rest.map((r, i) => (
                <li key={r.href} className="border-b border-rule first:pt-0">
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid grid-cols-[2.5rem_1fr_auto] gap-x-4 py-7 first:pt-0"
                  >
                    <span className="font-editorial text-[1.5rem] leading-none text-accent" aria-hidden="true">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <span>
                      <time dateTime={r.date} className="block text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-fg-muted">
                        {formatDate(r.date)}
                      </time>
                      <span className="mt-2 block text-[1.0625rem] font-medium leading-snug text-fg transition-colors group-hover:text-accent">
                        {r.title}
                      </span>
                      <span className="sr-only"> (PDF, opens in a new tab)</span>
                    </span>
                    <ArrowUpRight
                      className="mt-1 h-4 w-4 text-ed-accent-light transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
