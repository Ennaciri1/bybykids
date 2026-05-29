'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import type { StoreSettings } from '@/lib/types'

export function SettingsForm({ settings }: { settings: StoreSettings | null }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    store_name: settings?.store_name ?? '',
    phone: settings?.phone ?? '',
    whatsapp: settings?.whatsapp ?? '',
    delivery_fee: settings?.delivery_fee ?? 30,
    facebook_url: settings?.facebook_url ?? '',
    instagram_url: settings?.instagram_url ?? '',
    tiktok_url: settings?.tiktok_url ?? '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)
    const supabase = createClient()

    const { error } = settings
      ? await supabase.from('store_settings').update(form).eq('id', settings.id)
      : await supabase.from('store_settings').insert(form)

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
      router.refresh()
    }
    setLoading(false)
  }

  const Field = ({ label, name, type = 'text', placeholder }: {
    label: string; name: keyof typeof form; type?: string; placeholder?: string
  }) => (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-1">{label}</label>
      <input
        name={name}
        type={type}
        value={form[name] as string | number}
        onChange={handleChange}
        className="w-full border border-neutral-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
        placeholder={placeholder}
      />
    </div>
  )

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-700">
          ✓ Paramètres enregistrés avec succès
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">{error}</div>
      )}

      <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-5">
        <h2 className="font-semibold text-neutral-900">Informations générales</h2>
        <Field label="Nom de la boutique" name="store_name" placeholder="BybykidsStore" />
        <Field label="Téléphone" name="phone" placeholder="+212600000000" />
        <Field label="WhatsApp" name="whatsapp" placeholder="+212600000000" />
        <Field label="Frais de livraison (MAD)" name="delivery_fee" type="number" placeholder="30" />
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-5">
        <h2 className="font-semibold text-neutral-900">Réseaux sociaux</h2>
        <Field label="Facebook" name="facebook_url" placeholder="https://facebook.com/..." />
        <Field label="Instagram" name="instagram_url" placeholder="https://instagram.com/..." />
        <Field label="TikTok" name="tiktok_url" placeholder="https://tiktok.com/@..." />
      </div>

      <Button type="submit" loading={loading} size="lg">
        Enregistrer les paramètres
      </Button>
    </form>
  )
}
