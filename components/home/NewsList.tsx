import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/shared/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { pressReleases } from "@/content/press-releases";
import { formatDate } from "@/lib/format";

function TopographicPatternTopRight() {
  return (
    <svg
      className="pointer-events-none absolute -top-12 -right-12 h-[450px] w-[500px] select-none opacity-[0.06]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      viewBox="0 0 500 450"
      preserveAspectRatio="none"
      aria-hidden
    >
      <g className="text-gold">
        <path d="M 200 0 C 260 70, 340 120, 500 140" />
        <path d="M 140 0 C 210 95, 305 165, 500 195" />
        <path d="M 80 0 C 160 120, 270 210, 500 250" />
        <path d="M 20 0 C 110 145, 230 255, 500 305" />
        <path d="M 0 50 C 70 180, 190 300, 500 360" />
        <path d="M 0 130 C 50 220, 150 345, 500 415" />
        <ellipse cx="430" cy="70" rx="50" ry="25" />
      </g>
    </svg>
  );
}

const defaultVisual = "/images/strategy/explore-cores.jpg";
const listVisuals: readonly string[] = [
  "/images/strategy/explore-cores.jpg",
  "/images/strategy/acquire-ore.jpg",
  "/images/projects/thumb-desantis.jpg",
  "/images/strategy/quote-ore.jpg",
];

export function NewsList() {
  const [featured, ...rest] = pressReleases.slice(0, 5);
  if (!featured) return null;

  return (
    <Section tone="paper" id="news" labelledBy="news-title" className="relative overflow-hidden pb-20 sm:pb-28">
      <TopographicPatternTopRight />

      <SectionHeader
        number="07"
        label="News"
        id="news-title"
        title="Latest "
        accent="News."
        lead="Company updates, project milestones and key developments from across our portfolio."
        action={
          <Button
            href="/press-releases"
            variant="secondary"
            icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
          >
            All Press Releases
          </Button>
        }
      />

      <div className="grid gap-8 lg:gap-10 lg:grid-cols-12 items-stretch relative z-10">
        {/* Left Column: Large Featured News Card ("Big Box") */}
        <div className="lg:col-span-5 flex">
          <Reveal className="w-full flex">
            <article
              className="news-featured-card w-full rounded-2xl bg-white border border-black/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col justify-between"
              style={{ borderRadius: "20px" }}
            >
              <div>
                {/* Photo Header */}
                <div className="relative w-full h-52 sm:h-56 md:h-60 overflow-hidden bg-black/10">
                  <Image
                    src="/images/news/featured-drill.jpg"
                    alt="Tully gold drill rig operation at sunset"
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    quality={90}
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    priority
                  />
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-7">
                  <time dateTime={featured.date} className="text-xs sm:text-sm text-stone font-medium block">
                    {formatDate(featured.date)}
                  </time>
                  <Heading level={3} className="mt-2.5">
                    <span className="text-ink font-bold block">
                      {featured.title}
                    </span>
                  </Heading>
                  <p className="mt-3.5 text-xs sm:text-sm text-ink-soft leading-relaxed">
                    Loyalist Exploration has released a grade-tonnage sensitivity analysis for the Tully Gold Project, providing additional insight into the 2026 Mineral Resource Estimate.
                  </p>
                </div>
              </div>

              {/* Read Release CTA Button */}
              <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-0">
                <Button
                  href={featured.href}
                  external
                  icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
                >
                  Read the Release
                </Button>
              </div>
            </article>
          </Reveal>
        </div>

        {/* Right Column: 4 Press Releases List with Thumbnails */}
        <div className="min-w-0 lg:col-span-7 flex flex-col justify-between">
          <Reveal delay={0.15} className="h-full">
            <ul className="divide-y divide-black/[0.08] flex flex-col justify-between h-full" aria-label="Recent press releases">
              {rest.map((r, idx) => (
                <li key={r.href} className="py-4 first:pt-0 last:pb-0">
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 sm:gap-4 transition-colors"
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                      {/* Landscape Thumbnail */}
                      <div
                        className="news-thumb-box relative w-24 sm:w-28 h-14 sm:h-16 shrink-0 bg-stone/10 border border-black/5"
                        style={{ borderRadius: "10px", overflow: "hidden" }}
                      >
                        <Image
                          src={listVisuals[idx] ?? defaultVisual}
                          alt=""
                          fill
                          sizes="240px"
                          quality={90}
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      {/* Date & Title */}
                      <div className="min-w-0">
                        <time dateTime={r.date} className="text-xs text-stone font-medium block">
                          {formatDate(r.date)}
                        </time>
                        <Heading level={4} className="mt-1">
                          <span className="text-ink font-bold transition-colors group-hover:text-gold block">
                            {r.title}
                          </span>
                        </Heading>
                      </div>
                    </div>

                    {/* Gold Arrow */}
                    <ArrowRight
                      className="w-4 h-4 text-gold shrink-0 transition-transform duration-200 group-hover:translate-x-1"
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
