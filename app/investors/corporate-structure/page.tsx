import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Table, type Column } from "@/components/ui/Table";
import { PageHeader } from "@/components/shared/PageHeader";
import { Reveal } from "@/components/shared/Reveal";
import { shareData } from "@/content/documents";
import { pages } from "@/content/pages";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

const page = pages.corporateStructure;
export const metadata = pageMetadata(page);

type CapitalRow = (typeof shareData.capital)[number];
type OwnershipRow = (typeof shareData.ownership)[number];

const capitalColumns: Column<CapitalRow>[] = [
  { key: "label", header: "Security", render: (r) => r.label },
  { key: "value", header: "Number", numeric: true, render: (r) => r.value },
];

const ownershipColumns: Column<OwnershipRow>[] = [
  { key: "holder", header: "Holder", render: (r) => r.holder },
  { key: "percentage", header: "Share of common shares", numeric: true, render: (r) => r.percentage },
];

export default function CorporateStructurePage() {
  const asOf = `As of ${formatDate(shareData.asOf)}.`;
  return (
    <main id="main">
      <PageHeader intro={page} />

      <Section tone="paper" labelledBy="capital-title">
        <Reveal>
          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-12">
            <SectionHeader number="01" label="Capital" id="capital-title" title="Share capital." lead={asOf} className="lg:col-span-5 lg:mb-0" />
            <Table
              label="Share capital"
              columns={capitalColumns}
              rows={shareData.capital}
              rowKey={(r) => r.label}
              caption={`${asOf} M = millions.`}
              className="min-w-0 lg:col-span-7"
            />
          </div>
        </Reveal>
      </Section>

      <Section tone="black" labelledBy="ownership-title">
        <Reveal>
          <SectionHeader number="02" label="Ownership" id="ownership-title" title="Ownership." lead={asOf} />
          <div className="grid gap-12 lg:grid-cols-12">
            <Table
              label="Ownership"
              columns={ownershipColumns}
              rows={shareData.ownership}
              rowKey={(r) => r.holder}
              caption={asOf}
              className="min-w-0 lg:col-span-7"
            />
            <dl className="ownership-bars lg:col-span-4 lg:col-start-9">
              {shareData.ownership.map((o) => (
                <div key={o.holder}>
                  <dt className="text-small">{o.holder}</dt>
                  <dd className="mt-2 flex items-center gap-4">
                    <span aria-hidden className="ownership-bar" style={{ width: o.percentage }} />
                    <span className="font-medium text-fg">{o.percentage}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
