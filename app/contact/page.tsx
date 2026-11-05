import Link from "next/link";
import { ArrowRight, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "@/components/shared/ContactForm";
import { Reveal } from "@/components/shared/Reveal";
import { company } from "@/content/company";
import { pages } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";

const page = pages.contact;
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

export default function ContactPage() {
  const office = company.headOffice;

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
                <span aria-current="page">Contact</span>
              </li>
            </ol>
          </nav>

          <Reveal>
            <div className="mt-8 sm:mt-10 max-w-3xl">
              <div className="flex items-center gap-3 text-xs sm:text-[13px] font-semibold tracking-[0.18em] text-ink uppercase">
                <span className="w-8 h-[2px] bg-gold" aria-hidden="true" />
                <span>COMMUNICATIONS</span>
              </div>

              <Heading level={1} className="mt-4 sm:mt-5 text-ink">
                Contact Loyalist{" "}
                <span className="block mt-1">
                  Exploration <em className="heading-accent">Limited.</em>
                </span>
              </Heading>

              <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed">
                Inquiries from current shareholders, prospective investors, mineral property vendors, and community
                partners in the Timmins Mining District.
              </p>
            </div>
          </Reveal>
        </div>
      </header>

      {/* 01 Direct Contact & Inquiry Form */}
      <Section tone="carbon" id="inquiries" labelledBy="message-title">
        <Reveal>
          <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12 items-start">
            {/* Left Column: Office Details */}
            <div className="lg:col-span-5 space-y-8">
              <SectionHeader
                number="01"
                label="Direct Inquiries"
                id="message-title"
                title="Write to us."
                lead="Reach corporate management directly or submit an inquiry using the secure form."
              />

              <div className="border-l-2 border-gold/40 pl-5 space-y-6">
                <div>
                  <div className="text-xs text-stone uppercase tracking-wider">Corporate Head Office</div>
                  <address className="not-italic text-sm text-ivory mt-1 leading-relaxed">
                    {company.legalName}
                    <br />
                    {office.street}
                    <br />
                    {office.city}, {office.region} {office.postalCode}
                    <br />
                    {office.country}
                  </address>
                </div>

                <div>
                  <div className="text-xs text-stone uppercase tracking-wider">Direct Email</div>
                  <a
                    href={`mailto:${company.email}`}
                    className="text-sm font-medium text-gold hover:underline mt-1 inline-block"
                  >
                    {company.email}
                  </a>
                </div>

                <div>
                  <div className="text-xs text-stone uppercase tracking-wider">Telephone</div>
                  <a
                    href={company.phone.href}
                    className="text-sm font-medium text-ivory hover:text-gold mt-1 inline-block transition-colors"
                  >
                    {company.phone.display}
                  </a>
                </div>

                <div>
                  <div className="text-xs text-stone uppercase tracking-wider">Market Quotation</div>
                  <div className="mt-1 flex items-center gap-3">
                    <a
                      href={company.quoteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-gold hover:underline inline-flex items-center gap-1.5"
                    >
                      <span>CSE: PNGC</span>
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <div className="pt-2 text-xs text-stone leading-relaxed">
                  <span className="text-white/60 font-medium">Property Submittals:</span> Geoscientists and prospectors
                  submitting project data for the Abitibi Greenstone Belt should include claim tenure and available historical reports.
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-10">
              <div className="mb-6 pb-4 border-b border-white/10">
                <Heading level={2} className="text-ivory">
                  Send an Inquiry
                </Heading>
                <p className="mt-2 text-xs sm:text-sm text-stone leading-relaxed">
                  Inquiries are received directly by corporate communications and investor relations.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
