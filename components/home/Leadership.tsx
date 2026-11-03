import Image from "next/image";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { getMember, leadershipHighlight } from "@/content/team";

export function Leadership() {
  const featured = getMember(leadershipHighlight.featured);
  const others = leadershipHighlight.others.map(getMember);

  return (
    <Section tone="paper" id="leadership" labelledBy="leadership-title">
      <SectionHeader
        number="05"
        label="Leadership"
        id="leadership-title"
        title="Leadership with"
        accent="Timmins experience."
        action={<TextLink href="/about/our-team">Meet the full team</TextLink>}
      />
      <article className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        {featured.portrait ? (
          <div className="lg:col-span-4">
            <Image
              src={featured.portrait.src}
              width={featured.portrait.width}
              height={featured.portrait.height}
              alt={featured.portrait.alt}
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="h-auto w-full max-w-md rounded-panel"
            />
          </div>
        ) : null}
        <div className="lg:col-span-7 lg:col-start-6">
          <Heading level={3}>
            {featured.name}
            {featured.credentials ? `, ${featured.credentials}` : null}
          </Heading>
          <p className="text-small mt-2">{featured.title}</p>
          <div className="mt-6 max-w-prose space-y-5">
            {featured.bio.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </article>
      <ul className="leader-list mt-16">
        {others.map((m) => (
          <li key={m.id} className="leader-row">
            <div>
              <Heading level={3}>{m.name}</Heading>
              <p className="text-small mt-1">
                {m.title}
                {m.credentials ? ` · ${m.credentials}` : null}
              </p>
            </div>
            <p className="max-w-prose">{m.summary}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
