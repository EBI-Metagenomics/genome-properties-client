import { GP_ANALYTICS_CATEGORY } from "./constants";
import { trackEvent } from "./matomo";

export function trackPropertyOpen(accession: string): void {
  trackEvent(GP_ANALYTICS_CATEGORY, "property_open", accession);
}

export function trackBrowseType(type: string): void {
  trackEvent(GP_ANALYTICS_CATEGORY, "browse_type", type);
}

export function trackViewerOpen(): void {
  trackEvent(GP_ANALYTICS_CATEGORY, "viewer_open");
}

export function trackViewerSpeciesSelect(taxId: string): void {
  trackEvent(GP_ANALYTICS_CATEGORY, "viewer_species_select", taxId);
}

export function trackViewerFileUpload(fileCount: number): void {
  trackEvent(GP_ANALYTICS_CATEGORY, "viewer_file_upload", "files", fileCount);
}
