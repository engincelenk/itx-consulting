<?php
/* ---------------------------------------------------------------
   Contact form endpoint for the portfolio / freelance site, hosted on IONOS.
   Upload to your IONOS webspace, e.g. /api/contact.php.
   PHP 7.4+ (IONOS default is fine).
---------------------------------------------------------------- */

// ---- Settings -------------------------------------------------
$TO      = 'info@itx-consulting.de';          // where messages go
$FROM    = 'info@itx-consulting.de';      // sender: mailbox on your own domain (All-inkl sends reliably only from its own domains/mailboxes)
$FROM2   = 'engincelenk@web.de';          // fallback sender if the first one is refused
$COMPANY = 'ITx Consulting';                     // company name once registered (used in mails), empty = personal name
$SITE    = 'www.itx-consulting.de';          // domain named in the mails
$ORIGINS = ['https://www.itx-consulting.de', 'https://itx-consulting.de']; // sites allowed to use this form
$SIGN    = $COMPANY !== '' ? $COMPANY : 'Engin Celenk';
$LIMIT   = 20;                            // max successfully sent messages per IP per hour (failed attempts are not counted)
$CONFIRM = ['freelance'];                 // form sources whose sender gets a confirmation email
$EXCERPT = true;                          // true = confirmation mail also shows an excerpt (max 300 chars, HTML-escaped) of the sender's message
// ---------------------------------------------------------------

header('Content-Type: application/json; charset=utf-8');
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $ORIGINS, true)) {
  header('Access-Control-Allow-Origin: ' . $origin);
  header('Vary: Origin');
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type, Accept');
}
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { echo json_encode(['success' => 'false', 'message' => 'Contact endpoint is running. POST only.', 'php' => PHP_VERSION, 'mail' => function_exists('mail'), 'from' => $FROM, 'to' => preg_replace('/^.{2}/', '**', $TO)]); exit; }
if ($origin && !in_array($origin, $ORIGINS, true)) { http_response_code(403); echo json_encode(['success' => 'false', 'message' => 'Origin not allowed']); exit; }

$in = json_decode(file_get_contents('php://input'), true);
if (!is_array($in)) $in = $_POST;
$clean = function ($v, $max) { $v = trim((string)($v ?? '')); $v = str_replace(["\r", "\0"], '', $v); return mb_substr($v, 0, $max); };
$name    = $clean($in['name'] ?? '', 120);
$email   = $clean($in['email'] ?? '', 200);
$company = $clean($in['company'] ?? '', 160);
$message = $clean($in['message'] ?? '', 5000);
$source  = $clean($in['source'] ?? 'portfolio', 40);
$subject = $clean($in['_subject'] ?? 'Neue Nachricht über ' . $SITE, 160);
$lang    = ($in['lang'] ?? 'de') === 'en' ? 'en' : 'de';

// Honeypot: bots fill hidden fields. Pretend success.
if (!empty($in['_honey'])) { echo json_encode(['success' => 'true']); exit; }

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(422); echo json_encode(['success' => 'false', 'message' => 'Missing or invalid fields']); exit;
}
$oneLine = function ($v) { return trim(preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $v)); };
$name = $oneLine($name); $subject = $oneLine($subject); $company = $oneLine($company); $source = $oneLine($source);
if ($name === '') $name = '-';

// Simple rate limit per IP (stored in the system temp folder, no personal data kept longer than an hour).
$key  = sys_get_temp_dir() . '/ecform_' . hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . date('YmdH'));
$hits = (int)@file_get_contents($key);
if ($hits >= $LIMIT) { http_response_code(429); echo json_encode(['success' => 'false', 'message' => 'Too many requests']); exit; }

$h = function ($v) { return htmlspecialchars((string)$v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); };
$nl = function ($v) use ($h) { return nl2br($h($v), false); };
$when = (new DateTime('now', new DateTimeZone('Europe/Berlin')))->format($lang === 'en' ? 'j M Y, H:i' : 'd.m.Y, H:i') . ($lang === 'en' ? ' (CET)' : ' Uhr');
$whenDe = (new DateTime('now', new DateTimeZone('Europe/Berlin')))->format('d.m.Y, H:i') . ' Uhr';

/* ---- HTML mail building blocks (tables + inline CSS for mail clients) ---- */
$FONT = "font-family:'Segoe UI',-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif;";
$shell = function ($title, $pre, $tag, $content, $foot) use ($h, $FONT, $lang) {
  return '<!doctype html><html lang="' . $lang . '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><meta name="supported-color-schemes" content="light dark"><title>' . $h($title) . '</title>'
  . '<style>body{margin:0;padding:0}a{color:inherit}.btn:hover{background:#dcc08a!important}'
  . '@media (max-width:620px){.c{width:100%!important}.px{padding-left:22px!important;padding-right:22px!important}.h1{font-size:24px!important}.st td{display:block!important;width:100%!important;padding:0 0 10px 0!important}.k{width:auto!important;padding:0 0 2px!important}}'
  . '@media (prefers-color-scheme:dark){.bg{background:#05080f!important}.card{background:#101827!important}.fg{color:#f1f3f6!important}.mu{color:#a9b4c2!important}.ln{border-color:#26324a!important}.box{background:#0b111d!important}.gd{color:#c9aa6e!important}}</style></head>'
  . '<body class="bg" style="margin:0;padding:0;background:#ece8df"><div style="display:none;max-height:0;overflow:hidden;opacity:0;font-size:1px;color:#ece8df">' . $h($pre) . '</div>'
  . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="bg" style="background:#ece8df"><tr><td align="center" style="padding:28px 12px">'
  . '<table role="presentation" class="c" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px">'
  . '<tr><td class="px" style="background:#0b111d;border-radius:14px 14px 0 0;padding:26px 36px 22px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>'
  . '<td align="left"><a href="https://www.itx-consulting.de/" style="text-decoration:none"><div style="' . $FONT . 'font-size:34px;line-height:34px;font-weight:800;letter-spacing:-.02em;color:#ffffff">IT<span style="color:#c9aa6e">x</span></div><div style="' . $FONT . 'font-size:10px;line-height:14px;font-weight:600;letter-spacing:.32em;text-transform:uppercase;color:#d5dae3;margin-top:3px">Consulting</div></a></td>'
  . '<td align="right" style="' . $FONT . 'font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#c9aa6e">' . $h($tag) . '</td></tr></table></td></tr>'
  . '<tr><td style="height:3px;line-height:3px;font-size:0;background-color:#c9aa6e;background:linear-gradient(90deg,#8a6a1f,#c9aa6e,#e3cb97,#c9aa6e)">&nbsp;</td></tr>'
  . '<tr><td class="card px" style="background:#ffffff;padding:38px 36px 8px;border-radius:0 0 14px 14px">' . $content . '</td></tr>'
  . '<tr><td class="px mu" style="padding:20px 36px 0;' . $FONT . 'font-size:12px;line-height:18px;color:#6b7686;text-align:center">' . $foot . '</td></tr>'
  . '</table></td></tr></table></body></html>';
};
$row = function ($k, $v, $last = false) use ($FONT) {
  $b = $last ? '' : 'border-bottom:1px solid #ebe6da;';
  return '<tr><td class="k mu ln" valign="top" style="width:110px;padding:11px 0;' . $b . 'color:#6b7686;' . $FONT . 'font-size:13px">' . $k . '</td><td class="fg ln" style="padding:11px 0;' . $b . 'color:#101827;' . $FONT . 'font-size:15px;font-weight:600">' . $v . '</td></tr>';
};

/* ---- 1) Notification to the site owner ---- */
$notifyHtml = $shell('Neue Anfrage', 'Neue Anfrage von ' . $name, 'Neue Anfrage',
  '<div style="display:inline-block;background:#0b111d;color:#c9aa6e;' . $FONT . 'font-size:11px;letter-spacing:.14em;text-transform:uppercase;padding:6px 12px;border-radius:999px;margin:0 0 16px">&#9679; Neue Anfrage</div>'
  . '<h1 class="h1 fg" style="margin:0 0 8px;' . $FONT . 'font-size:26px;line-height:32px;font-weight:600;letter-spacing:-.02em;color:#101827">' . $h($name) . '</h1>'
  . '<p class="mu" style="margin:0 0 24px;' . $FONT . 'font-size:15px;line-height:23px;color:#4a586c">Eine neue Nachricht ist über ' . $h($SITE) . ' eingegangen.</p>'
  . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="st" style="margin:0 0 24px">'
  . $row('Name', $h($name)) . $row('E-Mail', '<a class="gd" href="mailto:' . $h($email) . '" style="color:#8a6a1f;text-decoration:none">' . $h($email) . '</a>')
  . ($company !== '' ? $row('Unternehmen', $h($company)) : '') . $row('Quelle', $h($source)) . $row('Eingegangen', $h($whenDe), true) . '</table>'
  . '<div class="gd" style="' . $FONT . 'font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#8a6a1f;margin:0 0 10px">Betreff: ' . $h($subject) . '</div>'
  . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="box ln" style="background:#f6f3ec;border:1px solid #e6dfcf;border-radius:10px;margin:0 0 30px"><tr><td class="fg" style="padding:20px 22px;' . $FONT . 'font-size:15px;line-height:24px;color:#101827;border-left:4px solid #c9aa6e;border-radius:10px 0 0 10px">' . $nl($message) . '</td></tr></table>'
  . '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 34px"><tr><td align="center" style="border-radius:999px;background:#c9aa6e"><a class="btn" href="mailto:' . $h($email) . '?subject=' . rawurlencode('Re: ' . $subject) . '" style="display:inline-block;padding:14px 30px;' . $FONT . 'font-size:15px;font-weight:700;color:#0b111d;text-decoration:none;border-radius:999px;background:#c9aa6e">Jetzt antworten &rarr;</a></td></tr></table>',
  '<p class="mu" style="margin:0 0 6px;color:#6b7686">Automatisch erzeugt vom Kontaktformular. &bdquo;Antworten&ldquo; geht direkt an den Absender (Reply-To).</p><p class="mu" style="margin:0;color:#8a93a1">' . $h($SIGN) . ' &middot; ' . $h($SITE) . '</p>');
$notifyText = "Neue Anfrage über $SITE\n\nName: $name\nE-Mail: $email\n" . ($company !== '' ? "Unternehmen: $company\n" : '') . "Quelle: $source\nEingegangen: $whenDe\nBetreff: $subject\n\n$message\n\nAntworten: einfach auf diese E-Mail antworten (Reply-To = Absender).\n";

/* Send multipart/alternative (plain text + HTML) with fallbacks:
   sender on the own domain first, then the second sender; with and without -f. */
$send = function ($to, $subj, $text, $htmlBody, $from, $replyTo = null) use ($SITE, $oneLine) {
  $bd = 'itx_' . bin2hex(random_bytes(12));
  $part = function ($type, $content) { return 'Content-Type: ' . $type . "; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n" . chunk_split(base64_encode($content), 76, "\r\n"); };
  $msg = "This is a multi-part message in MIME format.\r\n\r\n--$bd\r\n" . $part('text/plain', $text) . "--$bd\r\n" . $part('text/html', $htmlBody) . "--$bd--\r\n";
  $from = $oneLine($from);
  $hd = ['From: "ITx-Consulting" <' . $from . '>', 'MIME-Version: 1.0', 'Content-Type: multipart/alternative; boundary="' . $bd . '"'];
  if ($replyTo && filter_var($replyTo, FILTER_VALIDATE_EMAIL) && !preg_match('/[\r\n]/', $replyTo)) $hd[] = 'Reply-To: ' . $replyTo;
  $s = '=?UTF-8?B?' . base64_encode($oneLine($subj)) . '?=';
  return @mail($to, $s, $msg, implode("\r\n", $hd), '-f' . $from) || @mail($to, $s, $msg, implode("\r\n", $hd));
};
error_clear_last();
$usedFrom = $FROM;
$ok = $send($TO, $subject, $notifyText, $notifyHtml, $FROM, $email);
if (!$ok && $FROM2 && $FROM2 !== $FROM) { $usedFrom = $FROM2; $ok = $send($TO, $subject, $notifyText, $notifyHtml, $FROM2, $email); }

/* ---- 2) Confirmation to the sender. Only for requests coming from the site itself
   (Origin header present and allowed). Fixed texts; the sender's own subject (and, if
   $EXCERPT is on, a short excerpt) is HTML-escaped and length-limited. ---- */
if ($ok) @file_put_contents($key, (string)($hits + 1)); // count only messages that were really sent
if ($ok && in_array($source, $CONFIRM, true) && in_array($origin, $ORIGINS, true)) {
  $en = $lang === 'en';
  $t = $en ? [
    'subj' => 'Your request via ' . $SITE, 'tag' => 'Your enquiry', 'h1' => 'Thank you for your enquiry', 'hi' => 'Hello ' . $name . ',',
    'p1' => 'Your message has reached us. I read every enquiry personally and will get back to you shortly.',
    'sum' => 'Your message at a glance', 'lSub' => 'Subject', 'lTs' => 'Received', 'lMsg' => 'Message',
    'sig' => 'Kind regards', 'ft' => 'This is an automatic confirmation. Simply reply to this email if you would like to add something. If you did not send an enquiry, please ignore this message.',
    'imp' => 'Legal notice & privacy', 'pre' => 'Your message has reached ' . $SIGN . '. We will get back to you shortly.'
  ] : [
    'subj' => 'Ihre Anfrage über ' . $SITE, 'tag' => 'Ihre Anfrage', 'h1' => 'Vielen Dank für Ihre Anfrage', 'hi' => 'Guten Tag ' . $name . ',',
    'p1' => 'Ihre Nachricht ist bei uns angekommen. Ich lese sie persönlich und melde mich zeitnah bei Ihnen.',
    'sum' => 'Ihre Nachricht im Überblick', 'lSub' => 'Betreff', 'lTs' => 'Eingegangen', 'lMsg' => 'Nachricht',
    'sig' => 'Viele Grüße', 'ft' => 'Dies ist eine automatische Bestätigung. Bitte antworten Sie direkt auf diese E-Mail, wenn Sie etwas ergänzen möchten. Falls Sie keine Anfrage gesendet haben, ignorieren Sie diese Nachricht bitte.',
    'imp' => 'Impressum & Datenschutz', 'pre' => 'Ihre Nachricht ist bei ' . $SIGN . ' angekommen. Wir melden uns zeitnah.'
  ];
  $shortSubj = mb_substr($subject, 0, 120);
  $customSubj = !preg_match('/^(Neue Nachricht über|New message via)\b/u', $subject); // the site form sends a generic default subject, not worth echoing
  $excerpt = $EXCERPT ? mb_substr($message, 0, 300) . (mb_strlen($message) > 300 ? ' …' : '') : '';
  $r = function ($k, $v, $last = false) use ($FONT) {
    return '<tr><td class="k mu" valign="top" style="width:96px;padding:0 0 ' . ($last ? '0' : '10px') . ';color:#6b7686">' . $k . '</td><td class="fg" style="padding:0 0 ' . ($last ? '0' : '10px') . ';color:#101827">' . $v . '</td></tr>';
  };
  $confHtml = $shell($t['h1'], $t['pre'], $t['tag'],
    '<h1 class="h1 fg" style="margin:0 0 18px;' . $FONT . 'font-size:28px;line-height:34px;font-weight:600;letter-spacing:-.02em;color:#101827">' . $h($t['h1']) . '</h1>'
    . '<p class="fg" style="margin:0 0 12px;' . $FONT . 'font-size:16px;line-height:25px;color:#101827">' . $h($t['hi']) . '</p>'
    . '<p class="mu" style="margin:0 0 28px;' . $FONT . 'font-size:16px;line-height:25px;color:#4a586c">' . $h($t['p1']) . '</p>'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="box ln" style="background:#f6f3ec;border:1px solid #e6dfcf;border-radius:10px;margin:0 0 30px"><tr><td style="padding:22px 24px">'
    . '<div class="gd" style="' . $FONT . 'font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#8a6a1f;margin:0 0 14px">' . $h($t['sum']) . '</div>'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="st" style="' . $FONT . 'font-size:14px;line-height:21px">'
    . ($customSubj ? $r($t['lSub'], '<strong>' . $h($shortSubj) . '</strong>') : '') . $r($t['lTs'], $h($when), $excerpt === '')
    . ($excerpt !== '' ? $r($t['lMsg'], '<div class="mu" style="border-left:3px solid #c9aa6e;padding:2px 0 2px 14px;color:#4a586c">' . $nl($excerpt) . '</div>', true) : '')
    . '</table></td></tr></table>'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="ln" style="border-top:1px solid #e6e1d6"><tr><td style="padding:24px 0 26px;' . $FONT . '">'
    . '<div class="fg" style="font-size:15px;color:#101827;margin:0 0 2px">' . $h($t['sig']) . '</div>'
    . '<div class="fg" style="font-size:17px;font-weight:700;color:#101827">Engin Celenk</div>'
    . '<div class="mu" style="font-size:13px;color:#6b7686;margin:0 0 14px">' . $h($SIGN) . '</div>'
    . '<div style="font-size:14px;line-height:22px"><a class="gd" href="mailto:' . $h($TO) . '" style="color:#8a6a1f;text-decoration:none;font-weight:600">' . $h($TO) . '</a><span class="mu" style="color:#6b7686"> &nbsp;&middot;&nbsp; </span><a class="gd" href="https://' . $h($SITE) . '/" style="color:#8a6a1f;text-decoration:none;font-weight:600">' . $h($SITE) . '</a></div>'
    . '</td></tr></table>',
    '<p class="mu" style="margin:0 0 8px;color:#6b7686">' . $h($t['ft']) . '</p><p style="margin:0 0 4px"><a class="mu" href="https://' . $h($SITE) . '/legal.html" style="color:#6b7686;text-decoration:underline">' . $h($t['imp']) . '</a></p><p class="mu" style="margin:0;color:#8a93a1">&copy; ' . date('Y') . ' ' . $h($SIGN) . '</p>');
  $confText = $t['hi'] . "\n\n" . $t['p1'] . "\n\n" . ($customSubj ? $t['lSub'] . ': ' . $shortSubj . "\n" : '') . $t['lTs'] . ': ' . $when . "\n" . ($excerpt !== '' ? $t['lMsg'] . ":\n" . $excerpt . "\n" : '') . "\n" . $t['sig'] . "\nEngin Celenk\n" . $SIGN . "\nhttps://" . $SITE . "/\n\n" . $t['ft'] . "\n";
  $send($email, $t['subj'], $confText, $confHtml, $usedFrom);
}

if ($ok) { echo json_encode(['success' => 'true']); }
else { $err = error_get_last(); http_response_code(500); echo json_encode(['success' => 'false', 'message' => 'Mail could not be sent', 'detail' => $err['message'] ?? 'mail() returned false', 'from' => $usedFrom]); }
