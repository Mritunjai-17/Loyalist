import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/shared/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { pressReleases } from "@/content/press-releases";
import { formatDate } from "@/lib/format";

/**
 * Editorial layout: the lead story with its photograph, then a dated headline list.
 * The list carries no thumbnails: the releases have no photographs of their own,
 * and borrowed stock images said nothing about the headlines.
 */
export function NewsList() {
  const [featured, ...rest] = pressReleases.slice(0, 5);
  if (!featured) return null;

  return (
    <Section tone="paper" id="news" labelledBy="news-title" className="relative">
      <SectionHeader
        number="07"
        label="News"
        id="news-title"
        title="Latest "
        accent="News."
        lead="Company updates, project milestones and key developments from across our portfolio."
        action={
          <Button href="/press-releases" variant="secondary" icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
            All Press Releases
          </Button>
        }
      />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        {/* Lead story */}
        <div className="lg:col-span-6">
          <Reveal>
            <article className="group">
              <div className="media-zoom relative aspect-[16/10] w-full overflow-hidden rounded bg-forest">
                <Image
                  src="/images/news/featured-drill.jpg"
                  alt="Tully gold drill rig operation at sunset"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  quality={90}
                  className="object-cover"
                  priority
                />
              </div>
              <time dateTime={featured.date} className="mt-6 block text-sm font-medium text-fg-muted">
                {formatDate(featured.date)}
              </time>
              <Heading level={3} className="mt-2 max-w-[30ch]">
                {featured.title}
              </Heading>
              <p className="mt-3 max-w-[60ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                Loyalist Exploration has released a grade-tonnage sensitivity analysis for the Tully Gold Project, providing additional insight into the 2026 Mineral Resource Estimate.
              </p>
              <div className="mt-6">
                <Button href={featured.href} external icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
                  Read the Release
                </Button>
              </div>
            </article>
          </Reveal>
        </div>

        {/* Headline list */}
        <div className="min-w-0 lg:col-span-6">
          <Reveal delay={0.1}>
            <ul className="border-t-2 border-forest" aria-label="Recent press releases">
              {rest.map((r) => (
                <li key={r.href} className="border-b border-stone-beige">
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between gap-4 py-5"
                  >
                    <div className="min-w-0">
                      <time dateTime={r.date} className="block text-xs font-medium text-fg-muted">
                        {formatDate(r.date)}
                      </time>
                      <Heading level={4} className="mt-1.5">
                        <span className="transition-colors group-hover:text-accent">{r.title}</span>
                      </Heading>
                    </div>
                    <ArrowRight
                      className="mt-6 h-4 w-4 shrink-0 text-gold transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
