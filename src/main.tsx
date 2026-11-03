import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initMatomo } from "@/analytics/matomo";
import { ensureAppBasename } from "@/config";
import "./index.css";

ensureAppBasename();
initMatomo();

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
