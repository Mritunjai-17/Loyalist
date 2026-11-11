import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { MaskReveal } from "@/components/shared/MaskReveal";
import { Reveal } from "@/components/shared/Reveal";
import { ceoStatement, strategySteps } from "@/content/strategy";
import type { StrategyStep } from "@/types";
import { cn } from "@/lib/cn";
import { SectionIntro } from "./SectionIntro";
import { ProgressLine } from "./ProgressLine";

const stepImages = [
  {
    src: "/images/home/strategy-acquire-boreal-aerial.jpg",
    alt: "Aerial view of boreal forest, wetlands and lakes in Northern Ontario",
  },
  {
    src: "/images/home/strategy-explore-core-logging.jpg",
    alt: "A geologist examines diamond drill core at a forest drill site",
  },
  {
    src: "/images/home/strategy-advance-drill-rig.jpg",
    alt: "A diamond drill rig operating at a boreal forest site above a lake",
  },
] as const;

/**
 * One stage of the strategy. All three share this structure: on desktop a 12-column
 * row with the spine in column 1, text in five columns and a 3:2 photograph in six,
 * the photograph switching sides on alternate stages. Below 1024px the stage stacks
 * (numeral, heading, copy, photograph) beside the spine. The spine segment runs from
 * this stage's marker to the next one, so it never extends past the last stage.
 */
function StrategyStage({
  step,
  image,
  imageFirst,
  last,
}: {
  step: StrategyStep;
  image: { src: string; alt: string };
  imageFirst: boolean;
  last: boolean;
}) {
  return (
    <li className={cn("story-step relative pl-10 lg:pl-0", !last && "pb-block")}>
      <span className="story-node absolute left-0 top-3" aria-hidden="true" />
      {!last ? <ProgressLine className="absolute bottom-0 left-[5px] top-7 w-px" /> : null}
      <div className="grid gap-y-8 lg:grid-cols-12 lg:items-center lg:gap-x-grid">
        <div className={cn("lg:col-span-5 lg:row-start-1", imageFirst ? "lg:col-start-8" : "lg:col-start-2")}>
          <Reveal>
            <p className="story-numeral" aria-hidden="true">
              {step.numeral}
            </p>
            <p className="sr-only">Stage {step.numeral}</p>
            <Heading level={3} className="mt-6">
              {step.title}
            </Heading>
            <span className="rule-brass mt-6" aria-hidden="true" />
            <p className="body-ed mt-6 max-w-[44ch]">{step.body}</p>
            <Link href={step.link.href} className="link-ed mt-6">
              <span>{step.link.label}</span>
              <ArrowRight aria-hidden />
            </Link>
          </Reveal>
        </div>
        <div className={cn("lg:col-span-6 lg:row-start-1", imageFirst ? "lg:col-start-2" : "lg:col-start-7")}>
          <MaskReveal className="frame-ed relative aspect-[3/2] w-full" from={imageFirst ? "left" : "right"}>
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1440px) 610px, (min-width: 1024px) 46vw, 100vw" className="object-cover" />
          </MaskReveal>
        </div>
      </div>
    </li>
  );
}

/**
 * One connected strategy, told in three movements. A brass line runs through the
 * three stages and fills as the reader scrolls; numerals are oversized outlines;
 * the photograph alternates sides so the eye zig-zags down the story.
 */
export function Strategy() {
  return (
    <section id="strategy" aria-labelledby="strategy-title" data-tone="ivory" className="section-pad relative bg-surface">
      <div className="container-site">
        <SectionIntro
          index="03"
          label="Strategy"
          id="strategy-title"
          title="From acquisition"
          accent="to advancement."
          lead="A disciplined, value-focused strategy to build and advance a portfolio of gold and strategic metals projects in the Timmins Mining District."
        />

        <ol className="relative mt-block">
          {strategySteps.map((step, idx) => (
            <StrategyStage
              key={step.title}
              step={step}
              image={stepImages[idx] ?? stepImages[0]}
              imageFirst={idx % 2 === 1}
              last={idx === strategySteps.length - 1}
            />
          ))}
        </ol>

        {/* Statement from the CEO */}
        <Reveal>
          <figure className="mt-block grid gap-8 border-t border-rule pt-group md:grid-cols-12 md:gap-x-grid">
            <span className="font-editorial text-[5rem] leading-[0.6] text-ed-accent md:col-span-1" aria-hidden="true">
              &ldquo;
            </span>
            <blockquote className="md:col-span-9">
              <p className="font-editorial text-[clamp(1.75rem,3.2vw,3rem)] leading-[1.18] text-fg">{ceoStatement.text}</p>
            </blockquote>
            <figcaption className="md:col-span-9 md:col-start-2">
              <span className="text-[0.9375rem] font-semibold text-fg">{ceoStatement.name}</span>
              <span className="text-[0.9375rem] text-fg-muted">, {ceoStatement.title}</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
