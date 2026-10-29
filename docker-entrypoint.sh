#!/bin/sh
set -e

substitute() {
  placeholder="$1"
  value="$2"
  if [ -n "$value" ]; then
    find /usr/share/nginx/html -type f \( -name '*.js' -o -name '*.html' \) -exec sed -i "s|${placeholder}|${value}|g" {} +
  fi
}

api_url="${VITE_API_URL%/}"
case "$api_url" in
  */graphql) api_url="${api_url%/graphql}" ;;
esac
substitute 'VITE_API_URL_PLACEHOLDER' "${api_url}"
substitute 'VITE_WEBSITE_PLACEHOLDER' "${VITE_WEBSITE}"
substitute 'VITE_GITHUB_PLACEHOLDER' "${VITE_GITHUB}"
substitute 'VITE_GP_SERVER_PLACEHOLDER' "${VITE_GP_SERVER}"
substitute 'VITE_SHOW_SERVICE_DISRUPTION_PLACEHOLDER' "${VITE_SHOW_SERVICE_DISRUPTION}"

exec nginx -g 'daemon off;'
