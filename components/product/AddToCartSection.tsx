'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingBag, Check } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart'
import { cn } from '@/lib/utils'
import type { Product, ProductVariant } from '@/lib/types'

const SIZE_ORDER = [
  'Naissance', 'NB',
  '0-3 mois', '0-3M',
  '3-6 mois', '3-6M',
  '6-9 mois', '6-9M',
  '9-12 mois', '9-12M',
  '12-18 mois', '12-18M',
  '18-24 mois', '18-24M',
  '2 ans', '3 ans', '4 ans', '5 ans', '6 ans',
  '7 ans', '8 ans', '9 ans', '10 ans', '12 ans', '14 ans',
]

type Props = { product: Product; variants: ProductVariant[] }

export function AddToCartSection({ product, variants }: Props) {
  const addItem = useCartStore((s) => s.addItem)
  const router  = useRouter()
  const [selectedSize,  setSelectedSize]  = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [added,    setAdded]    = useState(false)

  const sizes = [...new Set(variants.map((v) => v.size))].sort(
    (a, b) =>
      (SIZE_ORDER.indexOf(a) !== -1 ? SIZE_ORDER.indexOf(a) : 99) -
      (SIZE_ORDER.indexOf(b) !== -1 ? SIZE_ORDER.indexOf(b) : 99)
  )

  const colorsForSize = selectedSize
    ? [...new Set(variants.filter((v) => v.size === selectedSize && v.stock > 0).map((v) => v.color))]
    : []

  const selectedVariant = variants.find((v) => v.size === selectedSize && v.color === selectedColor)
  const maxQty = selectedVariant?.stock ?? 1

  const handleSizeSelect = (size: string) => { setSelectedSize(size); setSelectedColor(null) }

  const handleAddToCart = () => {
    if (!selectedVariant) return
    addItem({
      variantId:   selectedVariant.id,
      productId:   product.id,
      productName: product.name,
      slug:        product.slug,
      image:       product.images?.[0] || '/placeholder.jpg',
      size:        selectedVariant.size,
      color:       selectedVariant.color,
      price:       product.price,
      quantity,
      stock:       selectedVariant.stock,
    })
    setAdded(true)
    setTimeout(() => router.push('/cart'), 800)
  }

  const isSizeInStock = (size: string) => variants.some((v) => v.size === size && v.stock > 0)

  return (
    <div className="space-y-5">

      {/* Size selector */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-sm font-bold text-[#1A1A1A]">
            Taille{selectedSize && <span className="text-[#6BAED6] ml-1">— {selectedSize}</span>}
          </span>
          <Link href="/delivery" className="text-xs text-[#6B6B6B] hover:text-[#6BAED6] underline underline-offset-2 transition-colors">
            Guide des tailles
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => {
            const inStock  = isSizeInStock(size)
            const selected = selectedSize === size
            return (
              <button
                key={size}
                disabled={!inStock}
                onClick={() => handleSizeSelect(size)}
                className={cn(
                  'px-3.5 py-1.5 text-sm font-semibold rounded-lg border transition-colors',
                  selected
                    ? 'bg-[#6BAED6] text-white border-[#6BAED6]'
                    : inStock
                    ? 'bg-white text-[#1A1A1A] border-[#E8E8E8] hover:border-[#6BAED6] hover:text-[#6BAED6]'
                    : 'bg-[#F5F5F5] text-[#D0D0D0] border-[#E8E8E8] cursor-not-allowed line-through'
                )}
              >
                {size}
              </button>
            )
          })}
        </div>
      </div>

      {/* Color selector */}
      {selectedSize && (
        <div>
          <span className="text-sm font-bold text-[#1A1A1A] block mb-2.5">
            Couleur{selectedColor && <span className="text-[#6BAED6] ml-1">— {selectedColor}</span>}
          </span>
          <div className="flex flex-wrap gap-2">
            {colorsForSize.length === 0 ? (
              <p className="text-xs text-[#A8A8A8] bg-[#F5F5F5] rounded px-3 py-2">
                Aucune couleur disponible pour cette taille
              </p>
            ) : (
              colorsForSize.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    'px-3.5 py-1.5 text-sm font-semibold rounded-lg border transition-colors',
                    selectedColor === color
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                      : 'bg-white text-[#1A1A1A] border-[#E8E8E8] hover:border-[#1A1A1A]'
                  )}
                >
                  {color}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Quantity */}
      {selectedVariant && (
        <div>
          <span className="text-sm font-bold text-[#1A1A1A] block mb-2.5">Quantité</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-[#E8E8E8] rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 flex items-center justify-center text-[#6B6B6B] hover:bg-[#F5F5F5] transition-colors"
              >
                −
              </button>
              <span className="w-9 text-center text-sm font-semibold text-[#1A1A1A]">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                className="w-9 h-9 flex items-center justify-center text-[#6B6B6B] hover:bg-[#F5F5F5] transition-colors"
              >
                +
              </button>
            </div>
            <span className="text-xs text-[#A8A8A8]">{maxQty} en stock</span>
          </div>
        </div>
      )}

      {/* Add to cart */}
      <div className="space-y-2.5">
        <button
          onClick={handleAddToCart}
          disabled={!selectedVariant}
          className={cn(
            'w-full flex items-center justify-center gap-2 py-3.5 rounded-lg text-sm font-bold transition-colors',
            added
              ? 'bg-[#3A8A50] text-white'
              : !selectedVariant
              ? 'bg-[#F5F5F5] text-[#A8A8A8] cursor-not-allowed'
              : 'bg-[#6BAED6] text-white hover:bg-[#4A8FBA]'
          )}
        >
          {added ? (
            <><Check size={17} /> Ajouté au panier</>
          ) : (
            <><ShoppingBag size={17} /> Ajouter au panier</>
          )}
        </button>

        {!selectedSize && (
          <p className="text-xs text-center text-[#A8A8A8]">
            Sélectionnez une taille pour continuer
          </p>
        )}
      </div>
    </div>
  )
}
