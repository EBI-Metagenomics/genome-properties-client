#!/bin/sh
set -e

substitute() {
  placeholder="$1"
  value="$2"
  if [ -n "$value" ]; then
    find /usr/share/nginx/html -type f \( -name '*.js' -o -name '*.html' \) -exec sed -i "s|${placeholder}|${value}|g" {} +
  fi
}

substitute_env() {
  name="$1"
  eval "value=\${$name-}"
  substitute "${name}_PLACEHOLDER" "$value"
}

# Any VITE_* value from the ConfigMap is written into the built JS. New keys
# still need a matching placeholder in the image (rebuild) the first time.
for name in $(printenv | awk -F= '/^VITE_/ {print $1}'); do
  case "$name" in
    VITE_BASENAME)
      ;;
    VITE_API_URL)
      api_url="${VITE_API_URL%/}"
      case "$api_url" in
        */graphql) api_url="${api_url%/graphql}" ;;
      esac
      substitute "VITE_API_URL_PLACEHOLDER" "$api_url"
      ;;
    *)
      substitute_env "$name"
      ;;
  esac
done

exec nginx -g 'daemon off;'
