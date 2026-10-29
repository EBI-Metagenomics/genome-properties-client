# Genome Properties client

React 18 + TypeScript + Vite UI for Genome Properties.

## Local setup

```bash
nvm use 22
npm install
cp .env.example .env
npm start
```

The app expects the REST API at `VITE_API_URL` (default `http://127.0.0.1:8000`).

## Docker

Runtime configuration is injected from Kubernetes env vars via `docker-entrypoint.sh` (same placeholder pattern as METT):

- `VITE_API_URL`
- `VITE_WEBSITE`
- `VITE_GITHUB`
- `VITE_GP_SERVER`
- `VITE_SHOW_SERVICE_DISRUPTION` (`true` / `false`)
- `VITE_BASENAME` (build arg)
