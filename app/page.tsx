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

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <Intro />
      <TullyResource />
      <Strategy />
      <Section tone="paper" id="projects" labelledBy="projects-title" className="relative">
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
