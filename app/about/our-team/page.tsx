import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { pages } from "@/content/pages";
import { team } from "@/content/team";
import { pageMetadata } from "@/lib/seo";
import type { TeamMember } from "@/types";

const page = pages.ourTeam;
export const metadata = pageMetadata(page);

function TopographicPatternTopRight() {
  return (
    <svg
      className="pointer-events-none absolute -top-12 -right-12 h-[450px] w-[500px] select-none opacity-[0.07]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      viewBox="0 0 500 450"
      preserveAspectRatio="none"
      aria-hidden="true"
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

function getGovernanceBadge(member: TeamMember): string {
  if (member.credentials) return member.credentials;
  if (member.title.toLowerCase().includes("chair")) return "Board Chair";
  if (member.group === "directors") return "Director";
  if (member.group === "advisors") return "Senior Advisor";
  return "Executive";
}

/** Refined, human-crafted executive dossier card: architectural gold top accent, refined hairlines, and authoritative typography. */
function TeamMemberCard({ member }: { member: TeamMember }) {
  const badge = getGovernanceBadge(member);

  return (
    <li id={member.id} className="h-full">
      <article className="h-full p-7 sm:p-8 rounded-xl bg-white border border-black/[0.04] border-t-2 border-t-gold shadow-[0_1px_3px_rgba(0,0,0,0.02),0_8px_24px_rgba(32,32,29,0.03)] hover:shadow-[0_12px_36px_rgba(196,154,67,0.12)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider bg-champagne text-gold border border-gold/30 uppercase mb-2.5">
                {badge}
              </span>
              <Heading level={3} className="text-ink">
                {member.name}
              </Heading>
              <div className="text-[11px] font-bold text-gold tracking-wider uppercase mt-1 leading-snug">
                {member.title}
              </div>
            </div>

            {member.portrait ? (
              <div className="relative h-16 w-16 sm:h-18 sm:w-18 overflow-hidden rounded-xl shrink-0 shadow-xs border border-gold/30 ring-1 ring-black/5">
                <Image
                  src={member.portrait.src}
                  alt={member.portrait.alt}
                  fill
                  sizes="72px"
                  className="object-cover object-top"
                />
              </div>
            ) : null}
          </div>

          <div className="w-8 h-[1.5px] bg-gold/50 my-4" aria-hidden="true" />

          <div className="space-y-3 text-xs sm:text-[13px] text-ink-soft leading-relaxed">
            {member.bio.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </article>
    </li>
  );
}

export default function OurTeamPage() {
  const management = team.filter((m) => m.group === "management");
  const directors = team.filter((m) => m.group === "directors");
  const advisors = team.filter((m) => m.group === "advisors");

  return (
    <main id="main">
      {/* Editorial Page Header */}
      <header data-tone="paper" className="relative overflow-hidden bg-surface pt-[calc(var(--header-h)+28px)] pb-12 sm:pb-16">
        <TopographicPatternTopRight />
        <div className="container-site relative z-10">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about/company-profile">About</Link>
              </li>
              <li>
                <span aria-current="page">Our Team</span>
              </li>
            </ol>
          </nav>

          <Reveal>
            <div className="mt-8 sm:mt-10 max-w-3xl">
              <div className="flex items-center gap-3 text-xs sm:text-[13px] font-semibold tracking-[0.18em] text-ink uppercase">
                <span className="w-8 h-[2px] bg-gold" aria-hidden="true" />
                <span>LEADERSHIP & GOVERNANCE</span>
              </div>

              <Heading level={1} className="mt-4 sm:mt-5 text-ink">
                Management, Directors{" "}
                <span className="block mt-1">
                  & Strategic <em className="heading-accent">Advisors.</em>
                </span>
              </Heading>

              <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed">
                A proven leadership group with over a century of combined operational, capital markets, and geoscience
                experience in the prolific Timmins Mining Camp.
              </p>
            </div>
          </Reveal>
        </div>
      </header>

      {/* 01 Executive Management */}
      <Section tone="warm" id="management" labelledBy="management-title">
        <Reveal>
          <SectionHeader
            number="01"
            label="Management"
            id="management-title"
            title="Executive Management."
            lead="Guiding day-to-day operations, project execution, and strategic acquisitions in the Timmins District."
          />
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-label="Executive management">
            {management.map((m) => (
              <TeamMemberCard key={m.id} member={m} />
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* 02 Board of Directors */}
      <Section tone="warm" id="directors" labelledBy="directors-title">
        <Reveal>
          <SectionHeader
            number="02"
            label="Board of Directors"
            id="directors-title"
            title="Board of Directors."
            lead="Independent governance, audit oversight, and corporate strategy representing shareholder value."
          />
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Board of directors">
            {directors.map((m) => (
              <TeamMemberCard key={m.id} member={m} />
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* 03 Strategic Advisors */}
      <Section tone="warm" id="advisors" labelledBy="advisors-title">
        <Reveal>
          <SectionHeader
            number="03"
            label="Advisors"
            id="advisors-title"
            title="Technical & Strategic Advisors."
            lead="Deep geological, geophysical, and corporate development counsel from tier-one mining leaders."
          />
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-label="Strategic advisors">
            {advisors.map((m) => (
              <TeamMemberCard key={m.id} member={m} />
            ))}
          </ul>
        </Reveal>
      </Section>
    </main>
  );
}
