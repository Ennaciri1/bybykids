import { ProductCard } from '@/components/product/ProductCard'
import { ShopFiltersPanel } from '@/components/shop/ShopFiltersPanel'
import { ShopQuickFilters } from '@/components/shop/ShopQuickFilters'
import { filterProducts, getAllCategories, getAllVariantOptions } from '@/lib/data/db'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getT } from '@/lib/i18n/server'

export const metadata: Metadata = {
  title: 'Boutique — Byby Kids',
  description: 'Toute notre collection de vêtements bébé et enfant. Filtrez par catégorie, taille, couleur et prix.',
}

type SearchParams = {
  category?: string; size?: string; color?: string
  minPrice?: string; maxPrice?: string; inStock?: string
  sort?: string; q?: string; featured?: string
}

export default async function ShopPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { t } = await getT()
  const params = await searchParams

  const [products, categories, { sizes, colors }] = await Promise.all([
    filterProducts(params),
    getAllCategories(),
    getAllVariantOptions(),
  ])

  const currentCategory = categories.find((c) => c.slug === params.category)
  const title = currentCategory?.name ?? 'Toute la boutique'

  return (
    <div className="min-h-screen bg-[#FAFAF7]">

      {/* Page header */}
      <div className="bg-white border-b border-[#EBEBEB] py-5 md:py-7">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs md:text-sm text-[#A8A8A8] mb-1.5">
            <a href="/" className="hover:text-[#1C1C1E] transition-colors">{t.shop.home}</a>
            <span>/</span>
            <span className="text-[#6B6B6B]">{title}</span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#1C1C1E]">{title}</h1>
          <p className="text-xs md:text-sm text-[#A8A8A8] mt-1">
            {t.shop.products(products.length)}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          <ShopFiltersPanel
            categories={categories}
            sizes={sizes}
            colors={colors}
            currentParams={params}
          />

          <div className="flex-1 min-w-0">

            {/* Quick filters: Promotions (rose, isolé) + pills catégories */}
            <Suspense>
              <ShopQuickFilters categories={categories} currentCategory={params.category} />
            </Suspense>

            {products.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-[#EBEBEB]">
                <p className="text-base font-bold text-[#1C1C1E] mb-2">{t.shop.noProducts}</p>
                <p className="text-sm text-[#A8A8A8]">{t.shop.noProductsDesc}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
