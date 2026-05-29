'use client'

import { useState } from 'react'
import { Truck, Check, Pencil } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function DeliveryFeeWidget({ initialFee, settingsId }: { initialFee: number; settingsId: string }) {
  const [fee, setFee]         = useState(initialFee)
  const [input, setInput]     = useState(String(initialFee))
  const [editing, setEditing] = useState(false)
  const [saving, setSaving]   = useState(false)
  const [saved, setSaved]     = useState(false)

  const save = async () => {
    const val = parseFloat(input)
    if (isNaN(val) || val < 0) return
    setSaving(true)
    const supabase = createClient()
    await supabase.from('store_settings' as any).update({ delivery_fee: val }).eq('id', settingsId)
    setFee(val)
    setSaving(false)
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
            <Truck size={18} className="text-blue-700" />
          </div>
          <h2 className="font-semibold text-neutral-900">Frais de livraison</h2>
        </div>
        {saved && (
          <span className="flex items-center gap-1 text-xs text-green-600 font-semibold">
            <Check size={13} /> Enregistré
          </span>
        )}
      </div>

      <div className="mb-3">
        <p className="text-3xl font-extrabold text-neutral-900">
          {fee === 0 ? (
            <span className="text-green-600">Gratuite</span>
          ) : (
            <>{fee} <span className="text-base font-semibold text-neutral-400">MAD</span></>
          )}
        </p>
        <p className="text-xs text-neutral-400 mt-0.5">
          {fee === 0 ? 'Livraison offerte pour tous les clients' : 'Appliqué automatiquement au panier'}
        </p>
      </div>

      {editing ? (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="number"
              min="0"
              step="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 pr-12"
              placeholder="0 = Gratuite"
              onKeyDown={(e) => e.key === 'Enter' && save()}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 font-semibold">MAD</span>
          </div>
          <button
            onClick={save}
            disabled={saving}
            className="px-4 py-2 bg-neutral-900 text-white text-sm font-semibold rounded-lg hover:bg-neutral-700 transition-colors disabled:opacity-50"
          >
            {saving ? '…' : 'Sauvegarder'}
          </button>
          <button
            onClick={() => { setEditing(false); setInput(String(fee)) }}
            className="px-3 py-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Annuler
          </button>
        </div>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="flex items-center gap-1.5 text-sm text-neutral-600 border border-neutral-200 rounded-lg px-3 py-1.5 hover:border-neutral-900 hover:text-neutral-900 transition-colors"
        >
          <Pencil size={13} /> Modifier
        </button>
      )}

      <p className="text-[11px] text-neutral-300 mt-3">Mettre 0 MAD = livraison gratuite</p>
    </div>
  )
}
