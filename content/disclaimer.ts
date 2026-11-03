import type { DisclaimerSection } from "@/types";

// Source A /page/disclaimers.html, fetched 2026-11-03, verbatim.
// TODO(content): Source A publishes every section except the liability list cut off mid-text
// (ending in "..."). Supply the full disclaimer and forward-looking statements text.
export const disclaimerNotice = "PLEASE READ THESE TERMS CAREFULLY BEFORE USING THIS WEBSITE";

export const disclaimerIncomplete =
  "The full text of each section is being prepared. Until it is published here, the Company's filings on SEDAR+ govern.";

export const disclaimerSections: DisclaimerSection[] = [
  {
    heading: "Terms of use",
    paragraphs: ["This website is owned and operated by Loyalist Exploration Limited..."],
  },
  {
    heading: "Cautionary note regarding forward-looking information",
    paragraphs: [
      "This website contains “forward-looking information” within the meaning of applicable Canadian securities legislation...",
    ],
  },
  {
    heading: "Disclaimer to United States investors",
    paragraphs: [
      "This website does not constitute an offer to sell or a solicitation of an offer to buy securities in the United States...",
    ],
  },
  {
    heading: "No incorporation by reference",
    paragraphs: ["No information included herein shall be deemed to be incorporated by reference..."],
  },
  {
    heading: "Website protected by copyright",
    paragraphs: ["Certain materials (including graphics, icons, HTML, javascripts, color schemes, multimedia...)..."],
  },
  {
    heading: "Currency of website",
    paragraphs: ["Loyalist Exploration Limited updates the information on this website regularly..."],
  },
  {
    heading: "Exclusion of liability",
    paragraphs: [],
    list: [
      "the use of or reliance on information contained in this website;",
      "any inaccuracy or omission in such information or failure to keep the information current;",
      "use of any third party websites linked to this website;",
      "any Internet software used in connection with this website or computer viruses or other destructive programs encountered as a result of using this website;",
      "any delays, inaccuracies or errors in, or in the transmission of, any stock price quotes or historical price data;",
      "any other matter connected with this website;",
    ],
  },
  {
    heading: "Not responsible for Internet software or computer viruses",
    paragraphs: [
      "Due to technical difficulties inherent in the Internet, Internet software or transmission problems could produce inaccurate or incomplete copies...",
    ],
  },
  {
    heading: "Not responsible for linked websites",
    paragraphs: ["Loyalist Exploration Limited provides links to third party websites for your convenience only..."],
  },
  {
    heading: "Website is provided as a service only",
    paragraphs: ["This website is not intended as a solicitation or offering of securities in any jurisdiction..."],
  },
  {
    heading: "Privacy statement",
    paragraphs: ["Loyalist Exploration Limited’s website does not collect any personal information about visitors..."],
  },
];

// The contact and newsletter forms collect a name and email address, which the Source A privacy
// statement does not mention. VERIFY against filed news release (confirm wording with the Company).
export const privacyFormsNote =
  "The contact and newsletter forms on this site send the details you enter to the Company so it can reply or add you to the press release list.";
