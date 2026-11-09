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
      <div className="navbar-capsule">
        {/* Left: Logo */}
        <div className="flex items-center flex-none">
          <Logo />
        </div>

        {/* Center: Navigation Links */}
        <NavMenu />

        {/* Right utility items: Search, CSE Ticker, Presentation Button, Mobile Toggle */}
        <div className="flex items-center gap-1 sm:gap-5 xl:gap-7 ml-auto lg:ml-0 flex-none">
          <SiteSearch />
          <a
            href={company.quoteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-ticker hidden sm:inline-flex"
          >
            {company.exchange}: {company.ticker}
            <span className="sr-only">(share price on TradingView, opens in a new tab)</span>
          </a>
          <a
            href={company.presentation.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Corporate Presentation (PDF, ${formatFileSize(company.presentation.sizeBytes)}, opens in a new tab)`}
            className="navbar-presentation-btn hidden sm:inline-flex"
          >
            <span>Corporate Presentation</span>
            <Download className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden />
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
