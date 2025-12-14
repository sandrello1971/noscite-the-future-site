-- Rendi il bucket blog-images pubblico per visualizzare le immagini negli articoli
UPDATE storage.buckets 
SET public = true 
WHERE id = 'blog-images';