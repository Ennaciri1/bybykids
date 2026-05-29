-- Run this in your Supabase SQL Editor

-- 1. Decrement stock when an order is placed (SECURITY DEFINER bypasses RLS for anon)
CREATE OR REPLACE FUNCTION decrement_stock(variant_id UUID, qty INTEGER)
RETURNS void LANGUAGE sql SECURITY DEFINER AS $$
  UPDATE product_variants
  SET stock = GREATEST(0, stock - qty)
  WHERE id = variant_id;
$$;

-- 2. Order tracking — lets customers look up their order by order number + phone
CREATE OR REPLACE FUNCTION track_order(p_order_number TEXT, p_phone TEXT)
RETURNS TABLE(
  order_number  TEXT,
  status        TEXT,
  created_at    TIMESTAMPTZ,
  customer_name TEXT,
  customer_city TEXT,
  subtotal      NUMERIC,
  delivery_fee  NUMERIC,
  total         NUMERIC
) LANGUAGE sql SECURITY DEFINER AS $$
  SELECT order_number, status, created_at, customer_name, customer_city,
         subtotal, delivery_fee, total
  FROM orders
  WHERE order_number = p_order_number
    AND customer_phone = p_phone
  LIMIT 1;
$$;
