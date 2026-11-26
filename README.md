# Beyond the CV · Engin Celenk

Personal technology & cyber security portfolio. Live: https://www.itx-consulting.de

Stack: React + Vite, Tailwind CSS, Motion, Lucide icons, self-hosted Geist fonts. Deployed to GitHub Pages by `.github/workflows` on every push to `main`.

## Sections
Home (animated system network) · Journey (interactive timeline) · Expertise (competence model) · Showcase (case studies + interactive mini TARA) · Innovation lab (Ask my portfolio, Challenge me) · About · Contact (tailored CV in three focuses).

## Languages
German and English. Switch in the header or with `?lang=de` / `?lang=en`. Content texts are `{ en, de }` pairs in `src/data/`, interface texts in `src/strings.js`.

## Freelance page
`/` (start page): general service portfolio with three equal pillars (architecture, cyber security, project/program & solution management) and AI as the vertical across all three, shown as an interactive matrix; way of working, industries and a request configurator that writes a ready-made email. Content in `src/data/services.js`. Linked from the main navigation, hidden on personal application links.

## Kleingewerbe / Firmen-Domain
Alles Firmenspezifische steckt in `src/site.js`. Nach der Anmeldung `company` eintragen und, sobald die Domain steht, `live = true` setzen (vorher bleiben alle Links auf der bisherigen Adresse) (optional `domain`, sonst wird `<firmenname>.de` abgeleitet), dann `npm run build`.

Danach gilt automatisch:
- Freelance-Seite tritt unter dem Firmennamen auf (Titel, Kopfzeile, Footer, Impressum/Datenschutz mit Inhaber, Social-Image-URL)
- `https://<domain>/` zeigt die Freelance-Seite, `https://cv.<domain>/` den Lebenslauf (gleiche Auslieferung, die Seite erkennt den Host; lokal testen mit `?as=freelance`)
- Links zwischen beiden Seiten und die Signatur in Anschreiben zeigen auf die neuen Adressen

Von Hand bleiben: DNS und Hosting für beide Domains (GitHub Pages erlaubt nur eine Domain pro Site, daher Cloudflare Pages, Netlify oder IONOS), `public/CNAME`, `server/ionos/contact.php` (`$COMPANY`, `$SITE`, `$ORIGINS`) und im Impressum Steuerhinweise (Kleinunternehmer, ggf. USt-IdNr.).

## Small projects under `/<name>/`

Each project lives in its own public repository and is copied into the site by `.github/workflows/pages.yml`:

| Address | Repository | Copied from |
|---|---|---|
| `/gr/` | `engincelenk/gr` | `docs/` |
| `/jms/` | `engincelenk/jms` | `index.html`, `jms-assets/` |
| `/oq/` | `engincelenk/oq` | `index.html` |

Changes there go live with the next run of this workflow (daily, on every push here, or by hand via *Run workflow*). The project repositories need no GitHub Pages of their own. They are not part of `npm run dev` / `preview`. GitHub pauses scheduled workflows after 60 days without commits in this repository.

## Edit content
- `src/data/profile.js` – person, journey, expertise, case studies, values, CV focuses
- `src/data/knowledge.js` – answers for “Ask my portfolio”, skill terms for “Challenge me”

## Tailored CV PDFs
`/cv/print.html?lang=de|en` is the printable CV (one unified CV per language). After content changes regenerate the PDFs and the social image:

```bash
npm run build && npm run cv:pdf
```

Two PDFs (German and English) land in `public/cv/` and must be committed.

## Personal application links
Open `/link.html` (unlisted, noindex). Parameters: `company`, `to`, `role`, `focus` (`architecture` | `security` | `management` | `ai`), `lang` (`de` | `en`). German keys `firma`, `an`, `rolle`, `fokus` still work.

## Local development
```bash
npm install
npm run dev
```
