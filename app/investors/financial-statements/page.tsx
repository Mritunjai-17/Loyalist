import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FilteredDocuments } from "@/components/shared/FilteredDocuments";
import { PageHeader } from "@/components/shared/PageHeader";
import { documents } from "@/content/documents";
import { pages } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";

const page = pages.financialStatements;
export const metadata = pageMetadata(page);

export default function FinancialStatementsPage() {
  return (
    <main id="main">
      <PageHeader intro={page} />
      <Section tone="black" labelledBy="filings-title">
        <SectionHeader
          number="01"
          label="Filings"
          id="filings-title"
          title="Statements and MD&A."
          lead="Filter by year or type. Filings the Company's site no longer serves are listed as unavailable."
        />
        <FilteredDocuments
          items={documents.filter((d) => d.category === "financials")}
          facets={["year", "type"]}
          label="Financial statements and MD&A"
        />
      </Section>
    </main>
  );
}
