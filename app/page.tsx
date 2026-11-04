import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/home/CtaBand";
import { Hero } from "@/components/home/Hero";
import { InvestorPanel } from "@/components/home/InvestorPanel";
import { Intro } from "@/components/home/Intro";
import { Leadership } from "@/components/home/Leadership";
import { NewsList } from "@/components/home/NewsList";
import { ProjectIndex } from "@/components/home/ProjectIndex";
import { Strategy } from "@/components/home/Strategy";
import { TullyResource } from "@/components/home/TullyResource";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

function TopographicPatternBottomRight() {
  return (
    <svg
      className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 select-none opacity-[0.08]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      viewBox="0 0 400 400"
      preserveAspectRatio="none"
      aria-hidden
    >
      <g className="text-gold">
        <path d="M 400 100 C 320 120, 260 180, 240 280 C 220 380, 210 400, 200 400" />
        <path d="M 400 160 C 340 180, 300 230, 280 320 C 270 370, 260 400, 250 400" />
        <path d="M 400 220 C 360 240, 330 280, 320 350 C 315 380, 310 400, 300 400" />
        <path d="M 400 280 C 375 295, 360 325, 355 370 C 352 390, 350 400, 345 400" />
        <path d="M 400 340 C 390 350, 382 368, 380 390 C 379 396, 378 400, 375 400" />
      </g>
    </svg>
  );
}

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <Intro />
      <TullyResource />
      <Strategy />
      <Section tone="paper" id="projects" labelledBy="projects-title" className="relative overflow-hidden">
        <TopographicPatternBottomRight />
        <SectionHeader
          number="04"
          label="Projects"
          id="projects-title"
          title="Our Key "
          accent="Projects."
          lead="A portfolio of four projects in the Timmins Mining District, providing exposure to gold and strategic metals."
          action={
            <Button
              href="/projects"
              variant="secondary"
              icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
            >
              Compare All Four Projects
            </Button>
          }
        />
        <ProjectIndex />
      </Section>
      <Leadership />
      <InvestorPanel />
      <NewsList />
      <CtaBand />
    </main>
  );
}
