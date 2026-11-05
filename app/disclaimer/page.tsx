import Link from "next/link";
import { Heading } from "@/components/ui/Heading";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { company } from "@/content/company";
import { disclaimerIncomplete, disclaimerNotice, disclaimerSections, privacyFormsNote } from "@/content/disclaimer";
import { pages } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";

const page = pages.disclaimer;
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

export default function DisclaimerPage() {
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
                <span aria-current="page">Terms & Disclaimer</span>
              </li>
            </ol>
          </nav>

          <Reveal>
            <div className="mt-8 sm:mt-10 max-w-3xl">
              <div className="flex items-center gap-3 text-xs sm:text-[13px] font-semibold tracking-[0.18em] text-ink uppercase">
                <span className="w-8 h-[2px] bg-gold" aria-hidden="true" />
                <span>REGULATORY NOTICES & DISCLAIMERS</span>
              </div>

              <Heading level={1} className="mt-4 sm:mt-5 text-ink">
                Terms of Use &{" "}
                <span className="block mt-1">
                  Legal <em className="heading-accent">Disclaimer.</em>
                </span>
              </Heading>

              <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed">
                Important cautionary disclosures regarding forward-looking information, mineral resource calculations,
                third-party data, and legal terms governing the use of this website.
              </p>
            </div>
          </Reveal>
        </div>
      </header>

      {/* 01 Editorial Legal Text with Sticky Sidebar */}
      <Section tone="paper" labelledBy="terms-title">
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)]">
              <SectionHeader number="01" label="Terms" id="terms-title" title="Website terms." />
              <aside aria-label="About this text" className="border-l-2 border-gold pl-5 space-y-3">
                <p className="text-small text-ink">{disclaimerIncomplete}</p>
                <p className="text-small">
                  <a
                    href={company.sedarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold font-medium underline underline-offset-4 hover:text-ink"
                  >
                    Search SEDAR+
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </p>
              </aside>
            </div>
          </div>
          <Prose className="min-w-0 lg:col-span-7 lg:col-start-6">
            <p className="font-semibold text-ink text-base">{disclaimerNotice}</p>
            {disclaimerSections.map((s) => (
              <section key={s.heading} aria-label={s.heading} className="mt-8">
                <Heading level={3} className="text-ink">{s.heading}</Heading>
                {s.paragraphs.map((p) => (
                  <p key={p} className="mt-3 leading-relaxed text-ink-soft">
                    {p}
                  </p>
                ))}
                {s.list ? (
                  <ul className="mt-3 space-y-1.5 list-disc pl-5 marker:text-gold text-ink-soft">
                    {s.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
            <p className="text-small text-stone mt-8 pt-6 border-t border-black/10">{privacyFormsNote}</p>
          </Prose>
        </div>
      </Section>
    </main>
  );
}
