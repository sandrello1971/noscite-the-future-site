

# Piano di Ottimizzazione SEO e GEO per Noscite.it

## Panoramica
Il sito ha già una solida base SEO ma necessita di ottimizzazioni specifiche per la **Generative Engine Optimization (GEO)** - ovvero l'ottimizzazione per i motori di ricerca basati su AI come ChatGPT, Perplexity, Claude e Google AI Overviews.

---

## Fase 1: Configurazione Bot AI
**Obiettivo:** Permettere ai crawler AI di indicizzare correttamente il sito

### 1.1 Aggiornamento `robots.txt`
Aggiungere regole per i principali bot AI:
- GPTBot (OpenAI/ChatGPT)
- ChatGPT-User (ChatGPT browsing)
- ClaudeBot (Anthropic)
- PerplexityBot (Perplexity)
- cohere-ai (Cohere)
- anthropic-ai (Anthropic)

### 1.2 Creazione `llms.txt`
Nuovo file standard che aiuta i modelli AI a comprendere la struttura del sito:
- Chi è Noscite
- Servizi principali
- Pagine chiave con brevi descrizioni
- Come contattare

---

## Fase 2: Schema Markup Avanzati
**Obiettivo:** Rendere i contenuti più comprensibili e citabili dalle AI

### 2.1 Schema "Speakable"
Aggiungere markup `speakable` alle sezioni chiave che le AI possono citare direttamente:
- Hero section della homepage
- Descrizioni servizi
- FAQ

### 2.2 Schema `Article` e `BlogPosting` per il Blog
Creare schema dinamici per ogni articolo del Commentarium con:
- author, datePublished, dateModified
- headline, description, articleBody
- image, publisher

### 2.3 Interconnessione Schema con @id
Collegare tutti gli schema JSON-LD usando riferimenti `@id` per creare un knowledge graph strutturato.

### 2.4 Completamento Schema Organization
Aggiungere i link social effettivi nell'array `sameAs`:
- LinkedIn, Facebook, Instagram

---

## Fase 3: Aggiornamenti Sitemap e Meta
**Obiettivo:** Garantire indicizzazione completa

### 3.1 Aggiornamento Sitemap
Aggiungere:
- `/commentarium` (lista blog)
- Articoli dinamici del blog
- Pagine mancanti (jooice, scanner, card)
- Aggiornare lastmod alle date correnti

### 3.2 OG Image Personalizzata
Sostituire l'immagine Lovable generica con un'immagine brandizzata Noscite per social sharing.

---

## Fase 4: Ottimizzazione Contenuti per AI (Opzionale)
**Obiettivo:** Rendere i contenuti più "citabili" dalle AI

### 4.1 Struttura FAQ-Friendly
Ristrutturare le FAQ esistenti con:
- Domande come intestazioni H3
- Risposte concise e dirette nei primi 2-3 righe

### 4.2 Statistiche e Definizioni
Aggiungere dati numerici e definizioni chiare che le AI possono citare facilmente.

---

## Dettagli Tecnici

### File da Creare
| File | Descrizione |
|------|-------------|
| `public/llms.txt` | Guida per crawler AI |

### File da Modificare
| File | Modifiche |
|------|-----------|
| `public/robots.txt` | Aggiungere bot AI |
| `public/sitemap.xml` | Aggiungere pagine mancanti |
| `src/components/StructuredData.tsx` | Aggiungere schema speakable, article, @id |
| `src/pages/CommentariumPost.tsx` | Aggiungere schema BlogPosting dinamico |
| `src/components/SEO.tsx` | Supporto OG image personalizzata |
| `index.html` | Aggiornare sameAs con link social |

### Risultato Atteso
- Maggiore probabilità di essere citati da ChatGPT, Perplexity, Claude
- Miglior visibilità in Google AI Overviews
- Rich snippets più completi
- Knowledge graph strutturato e interconnesso

