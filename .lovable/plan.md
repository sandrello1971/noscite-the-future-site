

# Valutazione suggerimenti SEO, Performance, Accessibilità e Content

## 1. SEO — Implementare SSR con Next.js/Nuxt.js
**Verdetto: NON fattibile su Lovable**

Lovable supporta esclusivamente React + Vite (SPA). Non è possibile migrare a Next.js o Nuxt.js — il framework è vincolato. Tuttavia il problema della crawlability per motori semantici (Perplexity) è reale e va affrontato con gli strumenti disponibili:

**Già implementato:**
- `public/llms.txt` con contenuti machine-readable completi
- `robots.txt` con permessi espliciti per GPTBot, ClaudeBot, PerplexityBot
- Schema JSON-LD interconnessi (Organization, WebSite, Course, FAQ, BlogPosting, speakable)
- Sitemap statica con tutte le pagine
- Meta tag completi in `index.html`

**Azioni possibili (senza SSR):**
- Aggiungere `<noscript>` con contenuto testuale per ogni sezione principale direttamente in `index.html` — così i crawler che non eseguono JS trovano i contenuti chiave
- Usare `react-snap` o `vite-plugin-prerender` per generare HTML statico pre-renderizzato al build time per le pagine principali

**Raccomandazione:** Implementare pre-rendering statico al build time con `vite-plugin-prerender` per le ~10 pagine principali. Questo risolve la crawlability senza cambiare framework.

---

## 2. Performance — Audit PageSpeed e ottimizzazioni
**Verdetto: PARZIALMENTE già fatto**

**Già implementato:**
- Code splitting con `React.lazy()` per tutte le rotte
- Chunk splitting vendor (React, Router, Query, Supabase, UI)
- Font loading non-blocking con preload
- `preload="metadata"` su video
- `decoding="async"` e dimensioni esplicite su immagini partner
- CSS minification e target ES2020

**Azioni residue possibili:**
- Compressione Brotli/gzip (dipende dall'hosting Lovable — già gestito a livello infrastrutturale)
- CDN: Lovable hosting usa già CDN, non configurabile dall'utente
- Google Search Console e PageSpeed Insights: sono strumenti esterni che il cliente deve configurare sul proprio dominio `noscite.it`, non implementabili da codice

**Raccomandazione:** Le ottimizzazioni lato codice sono già al massimo ragionevole per una SPA Vite. Per i dati PageSpeed, il cliente deve eseguire un test su `https://pagespeed.web.dev/` col dominio pubblicato e configurare Search Console.

---

## 3. Accessibilità — WCAG 2.1 AA
**Verdetto: GIÀ COMPLETATO**

Nelle ultime due iterazioni sono state applicate correzioni complete:
- `aria-hidden="true"` su tutte le icone decorative (10+ componenti)
- `aria-labelledby` su tutte le sezioni con landmark
- Focus trap e gestione Escape nel menu mobile
- `aria-pressed` e `role="dialog"` nel cookie banner
- `AccessibleVideo` con play/pause e `prefers-reduced-motion`
- `aria-label` su link contatto
- `motion-safe:animate-pulse` per sensibilità al movimento
- `tabIndex={0}` e `role="article"` su card interattive

**Raccomandazione:** Nessuna azione ulteriore necessaria lato codice. Test con screen reader reali (VoiceOver, NVDA) consigliati al cliente.

---

## 4. Content — Pillar articles
**Verdetto: NON è un task di sviluppo**

Il Commentarium (blog) esiste già con editor completo e generazione AI integrata. Creare 5-7 pillar article è un'attività editoriale, non tecnica. Il sistema supporta già:
- Editor ricco con immagini
- Generazione AI contenuti (gpt-4o-mini)
- Schema BlogPosting con speakable
- Categorizzazione e tag

**Raccomandazione:** Il cliente può usare l'admin dashboard esistente per creare i contenuti. Non serve sviluppo aggiuntivo.

---

## Unica azione implementabile: Pre-rendering statico

L'unico intervento tecnico con impatto reale è aggiungere pre-rendering al build time per risolvere la crawlability SPA. Piano:

1. **Installare `vite-plugin-prerender`** (o `vite-plugin-ssr-prerender`)
2. **Configurare in `vite.config.ts`** il pre-rendering delle pagine principali: `/`, `/servizi`, `/percorsi`, `/chi-siamo`, `/contatti`, `/commentarium`, `/risorse`, `/profilum-societatis`, `/valor`, `/historiae`
3. **Verificare** che l'HTML generato contenga i meta tag e il contenuto testuale delle sezioni

Questo genera file HTML statici con contenuto reale per ogni rotta al momento del build, risolvendo il problema Perplexity/crawler senza SSR.

### Nota tecnica importante
`vite-plugin-prerender` potrebbe non funzionare correttamente nell'ambiente sandbox di Lovable (richiede headless Chromium al build time). Un'alternativa più leggera è espandere il blocco `<noscript>` in `index.html` con contenuto strutturato per ogni pagina — meno elegante ma funzionale per i crawler.

Vuoi procedere con il pre-rendering statico o con l'approccio `<noscript>` espanso?

