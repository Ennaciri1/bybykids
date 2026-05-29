'use client'

import { useState } from 'react'
import { Tag, Plus } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { revalidateProducts } from '@/lib/actions'

export function TogglePromoButton({
  productId,
  isFeatured,
}: {
  productId: string
  isFeatured: boolean
}) {
  const [featured, setFeatured] = useState(isFeatured)
  const [loading, setLoading] = useState(false)

  const toggle = async () => {
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase
      .from('products')
      .update({ is_featured: !featured })
      .eq('id', productId)

    if (!error) {
      setFeatured((v) => !v)
      await revalidateProducts()
    }
    setLoading(false)
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      title={featured ? 'Retirer des promotions' : 'Ajouter dans les promotions'}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors disabled:opacity-50 ${
        featured
          ? 'bg-[#FFF3EE] text-[#E8734A] border border-[#E8734A]/30 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
          : 'bg-neutral-100 text-neutral-500 border border-transparent hover:bg-[#FFF3EE] hover:text-[#E8734A]'
      }`}
    >
      {loading ? (
        <span className="w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
      ) : featured ? (
        <Tag size={12} />
      ) : (
        <Plus size={12} />
      )}
      {featured ? 'En promo' : 'Ajouter en promo'}
    </button>
  )
}
