import { ProductCard } from '@/components/product/ProductCard'
import { getPublicSupabase } from '@/lib/supabase/public'
import { Percent } from 'lucide-react'
import type { Metadata } from 'next'
import type { Product } from '@/lib/types'
import { getT } from '@/lib/i18n/server'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Promotions — Byby Kids',
  description: 'Découvrez toutes nos offres et articles en promotion. Prix barrés, réductions et meilleures affaires pour bébé et enfant.',
}

export default async function PromotionsPage() {
  const { t } = await getT()
  const supabase = getPublicSupabase()
  const { data } = await supabase
    .from('products')
    .select('*, categories(*), product_variants(*)')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
  const products = (data as unknown as Product[]) ?? []

  return (
    <div className="min-h-screen bg-[#FAFAF7]">

      {/* Hero banner */}
      <div className="bg-[#EF8DB2] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white/20 rounded-xl p-2.5">
              <Percent size={22} className="text-white" />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest text-white/80">{t.promotions.badge}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2">{t.promotions.title}</h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl">
            {t.promotions.desc}
          </p>
          {products.length > 0 && (
            <div className="mt-5">
              <span className="bg-white/20 rounded-full px-3 py-1 text-sm font-semibold">
                {t.promotions.count(products.length)}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">

        {products.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-xl border border-[#E8E8E8]">
            <Percent size={44} className="mx-auto text-[#E8E8E8] mb-3" />
            <p className="text-base font-bold text-[#1A1A1A] mb-1">{t.promotions.empty}</p>
            <p className="text-sm text-[#A8A8A8]">{t.promotions.emptyDesc}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
