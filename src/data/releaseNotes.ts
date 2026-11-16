export type ReleaseContent = {
  total: number;
  newlyAdded: number;
};

export type ReleaseNotes = {
  version: string;
  releaseDate: string;
  interProScanVersion: string;
  count: {
    genomeProperties: number;
    proteomes: number;
  };
  additionalInfo: string;
  releaseContent: Record<string, ReleaseContent>;
};

export const releaseNotes: ReleaseNotes = {
  version: "v2.0",
  releaseDate: "August 2018",
  interProScanVersion: "5.30-69.0",
  count: {
    genomeProperties: 1286,
    proteomes: 219,
  },
  additionalInfo:
    "Major new additions in this release include automatically generated properties from MetaCyc as well as E.coli complexes from the Complex Portal.",
  releaseContent: {
    pathway: { total: 664, newlyAdded: 536 },
    metapath: { total: 60, newlyAdded: 13 },
    system: { total: 327, newlyAdded: 5 },
    guild: { total: 16, newlyAdded: 2 },
    complex: { total: 132, newlyAdded: 132 },
    category: { total: 87, newlyAdded: 18 },
  },
};
