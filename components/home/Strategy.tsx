import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { ceoStatement, strategySteps } from "@/content/strategy";

export function Strategy() {
  return (
    <Section tone="black" id="strategy" labelledBy="strategy-title">
      <SectionHeader number="03" label="Strategy" id="strategy-title" title="From acquisition" accent="to advancement." />
      <ol className="strategy-columns">
        {strategySteps.map((step) => (
          <li key={step.title} className="strategy-column">
            {/* The numeral sits inside the h3 so it shares the heading face without a second font rule. */}
            <Heading level={3}>
              <span aria-hidden className="strategy-numeral">
                {step.numeral}
              </span>
              <span className="block">{step.title}</span>
            </Heading>
            <p className="mt-5">{step.body}</p>
            <div className="mt-6">
              <TextLink href={step.link.href}>{step.link.label}</TextLink>
            </div>
          </li>
        ))}
      </ol>
      <figure className="mt-20 grid lg:grid-cols-3">
        <div className="border-l-2 border-gold pl-8 lg:col-span-2 lg:col-start-2">
          <blockquote>
            <p className="pull-quote">&ldquo;{ceoStatement.text}&rdquo;</p>
          </blockquote>
          <figcaption className="text-small mt-6">
            <span className="font-medium text-ivory">{ceoStatement.name}</span>, {ceoStatement.title}
          </figcaption>
        </div>
      </figure>
    </Section>
  );
}
