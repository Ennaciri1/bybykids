import { createClient } from '@/lib/supabase/server'
import { PromoManager } from '@/components/admin/PromoManager'
import type { Metadata } from 'next'
import type { Product } from '@/lib/types'

export const metadata: Metadata = { title: 'Promotions — Admin' }

export default async function PromosPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('*, categories(*)')
    .order('name')

  return (
    <div className="px-4 md:px-8 py-6 md:py-8 max-w-6xl mx-auto">
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-neutral-900">Promotions produits</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Gérez les prix barrés, les mises en avant et la visibilité de chaque produit.
        </p>
      </div>
      <PromoManager products={(data as unknown as Product[]) ?? []} />
    </div>
  )
}
