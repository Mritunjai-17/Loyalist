import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { FilteredDocuments } from "@/components/shared/FilteredDocuments";
import { PageHeader } from "@/components/shared/PageHeader";
import { documents } from "@/content/documents";
import { pages } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";

const page = pages.technicalReports;
export const metadata = pageMetadata(page);

export default function TechnicalReportsPage() {
  return (
    <main id="main">
      <PageHeader intro={page} />
      <Section tone="black" labelledBy="reports-title">
        <SectionHeader
          number="01"
          label="Reports"
          id="reports-title"
          title="NI 43-101 reports."
          lead="Technical reports listed on the Company's site. The Tully 2026 resource estimate is summarised on the Tully page."
          action={<TextLink href="/projects/tully#resource">View the Tully resource</TextLink>}
        />
        <FilteredDocuments
          items={documents.filter((d) => d.category === "technical")}
          facets={["year", "type"]}
          label="Technical reports"
        />
      </Section>
    </main>
  );
}
