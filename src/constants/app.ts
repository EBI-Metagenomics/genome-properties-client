import { LINK_DEFAULTS } from "./links";

export const APP_DEFAULTS = {
  api: "http://127.0.0.1:8000/api",
  website: "http://localhost:3000",
  githubRaw: LINK_DEFAULTS.githubRaw,
  gpServer:
    "https://wwwdev.ebi.ac.uk/interpro/genomeproperties/cgi-bin/test.pl",
} as const;
