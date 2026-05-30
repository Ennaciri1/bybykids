'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingBag, Check } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart'
import { useT } from '@/lib/i18n/context'
import { cn } from '@/lib/utils'
import type { Product, ProductVariant } from '@/lib/types'

const COLOR_MAP: Record<string, string> = {
  Rose: '#FFC0CB', Rouge: '#DC2626', Bleu: '#3B82F6', Vert: '#22C55E',
  Blanc: '#F9FAFB', Noir: '#111827', Gris: '#9CA3AF', Beige: '#D4B896',
  Jaune: '#FBBF24', Orange: '#FB923C', Violet: '#A855F7', Marine: '#1E3A5F',
  Turquoise: '#14B8A6', Marron: '#92400E', Camel: '#C9923A', Corail: '#FF6B6B',
}

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
  const { t } = useT()
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
            {t.product.size}{selectedSize && <span className="text-[#6BAED6] ml-1">— {selectedSize}</span>}
          </span>
          <Link href="/delivery" className="text-xs text-[#6B6B6B] hover:text-[#6BAED6] underline underline-offset-2 transition-colors">
            {t.product.sizeGuide}
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
            {t.product.color}{selectedColor && <span className="text-[#6BAED6] ml-1">— {selectedColor}</span>}
          </span>
          <div className="flex flex-wrap gap-2">
            {colorsForSize.length === 0 ? (
              <p className="text-xs text-[#A8A8A8] bg-[#F5F5F5] rounded px-3 py-2">
                {t.product.noColor}
              </p>
            ) : (
              colorsForSize.map((color) => {
                const hex = COLOR_MAP[color] ?? '#E8E8E8'
                const isWhite = color === 'Blanc'
                return (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    aria-label={color}
                    title={color}
                    className={cn(
                      'w-8 h-8 rounded-full transition-all duration-150 flex items-center justify-center',
                      isWhite ? 'border-2 border-[#E8E8E8]' : '',
                      selectedColor === color
                        ? 'ring-2 ring-offset-2 ring-[#6BAED6] scale-110'
                        : 'hover:scale-105'
                    )}
                    style={{ backgroundColor: hex }}
                  />
                )
              })
            )}
          </div>
        </div>
      )}

      {/* Quantity */}
      {selectedVariant && (
        <div>
          <span className="text-sm font-bold text-[#1A1A1A] block mb-2.5">{t.product.quantity}</span>
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
            <span className="text-xs text-[#A8A8A8]">{maxQty} {t.product.inStock}</span>
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
            <><Check size={17} /> {t.product.added}</>
          ) : (
            <><ShoppingBag size={17} /> {t.product.addToCart}</>
          )}
        </button>

        {!selectedSize && (
          <p className="text-xs text-center text-[#A8A8A8]">
            {t.product.selectSize}
          </p>
        )}
      </div>
    </div>
  )
}
