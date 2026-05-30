'use client'

import { useState } from 'react'
import { getPublicSupabase } from '@/lib/supabase/public'
import { formatPrice } from '@/lib/utils'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/lib/utils'
import { Search, Package, Truck, CheckCircle, Clock, XCircle, PhoneCall } from 'lucide-react'
import Link from 'next/link'
import { useT } from '@/lib/i18n/context'

type OrderResult = {
  order_number: string
  status: string
  created_at: string
  customer_name: string
  customer_city: string
  subtotal: number
  delivery_fee: number
  total: number
}

const STATUS_STEPS = ['new', 'confirmed', 'preparing', 'shipped', 'delivered']

const STATUS_ICONS: Record<string, React.ReactNode> = {
  new:       <Clock size={18} />,
  confirmed: <PhoneCall size={18} />,
  preparing: <Package size={18} />,
  shipped:   <Truck size={18} />,
  delivered: <CheckCircle size={18} />,
  cancelled: <XCircle size={18} />,
}

export default function SuiviCommandePage() {
  const { t } = useT()
  const [orderNumber, setOrderNumber] = useState('')
  const [phone, setPhone]             = useState('')
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState<string | null>(null)
  const [order, setOrder]             = useState<OrderResult | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderNumber.trim() || !phone.trim()) return
    setLoading(true)
    setError(null)
    setOrder(null)

    const supabase = getPublicSupabase()
    const { data } = await (supabase as any).rpc('track_order', {
      p_order_number: orderNumber.trim().toUpperCase(),
      p_phone:        phone.trim(),
    })

    const result = data?.[0] ?? null
    if (!result) {
      setError(t.suivi.notFound)
    } else {
      setOrder(result)
    }
    setLoading(false)
  }

  const currentStep = order ? STATUS_STEPS.indexOf(order.status) : -1

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 md:py-16">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#EAF5FC] mb-4">
            <Package size={26} className="text-[#6BAED6]" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A] mb-2">{t.suivi.title}</h1>
          <p className="text-[#6B6B6B] text-sm">{t.suivi.subtitle}</p>
        </div>

        {/* Search form */}
        <form onSubmit={handleSearch} className="bg-white rounded-2xl border border-[#E8E8E8] p-6 mb-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#6B6B6B] uppercase tracking-wide mb-1.5">
              {t.suivi.orderNumber}
            </label>
            <input
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
              placeholder={t.suivi.orderNumberPlaceholder}
              className="w-full border border-[#E8E8E8] rounded-lg px-4 py-3 text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-[#6BAED6]/20 focus:border-[#6BAED6]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#6B6B6B] uppercase tracking-wide mb-1.5">
              {t.suivi.phone}
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t.suivi.phonePlaceholder}
              type="tel"
              className="w-full border border-[#E8E8E8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6BAED6]/20 focus:border-[#6BAED6]"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !orderNumber.trim() || !phone.trim()}
            className="w-full bg-[#6BAED6] text-white font-bold py-3 rounded-lg hover:bg-[#4A8FBA] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
          >
            {loading ? (
              <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <Search size={16} />
            )}
            {t.suivi.search}
          </button>

          {error && (
            <p className="text-sm text-red-600 text-center bg-red-50 rounded-lg py-2 px-3">{error}</p>
          )}
        </form>

        {/* Order result */}
        {order && (
          <div className="bg-white rounded-2xl border border-[#E8E8E8] p-6 space-y-6">

            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-[#A8A8A8] font-mono">{order.order_number}</p>
                <p className="font-extrabold text-[#1A1A1A] mt-0.5">{order.customer_name}</p>
                <p className="text-sm text-[#6B6B6B]">{order.customer_city}</p>
              </div>
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${ORDER_STATUS_COLORS[order.status] ?? 'bg-neutral-100 text-neutral-600'}`}>
                {ORDER_STATUS_LABELS[order.status] ?? order.status}
              </span>
            </div>

            {/* Timeline */}
            {order.status !== 'cancelled' && (
              <div>
                <p className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wide mb-4">Progression</p>
                <div className="flex items-center gap-0">
                  {STATUS_STEPS.map((step, i) => {
                    const done    = i <= currentStep
                    const active  = i === currentStep
                    const isLast  = i === STATUS_STEPS.length - 1
                    return (
                      <div key={step} className="flex items-center flex-1 last:flex-none">
                        <div className="flex flex-col items-center gap-1.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                            done
                              ? active ? 'bg-[#6BAED6] text-white' : 'bg-green-500 text-white'
                              : 'bg-[#F5F5F5] text-[#C8C8C8]'
                          }`}>
                            {STATUS_ICONS[step]}
                          </div>
                          <span className={`text-[10px] text-center leading-tight ${done ? 'text-[#1A1A1A] font-semibold' : 'text-[#C8C8C8]'}`}>
                            {ORDER_STATUS_LABELS[step]}
                          </span>
                        </div>
                        {!isLast && (
                          <div className={`flex-1 h-0.5 mx-1 mb-4 ${i < currentStep ? 'bg-green-500' : 'bg-[#E8E8E8]'}`} />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {order.status === 'cancelled' && (
              <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
                <XCircle size={28} className="mx-auto text-red-400 mb-2" />
                <p className="text-sm font-bold text-red-700">Cette commande a été annulée.</p>
                <p className="text-xs text-red-500 mt-1">Contactez-nous pour plus d&apos;informations.</p>
              </div>
            )}

            {/* Totals */}
            <div className="border-t border-[#E8E8E8] pt-4 space-y-1.5 text-sm">
              <div className="flex justify-between text-[#6B6B6B]">
                <span>{t.suivi.subtotal}</span><span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#6B6B6B]">
                <span>{t.suivi.delivery}</span><span>{formatPrice(order.delivery_fee)}</span>
              </div>
              <div className="flex justify-between font-bold text-[#1A1A1A] pt-1.5 border-t border-[#E8E8E8]">
                <span>{t.suivi.total}</span><span>{formatPrice(order.total)}</span>
              </div>
            </div>

            <div className="text-center text-xs text-[#A8A8A8]">
              Commandé le {new Date(order.created_at).toLocaleDateString('fr-MA', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>
        )}

        <p className="text-center text-xs text-[#A8A8A8] mt-6">
          Un problème ?{' '}
          <Link href="/contact" className="text-[#6BAED6] font-semibold hover:underline">Contactez-nous</Link>
        </p>
      </div>
    </div>
  )
}
