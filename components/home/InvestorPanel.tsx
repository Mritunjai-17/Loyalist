import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { DocumentRow } from "@/components/shared/DocumentRow";
import { company } from "@/content/company";
import { documents, shareData } from "@/content/documents";
import { formatDate } from "@/lib/format";
import type { DocumentItem } from "@/types";

export function presentationDocument(): DocumentItem {
  return {
    category: "presentation",
    type: "Presentation",
    title: "Corporate presentation",
    date: company.presentation.date,
    href: company.presentation.href,
    sizeBytes: company.presentation.sizeBytes,
    available: true,
  };
}

export function latestDocuments(count: number): DocumentItem[] {
  return [presentationDocument(), ...documents].sort((a, b) => b.date.localeCompare(a.date)).slice(0, count);
}

export function keyShareData() {
  const capital = (label: string) => shareData.capital.find((c) => c.label === label)?.value ?? "Not reported";
  const float = shareData.ownership.find((o) => o.holder === "Float")?.percentage ?? "Not reported";
  return [
    { label: "CSE symbol", value: company.ticker },
    { label: "Common shares outstanding", value: capital("Common Shares Outstanding") },
    { label: "Warrants", value: capital("Warrants") },
    { label: "Public float", value: float },
  ];
}

export function InvestorPanel() {
  return (
    <Section tone="black" id="investors" labelledBy="investors-title">
      <SectionHeader
        number="06"
        label="Investors"
        id="investors-title"
        title="Investor information."
        action={<TextLink href="/investors">Go to the investor page</TextLink>}
      />
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <dl className="share-data">
            {keyShareData().map((d) => (
              <div key={d.label}>
                <dt className="text-small">{d.label}</dt>
                <dd className="share-data-value">{d.value}</dd>
              </div>
            ))}
          </dl>
          <p className="text-small mt-6">
            As of <time dateTime={shareData.asOf}>{formatDate(shareData.asOf)}</time>.
          </p>
        </div>
        <div className="min-w-0 lg:col-span-7 lg:col-start-6">
          <ul className="document-list" aria-label="Latest documents">
            {latestDocuments(5).map((d) => (
              <DocumentRow key={d.href + d.title} {...d} />
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
