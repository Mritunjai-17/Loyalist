import { ArrowRight, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { company } from "@/content/company";
import { NewsletterForm } from "./NewsletterForm";

export function CtaBand() {
  return (
    <Section tone="black" id="contact" labelledBy="contact-title" className="border-t border-graphite">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeader number="08" label="Contact" id="contact-title" title="Questions about the projects?" />
          <ul className="grid gap-2">
            <li>
              <a href={`mailto:${company.email}`} className="footer-contact text-ivory">
                <Mail aria-hidden />
                {company.email}
              </a>
            </li>
            <li>
              <a href={company.phone.href} className="footer-contact text-ivory">
                <Phone aria-hidden />
                {company.phone.display}
              </a>
            </li>
          </ul>
          <div className="mt-8">
            <Button href="/contact" icon={<ArrowRight aria-hidden />}>
              Contact us
            </Button>
          </div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8 lg:pt-[52px]">
          <NewsletterForm />
        </div>
      </div>
    </Section>
  );
}
