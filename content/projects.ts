import type { Project } from "@/types";

// Wording from Source A project pages (fetched 2026-11-03); figures from Source B (prompt section 13)
// where the two differ. Lines marked VERIFY carry a Source A / Source B conflict.

export const projects: Project[] = [
  {
    slug: "tully",
    number: "01",
    name: "Tully",
    tagline: "High-grade underground gold in the heart of the Timmins camp",
    // Source A: "25 km northeast" (Tully page) and "north-northeast" (home). Source B: NNE/NE.
    location: "25 km NNE of Timmins",
    areaHa: 458,
    claims: "One leased mining claim and 11 patented mining claims",
    metals: ["Au"],
    metalsLabel: "Gold",
    stage: "Resource estimate, PEA underway",
    ownership: "100% owned",
    summary:
      "A high-grade underground gold project 25 km northeast of Timmins, with a 2026 NI 43-101 Mineral Resource Estimate complete and a Preliminary Economic Assessment targeted for December 2026.",
    overview: [
      "Tully is located approximately 25 km northeast of Timmins, within the Timmins-Porcupine Gold Camp, which includes the Dome and Hollinger mines. The project is approximately 2 km southwest of the Bradshaw Gold Project of Gowest Gold Ltd.",
      "The 458-hectare property includes one leased mining claim and 11 patented mining claims.",
    ],
    status: [
      "Mineral Resource Estimate completed, July 2026",
      "Preliminary Economic Assessment underway, December 2026 target",
      "Permitting activities underway",
    ],
    geology: [
      "Prospective structures splay off the Porcupine-Destor Fault through the Tully area. Mineralisation at Tully occurs within a 30 m wide mafic volcanic unit with an approximate west-southwest strike and steep northerly dip. The hanging wall consists of sedimentary rocks and the footwall consists of ultramafic rocks.",
      "As currently understood, the deposit comprises an array of shallowly inclined quartz-carbonate veins or lenses stacked 'ladder-style' within the volcanic rocks and constrained by its hanging wall and footwall contacts. The higher-grade core of the deposit extends over 600 m along strike and 400 m down dip, and plunges moderately toward the east-northeast. The mineralised veins/lenses host gold primarily within irregular pyrite clusters and also commonly as free visible gold.",
      "The Tully property occurs within a swampy area and is covered by a blanket of glacial drift, averaging 30 m thickness, which hid the deposit from early explorers; thus, the geology is entirely derived from drillhole and geophysical data.",
    ],
    highlights: [
      { value: "164,000 oz", label: "Indicated, 1.62 Mt at 3.16 g/t Au" },
      { value: "62,000 oz", label: "Inferred, 0.95 Mt at 2.03 g/t Au" },
      { value: "1.1 g/t Au", label: "Cut-off, effective June 15, 2026" },
    ],
    hasResource: true,
    qualifiedPerson:
      'Curtis Ferron, P.Geo. (ON), independent consultant for Loyalist, who is a "Qualified Person" as defined by NI 43-101, has reviewed and approved the technical content of this page.',
    map: { x: 240, y: 130, direction: "NNE", distanceKm: 25, labelSide: "right" },
  },
  {
    slug: "loveland",
    number: "02",
    name: "Loveland",
    tagline: "High-grade gold, copper and nickel exploration",
    location: "45 km by road NW of Timmins",
    // VERIFY against filed news release: Source A lists 292 claims / 6,244 ha, but the April 13, 2026
    // release reports 26 additional contiguous claims in Loveland Township.
    areaHa: 6244,
    claims: "292 contiguous mineral claims over a 10 km exploration corridor",
    metals: ["Au", "Cu", "Ni"],
    metalsLabel: "Gold, copper, nickel",
    stage: "Exploration, NI 43-101 report filed",
    // VERIFY against filed news release: Source B says option/JV; Source A (June 30, 2025 release title)
    // says Loyalist closed the purchase of the Loveland Project.
    ownership: "Option / joint venture",
    summary:
      "A known volcanogenic massive sulfide (VMS) gold, copper and nickel system 45 km northwest of Timmins within the Abitibi Greenstone Belt, featuring historic drilling, surface showings and year-round road access.",
    overview: [
      "The Loveland Property is located in Byers, Loveland, Thorburn, and Moberly townships, in the Porcupine Mining Division. The Property lies within the southwest portion of the prolific Abitibi Greenstone Belt of the Archean Superior Province.",
      "292 contiguous mineral claims for a total area of 6,244 hectares (15,430 acres), open along strike and at depth, forming an exploration corridor with a 10 km strike length.",
    ],
    status: ["NI 43-101 technical report by Caracle Creek, April 2026", "Planning 2026 exploration program"],
    geology: [
      "The local geology consists of intercalated mafic to intermediate volcanic flows. These flows are locally intruded by feldspar porphyries and gabbro. The gabbroic rocks have similarities to the Kamiskotia gabbroic complex.",
      "Gold mineralization was intersected in holes drilled by Amador Gold Corp. to a depth of 300 m below the historical Cominco Zone deposit in 2007-2009. Gold-bearing arsenopyrite and pyrite mineralization was encountered in sections of silicified granodiorite. The reported lengths of gold intersections are core lengths and not true lengths which are currently unknown.",
      "The results from Amador's drilling suggest the presence of a system of gold enrichment within the granodiorite. Additional exploration will be required to determine the orientation and extent of the gold-enriched zone.",
    ],
    highlights: [
      { value: "6.37 g/t Au", label: "Over 8.55 m in hole LL08-13 (383.25 m to 391.8 m down-hole)" },
      { value: "8.98 and 11.48 g/t Au", label: "Surface grab samples about 400 m southeast of the historical Cominco Zone" },
      { value: "10 km", label: "Exploration corridor, open along strike and at depth" },
    ],
    hasResource: false,
    qualifiedPerson:
      'Curtis Ferron, P.Geo. (ON), independent consultant for Loyalist, who is a "Qualified Person" as defined by NI 43-101, has reviewed and approved the technical content of the page.',
    historicalNote:
      "The Hollinger and Cominco zone historical mineral resource estimates are unclassified and do not comply with CIM Definition Standards on Mineral Resources and Mineral Reserves as required by NI 43-101. A qualified person has not done sufficient work to classify these historical estimates as current mineral resources and the Company is not treating them as current estimates.",
    map: { x: 92, y: 112, direction: "NW", distanceKm: 45, labelSide: "right" },
  },
  {
    slug: "gold-rush",
    number: "03",
    name: "Gold Rush",
    tagline: "Potential extension of a known gold trend",
    location: "30 km W of Timmins",
    areaHa: 820,
    claims: "41 claims",
    // Source B: Au/Ag. Source A: VMS gold, copper and nickel potential.
    metals: ["Au", "Ag"],
    metalsLabel: "Gold, silver",
    stage: "Target generation",
    // VERIFY against filed news release: Source B and the Source A project page say option to 100%;
    // the June 8, 2026 release title reports exercise of the Gold Rush option agreement.
    ownership: "Option to 100%",
    summary:
      "Gold Rush spans 820 hectares west of Timmins and targets gold, copper and nickel VMS mineralization. Multiple high-grade zones have been defined through drilling, channel sampling and geophysics.",
    overview: [
      "The Gold Rush Property is located approximately 30 kilometres west of Timmins and consists of 41 claims totaling 820 hectares. Historical work has identified multiple target areas, including the North Shaft Zone, North Vein Area, and Mid-Point Area.",
      "A total of 15 drill holes have been completed on the property, with the best reported intercept returning 2.08 grams per tonne gold and 11.5 grams per tonne silver over 1 metre.",
    ],
    status: ["Planning 2026 exploration program"],
    geology: [
      "High-grade gold has been encountered in surface grab samples, including values up to 27.3 grams per tonne gold from the North Shaft Zone and 11.2 grams per tonne gold from the North Vein Area, where seven samples exceeded 1 gram per tonne gold.",
    ],
    highlights: [
      { value: "27.3 g/t Au", label: "Surface grab sample, North Shaft Zone" },
      { value: "11.2 g/t Au", label: "Surface grab sample, North Vein Area" },
      { value: "15 holes", label: "Best intercept 2.08 g/t Au and 11.5 g/t Ag over 1 m" },
    ],
    hasResource: false,
    qualifiedPerson:
      'Curtis Ferron, P.Geo. (ON), independent consultant for Loyalist, who is a "Qualified Person" as defined by NI 43-101, has reviewed and approved the technical content of the page.',
    map: { x: 70, y: 214, direction: "W", distanceKm: 30, labelSide: "right" },
  },
  {
    slug: "desantis",
    number: "04",
    name: "DeSantis",
    tagline: "Past-producing gold mine on the Destor-Porcupine Deformation Zone",
    location: "4.5 km SW of Timmins",
    areaHa: 850,
    claims: "Nearly 5 km of strike along the Destor-Porcupine Deformation Zone",
    metals: ["Au"],
    metalsLabel: "Gold",
    stage: "Data compilation",
    // TODO(content): ownership not stated on Source A or B beyond "closing of the acquisition" (Feb 26, 2026 release).
    ownership: "Acquired February 2026",
    summary:
      "A past-producing gold mine covering 850 hectares along the Destor-Porcupine Deformation Zone, 4.5 km southwest of Timmins, with historical production of 35,784 oz Au and high-grade historical resource estimates.",
    overview: [
      "The DeSantis Gold Project is located approximately 4.5 km southwest of Timmins, Ontario, within the Timmins-Porcupine Gold Camp. The property encompasses approximately 850 hectares and covers nearly 5 km of strike length along the northern side of the Destor-Porcupine Deformation Zone (DPDZ), one of Canada's most significant gold-bearing structural corridors.",
      "The DeSantis Mine operated intermittently between 1926 and 1943, producing 35,784 ounces of gold, 3,142 ounces of silver, and 193 pounds of scheelite from 196,928 tons of ore grading an average 0.19 oz/t Au (6.2 g/t Au).",
    ],
    status: ["Compiling and reviewing historical exploration data to support the planning of the next diamond drill program"],
    geology: [
      "The property is underlain by Archean volcanic and sedimentary rocks of the Abitibi Greenstone Belt, including mafic volcanic flows, intermediate pillowed volcanic rocks, quartz-feldspar porphyry dikes, and sedimentary rocks of the Porcupine Group comprising greywacke and slate.",
      "Gold mineralization is associated with broad hydrothermal alteration zones reaching widths of up to 46 metres, characterized by silicification, pyritization, tourmalinization, chlorite, sericite, carbonate, albite, and iron-oxide alteration. Mesothermal gold and silver mineralization occurs within quartz veins containing pyrite, galena, sphalerite, chalcopyrite, and scheelite.",
      "In April 2026 the Company completed a preliminary review of a historical database comprising 488 drill holes totaling 101,945.4 m and 21,158 gold assays. Six priority targets were identified in and around the historical DeSantis Mine workings, plus an additional target on the McEnaney claims to the east.",
    ],
    highlights: [
      { value: "35,784 oz Au", label: "Historical production, 1926 to 1943" },
      { value: "6.2 g/t Au", label: "Average historical head grade (0.19 oz/t)" },
      { value: "488 holes", label: "Historical database reviewed in April 2026, six priority targets" },
    ],
    hasResource: false,
    qualifiedPerson:
      'Curtis Ferron, P.Geo. (ON), principal geology consultant for Loyalist, who is a "Qualified Person" as defined by NI 43-101, has reviewed and approved the technical content of this page.',
    historicalNote:
      "The historical Mineral Resource Estimate on the DeSantis Property is unclassified and does not comply with CIM Definition Standards on Mineral Resources and Mineral Reserves as required by NI 43-101. A qualified person has not done sufficient work to classify this historical MRE as current mineral resources, and the Company is not treating it as a current estimate.",
    map: { x: 178, y: 240, direction: "SW", distanceKm: 4.5, labelSide: "left" },
  },
];

/** Source B: "about 8,300 ha" across the four projects. */
export const portfolioAreaLabel = "About 8,300 ha";

// Schematic map anchors (viewBox 0 0 320 320). Relative positions only, not to scale.
export const mapAnchors = {
  timmins: { x: 196, y: 214, label: "Timmins", coordinates: "48.48° N 81.33° W" },
  kiddCreek: { x: 176, y: 122, label: "Kidd Creek Mine" },
};

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
