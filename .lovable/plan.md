

# Fix: Biglietto da visita non accessibile pubblicamente

## Problema
La vista `business_cards_public` usa `security_invoker = true`, il che significa che esegue le query con i permessi del chiamante. Gli utenti anonimi (visitatori del sito pubblicato) hanno ruolo `anon`, ma la tabella `business_cards` ha solo policy che permettono l'accesso agli admin. Risultato: "Profilo non trovato".

## Soluzione
Aggiungere una policy RLS sulla tabella `business_cards` che permetta ai ruoli `anon` e `authenticated` di leggere (SELECT) solo i record attivi (`is_active = true`). Questo è sicuro perché la vista `business_cards_public` già esclude i campi sensibili (email, phone, address).

## Dettagli tecnici

### Migrazione SQL
```sql
CREATE POLICY "Public can read active business cards"
ON public.business_cards
FOR SELECT
TO anon, authenticated
USING (is_active = true);
```

Questa singola migrazione risolve il problema. Nessuna modifica al codice frontend necessaria.

