#!/bin/sh
set -e

substitute() {
  placeholder="$1"
  value="$2"
  if [ -n "$value" ]; then
    find /usr/share/nginx/html -type f \( -name '*.js' -o -name '*.html' \) -exec sed -i "s|${placeholder}|${value}|g" {} +
  fi
}

substitute 'VITE_API_URL_PLACEHOLDER' "${VITE_API_URL}"
substitute 'VITE_WEBSITE_PLACEHOLDER' "${VITE_WEBSITE}"
substitute 'VITE_GITHUB_PLACEHOLDER' "${VITE_GITHUB}"
substitute 'VITE_GP_SERVER_PLACEHOLDER' "${VITE_GP_SERVER}"

exec nginx -g 'daemon off;'
