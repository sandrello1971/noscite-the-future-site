

# Fix title tag troppo lungo (66 → ≤60 caratteri)

## Problema
Il title "Noscite - In Digitali Nova Virtus | Trasformazione Digitale con AI" è 66 caratteri. Google tronca a ~60, nascondendo "con AI".

## Soluzione
Accorciare il title mantenendo le keyword principali frontloaded.

**Proposta:** `"Noscite - Trasformazione Digitale e AI per PMI | Consulenza"` (59 caratteri)

Alternativa: `"Noscite - Innovazione Digitale e AI | In Digitali Nova Virtus"` (61 caratteri — borderline)

### File da modificare

1. **`index.html`** — `<title>` (riga 27), `<meta name="title">` (riga 28)
2. **`src/components/SEO.tsx`** — default della prop `title` (riga 13)
3. **`src/pages/Index.tsx`** — prop `title` nel componente SEO (riga 21)

Tutte modifiche testuali, nessun rischio di regressione.

