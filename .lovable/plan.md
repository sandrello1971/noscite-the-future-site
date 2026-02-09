

# Caricamento foto per Biglietti da Visita

## Cosa faremo

Sostituire il campo "URL Foto Profilo" (dove devi incollare un link) con un pulsante di upload che ti permette di scegliere un'immagine dal tuo computer. La foto verra salvata in modo sicuro e mostrata in anteprima nel form.

## Passaggi

### 1. Creare un bucket di storage dedicato
Creeremo un bucket Supabase chiamato `business-card-photos` con accesso pubblico in lettura (le foto devono essere visibili a tutti sulla card pubblica) ma scrittura riservata agli admin.

### 2. Aggiornare il form di gestione
Nel componente `BusinessCardManager.tsx`, il campo testuale "URL Foto Profilo" verra sostituito con:
- Un input file che accetta solo immagini (jpg, png, webp)
- Un'anteprima circolare della foto caricata
- Un pulsante per rimuovere la foto
- Indicatore di caricamento durante l'upload

Il flusso sara: selezioni l'immagine -> viene caricata nel bucket -> il campo `photo_url` viene aggiornato automaticamente con l'URL pubblico.

---

## Dettagli tecnici

### Database migration
```sql
-- Bucket pubblico per le foto dei biglietti
INSERT INTO storage.buckets (id, name, public) VALUES ('business-card-photos', 'business-card-photos', true);

-- Solo admin possono caricare/modificare/eliminare
CREATE POLICY "Admin upload business card photos" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'business-card-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin update business card photos" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'business-card-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin delete business card photos" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'business-card-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public read business card photos" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'business-card-photos');
```

### Modifiche a BusinessCardManager.tsx
- Aggiungere stato `uploading` e ref per input file
- Funzione `handlePhotoUpload`: upload a Supabase Storage, genera URL pubblico, aggiorna `form.photo_url`
- Funzione `handlePhotoRemove`: elimina file dal bucket e resetta `photo_url`
- Sostituire il campo input testuale con: anteprima avatar + bottoni Upload/Rimuovi
- Limitare dimensione file a 2MB e accettare solo `image/*`

