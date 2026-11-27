# Kontaktformular über All-inkl

Die Seite (GitHub Pages, `www.itx-consulting.de`) kann kein PHP ausführen. Das Formular schickt deshalb an `https://api.itx-consulting.de/contact.php` (siehe `src/data/profile.js`, `contactForm.endpoints`). Das ist der All-inkl-Webspace. Das Skript sendet die Nachricht per `mail()` an `info@itx-consulting.de`.

Der Ordner hieß früher `server/ionos` und heißt jetzt `server/webhosting`.

## 1. Cloudflare (DNS)
Neuer Eintrag: Typ `A`, Name `api`, Ziel = IP-Adresse des All-inkl-Webspace (steht im KAS bei den Server-Daten), Proxy aus (nur DNS, graue Wolke). Die Einträge für `www` und den Apex nicht ändern.

## 2. All-inkl KAS
Domain → Subdomain: `api.itx-consulting.de` anlegen und auf einen eigenen Ordner zeigen lassen (z. B. `/api`).

## 3. Hochladen
`server/webhosting/contact.php` per FTP oder KAS-Dateimanager in diesen Ordner hochladen, also `/api/contact.php` (liegt direkt als `contact.php` im Subdomain-Ordner).

## 4. Prüfen
`https://api.itx-consulting.de/contact.php` im Browser öffnen. Richtig ist eine Zeile wie:
`{"success":"false","message":"Contact endpoint is running. POST only.", ... "to":"info@itx-consulting.de"}`
(Falls HTTPS noch nicht geht: im KAS für die Subdomain ein kostenloses SSL-Zertifikat aktivieren.)

## 5. Absender
`$FROM` ist `info@itx-consulting.de` (Postfach bei All-inkl). `$FROM2` (web.de) ist nur der Ersatz, falls der erste Absender abgelehnt wird.

## 6. Fehlersuche
Schlägt das Senden fehl, zeigt das Formular unter der Fehlermeldung einen „Technischen Hinweis“ (z. B. `Failed to fetch`, `HTTP 500 · Mail could not be sent`). Diesen Text an Claude schicken.

## 7. Bot-Schutz (Cloudflare Turnstile)
1. Cloudflare Dashboard → **Turnstile** → **Add widget**. Name z. B. `itx-contact`, Hostnames `www.itx-consulting.de` und `itx-consulting.de`, Widget Mode **Managed**. Cloudflare zeigt danach **Site Key** (öffentlich) und **Secret Key** (geheim).
2. **Site Key** in `src/data/profile.js` bei `contactForm.turnstileSiteKey` eintragen (darf im Repo stehen).
3. **Secret Key** NICHT ins Repo. Datei `contact.secret.example.php` kopieren als `contact.secret.php`, Key eintragen und per FTP/KAS neben `contact.php` hochladen (`/api/contact.secret.php`).
4. Reihenfolge: zuerst Frontend mit Site Key deployen (Merge), dann `contact.php` und `contact.secret.php` hochladen. Ab dann verlangt der Server das Captcha, und Bestätigungsmails (inkl. Textauszug) werden nur nach bestandener Prüfung verschickt.
