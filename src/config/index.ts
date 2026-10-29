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

export const config = {
  api: normalizeApiBase(import.meta.env.VITE_API_URL),
  website: readEnv("VITE_WEBSITE", APP_DEFAULTS.website),
  github: readEnv("VITE_GITHUB", APP_DEFAULTS.githubRaw),
  gpServer: readEnv("VITE_GP_SERVER", APP_DEFAULTS.gpServer),
  basename: routerBasename(import.meta.env.VITE_BASENAME),
  showServiceDisruption: envFlag(import.meta.env.VITE_SHOW_SERVICE_DISRUPTION),
};

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
