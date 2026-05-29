import { unstable_cache } from 'next/cache'
import { getPublicSupabase } from '@/lib/supabase/public'
import type { Product, Category } from '@/lib/types'

// ── Public cached queries (revalidate every 60s) ───────────────────────────

const _fetchActiveProducts = async (): Promise<Product[]> => {
  const supabase = getPublicSupabase()
  const { data } = await supabase
    .from('products')
    .select('*, categories(*), product_variants(*)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
  return (data as unknown as Product[]) ?? []
}

const fetchActiveProducts = unstable_cache(
  _fetchActiveProducts,
  ['active-products'],
  { revalidate: 60, tags: ['products'] }
)

export const getNewArrivals = unstable_cache(
  async (limit = 8): Promise<Product[]> => {
    const products = await _fetchActiveProducts()
    return products.slice(0, limit)
  },
  ['new-arrivals'],
  { revalidate: 60, tags: ['products'] }
)

export const getFeaturedProducts = unstable_cache(
  async (limit = 8): Promise<Product[]> => {
    const products = await _fetchActiveProducts()
    return products.filter((p) => p.is_featured).slice(0, limit)
  },
  ['featured-products'],
  { revalidate: 60, tags: ['products'] }
)

export const getProductBySlug = unstable_cache(
  async (slug: string): Promise<Product | undefined> => {
    const supabase = getPublicSupabase()
    const { data } = await supabase
      .from('products')
      .select('*, categories(*), product_variants(*)')
      .eq('slug', slug)
      .single()
    return data as unknown as Product | undefined
  },
  ['product-by-slug'],
  { revalidate: 60, tags: ['products'] }
)

export const getRelatedProducts = unstable_cache(
  async (product: Product, limit = 4): Promise<Product[]> => {
    if (!product.category_id) return []
    const supabase = getPublicSupabase()
    const { data } = await supabase
      .from('products')
      .select('*, categories(*), product_variants(*)')
      .eq('is_active', true)
      .eq('category_id', product.category_id)
      .neq('id', product.id)
      .limit(limit)
    return (data as unknown as Product[]) ?? []
  },
  ['related-products'],
  { revalidate: 60, tags: ['products'] }
)

export const getAllCategories = unstable_cache(
  async (): Promise<Category[]> => {
    const supabase = getPublicSupabase()
    const { data } = await supabase.from('categories').select('*').order('name')
    return (data as Category[]) ?? []
  },
  ['all-categories'],
  { revalidate: 300, tags: ['categories'] }
)

export const getAllVariantOptions = unstable_cache(
  async (): Promise<{ sizes: string[]; colors: string[] }> => {
    const supabase = getPublicSupabase()
    const { data } = await supabase.from('product_variants').select('size, color')
    const rows = (data ?? []) as { size: string; color: string }[]
    const sizes  = [...new Set(rows.map((v) => v.size))]
    const colors = [...new Set(rows.map((v) => v.color))]
    return { sizes, colors }
  },
  ['variant-options'],
  { revalidate: 60, tags: ['products'] }
)

// ── Filter (not cached — depends on dynamic params) ────────────────────────

type FilterParams = {
  category?: string; featured?: string; size?: string; color?: string
  minPrice?: string; maxPrice?: string; inStock?: string; sort?: string; q?: string
}

export async function filterProducts(params: FilterParams): Promise<Product[]> {
  let products = await fetchActiveProducts()

  if (params.featured === 'true') products = products.filter((p) => p.is_featured)
  if (params.category)  products = products.filter((p) => (p.categories as any)?.slug === params.category)
  if (params.q)         products = products.filter((p) => p.name.toLowerCase().includes(params.q!.toLowerCase()))
  if (params.minPrice)  products = products.filter((p) => p.price >= parseFloat(params.minPrice!))
  if (params.maxPrice)  products = products.filter((p) => p.price <= parseFloat(params.maxPrice!))
  if (params.size)      products = products.filter((p) => (p.product_variants ?? []).some((v) => v.size  === params.size))
  if (params.color)     products = products.filter((p) => (p.product_variants ?? []).some((v) => v.color === params.color))
  if (params.inStock === 'true') products = products.filter((p) => (p.product_variants ?? []).some((v) => v.stock > 0))

  if (params.sort === 'price_asc')  return [...products].sort((a, b) => a.price - b.price)
  if (params.sort === 'price_desc') return [...products].sort((a, b) => b.price - a.price)
  return products
}
