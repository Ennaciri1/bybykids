'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import { slugify } from '@/lib/utils'
import { revalidateProducts } from '@/lib/actions'
import { Button } from '@/components/ui/Button'
import { Plus, Trash2, Upload } from 'lucide-react'
import type { Category, Product, ProductVariant } from '@/lib/types'

const variantSchema = z.object({
  id: z.string().optional(),
  size: z.string().min(1, 'Taille requise'),
  color: z.string().min(1, 'Couleur requise'),
  stock: z.preprocess((v) => parseInt(String(v), 10), z.number().int().min(0)),
  sku: z.string().optional(),
})

const productSchema = z.object({
  name: z.string().min(2, 'Nom requis'),
  name_ar: z.string().optional(),
  category_id: z.string().optional(),
  price: z.preprocess((v) => parseFloat(String(v)), z.number().positive('Prix requis')),
  old_price: z.preprocess((v) => (v === '' || v == null ? null : parseFloat(String(v))), z.number().nullable().optional()),
  description: z.string().optional(),
  description_ar: z.string().optional(),
  is_featured: z.boolean(),
  is_active: z.boolean(),
  variants: z.array(variantSchema).min(1, 'Au moins un variant est requis'),
})

type FormData = z.infer<typeof productSchema>

type Props = {
  product?: Product & { product_variants?: ProductVariant[] }
  categories: Category[]
}

export function ProductForm({ product, categories }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [images, setImages] = useState<string[]>(product?.images ?? [])
  const [uploading, setUploading] = useState(false)
  const [urlInput, setUrlInput] = useState('')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      name: product?.name ?? '',
      name_ar: (product as any)?.name_ar ?? '',
      category_id: product?.category_id ?? '',
      price: product?.price ?? 0,
      old_price: product?.old_price ?? undefined,
      description: product?.description ?? '',
      description_ar: (product as any)?.description_ar ?? '',
      is_featured: product?.is_featured ?? false,
      is_active: product?.is_active ?? true,
      variants: product?.product_variants?.length
        ? product.product_variants.map((v) => ({
            id: v.id,
            size: v.size,
            color: v.color,
            stock: v.stock,
            sku: v.sku ?? '',
          }))
        : [{ size: '', color: '', stock: 0, sku: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'variants' })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    setUploading(true)
    const supabase = createClient()
    const newUrls: string[] = []

    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`
      const { data, error } = await supabase.storage
        .from('products')
        .upload(fileName, file, { cacheControl: '3600', upsert: false })

      if (!error && data) {
        const { data: urlData } = supabase.storage.from('products').getPublicUrl(data.path)
        newUrls.push(urlData.publicUrl)
      }
    }

    setImages((prev) => [...prev, ...newUrls])
    setUploading(false)
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setError(null)
    const supabase = createClient()

    const slug = product?.slug || slugify(data.name)

    try {
      if (product) {
        // Update product
        const { error: productError } = await (supabase as any)
          .from('products')
          .update({
            name: data.name,
            name_ar: data.name_ar || null,
            slug,
            category_id: data.category_id || null,
            price: data.price,
            old_price: data.old_price || null,
            description: data.description || null,
            description_ar: data.description_ar || null,
            images,
            is_featured: data.is_featured,
            is_active: data.is_active,
          })
          .eq('id', product.id)

        if (productError) throw new Error(productError.message)

        // Delete all variants and re-insert
        await supabase.from('product_variants').delete().eq('product_id', product.id)
        await supabase.from('product_variants').insert(
          data.variants.map((v) => ({
            product_id: product.id,
            size: v.size,
            color: v.color,
            stock: v.stock,
            sku: v.sku || null,
          }))
        )
      } else {
        // Create product
        const { data: newProduct, error: productError } = await (supabase as any)
          .from('products')
          .insert({
            name: data.name,
            name_ar: data.name_ar || null,
            slug,
            category_id: data.category_id || null,
            price: data.price,
            old_price: data.old_price || null,
            description: data.description || null,
            description_ar: data.description_ar || null,
            images,
            is_featured: data.is_featured,
            is_active: data.is_active,
          })
          .select()
          .single()

        if (productError) throw new Error(productError.message)

        await supabase.from('product_variants').insert(
          data.variants.map((v) => ({
            product_id: newProduct.id,
            size: v.size,
            color: v.color,
            stock: v.stock,
            sku: v.sku || null,
          }))
        )
      }

      await revalidateProducts()
      router.push('/admin/products')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">{error}</div>
      )}

      {/* Basic Info */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-5">
        <h2 className="font-semibold text-neutral-900">Informations générales</h2>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Nom du produit *</label>
            <input
              {...register('name')}
              className="w-full border border-neutral-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
              placeholder="Ex: Robe Fleurie Été"
            />
            {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              الاسم بالعربية <span className="text-neutral-400 font-normal">(اختياري)</span>
            </label>
            <input
              {...register('name_ar')}
              dir="rtl"
              className="w-full border border-neutral-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
              placeholder="مثال: فستان زهري صيفي"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Catégorie</label>
          <select
            {...register('category_id')}
            className="w-full border border-neutral-300 rounded-lg px-4 py-3 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900"
          >
            <option value="">Sans catégorie</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Prix (MAD) *</label>
            <input
              {...register('price')}
              type="number"
              step="0.01"
              min="0"
              className="w-full border border-neutral-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
              placeholder="199.00"
            />
            {errors.price && <p className="text-red-600 text-xs mt-1">{errors.price.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Ancien prix (MAD)</label>
            <input
              {...register('old_price')}
              type="number"
              step="0.01"
              min="0"
              className="w-full border border-neutral-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
              placeholder="299.00 (optionnel)"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
            <textarea
              {...register('description')}
              rows={4}
              className="w-full border border-neutral-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none"
              placeholder="Description du produit..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              الوصف بالعربية <span className="text-neutral-400 font-normal">(اختياري)</span>
            </label>
            <textarea
              {...register('description_ar')}
              dir="rtl"
              rows={4}
              className="w-full border border-neutral-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none"
              placeholder="وصف المنتج بالعربية..."
            />
          </div>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...register('is_active')} className="h-4 w-4 rounded" />
            <span className="text-sm font-medium text-neutral-700">Produit actif (visible en boutique)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...register('is_featured')} className="h-4 w-4 rounded" />
            <span className="text-sm font-medium text-neutral-700">Mis en avant (page d&apos;accueil)</span>
          </label>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h2 className="font-semibold text-neutral-900 mb-4">Images du produit</h2>
        <div className="flex flex-wrap gap-3 mb-4">
          {images.map((url, i) => (
            <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          ))}
          <label className="w-24 h-24 rounded-lg border-2 border-dashed border-neutral-300 flex flex-col items-center justify-center cursor-pointer hover:border-neutral-500 transition-colors">
            {uploading ? (
              <div className="animate-spin w-5 h-5 border-2 border-neutral-400 border-t-neutral-900 rounded-full" />
            ) : (
              <>
                <Upload size={18} className="text-neutral-400 mb-1" />
                <span className="text-xs text-neutral-400">Ajouter</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
        {/* Add by URL */}
        <div className="flex gap-2 mt-3">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Ou coller une URL d'image directement..."
            className="flex-1 border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                if (urlInput.trim()) { setImages((p) => [...p, urlInput.trim()]); setUrlInput('') }
              }
            }}
          />
          <button
            type="button"
            onClick={() => { if (urlInput.trim()) { setImages((p) => [...p, urlInput.trim()]); setUrlInput('') } }}
            className="px-3 py-2 bg-neutral-900 text-white text-sm rounded-lg hover:bg-neutral-700 transition-colors"
          >
            Ajouter
          </button>
        </div>
        <p className="text-xs text-neutral-400 mt-2">Upload fichier OU coller une URL (ex: depuis Google Drive, Cloudinary…)</p>
      </div>

      {/* Variants */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-neutral-900">Variantes (taille / couleur / stock)</h2>
          <button
            type="button"
            onClick={() => append({ size: '', color: '', stock: 0, sku: '' })}
            className="flex items-center gap-1.5 text-sm text-neutral-700 border border-neutral-300 rounded-lg px-3 py-1.5 hover:border-neutral-900 transition-colors"
          >
            <Plus size={14} />
            Ajouter
          </button>
        </div>

        {errors.variants?.root && (
          <p className="text-red-600 text-xs mb-3">{errors.variants.root.message}</p>
        )}

        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-2 md:grid-cols-5 gap-3 p-3 bg-neutral-50 rounded-lg">
              <div>
                <label className="block text-xs text-neutral-500 mb-1">Taille *</label>
                <select
                  {...register(`variants.${index}.size`)}
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
                >
                  <option value="">— Choisir —</option>
                  <optgroup label="Bébé">
                    <option>Naissance</option>
                    <option>0-3 mois</option>
                    <option>3-6 mois</option>
                    <option>6-9 mois</option>
                    <option>9-12 mois</option>
                    <option>12-18 mois</option>
                    <option>18-24 mois</option>
                  </optgroup>
                  <optgroup label="Enfant">
                    <option>2 ans</option>
                    <option>3 ans</option>
                    <option>4 ans</option>
                    <option>5 ans</option>
                    <option>6 ans</option>
                    <option>7 ans</option>
                    <option>8 ans</option>
                    <option>9 ans</option>
                    <option>10 ans</option>
                    <option>12 ans</option>
                    <option>14 ans</option>
                  </optgroup>
                </select>
                {errors.variants?.[index]?.size && (
                  <p className="text-red-600 text-xs mt-0.5">{errors.variants[index]?.size?.message}</p>
                )}
              </div>
              <div>
                <label className="block text-xs text-neutral-500 mb-1">Couleur *</label>
                <input
                  {...register(`variants.${index}.color`)}
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  placeholder="Rouge, Bleu..."
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-500 mb-1">Stock *</label>
                <input
                  {...register(`variants.${index}.stock`)}
                  type="number"
                  min="0"
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-500 mb-1">SKU</label>
                <input
                  {...register(`variants.${index}.sku`)}
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  placeholder="Optionnel"
                />
              </div>
              <div className="flex items-end justify-end">
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-2 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" loading={loading} size="lg">
          {product ? 'Enregistrer les modifications' : 'Créer le produit'}
        </Button>
        <Button type="button" variant="secondary" size="lg" onClick={() => router.back()}>
          Annuler
        </Button>
      </div>
    </form>
  )
}
