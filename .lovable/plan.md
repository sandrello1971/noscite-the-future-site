

# Aggiunta sezione AI Agentica e MCP alla pagina Servizi

## Cosa viene aggiunto
Una nuova sezione "Agenti AI che rispondono a chi li ha costruiti" con tre pillole (Card) che spiegano la connessione strutturata via MCP, l'orchestrazione con governance, e il presidio umano by design. Chiude con una CTA verso `/contatti`.

## Posizione
Dopo la sezione "Tecnologia: vendor-neutral, pragmatica" (riga 465) e prima di "Come lavoriamo insieme" (riga 468). Si inserisce naturalmente come approfondimento tecnologico.

## Dettagli tecnici

**File: `src/pages/Servizi.tsx`**

- Aggiungere import di tre icone Lucide: `Link2`, `Compass`, `Hand`
- Inserire una nuova `<section>` tra le righe 465 e 467 con:
  - Headline: "Agenti AI che rispondono a chi li ha costruiti"
  - Tre Card in griglia `md:grid-cols-3` con:
    1. **Connessione strutturata** (icona `Link2`) — testo su MCP e collegamento a CRM, ERP, calendari, archivi
    2. **Orchestrazione con senso** (icona `Compass`) — testo sul layer Gubernator di governance
    3. **Presidio umano by design** (icona `Hand`) — testo sul controllo umano ai nodi sensibili
  - CTA Button verso `/contatti`: "Scopri come costruiamo sistemi AI controllabili"

Nessun altro file da modificare.

