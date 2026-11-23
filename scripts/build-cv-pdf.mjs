/* Rendert die CV-PDFs (und das Social-Preview-Bild) mit dem lokal installierten Chrome.
   Aufruf: npm run build && npm run cv:pdf   (PDFs landen in public/cv; danach npm run build)
   Chrome-Pfad bei Bedarf über CHROME_PATH setzen. Das Download-Datum wird erst beim Herunterladen eingestempelt. */
import { spawn, spawnSync } from "node:child_process";
import { mkdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const PORT = 4179, base = `http://localhost:${PORT}`;
const chrome = [process.env.CHROME_PATH, "C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe", "/usr/bin/google-chrome", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"].find(p => p && existsSync(p));
if (!chrome) throw new Error("Chrome nicht gefunden: CHROME_PATH setzen");
const server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], { stdio: "ignore", shell: true });
await new Promise(r => setTimeout(r, 3000));
mkdirSync("public/cv", { recursive: true });
const run = args => spawnSync(chrome, ["--headless=new", "--disable-gpu", "--no-sandbox", "--virtual-time-budget=8000", ...args], { stdio: "ignore" });
try {
  for (const [lang, file] of [["en", "Engin-Celenk-CV.pdf"], ["de", "Engin-Celenk-Lebenslauf.pdf"]]) {
    run(["--no-pdf-header-footer", `--print-to-pdf=${resolve("public/cv", file)}`, `${base}/cv/print.html?lang=${lang}`]);
    console.log("pdf", file);
  }
  run(["--window-size=1200,630", `--screenshot=${resolve("public/og.png")}`, `${base}/?lang=en`]);
  console.log("og.png");
} finally { if (process.platform === "win32") spawnSync("taskkill", ["/pid", String(server.pid), "/t", "/f"], { stdio: "ignore" }); else server.kill(); }
