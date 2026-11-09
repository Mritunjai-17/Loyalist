import Image from "next/image";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { company } from "@/content/company";
import { NewsletterForm } from "./NewsletterForm";

export function CtaBand() {
  return (
    <Section
      tone="champagne"
      id="contact"
      labelledBy="contact-title"
      className="relative overflow-hidden pb-28 sm:pb-36 lg:pb-40"
    >
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
                  className="inline-flex items-center gap-3 text-sm sm:text-base text-fg hover:text-accent transition-colors font-medium"
                >
                  <Mail className="w-5 h-5 text-gold shrink-0 stroke-[1.75]" aria-hidden="true" />
                  <span>{company.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={company.phone.href}
                  className="inline-flex items-center gap-3 text-sm sm:text-base text-fg hover:text-accent transition-colors font-medium"
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

        {/* Gutter column (desktop): whitespace separates the two halves. */}
        <div aria-hidden className="hidden lg:block lg:col-span-1" />

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
