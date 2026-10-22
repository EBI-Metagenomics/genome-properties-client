FROM node:22-alpine AS build

WORKDIR /app

ARG VITE_BASENAME=/
ENV VITE_BASENAME=$VITE_BASENAME
ENV NODE_OPTIONS="--max-old-space-size=4096"

COPY package.json package-lock.json* /app/
RUN npm ci --legacy-peer-deps

COPY . /app
RUN VITE_API_URL="VITE_API_URL_PLACEHOLDER" \
    VITE_WEBSITE="VITE_WEBSITE_PLACEHOLDER" \
    VITE_GITHUB="VITE_GITHUB_PLACEHOLDER" \
    VITE_GP_SERVER="VITE_GP_SERVER_PLACEHOLDER" \
    VITE_BASENAME="$VITE_BASENAME" \
    npm run build

FROM nginx:stable-alpine AS runtime

COPY --from=build --chown=nginx:nginx /app/dist /usr/share/nginx/html
COPY docker-entrypoint.sh /docker-entrypoint.sh
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chmod +x /docker-entrypoint.sh \
    && chown -R nginx:nginx /usr/share/nginx/html /docker-entrypoint.sh \
    && chown -R nginx:nginx /var/cache/nginx /var/log/nginx /etc/nginx/conf.d \
    && touch /var/run/nginx.pid \
    && chown nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 8000

ENTRYPOINT ["/docker-entrypoint.sh"]
