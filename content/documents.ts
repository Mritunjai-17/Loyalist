import type { DocumentItem, ShareData } from "@/types";

// Generated from Source A (loyalistexploration.com /api/financials, /api/technical-reports, /api/annual-meeting-documents) on 2026-11-03.
// Titles verbatim as published, whitespace normalised. File sizes from HTTP Content-Length.
// TODO(content): 16 filing(s) return 404 on Source A and are shown as unavailable:
//   MD&A, June 30, 2025
//   Financial Statements, June 30, 2025
//   MD&A, March 31, 2025
//   Financial Statements, March 31, 2025
//   Financial Statements, December 31, 2024
//   MD&A, December 31, 2024
//   MD&A, September 30, 2024
//   Financial Statements, September 30, 2024
//   MD&A, June 30, 2024
//   Financial Statements, June 30, 2024
//   Financial Statements, March 31, 2024
//   Financial Statements, December 31, 2023
//   Notice of Annual and Special Meeting and Management Information Circular
//   Notice of Meeting
//   Notice Circular
//   Form of Proxy

export const documents: DocumentItem[] = [
  {
    category: "financials",
    type: "Financial statements",
    title: "Financial Statements, March 31, 2026",
    date: "2026-03-31",
    href: "https://loyalistexploration.com/uploads/financials/1784904062809-PNGC_2026_Q1_FS_and_Notes_-_FINAL.pdf",
    sizeBytes: 271332,
    available: true
  },
  {
    category: "financials",
    type: "MD&A",
    title: "MD&A, March 31, 2026",
    date: "2026-03-31",
    href: "https://loyalistexploration.com/uploads/financials/1780315355717-PNGC_-_MDA_Q1_2026_-_FINAL%5B1%5D.pdf",
    sizeBytes: 282338,
    available: true
  },
  {
    category: "financials",
    type: "MD&A",
    title: "MD&A, December 31, 2025",
    date: "2025-12-31",
    href: "https://loyalistexploration.com/uploads/financials/1784904116027-PNGC_-_MDA_Q4_2025_-_FINAL.pdf",
    sizeBytes: 333066,
    available: true
  },
  {
    category: "financials",
    type: "Financial statements",
    title: "Financial Statements, December 31, 2025",
    date: "2025-12-31",
    href: "https://loyalistexploration.com/uploads/financials/1784903970529-PNGC_2025_Q4_FS_and_Notes_-_FINAL_with_report_inserted.pdf",
    sizeBytes: 566452,
    available: true
  },
  {
    category: "financials",
    type: "Financial statements",
    title: "Financial Statements, September 30, 2025",
    date: "2025-09-30",
    href: "https://loyalistexploration.com/uploads/financials/1763756953952-PNGC_2025_Q3_FS_and_Notes_FINAL.pdf",
    sizeBytes: 212737,
    available: true
  },
  {
    category: "financials",
    type: "MD&A",
    title: "MD&A, September 30, 2025",
    date: "2025-09-30",
    href: "https://loyalistexploration.com/uploads/financials/1763756820000-PNGC_-_MDA_Q3_2025_-_FINAL.pdf",
    sizeBytes: 296770,
    available: true
  },
  {
    category: "financials",
    type: "MD&A",
    title: "MD&A, June 30, 2025",
    date: "2025-06-30",
    href: "https://loyalistexploration.com/uploads/financials/1756482014098-PNGC_-_MDA_Q2_2025_-_FINAL.pdf",
    sizeBytes: null,
    available: false
  },
  {
    category: "financials",
    type: "Financial statements",
    title: "Financial Statements, June 30, 2025",
    date: "2025-06-30",
    href: "https://loyalistexploration.com/uploads/financials/1756482354998-PNGC_2025_Q2_FS_and_Notes_FINAL.pdf",
    sizeBytes: null,
    available: false
  },
  {
    category: "financials",
    type: "MD&A",
    title: "MD&A, March 31, 2025",
    date: "2025-03-31",
    href: "https://loyalistexploration.com/uploads/financials/1756481831857-PNGC_-_MDA_Q1_2025_-_FINAL.pdf",
    sizeBytes: null,
    available: false
  },
  {
    category: "financials",
    type: "Financial statements",
    title: "Financial Statements, March 31, 2025",
    date: "2025-03-31",
    href: "https://loyalistexploration.com/uploads/financials/1756482208697-PNGC_2025_Q1_FS_and_Notes_FINAL.pdf",
    sizeBytes: null,
    available: false
  },
  {
    category: "financials",
    type: "Financial statements",
    title: "Financial Statements, December 31, 2024",
    date: "2024-12-31",
    href: "https://loyalistexploration.com/uploads/financials/1756482131650-PNGC_2024_Q4_FS_and_Notes_-_Final_w_Auditors_Report-1.pdf",
    sizeBytes: null,
    available: false
  },
  {
    category: "financials",
    type: "MD&A",
    title: "MD&A, December 31, 2024",
    date: "2024-12-31",
    href: "https://loyalistexploration.com/uploads/financials/1756481912127-PNGC_-_MDA_Q4_2024_-_FINAL.pdf",
    sizeBytes: null,
    available: false
  },
  {
    category: "financials",
    type: "MD&A",
    title: "MD&A, September 30, 2024",
    date: "2024-09-30",
    href: "https://loyalistexploration.com/uploads/financials/1755172796772-PNGC-MDA-Q3-2024-FINAL.pdf",
    sizeBytes: null,
    available: false
  },
  {
    category: "financials",
    type: "Financial statements",
    title: "Financial Statements, September 30, 2024",
    date: "2024-09-30",
    href: "https://loyalistexploration.com/uploads/financials/1755172454103-PNGC-2024-Q3-FS-and-Notes-FINAL.pdf",
    sizeBytes: null,
    available: false
  },
  {
    category: "financials",
    type: "MD&A",
    title: "MD&A, June 30, 2024",
    date: "2024-06-30",
    href: "https://loyalistexploration.com/uploads/financials/1755172671140-PNGC-2024-Q2-FS-and-Notes-FINAL.pdf",
    sizeBytes: null,
    available: false
  },
  {
    category: "financials",
    type: "Financial statements",
    title: "Financial Statements, June 30, 2024",
    date: "2024-06-30",
    href: "https://loyalistexploration.com/uploads/financials/1755172361614-PNGC-2024-Q2-FS-and-Notes-FINAL.pdf",
    sizeBytes: null,
    available: false
  },
  {
    category: "financials",
    type: "Financial statements",
    title: "Financial Statements, March 31, 2024",
    date: "2024-03-31",
    href: "https://loyalistexploration.com/uploads/financials/1755172202909-PNGC-2024-Q1-FS-and-Notes-FINAL.pdf",
    sizeBytes: null,
    available: false
  },
  {
    category: "financials",
    type: "Financial statements",
    title: "Financial Statements, December 31, 2023",
    date: "2023-12-31",
    href: "https://loyalistexploration.com/uploads/financials/1755172044450-PNGC-2022-Q4-FS-FINAL.pdf",
    sizeBytes: null,
    available: false
  },
  {
    category: "technical",
    type: "Technical report",
    title: "NI 43-101 Technical Report for Loveland",
    date: "2026-04-10",
    href: "https://loyalistexploration.com/uploads/technical-reports/1775826964420-Caracle_Loyalist_Loveland-Polymetallic-NI43-101-TR_-Apr06_2026-Final.pdf",
    project: "loveland",
    sizeBytes: 4469862,
    available: true
  },
  {
    category: "annual-meeting",
    type: "Meeting material",
    title: "Notice of Annual and Special Meeting and Management Information Circular",
    description: "Notice and Information Circular outlining the details, agenda, and business items for the Annual and Special Meeting of shareholders.",
    date: "2025-11-13",
    meetingYear: 2025,
    href: "https://loyalistexploration.com/api/annual-meeting-documents/download/6915fb0fecf8d01b9b8101b8",
    sizeBytes: null,
    available: false
  },
  {
    category: "annual-meeting",
    type: "Meeting material",
    title: "Notice of Meeting",
    description: "Notice of the Company’s Annual and Special Meeting, including meeting details and agenda information.",
    date: "2025-11-13",
    meetingYear: 2025,
    href: "https://loyalistexploration.com/api/annual-meeting-documents/download/6915f967ecf8d01b9b81019d",
    sizeBytes: null,
    available: false
  },
  {
    category: "annual-meeting",
    type: "Meeting material",
    title: "Notice Circular",
    description: "This Circular accompanies the Notice of Meeting and includes important information for shareholders about the Annual General Meeting agenda, voting procedures, and other business matters.",
    date: "2025-11-13",
    meetingYear: 2025,
    href: "https://loyalistexploration.com/api/annual-meeting-documents/download/6915fa30ecf8d01b9b8101a1",
    sizeBytes: null,
    available: false
  },
  {
    category: "annual-meeting",
    type: "Meeting material",
    title: "Form of Proxy",
    description: "The Form of Proxy provides shareholders with the means to authorize another person to attend and vote at the Annual General Meeting on their behalf, as permitted under applicable corporate and securities regulations.",
    date: "2025-11-13",
    meetingYear: 2025,
    href: "https://loyalistexploration.com/api/annual-meeting-documents/download/6915fb49ecf8d01b9b8101c0",
    sizeBytes: null,
    available: false
  }
];

// Source A /api/company-structure, last updated 2026-07-24. Matches Source B (421M, 176M, 19.42%).
// VERIFY against filed news release
export const shareData: ShareData = {
  asOf: "2026-07-24",
  capital: [
    {
      label: "Common Shares Outstanding",
      value: "421M"
    },
    {
      label: "LTIP Grants",
      value: "35M"
    },
    {
      label: "Warrants",
      value: "176M"
    }
  ],
  ownership: [
    {
      holder: "Management & Directors",
      percentage: "2.46%"
    },
    {
      holder: "Corporate",
      percentage: "23.17%"
    },
    {
      holder: "Significant Shareholders",
      percentage: "54.95%"
    },
    {
      holder: "Float",
      percentage: "19.42%"
    }
  ]
};
