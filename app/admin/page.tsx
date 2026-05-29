import { createClient } from '@/lib/supabase/server'
import { formatPrice, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/lib/utils'
import Link from 'next/link'
import { ShoppingCart, TrendingUp, AlertTriangle } from 'lucide-react'
import { DeliveryFeeWidget } from '@/components/admin/DeliveryFeeWidget'

async function getDashboardData() {
  const supabase = await createClient()

  const [
    { count: totalOrders },
    { count: newOrders },
    { data: orders },
    { data: lowStock },
    { data: settings },
  ] = await Promise.all([
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('orders').select('total, status').order('created_at', { ascending: false }),
    supabase
      .from('product_variants')
      .select('*, products(name, slug)')
      .lte('stock', 3)
      .order('stock', { ascending: true })
      .limit(10),
    supabase.from('store_settings' as any).select('id, delivery_fee').single(),
  ])

  const revenue = orders?.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.total : 0), 0) ?? 0
  const recentOrders = orders?.slice(0, 5) ?? []

  return { totalOrders, newOrders, revenue, recentOrders, lowStock: lowStock ?? [], settings: settings as any }
}

export default async function AdminDashboardPage() {
  const { totalOrders, newOrders, revenue, recentOrders, lowStock, settings } = await getDashboardData()

  const stats = [
    { label: 'Total commandes', value: totalOrders ?? 0, icon: ShoppingCart, color: 'bg-blue-50 text-blue-700' },
    { label: 'Nouvelles commandes', value: newOrders ?? 0, icon: ShoppingCart, color: 'bg-amber-50 text-amber-700' },
    { label: 'Chiffre d\'affaires estimé', value: formatPrice(revenue), icon: TrendingUp, color: 'bg-green-50 text-green-700' },
    { label: 'Produits faible stock', value: lowStock.length, icon: AlertTriangle, color: 'bg-red-50 text-red-700' },
  ]

  return (
    <div className="px-4 md:px-8 py-6 md:py-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-900">Tableau de bord</h1>
          <p className="text-neutral-500 text-sm mt-1">Vue d&apos;ensemble de votre boutique</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-neutral-200 p-5">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
              <p className="text-sm text-neutral-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <DeliveryFeeWidget
            initialFee={settings?.delivery_fee ?? 30}
            settingsId={settings?.id ?? ''}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent orders */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-neutral-900">Dernières commandes</h2>
              <Link href="/admin/orders" className="text-xs text-neutral-500 hover:text-neutral-900 underline">Voir tout</Link>
            </div>
            {recentOrders.length === 0 ? (
              <p className="text-sm text-neutral-400 text-center py-8">Aucune commande pour l&apos;instant</p>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((order: any) => (
                  <div key={order.total} className="flex items-center justify-between text-sm">
                    <span className="text-neutral-700">{formatPrice(order.total)}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${ORDER_STATUS_COLORS[order.status] ?? 'bg-neutral-100 text-neutral-700'}`}>
                      {ORDER_STATUS_LABELS[order.status] ?? order.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Low stock */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-neutral-900">Stock faible</h2>
              <Link href="/admin/products" className="text-xs text-neutral-500 hover:text-neutral-900 underline">Gérer</Link>
            </div>
            {lowStock.length === 0 ? (
              <p className="text-sm text-neutral-400 text-center py-8">Tous les stocks sont suffisants</p>
            ) : (
              <div className="space-y-3">
                {lowStock.map((v: any) => (
                  <div key={v.id} className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-neutral-800 font-medium">{v.products?.name}</span>
                      <span className="text-neutral-400 ml-2">{v.size} / {v.color}</span>
                    </div>
                    <span className={`font-bold ${v.stock === 0 ? 'text-red-600' : 'text-orange-600'}`}>
                      {v.stock === 0 ? 'Épuisé' : `${v.stock} restant${v.stock > 1 ? 's' : ''}`}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
    </div>
  )
}
