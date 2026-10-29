/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_BASENAME: string;
  readonly VITE_WEBSITE: string;
  readonly VITE_GITHUB: string;
  readonly VITE_GP_SERVER: string;
  readonly VITE_SHOW_SERVICE_DISRUPTION: string;
  readonly VITE_URL_INTERPROSCAN: string;
  readonly VITE_URL_GITHUB_REPO: string;
  readonly VITE_URL_PROTEOME_LIST: string;
  readonly VITE_URL_GITHUB_README: string;
  readonly VITE_URL_FLATFILE_DOCS: string;
  readonly VITE_URL_READTHEDOCS: string;
  readonly VITE_URL_TRAINING_QUICK_TOUR: string;
  readonly VITE_URL_TRAINING_TUTORIAL: string;
  readonly VITE_URL_KEGG: string;
  readonly VITE_URL_IUBMB: string;
  readonly VITE_URL_METACYC: string;
  readonly VITE_URL_COMPLEX_PORTAL: string;
  readonly VITE_URL_PDBE: string;
  readonly VITE_URL_QUICKGO: string;
  readonly VITE_URL_INTERPRO_ENTRY: string;
  readonly VITE_URL_TIGRFAM: string;
  readonly VITE_URL_EUROPEPMC: string;
  readonly VITE_URL_STATUS_PAGE: string;
  readonly VITE_URL_PAPER_NAR: string;
  readonly VITE_URL_PUBMED_NAR: string;
  readonly VITE_URL_PAPER_BIOINFORMATICS: string;
  readonly VITE_URL_PAPER_NAR_2013: string;
  readonly VITE_URL_EMBL: string;
  readonly VITE_URL_BBSRC: string;
  readonly VITE_URL_NSF: string;
  readonly VITE_CONTACT_EMAIL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "genome-properties-viewer" {
  const gpv: {
    d3: any;
    GenomePropertiesViewer: new (options: Record<string, unknown>) => any;
    uploadLocalGPFile?: unknown;
  };
  export default gpv;
}

declare module "*.jpg";
declare module "*.png";
declare module "*.css";

interface Window {
  viewer?: unknown;
}
