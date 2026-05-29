'use client'

import { useState } from 'react'
import { Star, Check, Trash2, Eye, EyeOff, Search, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { revalidateProducts } from '@/lib/actions'

type Review = {
  id: string
  author_name: string
  rating: number
  comment: string
  is_approved: boolean
  created_at: string
  product_name: string
  product_id: string
}

type Tab = 'all' | 'pending' | 'approved'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <Star key={s} size={13}
          className={s <= rating ? 'text-[#F5C333] fill-[#F5C333]' : 'text-neutral-200 fill-neutral-200'} />
      ))}
    </div>
  )
}

export function ReviewsManager({ reviews: initial }: { reviews: Review[] }) {
  const [reviews, setReviews] = useState(initial)
  const [tab, setTab]         = useState<Tab>('all')
  const [search, setSearch]   = useState('')
  const [loading, setLoading] = useState<string | null>(null)

  const pending  = reviews.filter((r) => !r.is_approved).length
  const approved = reviews.filter((r) =>  r.is_approved).length

  const filtered = reviews.filter((r) => {
    if (tab === 'pending'  && r.is_approved)  return false
    if (tab === 'approved' && !r.is_approved) return false
    if (search.trim()) {
      const q = search.toLowerCase()
      return r.author_name.toLowerCase().includes(q)
          || r.comment.toLowerCase().includes(q)
          || r.product_name.toLowerCase().includes(q)
    }
    return true
  })

  const toggleApprove = async (review: Review) => {
    setLoading(review.id)
    const supabase = createClient()
    await (supabase as any).from('reviews').update({ is_approved: !review.is_approved }).eq('id', review.id)
    setReviews((prev) => prev.map((r) => r.id === review.id ? { ...r, is_approved: !r.is_approved } : r))
    await revalidateProducts()
    setLoading(null)
  }

  const deleteReview = async (id: string) => {
    if (!confirm('Supprimer cet avis définitivement ?')) return
    setLoading(id)
    const supabase = createClient()
    await (supabase as any).from('reviews').delete().eq('id', id)
    setReviews((prev) => prev.filter((r) => r.id !== id))
    setLoading(null)
  }

  const TABS = [
    { key: 'all'      as Tab, label: 'Tous',       count: reviews.length },
    { key: 'pending'  as Tab, label: 'En attente', count: pending },
    { key: 'approved' as Tab, label: 'Approuvés',  count: approved },
  ]

  return (
    <div className="space-y-4">

      {/* Tabs + search */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-1.5 flex-wrap">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                tab === t.key ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}>
              {t.label}
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                tab === t.key ? 'bg-white/20 text-white' : 'bg-neutral-200 text-neutral-500'
              }`}>{t.count}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher…"
            className="w-full border border-neutral-200 rounded-lg pl-8 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900" />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-300 hover:text-neutral-600">
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        {/* Header */}
        <div className="hidden md:grid grid-cols-[2fr_1fr_3fr_100px_100px] gap-4 px-5 py-3 bg-neutral-50 border-b border-neutral-100 text-xs font-bold uppercase tracking-wide text-neutral-400">
          <span>Client</span>
          <span>Produit</span>
          <span>Commentaire</span>
          <span className="text-center">Statut</span>
          <span className="text-right">Actions</span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-14">
            <Star size={28} className="mx-auto text-neutral-200 fill-neutral-200 mb-2" />
            <p className="text-sm text-neutral-400">Aucun avis trouvé.</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {filtered.map((review) => (
              <div key={review.id}
                className={`grid md:grid-cols-[2fr_1fr_3fr_100px_100px] gap-4 items-start px-5 py-4 transition-colors ${
                  !review.is_approved ? 'bg-amber-50/40' : ''
                }`}>

                {/* Client */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6BAED6] to-[#EF8DB2] flex items-center justify-center shrink-0">
                      <span className="text-white font-bold text-xs">{review.author_name.charAt(0).toUpperCase()}</span>
                    </div>
                    <span className="font-semibold text-sm text-neutral-900">{review.author_name}</span>
                  </div>
                  <Stars rating={review.rating} />
                  <p className="text-[10px] text-neutral-400 mt-1">
                    {new Date(review.created_at).toLocaleDateString('fr-MA', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>

                {/* Produit */}
                <p className="text-xs text-neutral-600 font-medium line-clamp-2 pt-1">{review.product_name}</p>

                {/* Commentaire */}
                <p className="text-sm text-neutral-700 leading-relaxed line-clamp-3 pt-0.5">{review.comment}</p>

                {/* Statut */}
                <div className="flex justify-center pt-1">
                  {review.is_approved ? (
                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                      <Check size={10} /> Approuvé
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-full">
                      En attente
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-1.5 pt-0.5">
                  <button
                    onClick={() => toggleApprove(review)}
                    disabled={loading === review.id}
                    title={review.is_approved ? 'Masquer' : 'Approuver'}
                    className={`p-1.5 rounded-lg transition-colors disabled:opacity-40 ${
                      review.is_approved
                        ? 'bg-neutral-100 text-neutral-500 hover:bg-amber-100 hover:text-amber-700'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}>
                    {review.is_approved ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                  <button
                    onClick={() => deleteReview(review.id)}
                    disabled={loading === review.id}
                    title="Supprimer"
                    className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors disabled:opacity-40">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
