import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { Plate } from "@/components/shared/Plate";
import { commitments, companyProfileLink, whoWeAre } from "@/content/strategy";

export function Intro() {
  return (
    <Section tone="carbon" id="about" labelledBy="about-title">
      <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-12">
        <SectionHeader
          number="01"
          label="About"
          id="about-title"
          title="Four properties."
          accent="One mining district."
          className="lg:col-span-5 lg:mb-0"
        />
        <div className="min-w-0 lg:col-span-7 lg:pt-8">
          <div className="max-w-prose space-y-5">
            {whoWeAre.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <ul className="ruled-list mt-10 max-w-prose" aria-label="Our commitments">
            {commitments.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <div className="mt-8">
            <TextLink href={companyProfileLink.href}>{companyProfileLink.label}</TextLink>
          </div>
        </div>
      </div>
      {/* TODO(content): wide plate photograph (real, captioned). about.png on Source A appears AI-generated. */}
      <Plate
        number="01"
        caption="Timmins Mining Camp, Ontario."
        sizes="(min-width: 1024px) 66vw, 100vw"
        className="mt-20 lg:ml-[33.333%]"
      />
    </Section>
  );
}
