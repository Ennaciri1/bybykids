import { createClient } from '@/lib/supabase/server'
import { CouponManager } from '@/components/admin/CouponManager'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Codes promo — Admin' }

export default async function CouponCodesPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('promo_codes')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="px-4 md:px-8 py-6 md:py-8 max-w-5xl mx-auto">
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-neutral-900">Codes promo</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Créez et gérez les codes de réduction pour vos clients.
        </p>
      </div>
      <CouponManager initialCodes={(data ?? []) as any} />
    </div>
  )
}
