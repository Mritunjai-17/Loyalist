import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MaskReveal } from "@/components/shared/MaskReveal";
import { Reveal } from "@/components/shared/Reveal";
import { company } from "@/content/company";
import { projects } from "@/content/projects";
import { commitments, companyProfileLink, whoWeAre } from "@/content/strategy";
import { HeadingBlock } from "./SectionIntro";

/**
 * Editorial split. Desktop: heading and copy in the left column, the field
 * photograph on the right, its top aligned with the eyebrow. Mobile: heading,
 * photograph, then copy, so the image sits next to the statement it illustrates.
 */
export function Intro() {
  const facts = [
    { value: String(projects.length), label: "Projects in the district" },
    { value: `${company.exchange}: ${company.ticker}`, label: "Listing" },
    // Union of the metals listed across the four projects (content/projects.ts).
    { value: "Au · Ag · Cu · Ni", label: "Gold, silver and strategic metals" },
  ];

  return (
    <section id="about" aria-labelledby="about-title" data-tone="ivory" className="section-pad relative bg-surface">
      <div className="container-site">
        <div className="grid gap-y-block lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-col lg:gap-y-0">
          <Reveal className="lg:col-start-1 lg:row-start-1">
            <HeadingBlock index="01" label="The company" id="about-title" title="Four properties." accent="One mining district." />
            <span className="rule-brass mt-copy" aria-hidden="true" />
          </Reveal>

          <figure className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <MaskReveal className="frame-ed relative aspect-[4/5] w-full" from="bottom">
              <Image
                src="/images/home/intro-geological-fieldwork.jpg"
                alt="Geologists examining a bedrock outcrop above a lake in the Northern Ontario boreal forest"
                fill
                sizes="(min-width: 1440px) 560px, (min-width: 1024px) 42vw, 100vw"
                className="object-cover object-[50%_60%]"
              />
            </MaskReveal>
            <figcaption className="caption-ed mt-3">Field mapping in the boreal shield. Illustrative image.</figcaption>
          </figure>

          <Reveal delay={0.1} className="lg:col-start-1 lg:row-start-2 lg:pt-copy">
            <div className="space-y-5">
              {whoWeAre.map((p, i) => (
                <p key={p.slice(0, 24)} className={i === 0 ? "lead-ed text-fg" : "body-ed"}>
                  {p}
                </p>
              ))}
            </div>

            <ol className="mt-group grid border-t border-rule sm:grid-cols-2 sm:gap-x-8" aria-label="Our commitments">
              {commitments.map((c, i) => (
                <li key={c} className="flex items-baseline gap-5 border-b border-rule py-4">
                  <span className="text-[0.75rem] font-semibold tabular-nums tracking-[0.1em] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.9375rem] font-medium text-fg">{c}</span>
                </li>
              ))}
            </ol>

            <Link href={companyProfileLink.href} className="link-ed mt-8">
              <span>{companyProfileLink.label}</span>
              <ArrowRight aria-hidden />
            </Link>
          </Reveal>
        </div>

        {/* Facts strip */}
        <Reveal delay={0.1}>
          <dl className="mt-block grid gap-y-8 border-t border-rule pt-10 sm:grid-cols-3 sm:gap-x-grid">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col">
                <dt className="caption-ed order-2 mt-2 block uppercase tracking-[0.16em]">{f.label}</dt>
                <dd className="font-editorial order-1 text-[clamp(2rem,3.4vw,3rem)] leading-none text-fg">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
