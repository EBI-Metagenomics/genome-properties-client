export function readEnv(key: string, fallback: string): string {
  const value = (import.meta.env as Record<string, string | undefined>)[key];
  if (
    typeof value === "string" &&
    value.trim() &&
    !value.includes("_PLACEHOLDER")
  ) {
    return value.trim();
  }
  return fallback;
}

export function envFlag(raw: string | undefined): boolean {
  return ["true", "1", "yes"].includes((raw || "").trim().toLowerCase());
}
