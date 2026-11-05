import Link from "next/link";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FilteredDocuments } from "@/components/shared/FilteredDocuments";
import { Reveal } from "@/components/shared/Reveal";
import { documents } from "@/content/documents";
import { pages } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";

const page = pages.annualMeeting;
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

export default function AnnualMeetingPage() {
  const items = documents
    .filter((d) => d.category === "annual-meeting")
    .map((d) => ({ ...d, year: d.meetingYear }));

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
                <Link href="/investors">Investors</Link>
              </li>
              <li>
                <span aria-current="page">Annual Meeting</span>
              </li>
            </ol>
          </nav>

          <Reveal>
            <div className="mt-8 sm:mt-10 max-w-3xl">
              <div className="flex items-center gap-3 text-xs sm:text-[13px] font-semibold tracking-[0.18em] text-ink uppercase">
                <span className="w-8 h-[2px] bg-gold" aria-hidden="true" />
                <span>SHAREHOLDER GOVERNANCE</span>
              </div>

              <Heading level={1} className="mt-4 sm:mt-5 text-ink">
                Annual General &{" "}
                <span className="block mt-1">
                  Special <em className="heading-accent">Meetings.</em>
                </span>
              </Heading>

              <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed">
                Meeting materials, Management Information Circulars, Notices of Meeting, and Forms of Proxy for
                shareholders of Loyalist Exploration Limited.
              </p>
            </div>
          </Reveal>
        </div>
      </header>

      {/* 01 Meeting Materials Archive */}
      <Section tone="carbon" id="materials" labelledBy="meeting-title">
        <Reveal>
          <SectionHeader
            number="01"
            label="Materials"
            id="meeting-title"
            title="Meeting Materials & Circulars."
            lead="Filter Management Information Circulars, Notices of Meeting, and Forms of Proxy by meeting year."
          />
          <FilteredDocuments
            items={items}
            facets={["year", "type"]}
            label="Annual meeting documents"
          />
        </Reveal>
      </Section>

      {/* 02 Voting & Transfer Agent Note */}
      <Section tone="paper" id="voting-information" labelledBy="voting-title">
        <Reveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-black/10 pt-8">
            <div className="max-w-2xl">
              <div className="text-xs font-bold text-gold uppercase tracking-wider">Proxy Voting Guidance</div>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                Registered shareholders may submit their voting instructions online, by telephone, or by returning the
                proxy card directly to TSX Trust Company ahead of the voting deadline specified in the circular.
                Beneficial holders should follow instructions from their intermediary.
              </p>
            </div>
            <div className="shrink-0 text-xs text-stone">
              <div className="font-semibold text-ink">TSX Trust Company</div>
              <div className="mt-0.5">Registrar & Transfer Agent</div>
              <div className="mt-0.5">Toronto, Ontario</div>
            </div>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
