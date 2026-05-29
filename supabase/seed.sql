-- ============================================================
-- Seed Data — BybykidsStore
-- ============================================================

-- Categories
INSERT INTO categories (id, name, slug, image_url) VALUES
  ('11111111-0000-0000-0000-000000000001', 'Robes', 'robes', NULL),
  ('11111111-0000-0000-0000-000000000002', 'Tops', 'tops', NULL),
  ('11111111-0000-0000-0000-000000000003', 'Pantalons', 'pantalons', NULL),
  ('11111111-0000-0000-0000-000000000004', 'Jupes', 'jupes', NULL),
  ('11111111-0000-0000-0000-000000000005', 'Vestes', 'vestes', NULL),
  ('11111111-0000-0000-0000-000000000006', 'Accessoires', 'accessoires', NULL);

-- Products
INSERT INTO products (id, category_id, name, slug, description, price, old_price, images, is_featured, is_active) VALUES
  (
    'aaaaaaaa-0000-0000-0000-000000000001',
    '11111111-0000-0000-0000-000000000001',
    'Robe Fleurie Été',
    'robe-fleurie-ete',
    'Une magnifique robe fleurie légère, parfaite pour l''été marocain. Tissu doux et respirant.',
    299.00, 399.00,
    ARRAY['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800'],
    TRUE, TRUE
  ),
  (
    'aaaaaaaa-0000-0000-0000-000000000002',
    '11111111-0000-0000-0000-000000000002',
    'Top Blanc Casual',
    'top-blanc-casual',
    'Top blanc élégant et polyvalent, idéal pour toutes les occasions.',
    149.00, NULL,
    ARRAY['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800'],
    TRUE, TRUE
  ),
  (
    'aaaaaaaa-0000-0000-0000-000000000003',
    '11111111-0000-0000-0000-000000000003',
    'Pantalon Palazzo Noir',
    'pantalon-palazzo-noir',
    'Pantalon palazzo fluide en noir, confortable et chic pour toutes les silhouettes.',
    249.00, 320.00,
    ARRAY['https://images.unsplash.com/photo-1594938298603-c8148c4b1070?w=800'],
    FALSE, TRUE
  ),
  (
    'aaaaaaaa-0000-0000-0000-000000000004',
    '11111111-0000-0000-0000-000000000004',
    'Jupe Midi Plissée',
    'jupe-midi-plissee',
    'Jupe midi plissée tendance, disponible en plusieurs couleurs vibrantes.',
    199.00, NULL,
    ARRAY['https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800'],
    TRUE, TRUE
  ),
  (
    'aaaaaaaa-0000-0000-0000-000000000005',
    '11111111-0000-0000-0000-000000000005',
    'Veste Lin Beige',
    'veste-lin-beige',
    'Veste en lin naturel, légère et sophistiquée, parfaite pour les soirées fraîches.',
    450.00, 550.00,
    ARRAY['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800'],
    TRUE, TRUE
  ),
  (
    'aaaaaaaa-0000-0000-0000-000000000006',
    '11111111-0000-0000-0000-000000000001',
    'Robe Abaya Élégante',
    'robe-abaya-elegante',
    'Abaya moderne et élégante avec des broderies délicates, idéale pour les occasions spéciales.',
    599.00, NULL,
    ARRAY['https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=800'],
    FALSE, TRUE
  );

-- Product Variants
INSERT INTO product_variants (product_id, size, color, stock, sku) VALUES
  -- Robe Fleurie
  ('aaaaaaaa-0000-0000-0000-000000000001', 'S', 'Rose', 10, 'ROB-001-S-ROSE'),
  ('aaaaaaaa-0000-0000-0000-000000000001', 'M', 'Rose', 8,  'ROB-001-M-ROSE'),
  ('aaaaaaaa-0000-0000-0000-000000000001', 'L', 'Rose', 5,  'ROB-001-L-ROSE'),
  ('aaaaaaaa-0000-0000-0000-000000000001', 'S', 'Bleu', 7,  'ROB-001-S-BLEU'),
  ('aaaaaaaa-0000-0000-0000-000000000001', 'M', 'Bleu', 12, 'ROB-001-M-BLEU'),
  -- Top Blanc
  ('aaaaaaaa-0000-0000-0000-000000000002', 'XS', 'Blanc', 15, 'TOP-002-XS-BLC'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'S',  'Blanc', 20, 'TOP-002-S-BLC'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'M',  'Blanc', 18, 'TOP-002-M-BLC'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'L',  'Blanc', 10, 'TOP-002-L-BLC'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'S',  'Noir',  8,  'TOP-002-S-NR'),
  -- Pantalon Palazzo
  ('aaaaaaaa-0000-0000-0000-000000000003', 'S', 'Noir',  6,  'PAN-003-S-NR'),
  ('aaaaaaaa-0000-0000-0000-000000000003', 'M', 'Noir',  9,  'PAN-003-M-NR'),
  ('aaaaaaaa-0000-0000-0000-000000000003', 'L', 'Noir',  4,  'PAN-003-L-NR'),
  ('aaaaaaaa-0000-0000-0000-000000000003', 'XL','Noir',  2,  'PAN-003-XL-NR'),
  -- Jupe Midi
  ('aaaaaaaa-0000-0000-0000-000000000004', 'S', 'Camel', 11, 'JUP-004-S-CAM'),
  ('aaaaaaaa-0000-0000-0000-000000000004', 'M', 'Camel', 8,  'JUP-004-M-CAM'),
  ('aaaaaaaa-0000-0000-0000-000000000004', 'L', 'Camel', 5,  'JUP-004-L-CAM'),
  ('aaaaaaaa-0000-0000-0000-000000000004', 'S', 'Vert',  7,  'JUP-004-S-VRT'),
  -- Veste Lin
  ('aaaaaaaa-0000-0000-0000-000000000005', 'S', 'Beige', 3,  'VES-005-S-BEI'),
  ('aaaaaaaa-0000-0000-0000-000000000005', 'M', 'Beige', 6,  'VES-005-M-BEI'),
  ('aaaaaaaa-0000-0000-0000-000000000005', 'L', 'Beige', 4,  'VES-005-L-BEI'),
  -- Robe Abaya
  ('aaaaaaaa-0000-0000-0000-000000000006', 'M', 'Noir',  5,  'ABY-006-M-NR'),
  ('aaaaaaaa-0000-0000-0000-000000000006', 'L', 'Noir',  3,  'ABY-006-L-NR'),
  ('aaaaaaaa-0000-0000-0000-000000000006', 'XL','Noir',  2,  'ABY-006-XL-NR'),
  ('aaaaaaaa-0000-0000-0000-000000000006', 'M', 'Bleu marine', 4, 'ABY-006-M-BM');
