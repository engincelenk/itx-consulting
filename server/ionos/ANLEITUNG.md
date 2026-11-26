# Kontaktformular über All-inkl

Die Seite (GitHub Pages, `www.itx-consulting.de`) kann kein PHP ausführen. Das Formular schickt deshalb an ein PHP-Skript auf dem All-inkl-Webspace. Das Skript sendet die Nachricht per `mail()` an `info@itx-consulting.de`.

(Der Ordnername `server/ionos` ist historisch; die Datei läuft auf All-inkl.)

## 1. Subdomain anlegen (einmalig)
Im All-inkl KAS unter Domain → Subdomain eine Subdomain (z. B. `api.itx-consulting.de`) auf einen eigenen Ordner des Webspace zeigen lassen, z. B. `/api`.

## 2. Hochladen
`server/ionos/contact.php` per FTP oder KAS-Dateimanager als `contact.php` in diesen Ordner hochladen (also `/api/contact.php`).

## 3. Prüfen
`https://api.itx-consulting.de/contact.php` im Browser öffnen. Richtig ist eine Zeile wie:
`{"success":"false","message":"Contact endpoint is running. POST only.", ... "to":"info@itx-consulting.de"}`

## 4. Frontend verbinden
Die URL in `src/data/profile.js` bei `contactForm.endpoints` eintragen, z. B. `["https://api.itx-consulting.de/contact.php"]`.

## 5. Absender
`$FROM` ist `info@itx-consulting.de`. Das Postfach muss bei All-inkl existieren (tut es). `$FROM2` (web.de) ist nur der Ersatz, falls der erste Absender abgelehnt wird.

## 6. Fehlersuche
Schlägt das Senden fehl, zeigt das Formular unter der Fehlermeldung einen „Technischen Hinweis“ (z. B. `HTTP 404`, `HTTP 500 · Mail could not be sent`). Diesen Text an Claude schicken.
