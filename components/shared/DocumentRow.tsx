import { FileText } from "lucide-react";
import { formatDate, formatFileSize } from "@/lib/format";

type DocumentRowProps = {
  type: string;
  title: string;
  date: string;
  href: string;
  sizeBytes: number | null;
  available: boolean;
};

/** One filing: type, title, date, size. PDFs open in a new tab. */
export function DocumentRow({ type, title, date, href, sizeBytes, available }: DocumentRowProps) {
  const meta = (
    <span className="document-meta">
      <span>{type}</span>
      <time dateTime={date}>{formatDate(date)}</time>
      <span>{available && sizeBytes ? `PDF, ${formatFileSize(sizeBytes)}` : "File unavailable"}</span>
    </span>
  );

  return (
    <li className="document-row">
      <FileText aria-hidden className="document-icon" />
      {available ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="document-link">
          <span className="document-title">
            {title} <span className="sr-only">(PDF, opens in a new tab)</span>
          </span>
          {meta}
        </a>
      ) : (
        <div className="document-link">
          <span className="document-title">{title}</span>
          {meta}
        </div>
      )}
    </li>
  );
}
