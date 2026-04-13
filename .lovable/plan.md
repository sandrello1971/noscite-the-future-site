

# Rimozione riferimenti residui a Iubenda

## Problema
Nel file `index.html`, la Content-Security-Policy contiene ancora domini Iubenda (`cdn.iubenda.com`, `embeds.iubenda.com`) nelle direttive `script-src`, `style-src` e `connect-src`. Sono residui della precedente integrazione, ora sostituita da pagine interne.

## Correzione
Modificare **un solo file**: `index.html`

Rimuovere dalla meta tag CSP:
- `https://cdn.iubenda.com` da `script-src`, `style-src`, `connect-src`
- `https://embeds.iubenda.com` da `script-src`

Nessun altro file contiene riferimenti a Iubenda.

