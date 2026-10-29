export type HierarchyNode = {
  accession: string;
  description: string;
  children?: HierarchyNode[];
};

export type GenomePropertySummary = {
  accession: string;
  description: string;
};

export type StepEvidence = {
  interproAcc: string;
  signatureAcc: string;
  goId: string | null;
};

export type GenomePropertyDetail = {
  accession: string;
  type: string;
  author: string;
  description: string;
  threshold: number;
  comment: string | null;
  literature: Array<{
    pmid: number;
    title: string | null;
    author: string | null;
    journal: string | null;
    listOrder: number;
  }>;
  databaseLinks: Array<{
    dbId: string;
    dbLink: string;
    comment: string | null;
    otherParams: string | null;
  }>;
  steps: Array<{
    stepId: string;
    stepNumber: number;
    required: number;
    childAccession: string | null;
    evidence: StepEvidence[];
  }>;
};
