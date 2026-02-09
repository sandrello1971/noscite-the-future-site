
# Fix: Business Card pubblica non accessibile

## Problema
La pagina `/card/sandrello` restituisce "Profilo non trovato" (errore `PGRST116: 0 rows`) perché la vista `business_cards_public` non ha i permessi di lettura per gli utenti non autenticati.

**Causa tecnica:** La migrazione di sicurezza ha protetto correttamente la tabella `business_cards` (solo admin), ma i GRANT SELECT sulla vista pubblica non sono stati applicati.

## Soluzione
Una singola migrazione SQL che:

1. Concede `SELECT` sulla vista `business_cards_public` ai ruoli `anon` e `authenticated`

```sql
GRANT SELECT ON public.business_cards_public TO anon, authenticated;
```

Nessuna modifica al codice frontend -- il componente `DigitalBusinessCard.tsx` già interroga la vista corretta.

## Risultato
- La pagina `https://noscite.it/card/sandrello` sarà accessibile da mobile e desktop
- I dati sensibili (email, telefono fisso, P.IVA, indirizzo) restano protetti
- Solo i campi pubblici definiti nella vista saranno visibili
