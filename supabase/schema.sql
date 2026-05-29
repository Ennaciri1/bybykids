-- ============================================================
-- BybykidsStore — Supabase PostgreSQL Schema
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Categories ──────────────────────────────────────────────
CREATE TABLE categories (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  image_url   TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── Products ─────────────────────────────────────────────────
CREATE TABLE products (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id  UUID REFERENCES categories(id) ON DELETE SET NULL,
  name         TEXT NOT NULL,
  slug         TEXT NOT NULL UNIQUE,
  description  TEXT,
  price        NUMERIC(10,2) NOT NULL,
  old_price    NUMERIC(10,2),
  images       TEXT[] DEFAULT '{}',
  is_featured  BOOLEAN DEFAULT FALSE,
  is_active    BOOLEAN DEFAULT TRUE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── Product Variants ─────────────────────────────────────────
CREATE TABLE product_variants (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  size        TEXT NOT NULL,
  color       TEXT NOT NULL,
  stock       INTEGER NOT NULL DEFAULT 0,
  sku         TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── Orders ───────────────────────────────────────────────────
CREATE TABLE orders (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number     TEXT NOT NULL UNIQUE,
  customer_name    TEXT NOT NULL,
  customer_phone   TEXT NOT NULL,
  customer_city    TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  customer_notes   TEXT,
  subtotal         NUMERIC(10,2) NOT NULL,
  delivery_fee     NUMERIC(10,2) NOT NULL DEFAULT 0,
  total            NUMERIC(10,2) NOT NULL,
  payment_method   TEXT NOT NULL DEFAULT 'cash_on_delivery',
  status           TEXT NOT NULL DEFAULT 'new'
                   CHECK (status IN ('new','confirmed','preparing','shipped','delivered','cancelled')),
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ── Order Items ──────────────────────────────────────────────
CREATE TABLE order_items (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id      UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id    UUID REFERENCES products(id) ON DELETE SET NULL,
  variant_id    UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  product_name  TEXT NOT NULL,
  size          TEXT NOT NULL,
  color         TEXT NOT NULL,
  quantity      INTEGER NOT NULL,
  unit_price    NUMERIC(10,2) NOT NULL,
  total_price   NUMERIC(10,2) NOT NULL
);

-- ── Store Settings ───────────────────────────────────────────
CREATE TABLE store_settings (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  store_name     TEXT NOT NULL DEFAULT 'BybykidsStore',
  phone          TEXT,
  whatsapp       TEXT,
  delivery_fee   NUMERIC(10,2) NOT NULL DEFAULT 30,
  facebook_url   TEXT,
  instagram_url  TEXT,
  tiktok_url     TEXT
);

-- Insert default settings row
INSERT INTO store_settings (store_name, phone, whatsapp, delivery_fee)
VALUES ('BybykidsStore', '+212600000000', '+212600000000', 30);

-- ── Indexes ──────────────────────────────────────────────────
CREATE INDEX idx_products_category    ON products(category_id);
CREATE INDEX idx_products_slug        ON products(slug);
CREATE INDEX idx_products_featured    ON products(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_products_active      ON products(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_variants_product     ON product_variants(product_id);
CREATE INDEX idx_orders_status        ON orders(status);
CREATE INDEX idx_orders_phone         ON orders(customer_phone);
CREATE INDEX idx_order_items_order    ON order_items(order_id);

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE categories        ENABLE ROW LEVEL SECURITY;
ALTER TABLE products          ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants  ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders            ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items       ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_settings    ENABLE ROW LEVEL SECURITY;

-- ── Categories: public read, admin write ─────────────────────
CREATE POLICY "categories_public_read"
  ON categories FOR SELECT USING (true);

CREATE POLICY "categories_admin_all"
  ON categories FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ── Products: public read active only, admin full access ─────
CREATE POLICY "products_public_read"
  ON products FOR SELECT USING (is_active = TRUE);

CREATE POLICY "products_admin_all"
  ON products FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ── Product Variants: public read, admin write ───────────────
CREATE POLICY "variants_public_read"
  ON product_variants FOR SELECT USING (true);

CREATE POLICY "variants_admin_all"
  ON product_variants FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ── Orders: customers can insert, admin can read/update ──────
CREATE POLICY "orders_public_insert"
  ON orders FOR INSERT WITH CHECK (true);

CREATE POLICY "orders_admin_all"
  ON orders FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ── Order Items: customers insert, admin reads ────────────────
CREATE POLICY "order_items_public_insert"
  ON order_items FOR INSERT WITH CHECK (true);

CREATE POLICY "order_items_admin_all"
  ON order_items FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ── Store Settings: public read, admin write ─────────────────
CREATE POLICY "settings_public_read"
  ON store_settings FOR SELECT USING (true);

CREATE POLICY "settings_admin_all"
  ON store_settings FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================================
-- Storage bucket for product images
-- ============================================================
-- Run this in Supabase Dashboard → Storage → New bucket
-- Or via SQL (requires storage extension):
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "product_images_public_read"
  ON storage.objects FOR SELECT USING (bucket_id = 'products');

CREATE POLICY "product_images_admin_upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'products' AND auth.role() = 'authenticated');

CREATE POLICY "product_images_admin_delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'products' AND auth.role() = 'authenticated');
