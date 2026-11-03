import { Heading } from "@/components/ui/Heading";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PageHeader } from "@/components/shared/PageHeader";
import { company } from "@/content/company";
import { disclaimerIncomplete, disclaimerNotice, disclaimerSections, privacyFormsNote } from "@/content/disclaimer";
import { pages } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";

const page = pages.disclaimer;
export const metadata = pageMetadata(page);

export default function DisclaimerPage() {
  return (
    <main id="main">
      <PageHeader intro={page} />
      <Section tone="paper" labelledBy="terms-title">
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)]">
              <SectionHeader number="01" label="Terms" id="terms-title" title="Website terms." />
              <aside aria-label="About this text" className="border-l-2 border-[color:var(--accent-rule)] pl-5">
                <p className="text-small text-fg">{disclaimerIncomplete}</p>
                <p className="text-small mt-2">
                  <a href={company.sedarUrl} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">
                    Search SEDAR+
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </p>
              </aside>
            </div>
          </div>
          <Prose className="min-w-0 lg:col-span-7 lg:col-start-6">
            <p className="font-semibold text-fg">{disclaimerNotice}</p>
            {disclaimerSections.map((s) => (
              <section key={s.heading} aria-label={s.heading}>
                <Heading level={3}>{s.heading}</Heading>
                {s.paragraphs.map((p) => (
                  <p key={p} className="mt-4">
                    {p}
                  </p>
                ))}
                {s.list ? (
                  <ul className="mt-4">
                    {s.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
            <p className="text-small">{privacyFormsNote}</p>
          </Prose>
        </div>
      </Section>
    </main>
  );
}
