/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_BASENAME: string;
  readonly VITE_WEBSITE: string;
  readonly VITE_GITHUB: string;
  readonly VITE_GP_SERVER: string;
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
