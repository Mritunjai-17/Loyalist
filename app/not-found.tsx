import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PageHeader } from "@/components/shared/PageHeader";
import { footerNav } from "@/content/navigation";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <main id="main">
      <PageHeader
        intro={{
          eyebrow: "Error 404",
          heading: "This page is not",
          accent: "on the map.",
          lead: "The address may have changed when the site was rebuilt. The pages below cover everything that was on the old site.",
          breadcrumbs: [{ label: "Home", href: "/" }, { label: "Page not found" }],
        }}
      />
      <Section tone="paper" labelledBy="pages-title">
        <SectionHeader number="01" label="Pages" id="pages-title" title="Where to go next." />
        <ul className="link-rows">
          {[{ label: "Home", href: "/" }, ...footerNav].map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="link-row">
                <span className="font-semibold text-fg">{link.label}</span>
                <span />
                <ArrowRight aria-hidden className="project-index-arrow" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
