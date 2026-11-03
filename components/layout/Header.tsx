import { Download } from "lucide-react";
import { company } from "@/content/company";
import { formatFileSize } from "@/lib/format";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavMenu } from "./NavMenu";
import { SiteSearch } from "./SiteSearch";

export function Header() {
  return (
    <header className="site-header">
      <div className="container-site flex h-full items-center">
        <Logo />
        <span aria-hidden className="header-divider" />
        <NavMenu />
        <div className="ml-auto flex items-center gap-[14px]">
          <SiteSearch />
          <a href={company.quoteUrl} target="_blank" rel="noopener noreferrer" className="header-btn header-btn-outline hidden lg:inline-flex">
            {company.exchange}: {company.ticker}
            <span className="sr-only">(share price on TradingView, opens in a new tab)</span>
          </a>
          <a
            href={company.presentation.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Corporate Presentation (PDF, ${formatFileSize(company.presentation.sizeBytes)}, opens in a new tab)`}
            className="header-btn header-btn-gold header-btn-presentation hidden lg:inline-flex"
          >
            {/* Full label from 1440px; shortened, then icon-only, as the row narrows. */}
            <span className="header-label-full" aria-hidden>
              Corporate Presentation
            </span>
            <span className="header-label-short" aria-hidden>
              Presentation
            </span>
            <Download aria-hidden />
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
