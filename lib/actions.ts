'use server'

import { revalidateTag } from 'next/cache'
import { getPublicSupabase } from '@/lib/supabase/public'
import { getAdminSupabase } from '@/lib/supabase/admin'
import { generateOrderNumber } from '@/lib/utils'
import type { CartItem } from '@/lib/types'

export async function revalidateProducts() {
  revalidateTag('products', { expire: 0 })
}

export async function getDeliveryFee(): Promise<number> {
  const supabase = getPublicSupabase()
  const { data } = await (supabase as any)
    .from('store_settings')
    .select('delivery_fee')
    .limit(1)
    .single()
  return (data as any)?.delivery_fee ?? 30
}

export async function revalidateCategories() {
  revalidateTag('categories', { expire: 0 })
  revalidateTag('products', { expire: 0 })
}

type PromoResult =
  | { valid: false; error: string }
  | { valid: true; id: string; type: 'percent' | 'fixed'; value: number; discount: number; label: string }

export async function validatePromoCode(code: string, subtotal: number): Promise<PromoResult> {
  if (!code.trim()) return { valid: false, error: 'Entrez un code promo.' }

  const supabase = getPublicSupabase()
  const { data: raw, error } = await supabase
    .from('promo_codes' as any)
    .select('*')
    .eq('code', code.trim().toUpperCase())
    .eq('is_active', true)
    .single()

  if (error || !raw) return { valid: false, error: 'Code invalide ou introuvable.' }

  const data = raw as {
    id: string; code: string; type: string; value: number
    min_order: number; max_uses: number | null; uses_count: number
    is_active: boolean; expires_at: string | null
  }

  if (data.expires_at && new Date(data.expires_at) < new Date())
    return { valid: false, error: 'Ce code promo a expiré.' }
  if (data.max_uses !== null && data.uses_count >= data.max_uses)
    return { valid: false, error: 'Ce code a atteint son nombre maximum d\'utilisations.' }
  if (subtotal < data.min_order)
    return { valid: false, error: `Commande minimum de ${data.min_order} MAD pour ce code.` }

  const discount =
    data.type === 'percent'
      ? Math.round((subtotal * data.value) / 100)
      : Math.min(Number(data.value), subtotal)

  return {
    valid: true,
    id: data.id,
    type: data.type as 'percent' | 'fixed',
    value: Number(data.value),
    discount,
    label: data.type === 'percent' ? `-${data.value}%` : `-${data.value} MAD`,
  }
}

// ── Reviews ────────────────────────────────────────────────────────────────

export type ReviewInput = {
  productId:  string
  authorName: string
  rating:     number
  comment:    string
}

export async function submitReview(
  input: ReviewInput
): Promise<{ success: true } | { error: string }> {
  if (!input.authorName.trim()) return { error: 'Votre prénom est requis.' }
  if (!input.comment.trim())    return { error: 'Le commentaire est requis.' }
  if (input.rating < 1 || input.rating > 5) return { error: 'Note invalide.' }

  const supabase = getPublicSupabase()
  const { error } = await (supabase as any).from('reviews').insert({
    product_id:  input.productId,
    author_name: input.authorName.trim(),
    rating:      input.rating,
    comment:     input.comment.trim(),
    is_approved: false,
  })
  if (error) return { error: 'Erreur lors de l\'envoi. Réessayez.' }
  return { success: true }
}

export async function usePromoCode(codeId: string): Promise<void> {
  const supabase = getPublicSupabase()
  await (supabase as any).rpc('increment_promo_uses', { code_id: codeId })
}

type PlaceOrderInput = {
  fullName: string
  phone: string
  city: string
  address: string
  notes?: string
  items: CartItem[]
  subtotal: number
  deliveryFee: number
  total: number
  promoDiscount?: number
  promoCodeId?: string
}

export async function placeOrder(
  input: PlaceOrderInput
): Promise<{ orderNumber: string } | { error: string }> {
  const supabase = getAdminSupabase()
  const orderNumber = generateOrderNumber()

  // Always read delivery fee from DB — never trust client value
  const deliveryFee = await getDeliveryFee()
  const total = input.subtotal + deliveryFee - (input.promoDiscount ?? 0)

  const { data: order, error: orderError } = await (supabase as any)
    .from('orders')
    .insert({
      order_number:     orderNumber,
      customer_name:    input.fullName,
      customer_phone:   input.phone,
      customer_city:    input.city,
      customer_address: input.address,
      customer_notes:   input.notes ?? null,
      subtotal:         input.subtotal,
      delivery_fee:     deliveryFee,
      total,
      payment_method:   'cash_on_delivery',
      status:           'new',
    })
    .select('id')
    .single()

  if (orderError || !order) return { error: 'Erreur lors de la création de la commande.' }

  const orderItems = input.items.map((item: CartItem) => ({
    order_id:     (order as any).id,
    product_id:   item.productId,
    variant_id:   item.variantId,
    product_name: item.productName,
    size:         item.size,
    color:        item.color,
    quantity:     item.quantity,
    unit_price:   item.price,
    total_price:  item.price * item.quantity,
  }))

  await (supabase as any).from('order_items').insert(orderItems)

  // Decrement stock for each variant
  for (const item of input.items) {
    await (supabase as any).rpc('decrement_stock', {
      variant_id: item.variantId,
      qty: item.quantity,
    })
  }

  if (input.promoCodeId) {
    await (supabase as any).rpc('increment_promo_uses', { code_id: input.promoCodeId })
  }

  return { orderNumber }
}
