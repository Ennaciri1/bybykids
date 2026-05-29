-- ============================================================
-- Helper SQL functions
-- ============================================================

-- Decrement stock for a product variant safely
CREATE OR REPLACE FUNCTION decrement_stock(variant_id UUID, qty INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE product_variants
  SET stock = GREATEST(0, stock - qty)
  WHERE id = variant_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execution to anon (customers can call this indirectly via order insert)
GRANT EXECUTE ON FUNCTION decrement_stock(UUID, INTEGER) TO anon;
GRANT EXECUTE ON FUNCTION decrement_stock(UUID, INTEGER) TO authenticated;
