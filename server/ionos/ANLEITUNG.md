# Kontaktformular über All-inkl

Die Seite (GitHub Pages, `www.itx-consulting.de`) kann kein PHP ausführen. Das Formular schickt deshalb an `https://itx-consulting.de/api/contact.php` (ohne `www`, siehe `src/data/profile.js`, `contactForm.endpoints`). Das ist der All-inkl-Webspace. Das Skript sendet die Nachricht per `mail()` an `info@itx-consulting.de`.

(Der Ordnername `server/ionos` ist historisch; die Datei läuft auf All-inkl.)

Voraussetzung: `www.itx-consulting.de` zeigt per DNS auf GitHub Pages, `itx-consulting.de` (ohne www) auf den All-inkl-Webspace. Das Skript erlaubt Anfragen von beiden Adressen (CORS).

## 1. Hochladen
`server/ionos/contact.php` per FTP oder KAS-Dateimanager in das Hauptverzeichnis der Domain `itx-consulting.de` hochladen, und zwar nach `api/contact.php` (Ordner `api` anlegen, falls nötig).

## 2. Prüfen
`https://itx-consulting.de/api/contact.php` im Browser öffnen. Richtig ist eine Zeile wie:
`{"success":"false","message":"Contact endpoint is running. POST only.", ... "to":"info@itx-consulting.de"}`

## 3. Absender
`$FROM` ist `info@itx-consulting.de` (Postfach bei All-inkl). `$FROM2` (web.de) ist nur der Ersatz, falls der erste Absender abgelehnt wird.

## 4. Fehlersuche
Schlägt das Senden fehl, zeigt das Formular unter der Fehlermeldung einen „Technischen Hinweis“ (z. B. `HTTP 404`, `HTTP 500 · Mail could not be sent`). Diesen Text an Claude schicken.
