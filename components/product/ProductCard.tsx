'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Check, Sparkles } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/lib/store/cart'
import type { Product } from '@/lib/types'

const SIZE_ORDER = [
  'NB', '0M', '1M', '3M', '6M', '9M', '12M', '18M', '24M',
  'Naissance', '0-3 mois', '3-6 mois', '6-9 mois', '9-12 mois', '12-18 mois', '18-24 mois',
  '0-3M', '3-6M', '6-9M', '9-12M', '12-18M', '18-24M',
  '2 ans', '3 ans', '4 ans', '5 ans', '6 ans', '7 ans', '8 ans', '10 ans', '12 ans', '14 ans',
  '1A', '2A', '3A', '4A', '5A', '6A', '7A', '8A', '10A', '12A',
  'XS', 'S', 'M', 'L', 'XL', 'XXL',
]

type Props = { product: Product; priority?: boolean }

export function ProductCard({ product, priority = false }: Props) {
  const [addedSize, setAddedSize] = useState<string | null>(null)
  const addItem = useCartStore((s) => s.addItem)

  const image = product.images?.[0] || '/placeholder.jpg'
  const price = Number(product.price)
  const oldPrice = Number(product.old_price)
  const hasDiscount = product.old_price != null && isFinite(oldPrice) && oldPrice > price
  const discount = hasDiscount ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0

  const variants = product.product_variants ?? []
  const sizes = [...new Set(
    variants.filter((v) => v.stock > 0).map((v) => v.size)
  )].sort((a, b) => {
    const ia = SIZE_ORDER.indexOf(a)
    const ib = SIZE_ORDER.indexOf(b)
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
  })

  const handleQuickAdd = (size: string) => {
    const variant = variants.find((v) => v.size === size && v.stock > 0)
    if (!variant) return
    addItem({
      variantId: variant.id,
      productId: product.id,
      productName: product.name,
      slug: product.slug,
      image,
      size: variant.size,
      color: variant.color,
      price,
      quantity: 1,
      stock: variant.stock,
    })
    setAddedSize(size)
    setTimeout(() => setAddedSize(null), 700)
  }

  return (
    <div className="group bg-white rounded-2xl border border-[#EBEBEB] overflow-hidden flex flex-col transition-all duration-200 hover:shadow-xl hover:-translate-y-1 hover:border-[#DEEEF8]">

      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-[#F5F5F5] shrink-0">
        <Image
          src={image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          priority={priority}
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {hasDiscount && (
            <span className="bg-[#EF8DB2] text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
              -{discount}%
            </span>
          )}
          {product.is_featured && !hasDiscount && (
            <span className="flex items-center gap-1 bg-[#6BAED6] text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
              Nouveau <Sparkles size={9} />
            </span>
          )}
        </div>

        {/* Desktop quick-add overlay — slides up on hover */}
        {sizes.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-200 bg-black/65 backdrop-blur-sm px-2.5 py-2 hidden md:block">
            <p className="text-white/70 text-[10px] font-semibold mb-1.5 uppercase tracking-wide">Ajout rapide</p>
            <div className="flex flex-wrap gap-1">
              {sizes.slice(0, 6).map((size) => (
                <button
                  key={size}
                  onClick={(e) => { e.preventDefault(); handleQuickAdd(size) }}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-all duration-150 ${
                    addedSize === size
                      ? 'bg-green-500 text-white scale-95'
                      : 'bg-white/20 text-white hover:bg-white hover:text-[#1C1C1E]'
                  }`}
                >
                  {addedSize === size ? <Check size={10} className="inline" /> : size}
                </button>
              ))}
            </div>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-3 md:p-4 flex flex-col flex-1 gap-2">

        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm md:text-[15px] text-[#1C1C1E] font-bold line-clamp-2 leading-snug hover:text-[#6BAED6] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Prix */}
        <div className="flex items-center gap-2">
          <span className="text-base md:text-[17px] font-extrabold text-[#EF8DB2]">
            {formatPrice(price)}
          </span>
          {hasDiscount && (
            <span className="text-xs md:text-sm text-[#B0B0B0] line-through">
              {formatPrice(oldPrice)}
            </span>
          )}
          {hasDiscount && (
            <span className="text-[10px] font-bold text-[#EF8DB2] bg-[#FDDDE9] px-1.5 py-0.5 rounded-md ml-auto">
              -{discount}%
            </span>
          )}
        </div>

        {/* Tailles disponibles */}
        {sizes.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {sizes.slice(0, 5).map((size) => (
              <span key={size}
                className="text-[10px] md:text-[11px] font-bold text-[#6BAED6] bg-[#EAF5FC] border border-[#B8DDEF] px-1.5 py-0.5 rounded-md">
                {size}
              </span>
            ))}
            {sizes.length > 5 && (
              <span className="text-[10px] text-[#A8A8A8] self-center font-medium">+{sizes.length - 5}</span>
            )}
          </div>
        )}

        {/* Bouton */}
        <Link
          href={`/products/${product.slug}`}
          className="mt-auto block w-full text-center bg-gradient-to-r from-[#6BAED6] to-[#5A9EC6] text-white text-xs md:text-sm font-bold py-2.5 rounded-xl hover:from-[#5A9EC6] hover:to-[#4A8FBA] transition-all shadow-sm shadow-[#6BAED6]/30"
        >
          Voir le produit →
        </Link>
      </div>
    </div>
  )
}
