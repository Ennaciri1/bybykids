import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { formatPrice, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/lib/utils'

type SearchParams = { status?: string; q?: string }

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (params.status) query = query.eq('status', params.status)
  if (params.q) {
    query = query.or(`customer_name.ilike.%${params.q}%,customer_phone.ilike.%${params.q}%`)
  }

  const { data: orders } = await query

  const statuses = ['new', 'confirmed', 'preparing', 'shipped', 'delivered', 'cancelled']

  return (
    <div className="px-4 md:px-8 py-6 md:py-8 max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-neutral-900">Commandes</h1>
          <p className="text-neutral-500 text-sm mt-1">{orders?.length ?? 0} commande(s)</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <form method="GET" className="flex gap-2">
            <input
              name="q"
              defaultValue={params.q}
              placeholder="Rechercher client / téléphone..."
              className="border border-neutral-300 rounded-lg px-3 py-2 text-sm w-60 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
            <button type="submit" className="bg-neutral-900 text-white rounded-lg px-4 py-2 text-sm hover:bg-neutral-700 transition-colors">
              Chercher
            </button>
          </form>
        </div>

        {/* Status tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Link
            href="/admin/orders"
            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${!params.status ? 'bg-neutral-900 text-white border-neutral-900' : 'border-neutral-300 text-neutral-600 hover:border-neutral-900'}`}
          >
            Toutes
          </Link>
          {statuses.map((status) => (
            <Link
              key={status}
              href={`/admin/orders?status=${status}`}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${params.status === status ? 'bg-neutral-900 text-white border-neutral-900' : 'border-neutral-300 text-neutral-600 hover:border-neutral-900'}`}
            >
              {ORDER_STATUS_LABELS[status]}
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">Référence</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">Client</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">Ville</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">Total</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">Statut</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">Date</th>
                  <th className="text-right px-4 py-3 font-medium text-neutral-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {orders?.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-neutral-700">{order.order_number}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-neutral-900">{order.customer_name}</div>
                      <div className="text-xs text-neutral-400">{order.customer_phone}</div>
                    </td>
                    <td className="px-4 py-3 text-neutral-600">{order.customer_city}</td>
                    <td className="px-4 py-3 font-semibold text-neutral-900">{formatPrice(order.total)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${ORDER_STATUS_COLORS[order.status] ?? 'bg-neutral-100 text-neutral-600'}`}>
                        {ORDER_STATUS_LABELS[order.status] ?? order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-neutral-500">
                      {new Date(order.created_at).toLocaleDateString('fr-MA', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/admin/orders/${order.id}`} className="text-xs text-neutral-600 hover:text-neutral-900 underline">
                        Voir
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {(!orders || orders.length === 0) && (
              <div className="text-center py-16 text-neutral-400 text-sm">Aucune commande trouvée</div>
            )}
          </div>
        </div>
    </div>
  )
}
