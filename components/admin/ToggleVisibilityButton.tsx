'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { revalidateProducts } from '@/lib/actions'

export function ToggleVisibilityButton({
  productId,
  isActive,
}: {
  productId: string
  isActive: boolean
}) {
  const [active, setActive] = useState(isActive)
  const [loading, setLoading] = useState(false)

  const toggle = async () => {
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase
      .from('products')
      .update({ is_active: !active })
      .eq('id', productId)

    if (!error) {
      setActive((v) => !v)
      await revalidateProducts()
    }
    setLoading(false)
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      title={active ? 'Masquer du site' : 'Afficher sur le site'}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors disabled:opacity-50 ${
        active
          ? 'bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-600'
          : 'bg-neutral-100 text-neutral-500 hover:bg-green-100 hover:text-green-700'
      }`}
    >
      {loading ? (
        <span className="w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
      ) : active ? (
        <Eye size={12} />
      ) : (
        <EyeOff size={12} />
      )}
      {active ? 'Visible' : 'Masqué'}
    </button>
  )
}
