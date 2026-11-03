import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FilteredDocuments } from "@/components/shared/FilteredDocuments";
import { PageHeader } from "@/components/shared/PageHeader";
import { pages } from "@/content/pages";
import { pressReleases } from "@/content/press-releases";
import { pageMetadata } from "@/lib/seo";

const page = pages.pressReleases;
export const metadata = pageMetadata(page);

export default function PressReleasesPage() {
  const items = pressReleases.map((r) => ({ ...r, type: r.tag }));
  return (
    <main id="main">
      <PageHeader intro={page} />
      <Section tone="black" labelledBy="releases-title">
        <SectionHeader
          number="01"
          label="Releases"
          id="releases-title"
          title="All news releases."
          lead={`${items.length} releases. Filter by year.`}
        />
        <FilteredDocuments items={items} facets={["year"]} label="News releases" />
      </Section>
    </main>
  );
}
