'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Trash2, Copy, Check, ToggleLeft, ToggleRight, Tag } from 'lucide-react'

type PromoCode = {
  id: string
  code: string
  type: 'percent' | 'fixed'
  value: number
  min_order: number
  max_uses: number | null
  uses_count: number
  is_active: boolean
  expires_at: string | null
  created_at: string
}

type NewForm = {
  code: string
  type: 'percent' | 'fixed'
  value: string
  min_order: string
  max_uses: string
  expires_at: string
}

const EMPTY_FORM: NewForm = { code: '', type: 'percent', value: '', min_order: '', max_uses: '', expires_at: '' }

function formatDate(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('fr-MA', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function CouponManager({ initialCodes }: { initialCodes: PromoCode[] }) {
  const [codes, setCodes]     = useState<PromoCode[]>(initialCodes)
  const [form, setForm]       = useState<NewForm>(EMPTY_FORM)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving]   = useState(false)
  const [error, setError]     = useState<string | null>(null)
  const [copied, setCopied]   = useState<string | null>(null)

  const supabase = createClient()

  const handleCreate = async () => {
    if (!form.code.trim() || !form.value) { setError('Code et valeur obligatoires.'); return }
    setSaving(true); setError(null)
    const { data, error: err } = await supabase
      .from('promo_codes')
      .insert({
        code:       form.code.trim().toUpperCase(),
        type:       form.type,
        value:      parseFloat(form.value),
        min_order:  parseFloat(form.min_order || '0'),
        max_uses:   form.max_uses ? parseInt(form.max_uses) : null,
        expires_at: form.expires_at || null,
      })
      .select()
      .single()
    if (err) { setError(err.message) }
    else     { setCodes((p) => [data as PromoCode, ...p]); setForm(EMPTY_FORM); setShowForm(false) }
    setSaving(false)
  }

  const toggleActive = async (id: string, current: boolean) => {
    await supabase.from('promo_codes').update({ is_active: !current }).eq('id', id)
    setCodes((p) => p.map((c) => c.id === id ? { ...c, is_active: !current } : c))
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce code promo ?')) return
    await supabase.from('promo_codes').delete().eq('id', id)
    setCodes((p) => p.filter((c) => c.id !== id))
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(code)
    setTimeout(() => setCopied(null), 2000)
  }

  const inputCls = 'w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900'

  return (
    <div className="space-y-5">

      {/* Add button */}
      <div className="flex justify-end">
        <button
          onClick={() => { setShowForm((v) => !v); setError(null) }}
          className="flex items-center gap-2 bg-neutral-900 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-neutral-700 transition-colors"
        >
          <Plus size={15} />
          Nouveau code
        </button>
      </div>

      {/* Creation form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-4">
          <h2 className="font-semibold text-neutral-900">Créer un code promo</h2>
          {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">{error}</p>}

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wide mb-1">Code *</label>
              <input
                value={form.code}
                onChange={(e) => setForm((p) => ({ ...p, code: e.target.value.toUpperCase() }))}
                placeholder="EX: PROMO20"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wide mb-1">Type *</label>
              <select value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as 'percent' | 'fixed' }))} className={inputCls}>
                <option value="percent">Pourcentage (%)</option>
                <option value="fixed">Montant fixe (MAD)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wide mb-1">
                Valeur * {form.type === 'percent' ? '(%)' : '(MAD)'}
              </label>
              <input
                type="number"
                value={form.value}
                onChange={(e) => setForm((p) => ({ ...p, value: e.target.value }))}
                placeholder={form.type === 'percent' ? '20' : '50'}
                min="1"
                max={form.type === 'percent' ? '100' : undefined}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wide mb-1">Commande minimum (MAD)</label>
              <input
                type="number"
                value={form.min_order}
                onChange={(e) => setForm((p) => ({ ...p, min_order: e.target.value }))}
                placeholder="0"
                min="0"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wide mb-1">Utilisations max (vide = illimité)</label>
              <input
                type="number"
                value={form.max_uses}
                onChange={(e) => setForm((p) => ({ ...p, max_uses: e.target.value }))}
                placeholder="Illimité"
                min="1"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wide mb-1">Date d&apos;expiration (optionnel)</label>
              <input
                type="date"
                value={form.expires_at}
                onChange={(e) => setForm((p) => ({ ...p, expires_at: e.target.value }))}
                className={inputCls}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleCreate}
              disabled={saving}
              className="bg-neutral-900 text-white text-sm font-bold px-5 py-2 rounded-lg hover:bg-neutral-700 transition-colors disabled:opacity-50"
            >
              {saving ? 'Création…' : 'Créer le code'}
            </button>
            <button
              onClick={() => { setShowForm(false); setError(null); setForm(EMPTY_FORM) }}
              className="text-sm text-neutral-500 hover:text-neutral-800 transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Codes list */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="hidden md:grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr_120px] gap-3 px-5 py-3 border-b border-neutral-100 bg-neutral-50">
          {['Code', 'Type', 'Valeur', 'Min. commande', 'Utilisations', 'Expiration', ''].map((h) => (
            <span key={h} className="text-xs font-bold uppercase tracking-wide text-neutral-400">{h}</span>
          ))}
        </div>

        {codes.length === 0 && (
          <div className="text-center py-16">
            <Tag size={36} className="mx-auto text-neutral-200 mb-3" />
            <p className="text-sm text-neutral-400">Aucun code promo créé.</p>
          </div>
        )}

        <div className="divide-y divide-neutral-100">
          {codes.map((c) => (
            <div
              key={c.id}
              className={`grid md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr_120px] gap-3 items-center px-5 py-4 ${!c.is_active ? 'opacity-50' : ''}`}
            >
              {/* Code */}
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm text-neutral-900 bg-neutral-100 px-2.5 py-1 rounded-lg tracking-wider">
                  {c.code}
                </span>
                <button
                  onClick={() => copyCode(c.code)}
                  className="text-neutral-300 hover:text-neutral-600 transition-colors"
                  title="Copier"
                >
                  {copied === c.code ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
                </button>
              </div>

              {/* Type */}
              <span className={`inline-flex self-start items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
                c.type === 'percent' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'
              }`}>
                {c.type === 'percent' ? 'Pourcentage' : 'Montant fixe'}
              </span>

              {/* Value */}
              <span className="text-sm font-bold text-[#E8734A]">
                {c.type === 'percent' ? `${c.value}%` : `${c.value} MAD`}
              </span>

              {/* Min order */}
              <span className="text-sm text-neutral-600">
                {c.min_order > 0 ? `${c.min_order} MAD` : '—'}
              </span>

              {/* Uses */}
              <span className="text-sm text-neutral-600">
                {c.uses_count}{c.max_uses !== null ? ` / ${c.max_uses}` : ''}
              </span>

              {/* Expiry */}
              <span className="text-sm text-neutral-600">{formatDate(c.expires_at)}</span>

              {/* Actions */}
              <div className="flex items-center gap-2 justify-end">
                <button
                  onClick={() => toggleActive(c.id, c.is_active)}
                  title={c.is_active ? 'Désactiver' : 'Activer'}
                  className="text-neutral-400 hover:text-neutral-700 transition-colors"
                >
                  {c.is_active
                    ? <ToggleRight size={22} className="text-green-500" />
                    : <ToggleLeft size={22} />
                  }
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="text-neutral-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
