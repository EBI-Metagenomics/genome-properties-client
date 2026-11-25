import { links } from "@/config";
import { fillTemplate } from "@/utils/url";

export function databaseLinkHref(
  dbId: string,
  link: string,
  others?: string | null,
): string | null {
  const template = links.database[dbId];
  if (!template) {
    return null;
  }
  return fillTemplate(template, { link, others: others ?? "" });
}

export function evidenceLinkHref(id: string): string | null {
  if (id.startsWith("GO:")) {
    return fillTemplate(links.evidence.quickgo, { id });
  }
  if (id.startsWith("IPR")) {
    return fillTemplate(links.evidence.interpro, { id });
  }
  if (id.startsWith("TIGR")) {
    return fillTemplate(links.evidence.tigrfam, { id });
  }
  return null;
}

export function europePmcHref(pmid: number): string {
  return fillTemplate(links.evidence.europePmc, { pmid });
}
