-- Fix RLS policies to allow anonymous users to place orders
-- Run this in Supabase SQL Editor

-- orders: allow public insert
DROP POLICY IF EXISTS "orders_public_insert" ON orders;
CREATE POLICY "orders_public_insert" ON orders
  FOR INSERT WITH CHECK (true);

-- order_items: allow public insert
DROP POLICY IF EXISTS "order_items_public_insert" ON order_items;
CREATE POLICY "order_items_public_insert" ON order_items
  FOR INSERT WITH CHECK (true);

-- Also grant the anon role explicit permission (belt & suspenders)
GRANT INSERT ON orders TO anon;
GRANT INSERT ON order_items TO anon;
