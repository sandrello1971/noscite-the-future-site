

# Audit WCAG 2.1 AA — Correzioni residue

## Stato attuale
Le correzioni precedenti hanno coperto Hero (AccessibleVideo), Identitas, Methodus, Valor, Contactus, Footer e CookieBanner. Restano gap in altri componenti.

## Issues residue

### 1. Icone decorative senza `aria-hidden="true"`
- **Services.tsx** riga 85: 4 icone caratteristiche + 2 icone nei CTA
- **Atheneum.tsx** riga 57: 3 icone percorsi + 1 icona ArrowRight nel CTA
- **Historiae.tsx** riga 55: 3 icone storie
- **Testimonials.tsx** riga 48: icone Star (rating)

### 2. Partner logo alt text migliorabile
- **Partners.tsx**: `alt={\`${partner.name} logo\`}` è accettabile ma potrebbe essere più descrittivo: `alt={\`Logo del partner ${partner.name}\`}`

### 3. Sezioni senza landmark `aria-label`
Nessuna `<section>` ha `aria-label` o `aria-labelledby` — gli screen reader non possono distinguere le sezioni durante la navigazione per landmark.

### 4. Navigazione tastiera: focus visibile su card hover-lift
Le card con `hover-lift` e `cursor-pointer` (Atheneum) non sono focusable da tastiera e non hanno `tabIndex` né `role`.

### 5. Header mobile menu: focus trap assente
Quando il menu mobile si apre, il focus non è intrappolato — l'utente può tabulare fuori dal menu overlay.

---

## Piano di correzione

### File: `src/components/Services.tsx`
- Aggiungere `aria-hidden="true"` alle 6 icone Lucide decorative

### File: `src/components/Atheneum.tsx`
- Aggiungere `aria-hidden="true"` alle 4 icone Lucide decorative
- Aggiungere `tabIndex={0}` e `role="article"` alle card percorsi

### File: `src/components/Historiae.tsx`
- Aggiungere `aria-hidden="true"` alle 3 icone decorative

### File: `src/components/Testimonials.tsx`
- Aggiungere `aria-hidden="true"` alle icone Star
- Aggiungere `aria-label={\`Valutazione: ${testimonial.rating} stelle su 5\`}` al contenitore rating

### File: `src/components/Identitas.tsx`, `Methodus.tsx`, `Valor.tsx`, `Contactus.tsx`, `Historiae.tsx`, `Atheneum.tsx`, `Services.tsx`, `Testimonials.tsx`, `Partners.tsx`
- Aggiungere `aria-labelledby` a ogni `<section>` collegato all'`id` del rispettivo `<h2>`/`<h3>`

### File: `src/components/Header.tsx`
- Aggiungere focus trap nel menu mobile: quando aperto, Escape chiude il menu e il focus torna al pulsante hamburger

---

## Dettagli tecnici
~10 file da modificare. Solo attributi ARIA, `tabIndex` e gestione focus da tastiera. Nessuna dipendenza aggiuntiva, nessun rischio di regressione visiva.

