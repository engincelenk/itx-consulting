/* Download des Lebenslaufs: das fertige PDF wird beim Herunterladen mit dem Tagesdatum
   (und Seitenzahl) gestempelt. Schlägt das fehl, lädt der Browser die Datei unverändert. */
const TXT = {
  en: { on: "Downloaded on", page: "Page", of: "of", name: "Engin Celenk · Curriculum vitae" },
  de: { on: "Heruntergeladen am", page: "Seite", of: "von", name: "Engin Celenk · Lebenslauf" }
};

async function stampedBlob(url, lang) {
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
  const res = await fetch(url);
  if (!res.ok) throw new Error("fetch");
  const doc = await PDFDocument.load(await res.arrayBuffer());
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const t = TXT[lang] || TXT.en;
  const d = new Date();
  const date = lang === "de"
    ? `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`
    : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const pages = doc.getPages(), mm = 72 / 25.4, size = 8, grey = rgb(0.37, 0.42, 0.48);
  pages.forEach((pg, i) => {
    const { width } = pg.getSize(), y = 12 * mm;
    pg.drawText(t.name, { x: 22 * mm, y, size, font, color: grey });
    const right = `${t.on} ${date} · ${t.page} ${i + 1} ${t.of} ${pages.length}`;
    pg.drawText(right, { x: width - 22 * mm - font.widthOfTextAtSize(right, size), y, size, font, color: grey });
  });
  return new Blob([await doc.save()], { type: "application/pdf" });
}

export function bindCvDownload(lang) {
  const onClick = async e => {
    const a = e.target.closest?.("a[data-cv-download]");
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    try {
      const blob = await stampedBlob(a.getAttribute("href"), lang);
      const u = URL.createObjectURL(blob), l = document.createElement("a");
      l.href = u; l.download = a.getAttribute("href").split("/").pop(); document.body.appendChild(l); l.click(); l.remove();
      setTimeout(() => URL.revokeObjectURL(u), 10000);
    } catch {
      const l = document.createElement("a"); l.href = a.getAttribute("href"); l.download = ""; document.body.appendChild(l); l.click(); l.remove();
    }
  };
  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}
