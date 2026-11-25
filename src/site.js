/* ------------------------------------------------------------------
   Zentrale Firmen- und Domain-Einstellungen.
   Sobald das Kleingewerbe angemeldet ist, reicht es, `company` einzutragen.
   Leer = Seite bleibt wie bisher (persönliches Portfolio, ec.immofuchs.info).

   Mit Firmenname:
   - Freelance-Seite tritt unter dem Firmennamen auf (Titel, Kopf, Footer, Impressum)
   - Freelance-Seite ist die Startseite der Firmen-Domain  (https://<domain>/)
   - der Lebenslauf liegt unter                            (https://<domain>/cv/)
------------------------------------------------------------------- */

const company = "ITX Consulting";   // z. B. "Muster IT Consulting"
const domain = "";    // optional; leer = aus dem Firmennamen abgeleitet (itx-consulting.de)
const live = false;   // true, sobald die Domain existiert und beide Seiten dort ausgeliefert werden

const slug = s => s.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
  .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const host = live ? (domain.trim() || (company.trim() ? `${slug(company)}.de` : "")) : "";
const legacy = "ec.immofuchs.info"; // bisherige Adresse des Portfolios

/* Aufbau: Startseite (/) = Freelance, Lebenslauf/Portfolio unter /cv/ (gleiche Domain). */
const origin = `https://${host || legacy}`;

export const slogan = "Connect. Secure. Manage. Engineer.";

export const site = {
  company: company.trim(),
  hasCompany: Boolean(company.trim()),
  /** Eigene Domain aktiv (live = true)? */
  hasDomain: Boolean(host),
  freelanceHost: host || legacy,
  freelanceOrigin: origin,
  cvOrigin: `${origin}/cv`
};

/* Links zwischen den beiden Seiten (relativ, funktioniert auf jeder Domain). */
export const freelanceUrl = lang => `/?lang=${lang}`;
export const cvUrl = lang => `/cv/?lang=${lang}`;
