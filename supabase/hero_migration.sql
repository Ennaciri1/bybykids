-- ============================================================
-- Hero settings migration — run once in Supabase SQL Editor
-- ============================================================

ALTER TABLE store_settings
  ADD COLUMN IF NOT EXISTS hero_badge    TEXT    DEFAULT 'Nouvelle collection 2026',
  ADD COLUMN IF NOT EXISTS hero_title    TEXT    DEFAULT 'Vêtements bébé & enfant au Maroc',
  ADD COLUMN IF NOT EXISTS hero_subtitle TEXT    DEFAULT 'Des tenues douces, pratiques et adorables pour tous les jours.',
  ADD COLUMN IF NOT EXISTS hero_cta_label TEXT   DEFAULT 'Voir la collection',
  ADD COLUMN IF NOT EXISTS hero_cta_href  TEXT   DEFAULT '/shop',
  ADD COLUMN IF NOT EXISTS hero_video_url TEXT;

-- Create media storage bucket for hero video
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "media_public_read"
  ON storage.objects FOR SELECT USING (bucket_id = 'media');

CREATE POLICY "media_admin_upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');

CREATE POLICY "media_admin_delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'media' AND auth.role() = 'authenticated');
