import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { company } from "@/content/company";
import { HeadingBlock } from "./SectionIntro";
import { NewsletterForm } from "./NewsletterForm";

/** Contact and newsletter on ivory, the last light band before the charcoal footer. */
export function CtaBand() {
  return (
    <section id="contact" aria-labelledby="contact-title" data-tone="ivory" className="section-pad relative bg-surface">
      <div className="container-site grid gap-y-block lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end lg:gap-x-col">
        <Reveal>
          <HeadingBlock index="08" label="Contact" id="contact-title" title="Questions about" accent="the projects?" />
          <p className="lead-ed mt-copy">
            Get in touch with our team for project updates, investor information or general inquiries.
          </p>
          <dl className="mt-group grid gap-6 border-t border-rule pt-8 sm:grid-cols-2 sm:gap-x-grid">
            <div>
              <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-accent">Email</dt>
              <dd className="mt-2">
                <a href={`mailto:${company.email}`} className="text-[1.0625rem] font-medium text-fg underline decoration-ed-rule/60 underline-offset-[6px] hover:decoration-ed-accent">
                  {company.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-accent">Telephone</dt>
              <dd className="mt-2">
                <a href={company.phone.href} className="text-[1.0625rem] font-medium text-fg underline decoration-ed-rule/60 underline-offset-[6px] hover:decoration-ed-accent">
                  {company.phone.display}
                </a>
              </dd>
            </div>
          </dl>
          <Link href="/contact" className="link-ed mt-8">
            <span>Contact the company</span>
            <ArrowRight aria-hidden />
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="bg-ed-stone p-card" data-tone="stone">
            <NewsletterForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
