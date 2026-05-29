import type { Product, Category } from '@/lib/types'

// ── Categories ────────────────────────────────────────────────────────────────
export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat-1',  slug: 'naissance',   name: 'Naissance',   image_url: null, created_at: '2026-01-01' },
  { id: 'cat-2',  slug: 'bebe-fille',  name: 'Bébé fille',  image_url: null, created_at: '2026-01-01' },
  { id: 'cat-3',  slug: 'bebe-garcon', name: 'Bébé garçon', image_url: null, created_at: '2026-01-01' },
  { id: 'cat-4',  slug: 'fille',       name: 'Fille',       image_url: null, created_at: '2026-01-01' },
  { id: 'cat-5',  slug: 'garcon',      name: 'Garçon',      image_url: null, created_at: '2026-01-01' },
  { id: 'cat-6',  slug: 'pyjamas',     name: 'Pyjamas',     image_url: null, created_at: '2026-01-01' },
  { id: 'cat-7',  slug: 'robes',       name: 'Robes',       image_url: null, created_at: '2026-01-01' },
  { id: 'cat-8',  slug: 'ensembles',   name: 'Ensembles',   image_url: null, created_at: '2026-01-01' },
  { id: 'cat-9',  slug: 'chaussures',  name: 'Chaussures',  image_url: null, created_at: '2026-01-01' },
  { id: 'cat-10', slug: 'accessoires', name: 'Accessoires', image_url: null, created_at: '2026-01-01' },
]

const CAT = Object.fromEntries(MOCK_CATEGORIES.map((c) => [c.slug, c]))

const img = (bg: string, fg: string, label: string) =>
  `https://placehold.co/400x533/${bg}/${fg}?text=${encodeURIComponent(label)}`

// ── Products ──────────────────────────────────────────────────────────────────
export const MOCK_PRODUCTS: Product[] = [

  // ── Naissance ────────────────────────────────────────────────────────────
  {
    id: 'p-1',
    name: 'Body coton naissance',
    slug: 'body-coton-naissance',
    description: 'Body en coton doux 100% certifié OEKO-TEX. Fermeture à pressions sous la couche. Idéal pour les premiers mois.',
    category_id: 'cat-1',
    price: 65,
    old_price: null,
    images: [img('EEF6FB', '1A7DA8', 'Body Naissance')],
    is_featured: false,
    is_active: true,
    created_at: '2026-04-01',
    categories: CAT['naissance'],
    product_variants: [
      { id: 'v-1-1', product_id: 'p-1', size: 'NB',   color: 'Blanc',       stock: 10, sku: null, created_at: '2026-04-01' },
      { id: 'v-1-2', product_id: 'p-1', size: 'NB',   color: 'Bleu ciel',   stock: 6,  sku: null, created_at: '2026-04-01' },
      { id: 'v-1-3', product_id: 'p-1', size: '0-3M', color: 'Blanc',       stock: 8,  sku: null, created_at: '2026-04-01' },
      { id: 'v-1-4', product_id: 'p-1', size: '0-3M', color: 'Rose poudré', stock: 5,  sku: null, created_at: '2026-04-01' },
      { id: 'v-1-5', product_id: 'p-1', size: '3-6M', color: 'Blanc',       stock: 7,  sku: null, created_at: '2026-04-01' },
    ],
  },
  {
    id: 'p-2',
    name: 'Pyjama velours bébé étoiles',
    slug: 'pyjama-velours-bebe-etoiles',
    description: 'Pyjama en velours ultra-doux avec imprimé étoiles. Chaud et confortable pour les nuits de bébé.',
    category_id: 'cat-1',
    price: 89,
    old_price: 119,
    images: [img('EEF6FB', '1A7DA8', 'Pyjama Etoiles')],
    is_featured: true,
    is_active: true,
    created_at: '2026-04-10',
    categories: CAT['naissance'],
    product_variants: [
      { id: 'v-2-1', product_id: 'p-2', size: 'NB',   color: 'Bleu marine', stock: 5, sku: null, created_at: '2026-04-10' },
      { id: 'v-2-2', product_id: 'p-2', size: '0-3M', color: 'Bleu marine', stock: 8, sku: null, created_at: '2026-04-10' },
      { id: 'v-2-3', product_id: 'p-2', size: '3-6M', color: 'Bleu marine', stock: 4, sku: null, created_at: '2026-04-10' },
      { id: 'v-2-4', product_id: 'p-2', size: '3-6M', color: 'Rose',        stock: 6, sku: null, created_at: '2026-04-10' },
    ],
  },

  // ── Bébé fille ───────────────────────────────────────────────────────────
  {
    id: 'p-3',
    name: 'Grenouillère fleurie zippée',
    slug: 'grenouillere-fleurie-zippee',
    description: 'Grenouillère en coton doux avec imprimé fleuri. Fermeture éclair pour un habillage facile. Disponible en plusieurs tailles.',
    category_id: 'cat-2',
    price: 99,
    old_price: 129,
    images: [img('FFF0F5', 'B83280', 'Grenouillere')],
    is_featured: true,
    is_active: true,
    created_at: '2026-05-01',
    categories: CAT['bebe-fille'],
    product_variants: [
      { id: 'v-3-1', product_id: 'p-3', size: '0-3M',  color: 'Rose',  stock: 8,  sku: null, created_at: '2026-05-01' },
      { id: 'v-3-2', product_id: 'p-3', size: '3-6M',  color: 'Rose',  stock: 10, sku: null, created_at: '2026-05-01' },
      { id: 'v-3-3', product_id: 'p-3', size: '6-9M',  color: 'Rose',  stock: 5,  sku: null, created_at: '2026-05-01' },
      { id: 'v-3-4', product_id: 'p-3', size: '6-9M',  color: 'Blanc', stock: 3,  sku: null, created_at: '2026-05-01' },
      { id: 'v-3-5', product_id: 'p-3', size: '9-12M', color: 'Rose',  stock: 6,  sku: null, created_at: '2026-05-01' },
    ],
  },
  {
    id: 'p-4',
    name: 'Ensemble bébé fille 2 pièces',
    slug: 'ensemble-bebe-fille-2-pieces',
    description: 'Ensemble 2 pièces (haut + pantalon) pour bébé fille. Tissu coton doux et respirant.',
    category_id: 'cat-2',
    price: 149,
    old_price: null,
    images: [img('FFF0F5', 'B83280', 'Ensemble Rose')],
    is_featured: false,
    is_active: true,
    created_at: '2026-04-20',
    categories: CAT['bebe-fille'],
    product_variants: [
      { id: 'v-4-1', product_id: 'p-4', size: '3-6M',   color: 'Rose',  stock: 7, sku: null, created_at: '2026-04-20' },
      { id: 'v-4-2', product_id: 'p-4', size: '6-9M',   color: 'Rose',  stock: 5, sku: null, created_at: '2026-04-20' },
      { id: 'v-4-3', product_id: 'p-4', size: '9-12M',  color: 'Rose',  stock: 4, sku: null, created_at: '2026-04-20' },
      { id: 'v-4-4', product_id: 'p-4', size: '12-18M', color: 'Lilas', stock: 3, sku: null, created_at: '2026-04-20' },
    ],
  },
  {
    id: 'p-5',
    name: 'Robe tulle bébé fille',
    slug: 'robe-tulle-bebe-fille',
    description: 'Robe en tulle légère pour les occasions spéciales. Doublure coton pour le confort de bébé.',
    category_id: 'cat-2',
    price: 129,
    old_price: 169,
    images: [img('FFF0F5', 'B83280', 'Robe Tulle')],
    is_featured: false,
    is_active: true,
    created_at: '2026-03-15',
    categories: CAT['bebe-fille'],
    product_variants: [
      { id: 'v-5-1', product_id: 'p-5', size: '6-9M',   color: 'Rose',  stock: 4, sku: null, created_at: '2026-03-15' },
      { id: 'v-5-2', product_id: 'p-5', size: '9-12M',  color: 'Rose',  stock: 6, sku: null, created_at: '2026-03-15' },
      { id: 'v-5-3', product_id: 'p-5', size: '12-18M', color: 'Blanc', stock: 3, sku: null, created_at: '2026-03-15' },
      { id: 'v-5-4', product_id: 'p-5', size: '18-24M', color: 'Blanc', stock: 2, sku: null, created_at: '2026-03-15' },
    ],
  },

  // ── Bébé garçon ──────────────────────────────────────────────────────────
  {
    id: 'p-6',
    name: 'Body rayé bébé garçon',
    slug: 'body-raye-bebe-garcon',
    description: 'Body à rayures marines en coton jersey. Manches courtes, col rond, fermeture à pressions.',
    category_id: 'cat-3',
    price: 69,
    old_price: null,
    images: [img('EEF3FC', '1A4A9A', 'Body Raye')],
    is_featured: false,
    is_active: true,
    created_at: '2026-04-05',
    categories: CAT['bebe-garcon'],
    product_variants: [
      { id: 'v-6-1', product_id: 'p-6', size: '0-3M',  color: 'Marine', stock: 8, sku: null, created_at: '2026-04-05' },
      { id: 'v-6-2', product_id: 'p-6', size: '3-6M',  color: 'Marine', stock: 9, sku: null, created_at: '2026-04-05' },
      { id: 'v-6-3', product_id: 'p-6', size: '6-9M',  color: 'Marine', stock: 6, sku: null, created_at: '2026-04-05' },
      { id: 'v-6-4', product_id: 'p-6', size: '9-12M', color: 'Gris',   stock: 4, sku: null, created_at: '2026-04-05' },
    ],
  },
  {
    id: 'p-7',
    name: 'Ensemble jean + pull bébé garçon',
    slug: 'ensemble-jean-pull-bebe-garcon',
    description: 'Ensemble 2 pièces tendance : jean stretch + pull côtelé. Confortable et stylé toute la journée.',
    category_id: 'cat-3',
    price: 159,
    old_price: null,
    images: [img('EEF3FC', '1A4A9A', 'Ensemble Jean')],
    is_featured: true,
    is_active: true,
    created_at: '2026-05-05',
    categories: CAT['bebe-garcon'],
    product_variants: [
      { id: 'v-7-1', product_id: 'p-7', size: '6-9M',   color: 'Bleu', stock: 5, sku: null, created_at: '2026-05-05' },
      { id: 'v-7-2', product_id: 'p-7', size: '9-12M',  color: 'Bleu', stock: 7, sku: null, created_at: '2026-05-05' },
      { id: 'v-7-3', product_id: 'p-7', size: '12-18M', color: 'Bleu', stock: 4, sku: null, created_at: '2026-05-05' },
      { id: 'v-7-4', product_id: 'p-7', size: '18-24M', color: 'Bleu', stock: 3, sku: null, created_at: '2026-05-05' },
    ],
  },
  {
    id: 'p-8',
    name: 'Combinaison bébé garçon',
    slug: 'combinaison-bebe-garcon',
    description: 'Combinaison élégante pour bébé garçon. Parfaite pour les sorties et occasions spéciales.',
    category_id: 'cat-3',
    price: 119,
    old_price: 149,
    images: [img('EEF3FC', '1A4A9A', 'Combinaison')],
    is_featured: false,
    is_active: true,
    created_at: '2026-03-20',
    categories: CAT['bebe-garcon'],
    product_variants: [
      { id: 'v-8-1', product_id: 'p-8', size: '3-6M',  color: 'Kaki', stock: 4, sku: null, created_at: '2026-03-20' },
      { id: 'v-8-2', product_id: 'p-8', size: '6-9M',  color: 'Kaki', stock: 6, sku: null, created_at: '2026-03-20' },
      { id: 'v-8-3', product_id: 'p-8', size: '9-12M', color: 'Kaki', stock: 3, sku: null, created_at: '2026-03-20' },
    ],
  },

  // ── Fille ─────────────────────────────────────────────────────────────────
  {
    id: 'p-9',
    name: 'Robe légère imprimée fleurs',
    slug: 'robe-legere-imprimee-fleurs',
    description: 'Robe légère avec imprimé floral coloré. Idéale pour l\'été. Tissu 100% coton respirant.',
    category_id: 'cat-4',
    price: 169,
    old_price: 219,
    images: [img('FFF3EE', 'CC4A20', 'Robe Fleurs')],
    is_featured: true,
    is_active: true,
    created_at: '2026-05-10',
    categories: CAT['fille'],
    product_variants: [
      { id: 'v-9-1', product_id: 'p-9', size: '2A',  color: 'Multicolore', stock: 5, sku: null, created_at: '2026-05-10' },
      { id: 'v-9-2', product_id: 'p-9', size: '3A',  color: 'Multicolore', stock: 7, sku: null, created_at: '2026-05-10' },
      { id: 'v-9-3', product_id: 'p-9', size: '4A',  color: 'Multicolore', stock: 8, sku: null, created_at: '2026-05-10' },
      { id: 'v-9-4', product_id: 'p-9', size: '5A',  color: 'Multicolore', stock: 6, sku: null, created_at: '2026-05-10' },
      { id: 'v-9-5', product_id: 'p-9', size: '6A',  color: 'Multicolore', stock: 4, sku: null, created_at: '2026-05-10' },
      { id: 'v-9-6', product_id: 'p-9', size: '8A',  color: 'Multicolore', stock: 3, sku: null, created_at: '2026-05-10' },
    ],
  },
  {
    id: 'p-10',
    name: 'Jogging velours fille',
    slug: 'jogging-velours-fille',
    description: 'Jogging 2 pièces en velours doux. Haut à capuche + pantalon. Parfait pour les journées fraîches.',
    category_id: 'cat-4',
    price: 139,
    old_price: null,
    images: [img('FFF3EE', 'CC4A20', 'Jogging Velours')],
    is_featured: false,
    is_active: true,
    created_at: '2026-04-15',
    categories: CAT['fille'],
    product_variants: [
      { id: 'v-10-1', product_id: 'p-10', size: '3A',  color: 'Violet', stock: 6, sku: null, created_at: '2026-04-15' },
      { id: 'v-10-2', product_id: 'p-10', size: '4A',  color: 'Violet', stock: 8, sku: null, created_at: '2026-04-15' },
      { id: 'v-10-3', product_id: 'p-10', size: '5A',  color: 'Violet', stock: 5, sku: null, created_at: '2026-04-15' },
      { id: 'v-10-4', product_id: 'p-10', size: '6A',  color: 'Rose',   stock: 4, sku: null, created_at: '2026-04-15' },
      { id: 'v-10-5', product_id: 'p-10', size: '8A',  color: 'Rose',   stock: 3, sku: null, created_at: '2026-04-15' },
    ],
  },
  {
    id: 'p-11',
    name: 'T-shirt paillettes fille',
    slug: 't-shirt-paillettes-fille',
    description: 'T-shirt avec imprimé paillettes irisées. Coton doux, coupe décontractée.',
    category_id: 'cat-4',
    price: 79,
    old_price: null,
    images: [img('FFF3EE', 'CC4A20', 'T-Shirt')],
    is_featured: false,
    is_active: true,
    created_at: '2026-03-25',
    categories: CAT['fille'],
    product_variants: [
      { id: 'v-11-1', product_id: 'p-11', size: '4A',  color: 'Blanc', stock: 9, sku: null, created_at: '2026-03-25' },
      { id: 'v-11-2', product_id: 'p-11', size: '5A',  color: 'Blanc', stock: 7, sku: null, created_at: '2026-03-25' },
      { id: 'v-11-3', product_id: 'p-11', size: '6A',  color: 'Blanc', stock: 6, sku: null, created_at: '2026-03-25' },
      { id: 'v-11-4', product_id: 'p-11', size: '8A',  color: 'Rose',  stock: 5, sku: null, created_at: '2026-03-25' },
      { id: 'v-11-5', product_id: 'p-11', size: '10A', color: 'Rose',  stock: 3, sku: null, created_at: '2026-03-25' },
    ],
  },
  {
    id: 'p-12',
    name: 'Robe à pois bleue',
    slug: 'robe-a-pois-bleue',
    description: 'Robe classique à pois bleus. Col claudine, manches courtes, jupe évasée. Intemporelle.',
    category_id: 'cat-4',
    price: 149,
    old_price: null,
    images: [img('FFF3EE', 'CC4A20', 'Robe Pois')],
    is_featured: true,
    is_active: true,
    created_at: '2026-05-15',
    categories: CAT['fille'],
    product_variants: [
      { id: 'v-12-1', product_id: 'p-12', size: '2A',  color: 'Bleu', stock: 5, sku: null, created_at: '2026-05-15' },
      { id: 'v-12-2', product_id: 'p-12', size: '3A',  color: 'Bleu', stock: 7, sku: null, created_at: '2026-05-15' },
      { id: 'v-12-3', product_id: 'p-12', size: '4A',  color: 'Bleu', stock: 6, sku: null, created_at: '2026-05-15' },
      { id: 'v-12-4', product_id: 'p-12', size: '5A',  color: 'Bleu', stock: 4, sku: null, created_at: '2026-05-15' },
      { id: 'v-12-5', product_id: 'p-12', size: '6A',  color: 'Bleu', stock: 3, sku: null, created_at: '2026-05-15' },
    ],
  },

  // ── Garçon ────────────────────────────────────────────────────────────────
  {
    id: 'p-13',
    name: 'Jogging molleton garçon',
    slug: 'jogging-molleton-garcon',
    description: 'Jogging 2 pièces en molleton chaud. Sweat à capuche + pantalon avec poches. Idéal pour l\'hiver.',
    category_id: 'cat-5',
    price: 139,
    old_price: 179,
    images: [img('EEF6F1', '2F6A40', 'Jogging Molleton')],
    is_featured: true,
    is_active: true,
    created_at: '2026-05-08',
    categories: CAT['garcon'],
    product_variants: [
      { id: 'v-13-1', product_id: 'p-13', size: '3A',  color: 'Gris',   stock: 8, sku: null, created_at: '2026-05-08' },
      { id: 'v-13-2', product_id: 'p-13', size: '4A',  color: 'Gris',   stock: 9, sku: null, created_at: '2026-05-08' },
      { id: 'v-13-3', product_id: 'p-13', size: '5A',  color: 'Gris',   stock: 6, sku: null, created_at: '2026-05-08' },
      { id: 'v-13-4', product_id: 'p-13', size: '6A',  color: 'Marine', stock: 5, sku: null, created_at: '2026-05-08' },
      { id: 'v-13-5', product_id: 'p-13', size: '8A',  color: 'Marine', stock: 4, sku: null, created_at: '2026-05-08' },
    ],
  },
  {
    id: 'p-14',
    name: 'T-shirt dinosaure garçon',
    slug: 't-shirt-dinosaure-garcon',
    description: 'T-shirt avec imprimé dinosaure amusant. Coton doux, coupe classique. Enfants 2 à 10 ans.',
    category_id: 'cat-5',
    price: 75,
    old_price: null,
    images: [img('EEF6F1', '2F6A40', 'T-Shirt Dino')],
    is_featured: false,
    is_active: true,
    created_at: '2026-04-18',
    categories: CAT['garcon'],
    product_variants: [
      { id: 'v-14-1', product_id: 'p-14', size: '2A',  color: 'Vert',   stock: 7, sku: null, created_at: '2026-04-18' },
      { id: 'v-14-2', product_id: 'p-14', size: '3A',  color: 'Vert',   stock: 9, sku: null, created_at: '2026-04-18' },
      { id: 'v-14-3', product_id: 'p-14', size: '4A',  color: 'Vert',   stock: 8, sku: null, created_at: '2026-04-18' },
      { id: 'v-14-4', product_id: 'p-14', size: '5A',  color: 'Orange', stock: 6, sku: null, created_at: '2026-04-18' },
      { id: 'v-14-5', product_id: 'p-14', size: '6A',  color: 'Orange', stock: 4, sku: null, created_at: '2026-04-18' },
    ],
  },
  {
    id: 'p-15',
    name: 'Jean slim garçon',
    slug: 'jean-slim-garcon',
    description: 'Jean slim en denim stretch. Confortable et résistant pour les activités du quotidien.',
    category_id: 'cat-5',
    price: 155,
    old_price: null,
    images: [img('EEF6F1', '2F6A40', 'Jean Slim')],
    is_featured: false,
    is_active: true,
    created_at: '2026-03-28',
    categories: CAT['garcon'],
    product_variants: [
      { id: 'v-15-1', product_id: 'p-15', size: '4A',  color: 'Bleu', stock: 6, sku: null, created_at: '2026-03-28' },
      { id: 'v-15-2', product_id: 'p-15', size: '5A',  color: 'Bleu', stock: 8, sku: null, created_at: '2026-03-28' },
      { id: 'v-15-3', product_id: 'p-15', size: '6A',  color: 'Bleu', stock: 5, sku: null, created_at: '2026-03-28' },
      { id: 'v-15-4', product_id: 'p-15', size: '8A',  color: 'Noir', stock: 4, sku: null, created_at: '2026-03-28' },
      { id: 'v-15-5', product_id: 'p-15', size: '10A', color: 'Noir', stock: 3, sku: null, created_at: '2026-03-28' },
    ],
  },

  // ── Pyjamas ───────────────────────────────────────────────────────────────
  {
    id: 'p-16',
    name: 'Pyjama 2 pièces étoiles',
    slug: 'pyjama-2-pieces-etoiles',
    description: 'Pyjama 2 pièces avec imprimé étoiles. Tissu jersey doux. Disponible de 2 à 10 ans.',
    category_id: 'cat-6',
    price: 119,
    old_price: null,
    images: [img('FFFAEE', '8A6000', 'Pyjama Etoiles')],
    is_featured: true,
    is_active: true,
    created_at: '2026-05-12',
    categories: CAT['pyjamas'],
    product_variants: [
      { id: 'v-16-1', product_id: 'p-16', size: '2A', color: 'Bleu',   stock: 8, sku: null, created_at: '2026-05-12' },
      { id: 'v-16-2', product_id: 'p-16', size: '3A', color: 'Bleu',   stock: 7, sku: null, created_at: '2026-05-12' },
      { id: 'v-16-3', product_id: 'p-16', size: '4A', color: 'Bleu',   stock: 9, sku: null, created_at: '2026-05-12' },
      { id: 'v-16-4', product_id: 'p-16', size: '5A', color: 'Rose',   stock: 6, sku: null, created_at: '2026-05-12' },
      { id: 'v-16-5', product_id: 'p-16', size: '6A', color: 'Rose',   stock: 5, sku: null, created_at: '2026-05-12' },
      { id: 'v-16-6', product_id: 'p-16', size: '8A', color: 'Violet', stock: 4, sku: null, created_at: '2026-05-12' },
    ],
  },
  {
    id: 'p-17',
    name: 'Pyjama polaire bébé',
    slug: 'pyjama-polaire-bebe',
    description: 'Pyjama en polaire chaude pour bébé. Fermeture éclair du bas vers le haut pour faciliter les changes.',
    category_id: 'cat-6',
    price: 99,
    old_price: 129,
    images: [img('FFFAEE', '8A6000', 'Pyjama Polaire')],
    is_featured: false,
    is_active: true,
    created_at: '2026-03-10',
    categories: CAT['pyjamas'],
    product_variants: [
      { id: 'v-17-1', product_id: 'p-17', size: '6-9M',   color: 'Gris', stock: 5, sku: null, created_at: '2026-03-10' },
      { id: 'v-17-2', product_id: 'p-17', size: '9-12M',  color: 'Gris', stock: 7, sku: null, created_at: '2026-03-10' },
      { id: 'v-17-3', product_id: 'p-17', size: '12-18M', color: 'Gris', stock: 4, sku: null, created_at: '2026-03-10' },
      { id: 'v-17-4', product_id: 'p-17', size: '18-24M', color: 'Bleu', stock: 3, sku: null, created_at: '2026-03-10' },
    ],
  },

  // ── Accessoires ───────────────────────────────────────────────────────────
  {
    id: 'p-18',
    name: 'Set bonnet + écharpe bébé',
    slug: 'set-bonnet-echarpe-bebe',
    description: 'Set bonnet + écharpe en laine mélangée douce. Chaud, léger et facile à mettre.',
    category_id: 'cat-10',
    price: 55,
    old_price: null,
    images: [img('F5F0FF', '6A3A8A', 'Bonnet Set')],
    is_featured: false,
    is_active: true,
    created_at: '2026-04-08',
    categories: CAT['accessoires'],
    product_variants: [
      { id: 'v-18-1', product_id: 'p-18', size: 'NB',   color: 'Beige', stock: 10, sku: null, created_at: '2026-04-08' },
      { id: 'v-18-2', product_id: 'p-18', size: '0-3M', color: 'Beige', stock: 8,  sku: null, created_at: '2026-04-08' },
      { id: 'v-18-3', product_id: 'p-18', size: '3-6M', color: 'Gris',  stock: 6,  sku: null, created_at: '2026-04-08' },
      { id: 'v-18-4', product_id: 'p-18', size: '6-9M', color: 'Gris',  stock: 5,  sku: null, created_at: '2026-04-08' },
    ],
  },
]

// ── Query helpers ─────────────────────────────────────────────────────────────

export function getProductBySlug(slug: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.slug === slug)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return MOCK_PRODUCTS
    .filter((p) => p.is_active && p.id !== product.id && p.category_id === product.category_id)
    .slice(0, limit)
}

export function getNewArrivals(limit = 8): Product[] {
  return [...MOCK_PRODUCTS]
    .filter((p) => p.is_active)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit)
}

export function getFeaturedProducts(limit = 8): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.is_featured && p.is_active).slice(0, limit)
}

export function filterProducts(params: {
  category?: string
  featured?: string
  size?: string
  color?: string
  minPrice?: string
  maxPrice?: string
  inStock?: string
  sort?: string
  q?: string
}): Product[] {
  let products = MOCK_PRODUCTS.filter((p) => p.is_active)

  if (params.category) {
    products = products.filter((p) => p.categories?.slug === params.category)
  }
  if (params.featured === 'true') {
    products = products.filter((p) => p.is_featured)
  }
  if (params.q) {
    const q = params.q.toLowerCase()
    products = products.filter((p) => p.name.toLowerCase().includes(q))
  }
  if (params.minPrice) {
    products = products.filter((p) => p.price >= parseFloat(params.minPrice!))
  }
  if (params.maxPrice) {
    products = products.filter((p) => p.price <= parseFloat(params.maxPrice!))
  }
  if (params.size) {
    products = products.filter((p) =>
      (p.product_variants ?? []).some((v) => v.size === params.size)
    )
  }
  if (params.color) {
    products = products.filter((p) =>
      (p.product_variants ?? []).some((v) => v.color === params.color)
    )
  }
  if (params.inStock === 'true') {
    products = products.filter((p) =>
      (p.product_variants ?? []).some((v) => v.stock > 0)
    )
  }

  if (params.sort === 'price_asc') {
    products = [...products].sort((a, b) => a.price - b.price)
  } else if (params.sort === 'price_desc') {
    products = [...products].sort((a, b) => b.price - a.price)
  } else {
    products = [...products].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
  }

  return products
}
