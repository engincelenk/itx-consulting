import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { site } from "./src/site.js";

/* Füllt {{TOKEN}} in den statischen HTML-Seiten aus src/site.js (Firmenname, Domains, Impressum). */
const owner = "Engin Celenk";
const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const tokens = {
  FREELANCE_TITLE: site.hasCompany ? `${esc(site.company)} · Freelance` : `${owner} · Freelance`,
  FREELANCE_ORIGIN: site.freelanceOrigin,
  CV_ORIGIN: site.cvOrigin,
  LEGAL_TITLE: esc(site.hasCompany ? site.company : owner),
  IMPRINT_DE: site.hasCompany ? `${esc(site.company)}<br>Inhaber: ${owner}` : owner,
  IMPRINT_EN: site.hasCompany ? `${esc(site.company)}<br>Owner: ${owner}` : owner,
  CONTROLLER_DE: site.hasCompany ? `${esc(site.company)}, Inhaber ${owner}` : owner,
  CONTROLLER_EN: site.hasCompany ? `${esc(site.company)}, owner ${owner}` : owner
};

const siteTokens = () => ({
  name: "site-tokens",
  transformIndexHtml: html => html.replace(/\{\{([A-Z_]+)\}\}/g, (m, k) => tokens[k] ?? m)
});

export default defineConfig({
  plugins: [react(), siteTokens()],
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        portfolio: resolve(__dirname, "cv/index.html"),
        cvprint: resolve(__dirname, "cv/print.html"),
        legal: resolve(__dirname, "legal.html"),
        link: resolve(__dirname, "link.html"),
        techcheck: resolve(__dirname, "tech-check.html")
      }
    }
  }
});
