

# Fix meta description troncata — Crawlability SPA

## Problema
I crawler leggono la meta description dall'HTML statico di `index.html` prima che React la sovrascriva. La description in `index.html` contiene un apostrofo tipografico (`l'intelligenza`) che alcuni parser interpretano come fine stringa, troncando a 41 caratteri.

## Soluzione

### File: `index.html`
1. **Riscrivere la meta description** evitando apostrofi e mantenendola sotto 155 caratteri, con CTA e keyword frontloaded:
   - Attuale: `"Trasformiamo le PMI italiane attraverso l'intelligenza artificiale: formazione Athenaeum AI, consulenza strategica, implementazione. Metodo strutturato con ROI misurabile."`
   - Nuova: `"Innovazione digitale e AI per PMI italiane: consulenza strategica, formazione Athenaeum AI, implementazione con ROI misurabile. Scopri il metodo Noscite."`
2. **Aggiornare anche la OG description e Twitter description** con lo stesso testo (righe 45 e 53)
3. **Aggiornare il tag `<meta name="title">`** per coerenza

### File: `src/components/SEO.tsx`
4. **Aggiornare il default** della prop `description` per allinearlo alla nuova description (evitando apostrofi)

### File: `src/pages/Index.tsx`
5. Nessuna modifica necessaria — la description della homepage è già corretta e senza apostrofi

## Dettagli tecnici
3 file, solo modifiche testuali ai meta tag. Nessun rischio di regressione.

