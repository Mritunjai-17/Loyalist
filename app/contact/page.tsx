import { Mail, MapPin, Phone } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "@/components/shared/ContactForm";
import { PageHeader } from "@/components/shared/PageHeader";
import { company } from "@/content/company";
import { pages } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";

const page = pages.contact;
export const metadata = pageMetadata(page);

export default function ContactPage() {
  const office = company.headOffice;
  return (
    <main id="main">
      <PageHeader intro={page} />
      <Section tone="black" labelledBy="message-title">
        <div className="grid gap-y-16 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-4">
            <SectionHeader number="01" label="Details" id="message-title" title="Write to us." />
            <div className="contact-details">
              <div>
                <Heading level={3}>Head office</Heading>
                <ul className="mt-5 grid gap-4">
                  <li>
                    <a href={`mailto:${company.email}`} className="footer-contact">
                      <Mail aria-hidden />
                      {company.email}
                    </a>
                  </li>
                  <li>
                    <a href={company.phone.href} className="footer-contact">
                      <Phone aria-hidden />
                      {company.phone.display}
                    </a>
                  </li>
                  <li className="footer-contact">
                    <MapPin aria-hidden />
                    <address className="not-italic">
                      {company.legalName}
                      <br />
                      {office.street}
                      <br />
                      {office.city}, {office.region} {office.postalCode}
                      <br />
                      {office.country}
                    </address>
                  </li>
                </ul>
              </div>
              <div>
                <Heading level={3}>Follow</Heading>
                <ul className="mt-5 grid gap-2">
                  {company.social.map((s) => (
                    <li key={s.network}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="footer-link">
                        {s.network}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="min-w-0 lg:col-span-7 lg:col-start-6">
            <ContactForm />
          </div>
        </div>
      </Section>
    </main>
  );
}
