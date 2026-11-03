import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import type { PageIntro } from "@/types";

type PageHeaderProps = {
  intro: Omit<PageIntro, "path" | "title" | "description">;
  /** Eyebrow number, e.g. a project's "01". */
  number?: string;
  /** Badges or short facts set under the lead. */
  meta?: ReactNode;
};

/** Breadcrumb, eyebrow, page-title h1, lead, then an optional full-width photo strip. */
export function PageHeader({ intro, number, meta }: PageHeaderProps) {
  const { breadcrumbs, eyebrow, heading, accent, lead, photo } = intro;
  return (
    <header data-tone="carbon" className="page-header bg-surface">
      <Container>
        <nav aria-label="Breadcrumb">
          <ol className="breadcrumb">
            {breadcrumbs.map((crumb) => (
              <li key={crumb.label}>
                {crumb.href ? (
                  <Link href={crumb.href}>{crumb.label}</Link>
                ) : (
                  <span aria-current="page">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <Eyebrow number={number} className="mt-12">
          {eyebrow}
        </Eyebrow>
        <Heading level={1} accent={accent} className="mt-5 max-w-[22ch]">
          {heading}
        </Heading>
        <p className="text-lead mt-5">{lead}</p>
        {meta ? <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">{meta}</div> : null}
      </Container>
      {photo ? (
        <div className="page-strip">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="100vw"
            quality={85}
            className="object-cover"
            style={{ objectPosition: photo.focalPoint }}
          />
          <div aria-hidden className="page-strip-overlay" />
          <p className="page-strip-credit">Photo: {photo.credit}</p>
        </div>
      ) : null}
    </header>
  );
}
