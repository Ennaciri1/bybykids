-- Add Arabic name and description columns to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS name_ar text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS description_ar text;
