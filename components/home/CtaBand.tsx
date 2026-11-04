import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { company } from "@/content/company";
import { NewsletterForm } from "./NewsletterForm";

function TopographicPatternTopRight() {
  return (
    <svg
      className="pointer-events-none absolute -top-12 -right-12 h-[450px] w-[500px] select-none opacity-[0.05]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      viewBox="0 0 500 450"
      preserveAspectRatio="none"
      aria-hidden
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

export function CtaBand() {
  return (
    <Section
      tone="carbon"
      id="contact"
      labelledBy="contact-title"
      className="relative overflow-hidden pb-28 sm:pb-36 lg:pb-40"
    >
      <TopographicPatternTopRight />

      <div className="grid gap-10 lg:gap-12 lg:grid-cols-12 items-center relative z-10">
        {/* Left Column: Contact Information */}
        <div className="lg:col-span-6">
          <Reveal>
            <SectionHeader
              number="08"
              label="Contact"
              id="contact-title"
              title="Questions about the "
              accent="projects?"
              lead="Get in touch with our team for project updates, investor information or general inquiries."
              className="mb-8"
            />

            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex items-center gap-3 text-sm sm:text-base text-ivory hover:text-gold transition-colors"
                >
                  <Mail className="w-5 h-5 text-gold shrink-0 stroke-[1.75]" aria-hidden="true" />
                  <span>{company.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={company.phone.href}
                  className="inline-flex items-center gap-3 text-sm sm:text-base text-ivory hover:text-gold transition-colors"
                >
                  <Phone className="w-5 h-5 text-gold shrink-0 stroke-[1.75]" aria-hidden="true" />
                  <span>{company.phone.display}</span>
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <Button
                href="/contact"
                icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
              >
                Contact Us
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Center Vertical Divider (Desktop) */}
        <div className="hidden lg:block lg:col-span-1 flex justify-center">
          <div className="w-[1px] h-64 bg-white/10" aria-hidden="true" />
        </div>

        {/* Right Column: Newsletter Subscription Card */}
        <div className="lg:col-span-5">
          <Reveal delay={0.15}>
            <NewsletterForm />
          </Reveal>
        </div>
      </div>

      {/* Panoramic Rocky Outcrop Horizon at Bottom of Contact */}
      <div
        className="pointer-events-none absolute bottom-0 inset-x-0 h-20 sm:h-24 md:h-28 w-full overflow-hidden select-none z-0"
        aria-hidden="true"
      >
        <Image
          src="/images/team/bedrock-panorama.png"
          alt=""
          fill
          className="object-cover object-bottom"
          priority
        />
      </div>
    </Section>
  );
}
