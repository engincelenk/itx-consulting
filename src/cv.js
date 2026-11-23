import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./cv.css";
import * as raw from "./data/profile.js";
import { localize } from "./i18n.jsx";
import { period } from "./lib/dates.js";
import { bindCvDownload } from "./lib/downloadCv.js";

const lang = new URLSearchParams(location.search).get("lang") === "de" ? "de" : "en";
const { person, cv, domains, aiVertical, career, education, certificates, trainings, logos, successStory, sap } = localize({ ...raw }, lang);
const T = {
  en: { cv: "Curriculum vitae", pillars: "Competence profile", exp: "Experience", edu: "Education", certs: "Certificates & training", langs: "Languages", projects: "Projects", school: "School path", kw: "Keywords", step: "Step by step to M.Sc.", dl: "Download PDF", back: "Back to portfolio" },
  de: { cv: "Lebenslauf", pillars: "Kompetenzprofil", exp: "Berufserfahrung", edu: "Bildung", certs: "Zertifikate & Weiterbildung", langs: "Sprachen", projects: "Projekte", school: "Schulweg", kw: "Schlagworte", step: "Stufe für Stufe zum M.Sc.", dl: "PDF laden", back: "Zum Portfolio" }
}[lang];
document.documentElement.lang = lang;
document.title = `Engin Celenk · ${T.cv}`;

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const logo = id => logos[id]?.src ? `<img class="lg" src="${logos[id].src}" alt="${esc(logos[id].name)}">` : "";
const pillars = domains.filter(d => d.id !== "ai");
const ai = domains.find(d => d.id === "ai");

document.getElementById("cv").innerHTML = `
<article class="page">
  <header class="head">
    <div>
      <p class="eyebrow">${T.cv}</p>
      <h1>${esc(person.name)}<span>, ${esc(person.degree)}</span></h1>
      <p class="headline">${esc(cv.headline)}</p>
    </div>
    <img src="/engin.jpg" alt="" class="photo">
  </header>
  <p class="contact"><span>${esc(person.location)}</span><span>${esc(person.site.replace("https://", ""))}</span>${person.linkedin ? `<span>${esc(person.linkedin.replace(/^https:\/\/(de\.)?/, ""))}</span>` : ""}</p>
  <section class="profile"><p>${esc(cv.profile)}</p></section>

  <h2>${T.exp}</h2>
  ${[...career].reverse().map(c => `
    <div class="job">${logo(c.logo)}
      <div>
        <p class="when">${esc(period(c.from, c.to, lang))} · ${esc(c.place)}</p>
        <h3>${esc(c.role)}</h3><p class="org">${esc(c.org)}</p>
        <ul>${c.points.map(r => `<li>${esc(r)}</li>`).join("")}${c.story ? `<li><b>${esc(successStory.short)}</b></li>` : ""}${c.projects ? `<li>${T.projects}: ${esc(c.projects.join(", "))}</li>` : ""}</ul>
      </div>
    </div>`).join("")}

  <h2>${T.step}</h2>
  <ol class="steps">
    ${education.map(e => `<li class="${e.id === "msc" ? "key" : ""}"><span class="yr">${e.year ? esc(e.year) : ""}</span><div><h3>${esc(e.title)}${e.grade ? ` · ${esc(e.grade)}` : ""}</h3>${e.logo ? `<p>${esc(e.text)}</p>` : ""}${e.extra ? `<p>${esc(e.extra.text)}</p>` : ""}</div></li>`).join("")}
  </ol>

  <h2>${T.certs}</h2>
  <ul class="plain two">${[...certificates, ...trainings].map(c => `<li>${c.year ? `<b>${c.year}</b> ` : ""}${esc(c.name)}</li>`).join("")}</ul>

  <h2>${T.langs}</h2>
  <ul class="plain two">${person.languages.map(l => `<li>${esc(l.name)} · ${esc(l.level)}</li>`).join("")}</ul>


  <h2>${T.pillars}</h2>
  <div class="pillars">
    ${pillars.map(p => `
      <div class="pillar">
        <h3>${esc(p.title)}</h3>${p.subtitle ? `<p class="sub">${esc(p.subtitle)}</p>` : ""}
        <ul>${p.evidence.slice(0, 4).map(e => `<li>${esc(e)}</li>`).join("")}</ul>
      </div>`).join("")}
  </div>
  <div class="aiband">
    <p><b>${esc(ai.title)}</b> · ${esc(aiVertical.claim)}</p>
    <div class="aicells">${pillars.map(p => `<span>${esc(aiVertical.aspects[p.id])}</span>`).join("")}</div>
  </div>

  <p class="sapline"><b>${esc(sap.title)}</b> · ${sap.modules.map(m => esc(m.id)).join(" · ")}</p>
</article>
<nav class="tools no-print">
  <a href="?lang=${lang === "de" ? "en" : "de"}">${lang === "de" ? "English" : "Deutsch"}</a>
  <a class="dl" href="${cv.file}" data-cv-download>${T.dl}</a>
  <a href="/cv/?lang=${lang}">${T.back}</a>
</nav>`;

bindCvDownload(lang);
