export type Category = {
  id: string
  name: string
  slug: string
  image_url: string | null
  created_at: string
}

export type Product = {
  id: string
  category_id: string | null
  name: string
  slug: string
  description: string | null
  price: number
  old_price: number | null
  images: string[]
  is_featured: boolean
  is_active: boolean
  created_at: string
  categories?: Category
  product_variants?: ProductVariant[]
}

export type ProductVariant = {
  id: string
  product_id: string
  size: string
  color: string
  stock: number
  sku: string | null
  created_at: string
}

export type OrderStatus =
  | 'new'
  | 'confirmed'
  | 'preparing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export type Order = {
  id: string
  order_number: string
  customer_name: string
  customer_phone: string
  customer_city: string
  customer_address: string
  customer_notes: string | null
  subtotal: number
  delivery_fee: number
  total: number
  payment_method: string
  status: OrderStatus
  created_at: string
  order_items?: OrderItem[]
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string | null
  variant_id: string | null
  product_name: string
  size: string
  color: string
  quantity: number
  unit_price: number
  total_price: number
  products?: Product
}

export type StoreSettings = {
  id: string
  store_name: string
  phone: string | null
  whatsapp: string | null
  delivery_fee: number
  facebook_url: string | null
  instagram_url: string | null
  tiktok_url: string | null
  hero_badge: string | null
  hero_title: string | null
  hero_subtitle: string | null
  hero_cta_label: string | null
  hero_cta_href: string | null
  hero_video_url: string | null
}

// Cart types (client-only)
export type CartItem = {
  variantId: string
  productId: string
  productName: string
  slug: string
  image: string
  size: string
  color: string
  price: number
  quantity: number
  stock: number
}

export type CheckoutFormData = {
  fullName: string
  phone: string
  city: string
  address: string
  notes?: string
}

export type ShopFilters = {
  category?: string
  sizes?: string[]
  colors?: string[]
  minPrice?: number
  maxPrice?: number
  inStockOnly?: boolean
  sort?: 'newest' | 'price_asc' | 'price_desc'
  search?: string
}
