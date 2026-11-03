import { CtaBand } from "@/components/home/CtaBand";
import { Hero } from "@/components/home/Hero";
import { InvestorPanel } from "@/components/home/InvestorPanel";
import { Intro } from "@/components/home/Intro";
import { Leadership } from "@/components/home/Leadership";
import { NewsList } from "@/components/home/NewsList";
import { ProjectIndex } from "@/components/home/ProjectIndex";
import { Strategy } from "@/components/home/Strategy";
import { TullyResource } from "@/components/home/TullyResource";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <Intro />
      <TullyResource />
      <Strategy />
      <Section tone="carbon" id="projects" labelledBy="projects-title">
        <SectionHeader
          number="04"
          label="Projects"
          id="projects-title"
          title="Our key projects."
          action={<TextLink href="/projects">Compare all four projects</TextLink>}
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
