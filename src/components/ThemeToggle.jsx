import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useLang } from "../i18n.jsx";

/* Dunkel/Hell umschalten. Wahl wird im Browser gemerkt (localStorage), Standard ist dunkel. */
export default function ThemeToggle() {
  const { lang } = useLang();
  const [light, setLight] = useState(() => document.documentElement.dataset.theme === "light");
  useEffect(() => {
    const root = document.documentElement;
    if (light) root.dataset.theme = "light"; else delete root.dataset.theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", light ? "#F6F8FB" : "#101827");
    try { localStorage.setItem("theme", light ? "light" : "dark"); } catch { /* ignore */ }
  }, [light]);
  const label = light ? (lang === "de" ? "Dunkles Design" : "Dark theme") : (lang === "de" ? "Helles Design" : "Light theme");
  return (
    <button type="button" onClick={() => setLight(v => !v)} aria-pressed={light} aria-label={lang === "de" ? "Helles Design" : "Light theme"} title={label}
      className="grid h-11 w-11 place-items-center rounded-full border border-mist/40 text-mist transition-colors hover:border-signal hover:text-signal">
      {light ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
