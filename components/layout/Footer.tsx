import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/content/company";
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

const siteLinks = [
  { label: "Company Profile", href: "/about/company-profile" },
  { label: "Our Team", href: "/about/our-team" },
  { label: "Projects", href: "/projects" },
  { label: "Investors", href: "/investors" },
  { label: "Press Releases", href: "/press-releases" },
  { label: "Contact", href: "/contact" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export function Footer() {
  const { headOffice: office } = company;

  return (
    <footer data-tone="black" className="bg-black text-fg-muted pt-20 pb-10">
      <div className="container-site">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10 pb-16">
          {/* Column 1: Brand & Description (4 cols) */}
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 text-xs sm:text-[13px] leading-relaxed text-fg-muted max-w-sm">
              Loyalist Exploration Limited is a mineral exploration company focused on acquiring,
              exploring and advancing quality mineral properties in the Timmins Mining District.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs sm:text-[13px] text-fg-muted">
              <MapPin className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
              <span>Timmins, Ontario – 48.48° N 81.33° W</span>
            </div>
          </div>

          {/* Column 2: SITE Links (2.5 cols) */}
          <div className="lg:col-span-3 lg:col-start-5">
            <div className="mb-5">
              <span className="text-[11px] font-semibold text-accent tracking-[0.14em] uppercase">SITE</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-[13px]">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: CONTACT Info (3 cols) */}
          <div className="lg:col-span-3">
            <div className="mb-5">
              <span className="text-[11px] font-semibold text-accent tracking-[0.14em] uppercase">CONTACT</span>
            </div>
            <ul className="space-y-3.5 text-xs sm:text-[13px]">
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex items-center gap-2.5 hover:text-accent transition-colors"
                >
                  <Mail className="w-4 h-4 text-gold shrink-0 stroke-[1.75]" aria-hidden="true" />
                  <span>{company.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={company.phone.href}
                  className="inline-flex items-center gap-2.5 hover:text-accent transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold shrink-0 stroke-[1.75]" aria-hidden="true" />
                  <span>{company.phone.display}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                <address className="not-italic leading-relaxed">
                  {office.street}
                  <br />
                  {office.city}, {office.region} {office.postalCode}
                </address>
              </li>
            </ul>
          </div>

          {/* Column 4: FOLLOW Social Links (2 cols) */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <span className="text-[11px] font-semibold text-accent tracking-[0.14em] uppercase">FOLLOW</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-[13px]">
              <li>
                <a
                  href="https://www.linkedin.com/company/loyalist-exploration-limited/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 hover:text-accent transition-colors py-0.5"
                >
                  <LinkedinIcon className="w-4 h-4 text-ivory/80 shrink-0" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/LoyalistExp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 hover:text-accent transition-colors py-0.5"
                >
                  <XIcon className="w-4 h-4 text-ivory/80 shrink-0" />
                  <span>X</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/people/Loyalist-Exploration/61575711082978/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 hover:text-accent transition-colors py-0.5"
                >
                  <FacebookIcon className="w-4 h-4 text-ivory/80 shrink-0" />
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@LoyalistExploration"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 hover:text-accent transition-colors py-0.5"
                >
                  <YoutubeIcon className="w-4 h-4 text-ivory/80 shrink-0" />
                  <span>YouTube</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/loyalistexploration/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 hover:text-accent transition-colors py-0.5"
                >
                  <InstagramIcon className="w-4 h-4 text-ivory/80 shrink-0" />
                  <span>Instagram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Sub-footer Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-fg-muted/80">
          <div>© 2026 Loyalist Exploration Limited. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link href="/disclaimer" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20 select-none">|</span>
            <Link href="/disclaimer" className="hover:text-accent transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
