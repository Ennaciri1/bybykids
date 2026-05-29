import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { OrderStatusUpdater } from '@/components/admin/OrderStatusUpdater'
import { formatPrice, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'

type Props = { params: Promise<{ id: string }> }

export default async function AdminOrderDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: order } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('id', id)
    .single()

  if (!order) notFound()

  return (
    <div className="px-4 md:px-8 py-6 md:py-8 max-w-4xl mx-auto">
        <Link href="/admin/orders" className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 mb-6 transition-colors">
          <ArrowLeft size={16} />
          Retour aux commandes
        </Link>

        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Commande {order.order_number}</h1>
            <p className="text-neutral-500 text-sm mt-1">
              {new Date(order.created_at).toLocaleDateString('fr-MA', {
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
              })}
            </p>
          </div>
          <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${ORDER_STATUS_COLORS[order.status] ?? 'bg-neutral-100 text-neutral-600'}`}>
            {ORDER_STATUS_LABELS[order.status] ?? order.status}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Customer info */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5">
            <h2 className="font-semibold text-neutral-900 mb-4">Informations client</h2>
            <div className="space-y-2 text-sm">
              {[
                { label: 'Nom', value: order.customer_name },
                { label: 'Téléphone', value: order.customer_phone },
                { label: 'Ville', value: order.customer_city },
                { label: 'Adresse', value: order.customer_address },
                { label: 'Notes', value: order.customer_notes ?? '—' },
              ].map((r) => (
                <div key={r.label} className="flex gap-3">
                  <span className="text-neutral-400 w-20 shrink-0">{r.label}</span>
                  <span className="text-neutral-800">{r.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Order summary */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5">
            <h2 className="font-semibold text-neutral-900 mb-4">Résumé financier</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-neutral-600">
                <span>Sous-total</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Livraison</span>
                <span>{formatPrice(order.delivery_fee)}</span>
              </div>
              <div className="h-px bg-neutral-200" />
              <div className="flex justify-between font-bold text-neutral-900">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
              <div className="flex justify-between text-neutral-500 text-xs">
                <span>Paiement</span>
                <span>À la livraison</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order items */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5 mb-6">
          <h2 className="font-semibold text-neutral-900 mb-4">Articles commandés</h2>
          <div className="space-y-3">
            {(order.order_items as any[])?.map((item: any) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
                <div>
                  <p className="font-medium text-neutral-900 text-sm">{item.product_name}</p>
                  <p className="text-xs text-neutral-500">{item.size} / {item.color} × {item.quantity}</p>
                </div>
                <span className="font-semibold text-neutral-900 text-sm">{formatPrice(item.total_price)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status updater */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5">
          <h2 className="font-semibold text-neutral-900 mb-4">Changer le statut</h2>
          <OrderStatusUpdater orderId={order.id} currentStatus={order.status} />
        </div>
    </div>
  )
}
