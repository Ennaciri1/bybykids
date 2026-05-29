'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { revalidateProducts } from '@/lib/actions'
import { Upload, Trash2, Play } from 'lucide-react'
import type { StoreSettings } from '@/lib/types'

type Props = { settings: StoreSettings | null }

export function HeroForm({ settings }: Props) {
  const router = useRouter()
  const [loading, setLoading]     = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [success, setSuccess]   = useState(false)
  const [error, setError]       = useState<string | null>(null)

  const [form, setForm] = useState({
    hero_badge:     settings?.hero_badge     ?? 'Nouvelle collection 2026',
    hero_title:     settings?.hero_title     ?? 'Vêtements bébé & enfant au Maroc',
    hero_subtitle:  settings?.hero_subtitle  ?? 'Des tenues douces, pratiques et adorables pour tous les jours.',
    hero_cta_label: settings?.hero_cta_label ?? 'Voir la collection',
    hero_cta_href:  settings?.hero_cta_href  ?? '/shop',
    hero_video_url: settings?.hero_video_url ?? '',
  })

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }))

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const MB = file.size / 1024 / 1024
    if (MB > 50) {
      setError(`Fichier trop lourd (${MB.toFixed(0)} MB). Limite : 50 MB. Compresse la vidéo ou colle un lien direct.`)
      return
    }

    setUploading(true)
    setUploadProgress(0)
    setError(null)

    try {
      const supabase = createClient()
      const ext = file.name.split('.').pop()
      const fileName = `hero/hero-${Date.now()}.${ext}`

      const { data, error: uploadError } = await supabase.storage
        .from('products')
        .upload(fileName, file, { cacheControl: '3600', upsert: true })

      if (uploadError) {
        setError(`Erreur upload : ${uploadError.message}`)
      } else if (data) {
        const { data: urlData } = supabase.storage.from('products').getPublicUrl(data.path)
        setForm((p) => ({ ...p, hero_video_url: urlData.publicUrl }))
        setUploadProgress(100)
      }
    } catch (err: unknown) {
      setError(`Erreur inattendue : ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)
    const supabase = createClient()

    const payload = {
      hero_badge:     form.hero_badge     || null,
      hero_title:     form.hero_title     || null,
      hero_subtitle:  form.hero_subtitle  || null,
      hero_cta_label: form.hero_cta_label || null,
      hero_cta_href:  form.hero_cta_href  || null,
      hero_video_url: form.hero_video_url || null,
    }

    const { error: saveError } = settings
      ? await supabase.from('store_settings').update(payload).eq('id', settings.id)
      : await supabase.from('store_settings').insert({ ...payload, store_name: 'BybykidsStore', delivery_fee: 30 })

    if (saveError) {
      setError(saveError.message)
    } else {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
      await revalidateProducts()
      router.refresh()
    }
    setLoading(false)
  }

  const inputCls = 'w-full border border-neutral-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900'

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-700">
          ✓ Hero mis à jour avec succès
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">{error}</div>
      )}

      {/* Texts */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-5">
        <h2 className="font-semibold text-neutral-900">Textes du hero</h2>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Badge / label au-dessus du titre
          </label>
          <input value={form.hero_badge} onChange={set('hero_badge')} className={inputCls}
            placeholder="Nouvelle collection 2026" />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Titre principal *
          </label>
          <input value={form.hero_title} onChange={set('hero_title')} className={inputCls}
            placeholder="Vêtements bébé & enfant au Maroc" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Sous-titre / description
          </label>
          <textarea value={form.hero_subtitle} onChange={set('hero_subtitle')}
            rows={2} className={`${inputCls} resize-none`}
            placeholder="Des tenues douces, pratiques et adorables pour tous les jours." />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Texte du bouton CTA
            </label>
            <input value={form.hero_cta_label} onChange={set('hero_cta_label')} className={inputCls}
              placeholder="Voir la collection" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Lien du bouton CTA
            </label>
            <input value={form.hero_cta_href} onChange={set('hero_cta_href')} className={inputCls}
              placeholder="/shop" />
          </div>
        </div>
      </div>

      {/* Video */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-4">
        <h2 className="font-semibold text-neutral-900">Vidéo du hero</h2>

        {form.hero_video_url && (
          <div className="relative rounded-xl overflow-hidden bg-neutral-900 aspect-video">
            <video
              src={form.hero_video_url}
              className="w-full h-full object-cover"
              controls
              muted
            />
            <button
              type="button"
              onClick={() => setForm((p) => ({ ...p, hero_video_url: '' }))}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 hover:bg-red-700 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}

        {/* Upload */}
        <div>
          <label className="flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-neutral-300 cursor-pointer hover:border-neutral-500 transition-colors bg-neutral-50">
            {uploading ? (
              <div className="flex flex-col items-center gap-2 w-full px-6">
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div
                    className="bg-neutral-900 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <span className="text-sm text-neutral-600 font-medium">{uploadProgress}% — Upload en cours…</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload size={22} className="text-neutral-400" />
                <span className="text-sm font-medium text-neutral-600">
                  {form.hero_video_url ? 'Remplacer la vidéo' : 'Uploader une vidéo'}
                </span>
                <span className="text-xs text-neutral-400">MP4, MOV, WebM — max 100 MB</span>
              </div>
            )}
            <input
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              onChange={handleVideoUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>

        {/* Or paste URL */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Ou coller un lien vidéo direct (MP4)
          </label>
          <input
            value={form.hero_video_url}
            onChange={set('hero_video_url')}
            className={inputCls}
            placeholder="https://..."
          />
          <p className="text-xs text-neutral-400 mt-1">
            Lien direct MP4 — Google Drive ne fonctionne pas. Utiliser Cloudinary, Supabase Storage, ou un hébergeur vidéo.
          </p>
        </div>

        {!form.hero_video_url && (
          <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <Play size={14} className="text-amber-600 shrink-0" />
            <p className="text-xs text-amber-700">
              Sans vidéo, le hero affichera un panneau de couleur par défaut.
            </p>
          </div>
        )}
      </div>

      <Button type="submit" loading={loading} size="lg">
        Enregistrer le hero
      </Button>
    </form>
  )
}
