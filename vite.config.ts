import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

function publicBase(raw: string | undefined): string {
  const base = raw && raw.length > 0 ? raw : "/";
  if (base === "/" || base === "./") {
    return base;
  }
  return base.endsWith("/") ? base : `${base}/`;
}

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: publicBase(process.env.VITE_BASENAME),
  define: {
    "globalThis.__DEV__": JSON.stringify(mode !== "production"),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3000,
    host: "127.0.0.1",
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
}));
