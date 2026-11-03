import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/content/company";
import { footerNav } from "@/content/navigation";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Logo } from "./Logo";

const year = 2026;

export function Footer() {
  const { headOffice: office } = company;
  return (
    <footer data-tone="black" className="border-t border-graphite bg-black">
      <div className="container-site grid gap-x-12 gap-y-14 py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-8 max-w-[38ch]">{company.summary}</p>
          <p className="text-small mt-6">
            {company.coordinates.place} · {company.coordinates.label}
          </p>
        </div>

        <div className="lg:col-span-2 lg:col-start-6">
          <Eyebrow>Site</Eyebrow>
          <ul className="mt-6">
            {footerNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="footer-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <Eyebrow>Contact</Eyebrow>
          <ul className="mt-6 grid gap-4">
            <li>
              <a href={`mailto:${company.email}`} className="footer-contact">
                <Mail aria-hidden />
                {company.email}
              </a>
            </li>
            <li>
              <a href={company.phone.href} className="footer-contact">
                <Phone aria-hidden />
                {company.phone.display}
              </a>
            </li>
            <li className="footer-contact">
              <MapPin aria-hidden />
              <address className="not-italic">
                {office.street}
                <br />
                {office.city}, {office.region} {office.postalCode}
              </address>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <Eyebrow>Follow</Eyebrow>
          <ul className="mt-6">
            {company.social.map((s) => (
              <li key={s.network}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="footer-link">
                  {s.network}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-graphite">
        <div className="container-site grid gap-6 py-10 text-small lg:grid-cols-12">
          <p className="lg:col-span-6">
            This website contains forward-looking information within the meaning of applicable Canadian securities
            legislation. Read the{" "}
            <Link href="/disclaimer" className="underline underline-offset-4 hover:text-ivory">
              cautionary note and disclaimer
            </Link>
            .
          </p>
          <p className="lg:col-span-6">
            Continuous disclosure documents for {company.legalName} are filed on{" "}
            <a href={company.sedarUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ivory">
              SEDAR+
            </a>
            . Landscape and mineral photography is illustrative unless captioned otherwise.
          </p>
          <p className="flex flex-wrap gap-x-6 gap-y-2 lg:col-span-12">
            <span>
              © {year} {company.legalName}
            </span>
            <span>
              {company.exchange}: {company.ticker}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
