# Redirect-Plan (SEO-sicher)

GitHub Pages unterstützt keine serverseitigen Redirect-Regeln wie `.htaccess`. Für einen SEO-sicheren Umzug gibt es zwei sinnvolle Wege:

## A) Empfohlen: Redirects auf dem Ziel-Hosting / DNS (bei Live-Domain)
Wenn `begogmbh.de` später live geht (z.B. eigener Webspace/Server/Cloudflare), richte 301-Redirects ein:
- `https://begogmbh.de/*` -> `https://begogmbh.de/*` (neue Struktur)
- oder (falls GitHub Pages weiter genutzt wird):
  `https://begogmbh.de/*` -> `https://4rjn.github.io/begogmbh.de/*`

**Wichtig:** 301 (permanent) + alte URLs vollständig abdecken.

## B) Falls alte URLs bekannt sind: HTML-Redirect-Stubs (GitHub Pages)
Für jede alte URL legst du eine Datei an, z.B. `alt-pfad.html`:
```html
<!doctype html><meta charset="utf-8">
<meta http-equiv="refresh" content="0;url=/begogmbh.de/neue-seite.html">
<link rel="canonical" href="https://begogmbh.de/neue-seite.html">
```

## Checkliste vor Go-Live (Domain-Switch)
1. In `_config.yml` **nur** `canonical_base` umstellen:
   - von `https://4rjn.github.io/begogmbh.de`
   - auf `https://begogmbh.de`
2. OG-Vorschau neu cachen (LinkedIn/FB Debugger)
3. Search Console: Domain/Property prüfen, Sitemap einreichen
4. 301 Redirects aktivieren (falls Hosting erlaubt)

> Wenn du mir die Liste der alten URLs gibst (z.B. aus Search Console / ScreamingFrog), erstelle ich dir die Redirect-Stubs automatisch.
