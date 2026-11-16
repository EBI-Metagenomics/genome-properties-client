export const LINK_DEFAULTS = {
  interproscan: "https://www.ebi.ac.uk/interpro/interproscan.html",
  githubRepo: "https://github.com/ebi-pf-team/genome-properties",
  githubRaw:
    "https://raw.githubusercontent.com/ebi-pf-team/genome-properties/master",
  proteomeList:
    "https://github.com/ebi-pf-team/genome-properties/blob/master/flatfiles/proteome_list.csv",
  githubReadme:
    "https://github.com/ebi-pf-team/genome-properties/blob/master/README.md",
  flatfileDocs:
    "https://genome-properties.readthedocs.io/en/latest/flatfile.html",
  readthedocs: "https://genome-properties.readthedocs.io/en/latest/index.html",
  trainingQuickTour:
    "https://www.ebi.ac.uk/training/online/course/genome-properties-quick-tour",
  trainingTutorial:
    "https://www.ebi.ac.uk/training/online/course/genome-properties-tutorial",
  kegg: "https://www.genome.jp/dbget-bin/www_bget?pathway:{link}",
  iubmb: "https://www.chem.qmul.ac.uk/iubmb/enzyme/reaction/{link}/{others}.html",
  metacyc: "https://metacyc.org/META/NEW-IMAGE?type=NIL&object={link}",
  complexPortal: "https://www.ebi.ac.uk/complexportal/complex/{link}",
  pdbe: "https://www.ebi.ac.uk/pdbe/entry/pdb/{link}",
  quickgo: "https://www.ebi.ac.uk/QuickGO/GTerm?id={id}",
  interproEntry: "https://www.ebi.ac.uk/interpro/entry/{id}",
  tigrfam: "https://www.jcvi.org/cgi-bin/tigrfams/HmmReportPage.cgi?acc={id}",
  europePmc: "https://europepmc.org/abstract/MED/{pmid}",
  statusPage: "https://genomes-properties.cronitorstatus.com/",
  paperNar: "https://doi.org/10.1093/nar/gky1013",
  pubmedNar: "https://pubmed.ncbi.nlm.nih.gov/30364992/",
  paperBioinformatics: "https://doi.org/10.1093/bioinformatics/bti015",
  paperNar2013: "https://doi.org/10.1093/nar/gks1234",
  embl: "https://www.embl.org",
  bbsrc: "https://www.ukri.org/councils/bbsrc/",
  nsf: "https://www.nsf.gov",
  contactEmail: "mailto:GenProp@ebi.ac.uk",
} as const;

export const LINK_ENV_KEYS = {
  interproscan: "VITE_URL_INTERPROSCAN",
  githubRepo: "VITE_URL_GITHUB_REPO",
  proteomeList: "VITE_URL_PROTEOME_LIST",
  githubReadme: "VITE_URL_GITHUB_README",
  flatfileDocs: "VITE_URL_FLATFILE_DOCS",
  readthedocs: "VITE_URL_READTHEDOCS",
  trainingQuickTour: "VITE_URL_TRAINING_QUICK_TOUR",
  trainingTutorial: "VITE_URL_TRAINING_TUTORIAL",
  kegg: "VITE_URL_KEGG",
  iubmb: "VITE_URL_IUBMB",
  metacyc: "VITE_URL_METACYC",
  complexPortal: "VITE_URL_COMPLEX_PORTAL",
  pdbe: "VITE_URL_PDBE",
  quickgo: "VITE_URL_QUICKGO",
  interproEntry: "VITE_URL_INTERPRO_ENTRY",
  tigrfam: "VITE_URL_TIGRFAM",
  europePmc: "VITE_URL_EUROPEPMC",
  statusPage: "VITE_URL_STATUS_PAGE",
  paperNar: "VITE_URL_PAPER_NAR",
  pubmedNar: "VITE_URL_PUBMED_NAR",
  paperBioinformatics: "VITE_URL_PAPER_BIOINFORMATICS",
  paperNar2013: "VITE_URL_PAPER_NAR_2013",
  embl: "VITE_URL_EMBL",
  bbsrc: "VITE_URL_BBSRC",
  nsf: "VITE_URL_NSF",
  contactEmail: "VITE_CONTACT_EMAIL",
} as const;

export type LinkName = keyof typeof LINK_ENV_KEYS;

export const LINK_ENV_VAR_NAMES = Object.values(LINK_ENV_KEYS);

export const DATABASE_LINK_KEYS = {
  KEGG: "kegg",
  IUBMB: "iubmb",
  MetaCyc: "metacyc",
  "Complex Portal": "complexPortal",
  PDBe: "pdbe",
} as const;
