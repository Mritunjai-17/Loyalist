import Image from "next/image";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PageHeader } from "@/components/shared/PageHeader";
import { Reveal } from "@/components/shared/Reveal";
import { pages } from "@/content/pages";
import { team } from "@/content/team";
import { pageMetadata } from "@/lib/seo";
import type { TeamGroup, TeamMember, Tone } from "@/types";

const page = pages.ourTeam;
export const metadata = pageMetadata(page);

// Rows with portraits for management and advisors; the board between them is set in two columns.
const groups: { group: TeamGroup; label: string; title: string; tone: Tone; layout: "rows" | "columns" }[] = [
  { group: "management", label: "Management", title: "Management.", tone: "black", layout: "rows" },
  { group: "directors", label: "Board", title: "Board of directors.", tone: "carbon", layout: "columns" },
  { group: "advisors", label: "Advisors", title: "Advisors.", tone: "black", layout: "rows" },
];

// People who appear in two groups get their full biography once, in the first group.
const firstAppearance = new Map<string, string>();
for (const member of team) {
  if (!firstAppearance.has(member.name)) firstAppearance.set(member.name, member.id);
}

function MemberRow({ member }: { member: TeamMember }) {
  const firstId = firstAppearance.get(member.name)!;
  const isRepeat = firstId !== member.id;
  return (
    <li id={member.id} className="team-row">
      <div className="team-portrait">
        {member.portrait ? (
          <Image
            src={member.portrait.src}
            width={member.portrait.width}
            height={member.portrait.height}
            alt={member.portrait.alt}
            sizes="(min-width: 1024px) 200px, 160px"
            className="h-auto w-full rounded-panel"
          />
        ) : null}
      </div>
      <div>
        <Heading level={3}>{member.name}</Heading>
        <p className="text-small mt-2">
          {member.title}
          {member.credentials ? ` · ${member.credentials}` : null}
        </p>
      </div>
      <div className="max-w-prose space-y-5">
        {isRepeat ? (
          <p>
            {member.summary}{" "}
            <a href={`#${firstId}`} className="text-accent underline underline-offset-4">
              Full biography under Management
            </a>
            .
          </p>
        ) : (
          member.bio.map((p) => <p key={p.slice(0, 24)}>{p}</p>)
        )}
      </div>
    </li>
  );
}

export default function OurTeamPage() {
  return (
    <main id="main">
      <PageHeader intro={page} />
      {groups.map((g, i) => (
        <Section key={g.group} tone={g.tone} labelledBy={`${g.group}-title`}>
          <Reveal>
            <SectionHeader number={String(i + 1).padStart(2, "0")} label={g.label} id={`${g.group}-title`} title={g.title} />
            <ul className={g.layout === "rows" ? "team-list" : "team-columns"}>
              {team
                .filter((m) => m.group === g.group)
                .map((m) => (
                  <MemberRow key={m.id} member={m} />
                ))}
            </ul>
          </Reveal>
        </Section>
      ))}
    </main>
  );
}
