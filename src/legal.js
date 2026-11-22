import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./plain.css";

/* Impressum/Datenschutz: Sprach- und Theme-Umschalter (gleiches Verhalten wie auf der Startseite). */
const root = document.documentElement;
const setLang = l => {
  root.lang = l;
  try { localStorage.setItem("lang", l); } catch { /* ignore */ }
  const u = new URL(location.href); u.searchParams.set("lang", l); history.replaceState(null, "", u);
  document.querySelectorAll("[data-set-lang]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.setLang === l)));
  document.querySelectorAll("[data-home]").forEach(a => { a.href = "/?lang=" + l; });
};
document.querySelectorAll("[data-set-lang]").forEach(b => b.addEventListener("click", () => setLang(b.dataset.setLang)));
setLang(root.lang === "de" ? "de" : "en");

const themeBtn = document.getElementById("theme");
const applyTheme = light => {
  if (light) root.dataset.theme = "light"; else delete root.dataset.theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", light ? "#F6F8FB" : "#101827");
  themeBtn?.setAttribute("aria-pressed", String(light));
  try { localStorage.setItem("theme", light ? "light" : "dark"); } catch { /* ignore */ }
};
themeBtn?.setAttribute("aria-pressed", String(root.dataset.theme === "light"));
themeBtn?.addEventListener("click", () => applyTheme(root.dataset.theme !== "light"));
