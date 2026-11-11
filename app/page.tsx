import { CtaBand } from "@/components/home/CtaBand";
import { Hero } from "@/components/home/Hero";
import { InvestorPanel } from "@/components/home/InvestorPanel";
import { Intro } from "@/components/home/Intro";
import { Leadership } from "@/components/home/Leadership";
import { NewsList } from "@/components/home/NewsList";
import { ProjectPortfolio } from "@/components/home/ProjectPortfolio";
import { Strategy } from "@/components/home/Strategy";
import { TullyResource } from "@/components/home/TullyResource";

// Section rhythm: charcoal photograph → ivory → charcoal → ivory → beige → charcoal → ivory → charcoal → ivory → charcoal footer.
export default function HomePage() {
  return (
    <main id="main" className="home">
      <Hero />
      <Intro />
      <TullyResource />
      <Strategy />
      <ProjectPortfolio />
      <Leadership />
      <InvestorPanel />
      <NewsList />
      <CtaBand />
    </main>
  );
}
