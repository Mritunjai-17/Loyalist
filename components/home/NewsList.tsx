import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { pressReleases } from "@/content/press-releases";
import { formatDate } from "@/lib/format";

export function NewsList() {
  const [featured, ...rest] = pressReleases.slice(0, 5);
  if (!featured) return null;

  return (
    <Section tone="carbon" id="news" labelledBy="news-title">
      <SectionHeader
        number="07"
        label="News"
        id="news-title"
        title="Latest news."
        action={<TextLink href="/press-releases">All press releases</TextLink>}
      />
      <article className="news-featured">
        <time dateTime={featured.date} className="text-small">
          {formatDate(featured.date)}
        </time>
        <div>
          <Heading level={3} className="max-w-[34ch]">
            {featured.title}
          </Heading>
          {featured.available ? (
            <div className="mt-6">
              <TextLink href={featured.href} external>
                Read the release
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </TextLink>
            </div>
          ) : null}
        </div>
      </article>
      <ul className="news-list">
        {rest.map((r) => (
          <li key={r.href}>
            <time dateTime={r.date} className="text-small">
              {formatDate(r.date)}
            </time>
            {r.available ? (
              <a href={r.href} target="_blank" rel="noopener noreferrer" className="news-link">
                {r.title}
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </a>
            ) : (
              <span className="news-link">
                {r.title} <span className="text-small">(file unavailable)</span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
