# Genome Properties client

React 18 + TypeScript + Vite UI for Genome Properties.

## Local setup

```bash
nvm use 22
npm install
cp .env.example .env
npm start
```

The app expects the REST API at `VITE_API_URL` (default `http://127.0.0.1:8000/api`). Paths are `/v1/...`; Swagger is at `/v1/docs`.

### Matomo analytics

Direct Matomo JS tracker (`_paq`) only — **Matomo Tag Manager is not used**. Tracking is off unless enabled, and pageviews/events fire only after cookie consent.

- `VITE_MATOMO_ENABLED` — master switch (`false` by default)
- `VITE_MATOMO_URL` — tracker base (default `https://ebi-mgnify.matomo.cloud/`)
- `VITE_MATOMO_SITE_ID` — site ID (required when enabled; do not reuse another product's ID)
- `VITE_MATOMO_SCRIPT_URL` — optional CDN override for `matomo.js`

Custom events live in `src/analytics/` (`property_open`, `browse_type`, `viewer_open`, `viewer_species_select`, `viewer_file_upload`).

## Source layout

- `src/pages` — route screens
- `src/components` — shared UI
- `src/api` — REST client and response types
- `src/config` — runtime config assembled from env
- `src/constants` — default URLs and app defaults
- `src/utils` — env, URL, and link helpers
- `src/data` — static fixtures

External URLs are defined in `src/constants/links.ts` and read through `src/utils/links.ts` / `src/config`. Components should import `links` or the href helpers rather than hardcoding URLs.

## Docker / Kubernetes

Vite inlines env at build time. The image is built with `VITE_*_PLACEHOLDER` values; `docker-entrypoint.sh` replaces them from the container environment at start.

The frontend Deployment uses `envFrom` on `gp-frontend-configmap`. Changing an existing URL is:

1. Shared docs/database links: `genome-properties/base/frontend/links.env`
2. Per-environment values (API, website, Matomo, GitHub raw, GP server): the overlay `gp-frontend-configmap` merge literals in `overlays/dev` or `overlays/prod`
3. Apply the ConfigMap and restart the portal pod

A **new** URL key also needs a matching placeholder in the client image (`src/constants/links.ts`, `Dockerfile`, then rebuild).

Template URLs (KEGG, IUBMB, InterPro, …) use `{link}`, `{others}`, `{id}`, or `{pmid}`.
