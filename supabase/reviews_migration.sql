-- ── Reviews table ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  UUID        NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  author_name TEXT        NOT NULL,
  rating      INTEGER     NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment     TEXT        NOT NULL,
  is_approved BOOLEAN     DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Public: lire uniquement les avis approuvés
CREATE POLICY "reviews_public_read" ON reviews
  FOR SELECT USING (is_approved = true);

-- Public: soumettre un avis (guests inclus)
CREATE POLICY "reviews_public_insert" ON reviews
  FOR INSERT WITH CHECK (true);

-- Admin authentifié: accès complet
CREATE POLICY "reviews_admin_all" ON reviews
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Index pour les requêtes par produit
CREATE INDEX IF NOT EXISTS reviews_product_id_idx ON reviews(product_id);
CREATE INDEX IF NOT EXISTS reviews_approved_idx ON reviews(is_approved, created_at DESC);
