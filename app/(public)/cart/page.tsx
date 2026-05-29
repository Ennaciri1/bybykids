'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, ShoppingBag, ChevronRight, Truck, Banknote } from 'lucide-react'
import { useCartStore, selectSubtotal } from '@/lib/store/cart'
import { formatPrice } from '@/lib/utils'
import { getDeliveryFee } from '@/lib/actions'

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore()
  const sub = useCartStore(selectSubtotal)
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null)

  useEffect(() => {
    getDeliveryFee().then(setDeliveryFee)
  }, [])

  const total = sub + (deliveryFee ?? 0)

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#EAF5FC] mb-5">
            <ShoppingBag size={36} className="text-[#6BAED6]" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#1A1A1A] mb-2">Votre panier est vide</h1>
          <p className="text-sm text-[#6B6B6B] mb-8 leading-relaxed">
            Découvrez notre sélection et ajoutez vos pièces préférées pour vos enfants.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#6BAED6] text-white text-sm font-bold px-8 py-3.5 rounded-xl hover:bg-[#4A8FBA] transition-colors shadow-sm shadow-[#6BAED6]/30"
          >
            Voir la boutique <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#FAFAF7] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">

        <h1 className="text-2xl md:text-[28px] font-extrabold text-[#1A1A1A] mb-2">
          Mon panier
        </h1>
        <p className="text-sm text-[#A8A8A8] mb-8">
          {items.length} article{items.length > 1 ? 's' : ''} dans votre panier
        </p>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-10">

          {/* Items list */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div
                key={item.variantId}
                className="bg-white rounded-2xl border border-[#EBEBEB] p-4 flex gap-4 hover:border-[#C8DCE8] transition-colors"
              >
                <Link href={`/products/${item.slug}`} className="shrink-0">
                  <div className="relative w-[72px] h-24 rounded-xl overflow-hidden bg-[#F5F5F5]">
                    <Image src={item.image} alt={item.productName} fill className="object-cover" />
                  </div>
                </Link>

                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${item.slug}`}
                    className="text-sm font-bold text-[#1A1A1A] hover:text-[#6BAED6] line-clamp-2 block mb-1 transition-colors leading-snug"
                  >
                    {item.productName}
                  </Link>
                  <p className="text-xs text-[#A8A8A8] mb-3 flex items-center gap-1">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#6BAED6]/30 border border-[#6BAED6]" />
                    {item.size} · {item.color}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-[#F5F5F5] rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#1A1A1A] hover:bg-[#EBEBEB] transition-colors font-bold"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-extrabold text-[#1A1A1A]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        className="w-8 h-8 flex items-center justify-center text-[#1A1A1A] hover:bg-[#EBEBEB] disabled:opacity-30 transition-colors font-bold"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-base font-extrabold text-[#EF8DB2]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="w-7 h-7 flex items-center justify-center text-[#C8C8C8] hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Supprimer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link
              href="/shop"
              className="block text-center text-xs text-[#6BAED6] font-semibold hover:text-[#4A8FBA] transition-colors mt-2 py-2"
            >
              ← Continuer mes achats
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#EBEBEB] rounded-2xl p-5 sticky top-20">
              <h2 className="text-sm font-extrabold text-[#1A1A1A] mb-4 pb-3 border-b border-[#F5F5F5]">
                Récapitulatif
              </h2>

              <div className="space-y-2.5 text-sm mb-5">
                <div className="flex justify-between text-[#6B6B6B]">
                  <span>Sous-total ({items.length} art.)</span>
                  <span>{formatPrice(sub)}</span>
                </div>
                <div className="flex justify-between text-[#6B6B6B]">
                  <span className="flex items-center gap-1.5">
                    <Truck size={13} className="text-[#6BAED6]" />
                    Livraison
                  </span>
                  {deliveryFee === null ? (
                    <span className="w-12 h-4 bg-[#F5F5F5] rounded animate-pulse" />
                  ) : deliveryFee === 0 ? (
                    <span className="text-[#2F6A40] font-bold">Gratuite</span>
                  ) : (
                    <span>{formatPrice(deliveryFee)}</span>
                  )}
                </div>
                <div className="pt-3 border-t border-[#F5F5F5] flex justify-between font-extrabold text-[#1A1A1A] text-base">
                  <span>Total</span>
                  <span className="text-[#6BAED6]">
                    {deliveryFee === null ? '…' : formatPrice(total)}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full text-center bg-gradient-to-r from-[#6BAED6] to-[#5A9EC6] text-white text-sm font-bold py-3.5 rounded-xl hover:from-[#5A9EC6] hover:to-[#4A8FBA] transition-all shadow-sm shadow-[#6BAED6]/30"
              >
                Commander maintenant →
              </Link>

              <div className="mt-4 flex items-center justify-center gap-1.5 bg-[#EEF6F1] rounded-xl py-2.5 px-3">
                <Banknote size={14} className="text-[#2F6A40] shrink-0" />
                <p className="text-xs text-[#2F6A40] font-semibold">
                  Paiement uniquement à la livraison
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
