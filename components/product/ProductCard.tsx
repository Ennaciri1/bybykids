import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/lib/types'

const SIZE_ORDER = [
  'NB', '0M', '1M', '3M', '6M', '9M', '12M', '18M', '24M',
  '0-3M', '3-6M', '6-9M', '9-12M', '12-18M', '18-24M',
  '1A', '2A', '3A', '4A', '5A', '6A', '7A', '8A', '10A', '12A',
  'XS', 'S', 'M', 'L', 'XL', 'XXL',
]

type Props = { product: Product; priority?: boolean }

export function ProductCard({ product, priority = false }: Props) {
  const image = product.images?.[0] || '/placeholder.jpg'
  const hasDiscount = product.old_price && product.old_price > product.price
  const discount = hasDiscount
    ? Math.round(((product.old_price! - product.price) / product.old_price!) * 100)
    : 0

  const variants = product.product_variants ?? []
  const sizes = [...new Set(
    variants.filter((v) => v.stock > 0).map((v) => v.size)
  )].sort((a, b) => {
    const ia = SIZE_ORDER.indexOf(a)
    const ib = SIZE_ORDER.indexOf(b)
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
  })

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
            <span className="bg-[#6BAED6] text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
              Nouveau ✨
            </span>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-xs md:text-sm text-[#B0B0B0] line-through">
              {formatPrice(product.old_price!)}
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
          Ajouter au panier 🛒
        </Link>
      </div>
    </div>
  )
}
