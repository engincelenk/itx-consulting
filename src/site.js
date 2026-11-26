/* ------------------------------------------------------------------
   Zentrale Firmen- und Domain-Einstellungen.
   Sobald das Kleingewerbe angemeldet ist, reicht es, `company` einzutragen.
   Leer = persönliches Portfolio ohne Firmennamen.

   Mit Firmenname:
   - Freelance-Seite tritt unter dem Firmennamen auf (Titel, Kopf, Footer, Impressum)
   - Freelance-Seite ist die Startseite der Firmen-Domain  (https://<domain>/)
   - der Lebenslauf liegt unter                            (https://<domain>/cv/)
------------------------------------------------------------------- */

const company = "ITx Consulting";   // z. B. "Muster IT Consulting"
const domain = "www.itx-consulting.de";  // leer = aus dem Firmennamen abgeleitet
const live = true;    // eigene Domain seit 26.11.2026

const slug = s => s.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
  .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const host = live ? (domain.trim() || (company.trim() ? `${slug(company)}.de` : "")) : "";
const fallback = "www.itx-consulting.de"; // gilt, wenn host leer ist

/* Aufbau: Startseite (/) = Freelance, Lebenslauf/Portfolio unter /cv/ (gleiche Domain). */
const origin = `https://${host || fallback}`;

export const slogan = "Connect. Secure. Manage. Engineer.";

export const site = {
  company: company.trim(),
  hasCompany: Boolean(company.trim()),
  /** Eigene Domain aktiv (live = true)? */
  hasDomain: Boolean(host),
  freelanceHost: host || fallback,
  freelanceOrigin: origin,
  cvOrigin: `${origin}/cv`
};

/* Links zwischen den beiden Seiten (relativ, funktioniert auf jeder Domain). */
export const freelanceUrl = lang => `/?lang=${lang}`;
export const cvUrl = lang => `/cv/?lang=${lang}`;
