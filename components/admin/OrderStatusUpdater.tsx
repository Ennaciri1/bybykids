'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { ORDER_STATUS_LABELS } from '@/lib/utils'
import type { OrderStatus } from '@/lib/types'

const statuses: OrderStatus[] = ['new', 'confirmed', 'preparing', 'shipped', 'delivered', 'cancelled']

export function OrderStatusUpdater({ orderId, currentStatus }: { orderId: string; currentStatus: string }) {
  const router = useRouter()
  const [selected, setSelected] = useState<OrderStatus>(currentStatus as OrderStatus)
  const [loading, setLoading] = useState(false)

  const handleUpdate = async () => {
    setLoading(true)
    const supabase = createClient()
    await supabase.from('orders').update({ status: selected }).eq('id', orderId)
    setLoading(false)
    router.refresh()
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value as OrderStatus)}
        className="border border-neutral-300 rounded-lg px-4 py-2.5 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900"
      >
        {statuses.map((s) => (
          <option key={s} value={s}>{ORDER_STATUS_LABELS[s]}</option>
        ))}
      </select>
      <Button onClick={handleUpdate} loading={loading} disabled={selected === currentStatus}>
        Mettre à jour
      </Button>
    </div>
  )
}
