import { APP_DEFAULTS } from "@/constants/app";
import {
  DATABASE_LINK_KEYS,
  LINK_DEFAULTS,
  LINK_ENV_KEYS,
  type LinkName,
} from "@/constants";
import { envFlag, readEnv } from "@/utils/env";
import { normalizeApiBase, routerBasename } from "@/utils/url";

function link(name: LinkName): string {
  return readEnv(LINK_ENV_KEYS[name], LINK_DEFAULTS[name]);
}

const resolved = Object.fromEntries(
  (Object.keys(LINK_ENV_KEYS) as LinkName[]).map((name) => [name, link(name)]),
) as Record<LinkName, string>;

const DEFAULT_MATOMO_URL = "https://ebi-mgnify.matomo.cloud";
const DEFAULT_MATOMO_SCRIPT_URL =
  "https://cdn.matomo.cloud/ebi-mgnify.matomo.cloud/matomo.js";

export type MatomoConfig = {
  enabled: boolean;
  url: string;
  siteId: string;
  scriptUrl: string;
};

export const config = {
  api: normalizeApiBase(import.meta.env.VITE_API_URL),
  website: readEnv("VITE_WEBSITE", APP_DEFAULTS.website),
  github: readEnv("VITE_GITHUB", APP_DEFAULTS.githubRaw),
  gpServer: readEnv("VITE_GP_SERVER", APP_DEFAULTS.gpServer),
  basename: routerBasename(import.meta.env.VITE_BASENAME),
  showServiceDisruption: envFlag(import.meta.env.VITE_SHOW_SERVICE_DISRUPTION),
};

/** Matomo is off unless explicitly enabled; URL falls back to the MGnify cloud tracker. */
export function getMatomoConfig(): MatomoConfig {
  const url = readEnv("VITE_MATOMO_URL", DEFAULT_MATOMO_URL).replace(/\/$/, "");
  const siteId = readEnv("VITE_MATOMO_SITE_ID", "");
  const scriptUrl = readEnv(
    "VITE_MATOMO_SCRIPT_URL",
    DEFAULT_MATOMO_SCRIPT_URL,
  );
  return {
    enabled: envFlag(import.meta.env.VITE_MATOMO_ENABLED),
    url,
    siteId,
    scriptUrl,
  };
}

export function isMatomoEnabled(): boolean {
  const { enabled, url, siteId } = getMatomoConfig();
  return enabled && url.length > 0 && siteId.length > 0;
}

export const links = {
  ...resolved,
  database: Object.fromEntries(
    Object.entries(DATABASE_LINK_KEYS).map(([dbId, name]) => [
      dbId,
      resolved[name],
    ]),
  ) as Record<string, string>,
  evidence: {
    quickgo: resolved.quickgo,
    interpro: resolved.interproEntry,
    tigrfam: resolved.tigrfam,
    europePmc: resolved.europePmc,
  },
};

export function ensureAppBasename(): void {
  const basename = config.basename;
  if (basename === "/") {
    return;
  }
  const { pathname, search, hash } = window.location;
  if (pathname === basename || pathname.startsWith(`${basename}/`)) {
    return;
  }
  const suffix = pathname === "/" ? "/" : pathname;
  window.location.replace(`${basename}${suffix}${search}${hash}`);
}
