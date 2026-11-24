import { LINK_DEFAULTS } from "./links";

export const APP_DEFAULTS = {
  api: "http://127.0.0.1:8000/api",
  website: "http://localhost:3000",
  githubRaw: LINK_DEFAULTS.githubRaw,
  gpAssignPath: "/v1/assign",
} as const;
