import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProductBySlug, getRelatedProducts } from '@/lib/data/db'
import { getPublicSupabase } from '@/lib/supabase/public'
import { ProductCard } from '@/components/product/ProductCard'
import { AddToCartSection } from '@/components/product/AddToCartSection'
import { ReviewForm } from '@/components/product/ReviewForm'
import { ReviewsList } from '@/components/product/ReviewsList'
import { formatPrice } from '@/lib/utils'
import { Star } from 'lucide-react'
import { getT } from '@/lib/i18n/server'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Produit introuvable' }
  return {
    title: product.name,
    description:
      product.description ??
      `Achetez ${product.name} sur Byby Kids. Livraison au Maroc, paiement à la livraison.`,
    openGraph: {
      title: product.name,
      description: product.description ?? '',
      images: product.images?.[0] ? [{ url: product.images[0] }] : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const { t, locale } = await getT()
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const supabase = getPublicSupabase()
  const { data: reviewsRaw } = await (supabase as any)
    .from('reviews')
    .select('id, author_name, rating, comment, created_at')
    .eq('product_id', product.id)
    .eq('is_approved', true)
    .order('created_at', { ascending: false })
  const reviews = (reviewsRaw ?? []) as { id: string; author_name: string; rating: number; comment: string; created_at: string }[]
  const avgRating = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0

  const related    = await getRelatedProducts(product)
  const variants   = product.product_variants ?? []
  const totalStock = variants.reduce((s, v) => s + v.stock, 0)
  const hasDiscount = product.old_price && product.old_price > product.price

  return (
    <div className="bg-[#FAFAF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 flex-wrap text-xs text-[#A8A8A8] mb-6">
          <Link href="/" className="hover:text-[#1A1A1A] transition-colors">{t.common.home}</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#1A1A1A] transition-colors">{t.shop.allShop}</Link>
          {product.categories && (
            <>
              <span>/</span>
              <Link
                href={`/shop?category=${(product.categories as any).slug}`}
                className="hover:text-[#1A1A1A] transition-colors"
              >
                {(product.categories as any).name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-[#6B6B6B] truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-14">

          {/* Images */}
          <div className="space-y-2.5">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#F5F5F5] border border-[#E8E8E8]">
              <Image
                src={product.images?.[0] || '/placeholder.jpg'}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {hasDiscount && (
                <span className="absolute top-3 left-3 bg-[#F5C333] text-[#1A1A1A] text-[11px] font-bold px-2 py-0.5 rounded">
                  -{Math.round(((product.old_price! - product.price) / product.old_price!) * 100)}%
                </span>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-lg overflow-hidden bg-[#F5F5F5] border border-[#E8E8E8] hover:border-[#6BAED6] transition-colors"
                  >
                    <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {product.categories && (
              <span className="inline-block self-start bg-[#EAF5FC] text-[#6BAED6] text-[11px] font-bold px-2.5 py-1 rounded mb-3 uppercase tracking-wide">
                {(product.categories as any).name}
              </span>
            )}

            <h1 className="text-2xl md:text-3xl lg:text-[34px] font-extrabold text-[#1A1A1A] mb-3 leading-tight">
              {locale === 'ar' && (product as any).name_ar ? (product as any).name_ar : product.name}
            </h1>

            {/* Note moyenne */}
            {reviews.length > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={16}
                      className={s <= Math.round(avgRating) ? 'text-[#F5C333] fill-[#F5C333]' : 'text-[#DDEEF8] fill-[#DDEEF8]'} />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#1C1C1E]">{Math.round(avgRating * 10) / 10}</span>
                <span className="text-xs text-[#A8A8A8]">({t.product.reviewsCount(reviews.length)})</span>
              </div>
            )}

            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl md:text-3xl font-extrabold text-[#6BAED6]">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-base md:text-lg text-[#A8A8A8] line-through">
                  {formatPrice(product.old_price!)}
                </span>
              )}
            </div>

            {/* Stock status */}
            <div className="mb-5">
              {totalStock > 10 ? (
                <span className="inline-flex items-center gap-1.5 bg-[#EEF6F1] border border-[#B4D4C0] text-[#2F6A40] rounded-full px-3 py-1.5 text-xs font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3A8A50]" />
                  {t.product.stockHigh}
                </span>
              ) : totalStock > 0 ? (
                <span className="inline-flex items-center gap-1.5 bg-[#FFF8E1] border border-[#E5D080] text-[#8A6000] rounded-full px-3 py-1.5 text-xs font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C4960A]" />
                  {t.product.stockLow(totalStock)}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 bg-[#FEF2F2] border border-[#FECACA] text-[#B91C1C] rounded-full px-3 py-1.5 text-xs font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
                  {t.product.outOfStock}
                </span>
              )}
            </div>

            <AddToCartSection product={product} variants={variants} />

            {product.description && (
              <div className="mt-7 pt-6 border-t border-[#E8E8E8]">
                <h2 className="text-sm font-bold text-[#1A1A1A] mb-2">{t.product.description}</h2>
                <p className="text-sm text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                  {locale === 'ar' && (product as any).description_ar
                    ? (product as any).description_ar
                    : product.description}
                </p>
              </div>
            )}

            {/* Trust badges */}
            <div className="mt-6 grid grid-cols-3 gap-2">
              {[
                { label: t.product.trustDelivery,  sub: t.product.trustDeliverySub, bg: '#EEF6FB', border: '#BDD9EA', color: '#1A6B8A' },
                { label: t.product.trustPayment,   sub: t.product.trustPaymentSub,  bg: '#EEF6F1', border: '#B4D4C0', color: '#2F6A40' },
                { label: t.product.trustReturn,    sub: t.product.trustReturnSub,   bg: '#EAF5FC', border: '#A8D4ED', color: '#CC4A20' },
              ].map((p) => (
                <div
                  key={p.label}
                  className="rounded-lg p-3 text-center border"
                  style={{ backgroundColor: p.bg, borderColor: p.border }}
                >
                  <p className="text-xs font-bold" style={{ color: p.color }}>{p.label}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: p.color, opacity: 0.7 }}>{p.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Reviews section ─────────────────────────────── */}
        <section className="mt-14 md:mt-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1 h-6 bg-[#F5C333] rounded-full" />
            <h2 className="text-lg md:text-xl font-extrabold text-[#1C1C1E]">
              {t.product.reviewsTitle}
            </h2>
            {reviews.length > 0 && (
              <span className="bg-[#FFF9E6] text-[#9A7200] text-xs font-bold px-2.5 py-1 rounded-full border border-[#F5C333]/30">
                {t.product.reviewsCount(reviews.length)}
              </span>
            )}
          </div>

          <div className="grid md:grid-cols-[1fr_360px] gap-8">
            <ReviewsList reviews={reviews} locale={locale} />
            <div>
              <ReviewForm productId={product.id} />
            </div>
          </div>
        </section>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-14 md:mt-16">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-1 h-5 bg-[#6BAED6] rounded-full" />
              <h2 className="text-base font-extrabold text-[#1A1A1A]">{t.product.relatedTitle}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}
