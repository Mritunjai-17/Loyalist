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

function getInitials(name: string): string {
  const parts = name.split(" ");
  if (parts.length >= 2 && parts[0] && parts[parts.length - 1]) {
    return `${parts[0][0]}${parts[parts.length - 1]![0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

/** Human-crafted, editorial team row with architectural hairlines (no AI-style border boxes). */
function EditorialMemberRow({ member, isDark }: { member: TeamMember; isDark: boolean }) {
  const initials = getInitials(member.name);

  return (
    <li
      id={member.id}
      className={`py-8 sm:py-10 grid gap-6 lg:grid-cols-12 lg:gap-10 items-start border-b ${
        isDark ? "border-white/10" : "border-black/10"
      }`}
    >
      {/* Column 1: Portrait or Understated Monogram */}
      <div className="lg:col-span-2 flex items-start">
        {member.portrait ? (
          <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-xl shadow-sm">
            <Image
              src={member.portrait.src}
              alt={member.portrait.alt}
              fill
              sizes="96px"
              className="object-cover object-top"
            />
          </div>
        ) : (
          <div
            className={`flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full font-serif text-base sm:text-lg font-bold select-none ${
              isDark ? "bg-white/5 text-gold" : "bg-gold/10 text-gold"
            }`}
            aria-hidden="true"
          >
            {initials}
          </div>
        )}
      </div>

      {/* Column 2: Name & Role */}
      <div className="lg:col-span-4 min-w-0">
        <Heading level={3} className={isDark ? "text-ivory" : "text-ink"}>
          {member.name}
        </Heading>
        <div className="text-xs font-semibold text-gold tracking-widest uppercase mt-1 leading-snug">
          {member.title}
          {member.credentials ? ` · ${member.credentials}` : null}
        </div>
      </div>

      {/* Column 3: Biography */}
      <div className={`lg:col-span-6 space-y-3 text-sm leading-relaxed ${isDark ? "text-stone" : "text-ink-soft"}`}>
        {member.bio.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>
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
      <Section tone="paper" id="management" labelledBy="management-title">
        <Reveal>
          <SectionHeader
            number="01"
            label="Management"
            id="management-title"
            title="Executive Management."
            lead="Guiding day-to-day operations, project execution, and strategic acquisitions in the Timmins District."
          />
          <ul className="border-t border-black/10" aria-label="Executive management">
            {management.map((m) => (
              <EditorialMemberRow key={m.id} member={m} isDark={false} />
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* 02 Board of Directors */}
      <Section tone="carbon" id="directors" labelledBy="directors-title">
        <Reveal>
          <SectionHeader
            number="02"
            label="Board of Directors"
            id="directors-title"
            title="Board of Directors."
            lead="Independent governance, audit oversight, and corporate strategy representing shareholder value."
          />
          <ul className="border-t border-white/10" aria-label="Board of directors">
            {directors.map((m) => (
              <EditorialMemberRow key={m.id} member={m} isDark={true} />
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* 03 Strategic Advisors */}
      <Section tone="paper" id="advisors" labelledBy="advisors-title">
        <Reveal>
          <SectionHeader
            number="03"
            label="Advisors"
            id="advisors-title"
            title="Technical & Strategic Advisors."
            lead="Deep geological, geophysical, and corporate development counsel from tier-one mining leaders."
          />
          <ul className="border-t border-black/10" aria-label="Strategic advisors">
            {advisors.map((m) => (
              <EditorialMemberRow key={m.id} member={m} isDark={false} />
            ))}
          </ul>
        </Reveal>
      </Section>
    </main>
  );
}
