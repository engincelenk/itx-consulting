/* ------------------------------------------------------------------
   Zentrale Firmen- und Domain-Einstellungen.
   Sobald das Kleingewerbe angemeldet ist, reicht es, `company` einzutragen.
   Leer = Seite bleibt wie bisher (persönliches Portfolio, ec.immofuchs.info).

   Mit Firmenname:
   - Freelance-Seite tritt unter dem Firmennamen auf (Titel, Kopf, Footer, Impressum)
   - Freelance-Seite ist die Startseite der Firmen-Domain  (https://<domain>)
   - der Lebenslauf liegt auf der Subdomain                (https://cv.<domain>)
------------------------------------------------------------------- */

const company = "Aventiq";   // z. B. "Muster IT Consulting"
const domain = "";    // optional; leer = aus dem Firmennamen abgeleitet (muster-it-consulting.de)

const slug = s => s.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
  .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const host = domain.trim() || (company.trim() ? `${slug(company)}.de` : "");
const legacy = "ec.immofuchs.info"; // bisherige Adresse des Portfolios

export const site = {
  company: company.trim(),
  hasCompany: Boolean(company.trim()),
  /** Domain der Freelance-Seite (leer solange keine Firma eingetragen ist). */
  freelanceHost: host,
  /** Subdomain für den Lebenslauf. */
  cvHost: host ? `cv.${host}` : legacy,
  freelanceOrigin: host ? `https://${host}` : `https://${legacy}`,
  cvOrigin: host ? `https://cv.${host}` : `https://${legacy}`
};

/* Läuft die Seite gerade auf der Freelance-Domain? (?as=freelance zum Testen auf localhost) */
export function onFreelanceHost() {
  if (typeof location === "undefined" || !site.hasCompany) return false;
  const h = location.hostname.replace(/^www\./, "");
  return h === site.freelanceHost || new URLSearchParams(location.search).get("as") === "freelance";
}

/* Links zwischen den beiden Seiten. Ohne Firma relativ wie bisher. */
export const freelanceUrl = lang => site.hasCompany ? `${site.freelanceOrigin}/?lang=${lang}` : `/freelance.html?lang=${lang}`;
export const cvUrl = lang => site.hasCompany ? `${site.cvOrigin}/?lang=${lang}` : `/?lang=${lang}`;
