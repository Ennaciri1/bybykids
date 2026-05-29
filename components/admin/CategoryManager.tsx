'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { slugify } from '@/lib/utils'
import { revalidateCategories } from '@/lib/actions'
import { Button } from '@/components/ui/Button'
import { Pencil, Trash2, Check, X } from 'lucide-react'
import type { Category } from '@/lib/types'

export function CategoryManager({ initialCategories }: { initialCategories: Category[] }) {
  const router = useRouter()
  const [categories, setCategories] = useState(initialCategories)
  const [newName, setNewName] = useState('')
  const [editId, setEditId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [loading, setLoading] = useState(false)

  const supabase = createClient()

  const addCategory = async () => {
    if (!newName.trim()) return
    setLoading(true)
    const { data, error } = await supabase
      .from('categories')
      .insert({ name: newName.trim(), slug: slugify(newName.trim()) })
      .select()
      .single()
    if (!error && data) {
      setCategories((prev) => [...prev, data])
      setNewName('')
      await revalidateCategories()
    }
    setLoading(false)
  }

  const updateCategory = async (id: string) => {
    if (!editName.trim()) return
    setLoading(true)
    const { error } = await supabase
      .from('categories')
      .update({ name: editName.trim(), slug: slugify(editName.trim()) })
      .eq('id', id)
    if (!error) {
      setCategories((prev) =>
        prev.map((c) => (c.id === id ? { ...c, name: editName.trim() } : c))
      )
      setEditId(null)
      await revalidateCategories()
    }
    setLoading(false)
  }

  const deleteCategory = async (id: string) => {
    if (!confirm('Supprimer cette catégorie ?')) return
    setLoading(true)
    const { error } = await supabase.from('categories').delete().eq('id', id)
    if (!error) {
      setCategories((prev) => prev.filter((c) => c.id !== id))
      await revalidateCategories()
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Add form */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h2 className="font-semibold text-neutral-900 mb-4">Ajouter une catégorie</h2>
        <div className="flex gap-3">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addCategory()}
            className="flex-1 border border-neutral-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
            placeholder="Nom de la catégorie"
          />
          <Button onClick={addCategory} loading={loading} disabled={!newName.trim()}>
            Ajouter
          </Button>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-100">
          <h2 className="font-semibold text-neutral-900">Toutes les catégories</h2>
        </div>
        <div className="divide-y divide-neutral-100">
          {categories.length === 0 ? (
            <p className="text-center py-10 text-neutral-400 text-sm">Aucune catégorie encore</p>
          ) : (
            categories.map((cat) => (
              <div key={cat.id} className="flex items-center gap-3 px-6 py-3.5">
                {editId === cat.id ? (
                  <>
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && updateCategory(cat.id)}
                      className="flex-1 border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      autoFocus
                    />
                    <button onClick={() => updateCategory(cat.id)} className="p-1.5 text-green-600 hover:text-green-800">
                      <Check size={16} />
                    </button>
                    <button onClick={() => setEditId(null)} className="p-1.5 text-neutral-400 hover:text-neutral-700">
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-neutral-900">{cat.name}</span>
                      <span className="text-xs text-neutral-400 ml-2">/{cat.slug}</span>
                    </div>
                    <button
                      onClick={() => { setEditId(cat.id); setEditName(cat.name) }}
                      className="p-1.5 text-neutral-400 hover:text-neutral-700 transition-colors"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => deleteCategory(cat.id)}
                      className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
