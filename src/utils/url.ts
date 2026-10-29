import { APP_DEFAULTS } from "@/constants/app";

export function routerBasename(raw: string | undefined): string {
  const value = raw || "/";
  if (value === "/") {
    return "/";
  }
  return value.replace(/\/+$/, "") || "/";
}

export function normalizeApiBase(raw: string | undefined): string {
  return (raw || APP_DEFAULTS.api)
    .trim()
    .replace(/\/+$/, "")
    .replace(/\/graphql$/i, "");
}

export function joinUrl(base: string, path: string): string {
  const root = base.replace(/\/+$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${root}${suffix}`;
}

export function fillTemplate(
  template: string,
  values: Record<string, string | number | null | undefined>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    String(values[key] ?? ""),
  );
}
