

# Analisi Privacy Policy e Cookie Policy - Lacune e Correzioni

## Lacune identificate

### 1. CRITICA: Manca checkbox di consenso privacy nel form contatti
Il `ContactForm.tsx` raccoglie dati personali (nome, email, telefono, azienda, messaggio) **senza alcun checkbox di consenso** al trattamento dei dati. Il GDPR richiede un consenso esplicito e dimostrabile prima della raccolta.

### 2. CRITICA: Manca checkbox di consenso nella newsletter
Il `NewsletterSubscription.tsx` raccoglie email **senza checkbox di consenso** al trattamento e senza link alla privacy policy. Anche qui serve consenso esplicito.

### 3. Manca menzione della newsletter nella Privacy Policy
La Privacy Policy non menziona la raccolta email per la newsletter tra le finalità del trattamento. Serve aggiungere la finalità "Invio di comunicazioni commerciali/newsletter" con base giuridica consenso (Art. 6.1.a).

### 4. Manca menzione del form contatti nella Privacy Policy
La raccolta dati tramite form di contatto non e esplicitamente descritta. Serve aggiungere la finalità "Gestione delle richieste di contatto".

### 5. Manca menzione dell'autenticazione utente
Il sito ha login/registrazione (`Auth.tsx`, `NosciteAdminAuth.tsx`) che raccoglie email e password via Supabase Auth. Questo trattamento non e descritto nella privacy policy.

### 6. Manca menzione dei biglietti da visita digitali
Il sistema di biglietti da visita raccoglie e pubblica dati personali (nome, email, telefono, foto, social). Non e menzionato.

### 7. Manca menzione del chatbot
Il chatbot salva conversazioni nel database. Questo trattamento non e descritto.

### 8. Indirizzo sede incoerente
- Privacy Policy: "Via Monte Grappa 13, 20094 Corsico (MI)"
- Cookie Policy: "Via Monte Grappa 13, 20094 Corsico (MI)" (OK, coerente)
- ContactForm: "Via dell'Innovazione 123, 20100 Milano" (ERRATO/DIVERSO)

### 9. Email di contatto privacy incoerente
- Privacy Policy usa: `info@noscite.it`
- Cookie Policy usa: `privacy@noscite.it`
- Dovrebbe essere uniforme

### 10. Manca la P.IVA nella Privacy Policy
La P.IVA 14385240966 appare nel footer ma non nella Privacy Policy dove e richiesta l'identificazione completa del Titolare.

### 11. Cookie Banner: il pulsante X chiude il banner senza consenso
Il banner cookie ha un pulsante X (riga 277) che chiude il banner senza registrare alcuna scelta. Secondo le linee guida del Garante italiano, lo scroll o la chiusura del banner non equivalgono a consenso, ma il banner non dovrebbe sparire senza una scelta esplicita.

---

## Piano di correzione

### Passo 1: Aggiungere checkbox consenso al ContactForm
- Aggiungere un campo checkbox obbligatorio con testo: "Ho letto e accetto la Privacy Policy" con link
- Impedire l'invio senza spunta

### Passo 2: Aggiungere checkbox consenso alla NewsletterSubscription
- Aggiungere checkbox obbligatorio con link alla Privacy Policy
- Sia per variante "default" che "footer"

### Passo 3: Aggiornare la Privacy Policy
- Aggiungere P.IVA del Titolare
- Aggiungere finalita: form contatti, newsletter, autenticazione, biglietti da visita, chatbot
- Uniformare email di contatto (scegliere tra info@ e privacy@)
- Aggiornare data ultima modifica

### Passo 4: Correggere indirizzo nel ContactForm
- Allineare l'indirizzo alla sede reale: Via Monte Grappa 13, 20094 Corsico (MI)

### Passo 5: Correggere cookie banner
- Rimuovere il pulsante X dal banner iniziale (prima del consenso)
- L'utente deve scegliere esplicitamente "Accetta tutto", "Rifiuta tutto" o "Gestisci preferenze"

### Dettagli tecnici

**File modificati:**
- `src/components/ContactForm.tsx` - checkbox consenso + correzione indirizzo
- `src/components/NewsletterSubscription.tsx` - checkbox consenso
- `src/pages/PrivacyPolicy.tsx` - sezioni mancanti + P.IVA + data aggiornamento
- `src/components/CookieBanner.tsx` - rimuovere X dal banner iniziale

