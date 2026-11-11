import Link from "next/link";
import type { ComponentType } from "react";
import { company } from "@/content/company";
import { isGroup, primaryNav } from "@/content/navigation";
import { projects } from "@/content/projects";
import type { NavGroup, SocialNetwork } from "@/types";
import { Logo } from "./Logo";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.69 1.69 0 1 0 0-3.38 1.69 1.69 0 0 0 0 3.38zM7.86 18.5V10.13H5.07v8.37h2.79z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

const socialIcons: Record<SocialNetwork, ComponentType<{ className?: string }>> = {
  LinkedIn: LinkedinIcon,
  X: XIcon,
  Facebook: FacebookIcon,
  YouTube: YoutubeIcon,
  Instagram: InstagramIcon,
};

const companyLinks = [
  { label: "Company profile", href: "/about/company-profile" },
  { label: "Our team", href: "/about/our-team" },
  { label: "News releases", href: "/press-releases" },
  { label: "Contact", href: "/contact" },
];

const investorGroup = primaryNav.find((e): e is NavGroup => isGroup(e) && e.label === "Investors");

/** Midnight footer: statement, navigation groups, contact, social, legal. */
export function Footer() {
  const { headOffice: office } = company;
  const year = new Date().getFullYear();

  return (
    <footer data-tone="deep" className="bg-ed-deep pb-10 pt-20 text-ed-ivory/75 sm:pt-28">
      <div className="container-site">
        {/* Statement */}
        <div className="flex flex-col gap-10 border-b border-ed-ivory/12 pb-16 lg:flex-row lg:items-end lg:justify-between">
          <p className="footer-ed-statement" aria-label={company.slogan}>
            <span className="block">Buy Timmins.</span>
            <span className="block italic text-ed-accent">Mine Timmins.</span>
          </p>
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-[0.875rem] leading-relaxed text-ed-ivory/70">{company.summary}</p>
          </div>
        </div>

        {/* Navigation groups */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <nav aria-label="Company" className="lg:col-span-2">
            <p className="footer-ed-head">Company</p>
            <ul className="mt-5 space-y-1">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-ed-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Projects" className="lg:col-span-3">
            <p className="footer-ed-head">Projects</p>
            <ul className="mt-5 space-y-1">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link href={`/projects/${p.slug}`} className="footer-ed-link gap-3">
                    <span>{p.name}</span>
                    <span className="text-[0.75rem] text-ed-ivory/60">{p.metalsLabel}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/projects" className="footer-ed-link">
                  All projects
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Investors" className="lg:col-span-3">
            <p className="footer-ed-head">Investors</p>
            <ul className="mt-5 space-y-1">
              {(investorGroup?.items ?? []).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-ed-link">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={company.presentation.href} target="_blank" rel="noopener noreferrer" className="footer-ed-link">
                  Corporate presentation (PDF)
                </a>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="footer-ed-head">Head office</p>
            <address className="mt-5 not-italic text-[0.875rem] leading-relaxed text-ed-ivory/75">
              {office.street}
              <br />
              {office.city}, {office.region} {office.postalCode}
              <br />
              {office.country}
            </address>
            <ul className="mt-4 space-y-1">
              <li>
                <a href={`mailto:${company.email}`} className="footer-ed-link">
                  {company.email}
                </a>
              </li>
              <li>
                <a href={company.phone.href} className="footer-ed-link">
                  {company.phone.display}
                </a>
              </li>
            </ul>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Social media">
              {company.social.map(({ network, href }) => {
                const Icon = socialIcons[network];
                return (
                  <li key={network}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 w-11 items-center justify-center border border-ed-ivory/15 text-ed-ivory/75 transition-colors hover:border-ed-accent hover:text-ed-accent-light"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="sr-only">{network} (opens in a new tab)</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-4 border-t border-ed-ivory/12 pt-8 text-[0.75rem] text-ed-ivory/70 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {company.legalName}. {company.exchange}: {company.ticker}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link href="/disclaimer" className="transition-colors hover:text-ed-ivory">
                Disclaimer &amp; forward-looking statements
              </Link>
            </li>
            <li>
              <a href={company.sedarUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ed-ivory">
                Filings on SEDAR+
              </a>
            </li>
            <li className="text-ed-ivory/60">{company.coordinates.label}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
