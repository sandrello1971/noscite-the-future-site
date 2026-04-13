

# Ottimizzazione Performance

## Problemi
1. Bundle monolitico: tutte le pagine caricate insieme, nessun code splitting
2. Video hero con `preload="auto"` scarica l'intero MP4 subito
3. Nessun `loading="lazy"` sulle immagini
4. Console.log rimasti in produzione nel Hero

## Correzioni

### 1. Code splitting con React.lazy (App.tsx)
Convertire tutti gli import delle pagine in `React.lazy()` e wrappare `<Routes>` in `<Suspense>`. Riduce il bundle iniziale del 50-70%.

### 2. Video hero ottimizzato (Hero.tsx)
- Cambiare `preload="auto"` → `preload="none"` 
- Usare Intersection Observer per caricare il video solo quando visibile
- Rimuovere i `console.log`

### 3. Lazy loading immagini
Aggiungere `loading="lazy"` alle immagini below-the-fold nei componenti principali (Partners, Testimonials, ecc.)

### Dettagli tecnici

**File modificati:**
- `src/App.tsx` — lazy imports + Suspense wrapper con fallback
- `src/components/Hero.tsx` — preload="none", rimozione console.log
- Componenti con immagini — attributo `loading="lazy"`

