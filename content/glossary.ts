import type { GlossaryTerm } from "@/types";

// Plain-English definitions written for this site. Not legal definitions; CIM Definition
// Standards govern the formal meaning.
export const glossary: Record<string, GlossaryTerm> = {
  indicated: {
    term: "Indicated",
    definition:
      "A resource category where drilling is close enough to estimate tonnes and grade with reasonable confidence. It can support a preliminary mine plan.",
  },
  inferred: {
    term: "Inferred",
    definition:
      "The least certain resource category, based on limited drilling. Tonnes and grade are estimated but not yet confirmed.",
  },
  gpt: {
    term: "g/t",
    definition: "Grams per tonne: the grams of metal contained in each tonne of rock. One troy ounce is about 31.1 grams.",
  },
  ni43101: {
    term: "NI 43-101",
    definition:
      "National Instrument 43-101, the Canadian rule for how mining companies disclose scientific and technical information about mineral projects.",
  },
  mre: {
    term: "MRE",
    definition:
      "Mineral Resource Estimate: a formal estimate of the tonnes and grade of mineralised rock, prepared and signed by a Qualified Person.",
  },
  pea: {
    term: "PEA",
    definition:
      "Preliminary Economic Assessment: an early study of whether a deposit could be mined profitably. It can include Inferred resources and is not a feasibility study.",
  },
  vms: {
    term: "VMS",
    definition:
      "Volcanogenic massive sulfide: a deposit formed by hot fluids venting on an ancient sea floor, often rich in copper, zinc, gold and silver. Kidd Creek is one.",
  },
};

export type GlossaryKey = keyof typeof glossary;
