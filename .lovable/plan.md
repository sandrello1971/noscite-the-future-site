

# Audit accessibilità WCAG 2.1 AA — Risultati e piano di correzione

## Issues identificate

### 1. Video Hero: autoplay senza controlli accessibili (WCAG 2.2.2)
Il video in `Hero.tsx` (riga 11-21) usa `autoPlay` nativo senza alcun controllo play/pause visibile. Il componente `AccessibleVideo` esiste ma NON viene usato nella Hero — viene usato un `<video>` nudo. Utenti con epilessia, ADHD o preferenza `prefers-reduced-motion` non possono fermarlo.

### 2. Icone decorative senza `aria-hidden="true"` (WCAG 1.1.1)
Tutte le icone Lucide nei componenti Identitas, Methodus, Valor, Contactus, Partners e Footer mancano di `aria-hidden="true"`. Gli screen reader le annunciano come contenuto vuoto o generico, creando rumore.

### 3. Link contatto senza testo accessibile esplicito (WCAG 2.4.4)
In `Contactus.tsx`, i link wrappano intere Card ma non hanno `aria-label` — lo screen reader legge tutto il contenuto della card come testo del link, risultando confuso.

### 4. Animazione `animate-pulse` sulla timeline (WCAG 2.3.1)
In `Methodus.tsx` riga 81, i nodi della timeline hanno `animate-pulse` infinito. Può essere problematico per utenti con sensibilità al movimento.

### 5. Cookie banner: toggle buttons senza `role` e `aria-pressed` (WCAG 4.1.2)
I pulsanti "Attivo/Disattivo" nel pannello preferenze cookie usano `<Button>` senza `aria-pressed` — lo stato on/off non è comunicato agli screen reader.

---

## Piano di correzione

### File: `src/components/Hero.tsx`
- Sostituire il `<video>` nudo con il componente `AccessibleVideo` già esistente, oppure aggiungere rispetto per `prefers-reduced-motion` e controlli play/pause.

### File: `src/components/Identitas.tsx`, `Methodus.tsx`, `Valor.tsx`, `Contactus.tsx`, `Footer.tsx`, `Partners.tsx`
- Aggiungere `aria-hidden="true"` a tutte le icone decorative Lucide.

### File: `src/components/Contactus.tsx`
- Aggiungere `aria-label` descrittivi ai link delle card contatto (es. `aria-label="Invia email a info@noscite.it"`).

### File: `src/components/Methodus.tsx`
- Wrappare `animate-pulse` in una media query `prefers-reduced-motion: no-preference` o rimuoverlo.

### File: `src/components/CookieBanner.tsx`
- Aggiungere `aria-pressed={preferences.analytics}` (e simili) ai pulsanti toggle delle preferenze cookie.
- Aggiungere `role="dialog"` e `aria-modal="true"` al pannello preferenze overlay.

---

## Dettagli tecnici

Circa 6 file da modificare. Nessuna dipendenza aggiuntiva. Nessun rischio di regressione visiva — solo attributi ARIA e logica CSS per reduced motion.

