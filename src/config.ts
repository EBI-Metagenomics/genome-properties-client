function routerBasename(raw: string | undefined): string {
  const value = raw || "/";
  if (value === "/") {
    return "/";
  }
  return value.replace(/\/+$/, "") || "/";
}

function envFlag(raw: string | undefined): boolean {
  return ["true", "1", "yes"].includes((raw || "").trim().toLowerCase());
}

export const config = {
  api: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/graphql/",
  website: import.meta.env.VITE_WEBSITE || "http://localhost:3000",
  github:
    import.meta.env.VITE_GITHUB ||
    "https://raw.githubusercontent.com/ebi-pf-team/genome-properties/master",
  gpServer:
    import.meta.env.VITE_GP_SERVER ||
    "https://wwwdev.ebi.ac.uk/interpro/genomeproperties/cgi-bin/test.pl",
  basename: routerBasename(import.meta.env.VITE_BASENAME),
  showServiceDisruption: envFlag(import.meta.env.VITE_SHOW_SERVICE_DISRUPTION),
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
