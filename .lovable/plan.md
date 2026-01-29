
# Piano: Business Card Digitale Nativa per Noscite

## Panoramica
Creeremo una pagina business card digitale mobile-first che sostituisce l'integrazione Kipin. La pagina sara accessibile tramite URL come `/card/sandrello` (senza `index.html`) e permettera di salvare il contatto direttamente nella rubrica del telefono.

---

## Struttura dell'URL
- **URL formato**: `https://noscite.it/card/:username`
- **Esempio**: `https://noscite.it/card/sandrello`
- Il parametro `username` identifica il profilo da mostrare

---

## Architettura Tecnica

### 1. Database - Tabella `business_cards`
Creeremo una tabella Supabase per memorizzare i dati delle business card:

```text
business_cards
├── id (uuid, PK)
├── username (text, UNIQUE) -- es. "sandrello"
├── first_name (text)
├── last_name (text)
├── title (text) -- es. "CEO & CO-founder"
├── company (text) -- es. "Noscite"
├── tagline (text) -- es. "L'AI non cambia cio che facciamo..."
├── vat_number (text) -- P.IVA
├── email (text)
├── phone (text)
├── mobile (text)
├── website (text)
├── address (text)
├── photo_url (text) -- URL della foto profilo
├── linkedin_url (text)
├── whatsapp_number (text)
├── facebook_url (text)
├── instagram_url (text)
├── twitter_url (text)
├── is_active (boolean)
├── created_at (timestamp)
└── updated_at (timestamp)
```

### 2. Componente React - `DigitalBusinessCard`
Una pagina React dedicata che:
- Legge lo `username` dall'URL
- Recupera i dati dal database
- Mostra la card con design mobile-first
- Genera e scarica il file vCard

### 3. Routing
Aggiornare `src/App.tsx`:
```tsx
<Route path="/card/:username" element={<DigitalBusinessCard />} />
```

---

## Design della Card (Mobile-First)

Basato sullo screenshot Kipin:

```text
┌────────────────────────────────────┐
│     [Sfondo gradient turchese]     │
│                                    │
│  ┌────────────────────────────┐   │
│  │                            │   │
│  │      ┌──────────┐         │   │
│  │      │  FOTO    │         │   │
│  │      │ PROFILO  │         │   │
│  │      └──────────┘         │   │
│  │                            │   │
│  │    Stefano Andrello       │   │
│  │    CEO & CO-founder       │   │
│  │        Noscite            │   │
│  │                            │   │
│  │    "L'AI non cambia..."   │   │
│  │                            │   │
│  │  📄 P.IVA: 14385240966    │   │
│  │  📧 sandrello@noscite.it  │   │
│  │  📞 3476859801            │   │
│  │  🌐 Noscite.it            │   │
│  │                            │   │
│  │    [in] [wa] [fb]         │   │
│  │                            │   │
│  │ ┌──────────────────────┐  │   │
│  │ │ Aggiungimi alla      │  │   │
│  │ │     rubrica          │  │   │
│  │ └──────────────────────┘  │   │
│  │                            │   │
│  └────────────────────────────┘   │
│                                    │
└────────────────────────────────────┘
```

---

## File da Creare/Modificare

| File | Azione | Descrizione |
|------|--------|-------------|
| `src/pages/DigitalBusinessCard.tsx` | CREA | Componente principale della business card |
| `src/App.tsx` | MODIFICA | Aggiungere route `/card/:username` |
| Database migration | CREA | Tabella `business_cards` |
| `public/_redirects` | MODIFICA | Rimuovere redirect Kipin obsoleti |
| `src/pages/KipinConnector.tsx` | ELIMINA | Non piu necessario |
| `src/pages/KipinCard.tsx` | ELIMINA | Non piu necessario |
| `public/card/` | ELIMINA | Cartella statica non piu necessaria |

---

## Funzionalita Implementate

### Download vCard
Il pulsante "Aggiungimi alla rubrica" generera un file `.vcf` contenente:
- Nome e cognome
- Azienda e ruolo
- Email e telefono
- Sito web
- Indirizzo (se presente)
- Link social

### Link Cliccabili
- **Email**: apre il client email con `mailto:`
- **Telefono**: apre il dialer con `tel:`
- **Sito web**: apre il sito in una nuova tab
- **Social**: apertura diretta delle app/siti

### Mobile-Friendly
- Layout responsive ottimizzato per smartphone
- Pulsante grande e facilmente cliccabile
- Icone touch-friendly

---

## Sezione Tecnica

### Struttura del Componente DigitalBusinessCard

```tsx
// Struttura principale
const DigitalBusinessCard = () => {
  const { username } = useParams<{ username: string }>();
  const [card, setCard] = useState<BusinessCard | null>(null);
  
  // Fetch dati dal database
  useEffect(() => {
    fetchBusinessCard(username);
  }, [username]);
  
  // Genera vCard per download
  const generateVCard = () => { ... };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary/80">
      <div className="max-w-md mx-auto p-4">
        <Card className="rounded-3xl overflow-hidden">
          {/* Foto profilo */}
          {/* Nome e titolo */}
          {/* Informazioni di contatto */}
          {/* Link social */}
          {/* Pulsante download vCard */}
        </Card>
      </div>
    </div>
  );
};
```

### Generazione vCard (formato standard)
```tsx
const generateVCard = () => {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${card.last_name};${card.first_name};;;`,
    `FN:${card.first_name} ${card.last_name}`,
    `ORG:${card.company}`,
    `TITLE:${card.title}`,
    `EMAIL:${card.email}`,
    `TEL;TYPE=CELL:${card.mobile || card.phone}`,
    `URL:${card.website}`,
    card.linkedin_url && `X-SOCIALPROFILE;TYPE=linkedin:${card.linkedin_url}`,
    "END:VCARD"
  ].filter(Boolean).join("\r\n");
  
  // Trigger download
  const blob = new Blob([vcard], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${card.first_name}_${card.last_name}.vcf`;
  link.click();
};
```

---

## Dati Iniziali - Profilo "sandrello"

Inseriremo i dati mostrati nello screenshot:

| Campo | Valore |
|-------|--------|
| username | sandrello |
| first_name | Stefano |
| last_name | Andrello |
| title | CEO & CO-founder |
| company | Noscite |
| tagline | L'AI non cambia cio che facciamo. Cambia cio che possiamo immaginare di fare. |
| vat_number | 14385240966 |
| email | sandrello@noscite.it |
| phone | 3476859801 |
| website | noscite.it |
| photo_url | (da caricare) |
| linkedin_url | (da configurare) |

---

## Risultato Finale

Dopo l'implementazione:
1. URL accessibile: `https://noscite.it/card/sandrello`
2. Pagina mobile-friendly con design professionale
3. Pulsante "Aggiungimi alla rubrica" che salva il contatto
4. Link cliccabili per email, telefono e social
5. Nessuna dipendenza da servizi esterni (Kipin)
6. Possibilita di creare nuove card dal pannello admin
