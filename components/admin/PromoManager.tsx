'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { formatPrice } from '@/lib/utils'
import { revalidateProducts } from '@/lib/actions'
import { Check, Star, StarOff, Percent, X, Search } from 'lucide-react'
import type { Product } from '@/lib/types'

type Row = {
  id: string
  name: string
  image: string
  price: number
  oldPrice: string
  isFeatured: boolean
  categoryName: string
  categorySlug: string
  changed: boolean
}

type TabFilter = 'all' | 'promo' | 'featured'

export function PromoManager({ products }: { products: Product[] }) {
  const [rows, setRows] = useState<Row[]>(
    products.map((p) => ({
      id: p.id,
      name: p.name,
      image: p.images?.[0] || '/placeholder.jpg',
      price: p.price,
      oldPrice: p.old_price ? String(p.old_price) : '',
      isFeatured: p.is_featured,
      categoryName: (p.categories as any)?.name ?? '',
      categorySlug: (p.categories as any)?.slug ?? '',
      changed: false,
    }))
  )
  const [saving, setSaving]       = useState<string | null>(null)
  const [saved, setSaved]         = useState<Set<string>>(new Set())
  const [tab, setTab]             = useState<TabFilter>('all')
  const [search, setSearch]       = useState('')
  const [catFilter, setCatFilter] = useState('')

  const categories = useMemo(() => {
    const map = new Map<string, string>()
    rows.forEach((r) => { if (r.categorySlug) map.set(r.categorySlug, r.categoryName) })
    return [...map.entries()].sort((a, b) => a[1].localeCompare(b[1]))
  }, [rows])

  const update = (id: string, field: 'oldPrice' | 'isFeatured', value: string | boolean) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value, changed: true } : r)))
  }

  const clearPromo = (id: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, oldPrice: '', changed: true } : r)))
  }

  const save = async (row: Row) => {
    setSaving(row.id)
    const supabase = createClient()
    const parsed   = parseFloat(row.oldPrice)
    const oldPrice = !isNaN(parsed) && parsed > row.price ? parsed : null
    const { error } = await supabase
      .from('products')
      .update({ old_price: oldPrice, is_featured: row.isFeatured })
      .eq('id', row.id)
    if (!error) {
      await revalidateProducts()
      setRows((prev) => prev.map((r) =>
        r.id === row.id ? { ...r, oldPrice: oldPrice ? String(oldPrice) : '', changed: false } : r
      ))
      setSaved((prev) => new Set(prev).add(row.id))
      setTimeout(() => setSaved((prev) => { const s = new Set(prev); s.delete(row.id); return s }), 2500)
    }
    setSaving(null)
  }

  const saveAll = async () => {
    for (const row of rows.filter((r) => r.changed)) await save(row)
  }

  const promoCount    = rows.filter((r) => r.oldPrice !== '' && parseFloat(r.oldPrice) > r.price).length
  const featuredCount = rows.filter((r) => r.isFeatured).length
  const changedCount  = rows.filter((r) => r.changed).length

  const filtered = useMemo(() => {
    let list = rows
    if (tab === 'promo')    list = list.filter((r) => r.oldPrice !== '' && parseFloat(r.oldPrice) > r.price)
    if (tab === 'featured') list = list.filter((r) => r.isFeatured)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((r) => r.name.toLowerCase().includes(q))
    }
    if (catFilter) list = list.filter((r) => r.categorySlug === catFilter)
    return list
  }, [rows, tab, search, catFilter])

  const TABS: { key: TabFilter; label: string; count: number }[] = [
    { key: 'all',      label: 'Tous',         count: rows.length },
    { key: 'promo',    label: 'Prix barrés',  count: promoCount },
    { key: 'featured', label: 'En promotion', count: featuredCount },
  ]

  return (
    <div className="space-y-4">

      {/* Tabs + Save all */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                tab === t.key ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {t.label}
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                tab === t.key ? 'bg-white/20 text-white' : 'bg-neutral-200 text-neutral-500'
              }`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {changedCount > 0 && (
          <button
            onClick={saveAll}
            disabled={saving !== null}
            className="flex items-center gap-2 bg-[#E8734A] text-white text-sm font-bold px-5 py-2 rounded-lg hover:bg-[#CC5A34] transition-colors disabled:opacity-60"
          >
            <Check size={15} />
            Enregistrer tout ({changedCount})
          </button>
        )}
      </div>

      {/* Search + category filter */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un produit…"
            className="w-full border border-neutral-200 rounded-lg pl-8 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-300 hover:text-neutral-600">
              <X size={13} />
            </button>
          )}
        </div>

        <select
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
          className="border border-neutral-200 rounded-lg px-3 py-2 text-sm text-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white sm:w-48"
        >
          <option value="">Toutes les catégories</option>
          {categories.map(([slug, name]) => (
            <option key={slug} value={slug}>{name}</option>
          ))}
        </select>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-neutral-500 bg-neutral-50 rounded-lg px-4 py-2.5 border border-neutral-200">
        <span className="flex items-center gap-1.5">
          <Percent size={11} className="text-[#E8734A]" />
          Prix barré = prix affiché barré sur la fiche produit (ex: <s>149 MAD</s>)
        </span>
        <span className="flex items-center gap-1.5">
          <Star size={11} className="text-yellow-500 fill-yellow-400" />
          En promotion = produit visible sur la page Promotions du site
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_80px_100px] gap-3 px-5 py-3 border-b border-neutral-100 bg-neutral-50">
          {['Produit', 'Prix actuel', 'Prix barré', 'Réduction', 'En promo', ''].map((h) => (
            <span key={h} className="text-xs font-bold uppercase tracking-wide text-neutral-400">{h}</span>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-14">
            <Search size={30} className="mx-auto text-neutral-200 mb-2" />
            <p className="text-sm text-neutral-400">Aucun produit trouvé.</p>
          </div>
        )}

        <div className="divide-y divide-neutral-100">
          {filtered.map((row) => {
            const parsedOld = parseFloat(row.oldPrice)
            const hasPromo  = !isNaN(parsedOld) && parsedOld > row.price
            const discount  = hasPromo ? Math.round(((parsedOld - row.price) / parsedOld) * 100) : 0

            return (
              <div
                key={row.id}
                className={`grid md:grid-cols-[2fr_1fr_1fr_1fr_80px_100px] gap-3 items-center px-5 py-3.5 transition-colors ${
                  row.changed ? 'bg-amber-50/50' : ''
                }`}
              >
                {/* Product */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-10 h-12 rounded-lg overflow-hidden shrink-0 bg-neutral-100">
                    <Image src={row.image} alt={row.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-semibold block truncate text-neutral-800">{row.name}</span>
                    {row.categoryName && (
                      <span className="text-[11px] text-neutral-400">{row.categoryName}</span>
                    )}
                  </div>
                </div>

                {/* Current price */}
                <span className="text-sm font-bold text-[#E8734A]">{formatPrice(row.price)}</span>

                {/* Old price input */}
                <div className="relative flex items-center">
                  <input
                    type="number"
                    value={row.oldPrice}
                    onChange={(e) => update(row.id, 'oldPrice', e.target.value)}
                    placeholder="—"
                    min={String(row.price + 1)}
                    step="1"
                    className="w-full border border-neutral-200 rounded-lg px-3 py-1.5 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 pr-7"
                  />
                  {row.oldPrice && (
                    <button onClick={() => clearPromo(row.id)} className="absolute right-1.5 text-neutral-300 hover:text-neutral-600">
                      <X size={13} />
                    </button>
                  )}
                </div>

                {/* Discount badge */}
                <div>
                  {hasPromo ? (
                    <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-1 rounded-full">
                      <Percent size={11} />-{discount}%
                    </span>
                  ) : (
                    <span className="text-xs text-neutral-300">—</span>
                  )}
                </div>

                {/* Featured toggle */}
                <div className="flex justify-center">
                  <button
                    onClick={() => update(row.id, 'isFeatured', !row.isFeatured)}
                    title={row.isFeatured ? 'Retirer des promotions' : 'Ajouter dans les promotions'}
                    className={`p-1.5 rounded-lg transition-colors ${
                      row.isFeatured
                        ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                        : 'bg-neutral-100 text-neutral-300 hover:bg-neutral-200'
                    }`}
                  >
                    {row.isFeatured ? <Star size={16} className="fill-yellow-400" /> : <StarOff size={16} />}
                  </button>
                </div>

                {/* Save */}
                <div className="flex justify-end">
                  {saved.has(row.id) ? (
                    <span className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                      <Check size={13} /> Sauvegardé
                    </span>
                  ) : row.changed ? (
                    <button
                      onClick={() => save(row)}
                      disabled={saving === row.id}
                      className="text-xs font-bold bg-neutral-900 text-white px-3 py-1.5 rounded-lg hover:bg-neutral-700 transition-colors disabled:opacity-50"
                    >
                      {saving === row.id ? '…' : 'Sauver'}
                    </button>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
