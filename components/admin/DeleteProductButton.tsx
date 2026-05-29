'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Trash2 } from 'lucide-react'
import { revalidateProducts } from '@/lib/actions'

export function DeleteProductButton({ productId }: { productId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Supprimer ce produit ? Cette action est irréversible.')) return
    setLoading(true)
    const supabase = createClient()
    await supabase.from('products').delete().eq('id', productId)
    await revalidateProducts()
    router.refresh()
    setLoading(false)
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-xs text-red-500 hover:text-red-700 transition-colors disabled:opacity-50 flex items-center gap-1"
    >
      <Trash2 size={13} />
      {loading ? '...' : 'Supprimer'}
    </button>
  )
}
