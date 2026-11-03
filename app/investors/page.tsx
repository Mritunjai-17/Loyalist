import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { keyShareData, latestDocuments } from "@/components/home/InvestorPanel";
import { DocumentRow } from "@/components/shared/DocumentRow";
import { PageHeader } from "@/components/shared/PageHeader";
import { Reveal } from "@/components/shared/Reveal";
import { company } from "@/content/company";
import { shareData } from "@/content/documents";
import { isGroup, primaryNav } from "@/content/navigation";
import { investorsUpdated, pages } from "@/content/pages";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

const page = pages.investors;
export const metadata = pageMetadata(page);

const subPages = primaryNav
  .filter(isGroup)
  .find((g) => g.label === "Investors")!
  .items.filter((item) => item.href !== "/investors");

export default function InvestorsPage() {
  return (
    <main id="main">
      <PageHeader
        intro={page}
        meta={
          <p className="text-small">
            Last updated <time dateTime={investorsUpdated}>{formatDate(investorsUpdated)}</time>
          </p>
        }
      />

      <Section tone="black" labelledBy="shares-title">
        <Reveal>
          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-12">
            <div className="lg:col-span-5">
              <SectionHeader
                number="01"
                label="Share data"
                id="shares-title"
                title="Share data."
                lead={`Loyalist Exploration trades on the Canadian Securities Exchange as ${company.ticker}.`}
              />
              <TextLink href="/investors/corporate-structure">See the full corporate structure</TextLink>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <dl className="share-data">
                {keyShareData().map((d) => (
                  <div key={d.label}>
                    <dt className="text-small">{d.label}</dt>
                    <dd className="share-data-value">{d.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-small mt-6">
                As of <time dateTime={shareData.asOf}>{formatDate(shareData.asOf)}</time>.{" "}
                <a href={company.quoteUrl} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">
                  Live quote on TradingView
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section tone="carbon" labelledBy="latest-title">
        <Reveal>
          <SectionHeader number="02" label="Latest" id="latest-title" title="Latest documents." />
          <ul className="document-list max-w-[64rem]" aria-label="Latest documents">
            {latestDocuments(6).map((d) => (
              <DocumentRow key={d.href + d.title} {...d} />
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section tone="black" labelledBy="filings-title">
        <Reveal>
          <SectionHeader
            number="03"
            label="Filings"
            id="filings-title"
            title="All filings."
            lead="The Company's continuous disclosure documents are also filed on SEDAR+."
            action={
              <TextLink href={company.sedarUrl} external>
                Search SEDAR+
              </TextLink>
            }
          />
          <ul className="link-rows">
            {subPages.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-row">
                  <span className="font-semibold text-fg">{item.label}</span>
                  <span>{item.description}</span>
                  <ArrowRight aria-hidden className="project-index-arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>
    </main>
  );
}
