

# Aggiunta link Privacy Policy nell'HTML statico

## Problema reale
L'osservazione è tecnicamente corretta: `index.html` non contiene alcun riferimento a `/privacy-policy`. I crawler che non eseguono JavaScript (e gli auditor di compliance) vedono solo il `<div id="root"></div>` vuoto senza alcun link all'informativa. Sebbene il sito React lo renda disponibile tramite Footer, CookieBanner e badge flottante, l'assenza nell'HTML statico è un gap di trasparenza.

## Soluzione
Aggiungere un blocco `<noscript>` nel `<body>` di `index.html` con link testuali di fallback visibili ai crawler e agli utenti senza JavaScript.

## Dettagli tecnici

**File: `index.html`**

Inserire prima di `<script type="module" src="/src/main.tsx">` un blocco:

```html
<noscript>
  <div style="padding:2rem;font-family:sans-serif;text-align:center">
    <p>Noscite — In Digitali Nova Virtus</p>
    <p>
      <a href="/privacy-policy">Privacy Policy</a> |
      <a href="/cookie-policy">Cookie Policy</a> |
      <a href="/contatti">Contatti</a>
    </p>
    <p>© Noscite — P.IVA 14385240966</p>
  </div>
</noscript>
```

Questo garantisce che crawler, auditor e utenti senza JS trovino immediatamente i link normativi nell'HTML statico, senza impatto sull'esperienza degli utenti con JavaScript attivo.

Un singolo file da modificare, nessun rischio di regressione.

