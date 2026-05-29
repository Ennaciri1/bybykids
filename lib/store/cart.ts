'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/lib/types'

type CartStore = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (variantId: string) => void
  updateQuantity: (variantId: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        set((state) => {
          const existing = state.items.find((i) => i.variantId === newItem.variantId)
          if (existing) {
            const newQty = Math.min(existing.quantity + newItem.quantity, existing.stock)
            return {
              items: state.items.map((i) =>
                i.variantId === newItem.variantId ? { ...i, quantity: newQty } : i
              ),
            }
          }
          return { items: [...state.items, newItem] }
        })
      },

      removeItem: (variantId) =>
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId),
        })),

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.variantId === variantId
              ? { ...i, quantity: Math.min(quantity, i.stock) }
              : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),
    }),
    { name: 'bybykids-cart' }
  )
)

// ── Precomputed selectors (Zustand memoises ces valeurs) ──
export const selectItemCount = (s: CartStore) =>
  s.items.reduce((sum, i) => sum + i.quantity, 0)

export const selectSubtotal = (s: CartStore) =>
  s.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
