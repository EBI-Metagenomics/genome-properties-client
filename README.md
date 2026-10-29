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

1. Edit `genome-properties/base/frontend/links.env` (shared defaults) or the overlay `gp-frontend-configmap` merge literals
2. Apply the ConfigMap and restart the portal pod

A **new** URL key also needs a matching placeholder in the client image (`src/constants/links.ts`, `Dockerfile`, then rebuild).

Template URLs (KEGG, IUBMB, InterPro, …) use `{link}`, `{others}`, `{id}`, or `{pmid}`.
