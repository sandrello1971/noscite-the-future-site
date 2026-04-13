

# Fix: Google Analytics si carica senza consenso cookie

## Problema
Il componente `GoogleAnalytics` carica gli script di Google Tag Manager/GA4 **immediatamente** al mount, senza verificare se l'utente ha acconsentito ai cookie analitici. Il cookie banner esiste e salva le preferenze in `localStorage["cookie-consent"]`, ma GA4 lo ignora completamente. Questo viola il GDPR: i cookie di tracciamento non possono essere attivati prima del consenso esplicito.

## Soluzione
Modificare `GoogleAnalytics.tsx` per:
1. Leggere le preferenze cookie da `localStorage["cookie-consent"]`
2. Caricare gli script GA4 **solo se** `analytics: true` nelle preferenze
3. Ascoltare i cambiamenti (via `storage` event) per attivarsi/disattivarsi in tempo reale quando l'utente modifica il consenso
4. Rimuovere gli script se il consenso viene revocato

## Dettagli tecnici

**File modificato:** `src/components/GoogleAnalytics.tsx`

Logica:
- All'avvio, controlla `localStorage.getItem("cookie-consent")`
- Se non esiste (nessun consenso dato) o `analytics === false`: non caricare nulla
- Se `analytics === true`: caricare gtag.js come ora
- Aggiungere un listener su `storage` event per reagire ai cambiamenti di consenso in tempo reale
- Nel cleanup, rimuovere gli script e cancellare `window.gtag` / `window.dataLayer`

Nessun altro file richiede modifiche: il `CookieBanner` già salva correttamente le preferenze in localStorage.

