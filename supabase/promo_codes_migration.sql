-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS promo_codes (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  code        TEXT        UNIQUE NOT NULL,
  type        TEXT        NOT NULL DEFAULT 'percent',  -- 'percent' or 'fixed'
  value       NUMERIC     NOT NULL,                    -- percent (5-100) or MAD amount
  min_order   NUMERIC     NOT NULL DEFAULT 0,          -- minimum subtotal to apply
  max_uses    INTEGER     DEFAULT NULL,                -- NULL = unlimited
  uses_count  INTEGER     NOT NULL DEFAULT 0,
  is_active   BOOLEAN     NOT NULL DEFAULT true,
  expires_at  TIMESTAMPTZ DEFAULT NULL,
  created_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;

-- Public (anon) can read active codes — needed for checkout validation
CREATE POLICY "promo_codes_public_select" ON promo_codes
  FOR SELECT USING (is_active = true);

-- Authenticated (admin) can do everything
CREATE POLICY "promo_codes_admin_all" ON promo_codes
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Function to safely increment uses_count (SECURITY DEFINER bypasses RLS)
CREATE OR REPLACE FUNCTION increment_promo_uses(code_id UUID)
RETURNS void LANGUAGE sql SECURITY DEFINER AS $$
  UPDATE promo_codes SET uses_count = uses_count + 1 WHERE id = code_id;
$$;
