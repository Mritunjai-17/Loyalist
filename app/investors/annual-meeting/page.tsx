import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FilteredDocuments } from "@/components/shared/FilteredDocuments";
import { PageHeader } from "@/components/shared/PageHeader";
import { documents } from "@/content/documents";
import { pages } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";

const page = pages.annualMeeting;
export const metadata = pageMetadata(page);

export default function AnnualMeetingPage() {
  const items = documents
    .filter((d) => d.category === "annual-meeting")
    .map((d) => ({ ...d, year: d.meetingYear }));
  return (
    <main id="main">
      <PageHeader intro={page} />
      <Section tone="black" labelledBy="meeting-title">
        <SectionHeader
          number="01"
          label="Meetings"
          id="meeting-title"
          title="Meeting materials."
          lead="Filter by meeting year or document type."
        />
        <FilteredDocuments items={items} facets={["year", "type"]} label="Annual meeting documents" />
      </Section>
    </main>
  );
}
