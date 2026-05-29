'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useState, useCallback } from 'react'
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CategoryIcon } from '@/components/ui/CategoryIcon'
import type { Category } from '@/lib/types'

type Props = {
  categories: Category[]
  sizes: string[]
  colors: string[]
  currentParams: Record<string, string | undefined>
}

const SIZE_ORDER = [
  'NB', '0-3M', '3-6M', '6-9M', '9-12M', '12-18M', '18-24M',
  '1A', '2A', '3A', '4A', '5A', '6A', '7A', '8A', '10A', '12A',
  'XS', 'S', 'M', 'L', 'XL', 'XXL',
]

export function ShopFiltersPanel({ categories, sizes, colors, currentParams }: Props) {
  const router   = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [sections, setSections] = useState({ category: true, size: true, color: true, price: false })

  const sortedSizes = [...sizes].sort(
    (a, b) =>
      (SIZE_ORDER.indexOf(a) !== -1 ? SIZE_ORDER.indexOf(a) : 99) -
      (SIZE_ORDER.indexOf(b) !== -1 ? SIZE_ORDER.indexOf(b) : 99)
  )

  const updateParam = useCallback(
    (key: string, value: string | undefined) => {
      const params = new URLSearchParams(
        Object.entries(currentParams).filter(([, v]) => v !== undefined) as [string, string][]
      )
      if (value) { params.set(key, value) } else { params.delete(key) }
      router.push(`${pathname}?${params.toString()}`)
    },
    [currentParams, pathname, router]
  )

  const clearAll = () => router.push(pathname)

  const hasFilters = Object.entries(currentParams).some(([k, v]) => v && k !== 'sort' && k !== 'q')

  const toggle = (key: keyof typeof sections) =>
    setSections((s) => ({ ...s, [key]: !s[key] }))

  const SectionHeader = ({ label, sectionKey }: { label: string; sectionKey: keyof typeof sections }) => (
    <button
      onClick={() => toggle(sectionKey)}
      className="flex items-center justify-between w-full py-2.5 text-left text-xs font-bold uppercase tracking-wider text-[#6B6B6B]"
    >
      {label}
      {sections[sectionKey] ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
    </button>
  )

  const filtersContent = (
    <div className="space-y-1">

      {/* Sort */}
      <div className="pb-4 border-b border-[#F0F0F0]">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6B6B] mb-2">
          Trier par
        </label>
        <select
          value={currentParams.sort ?? 'newest'}
          onChange={(e) => updateParam('sort', e.target.value)}
          className="w-full border border-[#E8E8E8] rounded-lg text-sm py-2.5 px-3 text-[#1A1A1A] bg-white focus:outline-none focus:ring-2 focus:ring-[#6BAED6]/20 focus:border-[#6BAED6]"
        >
          <option value="newest">Plus récents</option>
          <option value="price_asc">Prix croissant</option>
          <option value="price_desc">Prix décroissant</option>
        </select>
      </div>

      {/* Search */}
      <div className="pb-4 border-b border-[#F0F0F0]">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6B6B] mb-2">
          Recherche
        </label>
        <input
          type="search"
          defaultValue={currentParams.q ?? ''}
          placeholder="Nom du produit..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') updateParam('q', (e.target as HTMLInputElement).value || undefined)
          }}
          className="w-full border border-[#E8E8E8] rounded-lg text-sm py-2.5 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#6BAED6]/20 focus:border-[#6BAED6]"
        />
      </div>

      {/* Categories */}
      <div className="border-b border-[#F0F0F0] pb-3">
        <SectionHeader label="Catégorie" sectionKey="category" />
        {sections.category && (
          <div className="space-y-0.5">
            <button
              onClick={() => updateParam('category', undefined)}
              className={cn(
                'block w-full text-left text-sm py-1.5 px-2 rounded-lg transition-colors',
                !currentParams.category
                  ? 'bg-[#EAF5FC] text-[#6BAED6] font-semibold'
                  : 'text-[#6B6B6B] hover:bg-[#F5F5F5] hover:text-[#1A1A1A]'
              )}
            >
              Toutes les catégories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => updateParam('category', cat.slug)}
                className={cn(
                  'flex items-center gap-2 w-full text-left text-sm py-1.5 px-2 rounded-lg transition-colors',
                  currentParams.category === cat.slug
                    ? 'bg-[#EAF5FC] text-[#6BAED6] font-semibold'
                    : 'text-[#6B6B6B] hover:bg-[#F5F5F5] hover:text-[#1A1A1A]'
                )}
              >
                <CategoryIcon slug={cat.slug} size={18} />
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sizes */}
      {sortedSizes.length > 0 && (
        <div className="border-b border-[#F0F0F0] pb-3">
          <SectionHeader label="Taille" sectionKey="size" />
          {sections.size && (
            <div className="flex flex-wrap gap-1.5">
              {sortedSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => updateParam('size', currentParams.size === size ? undefined : size)}
                  className={cn(
                    'px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors',
                    currentParams.size === size
                      ? 'bg-[#6BAED6] text-white border-[#6BAED6]'
                      : 'bg-white text-[#6B6B6B] border-[#E8E8E8] hover:border-[#6BAED6] hover:text-[#6BAED6]'
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Colors */}
      {colors.length > 0 && (
        <div className="border-b border-[#F0F0F0] pb-3">
          <SectionHeader label="Couleur" sectionKey="color" />
          {sections.color && (
            <div className="flex flex-wrap gap-1.5">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => updateParam('color', currentParams.color === color ? undefined : color)}
                  className={cn(
                    'px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors',
                    currentParams.color === color
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                      : 'bg-white text-[#6B6B6B] border-[#E8E8E8] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
                  )}
                >
                  {color}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Price */}
      <div className="border-b border-[#F0F0F0] pb-3">
        <SectionHeader label="Prix (MAD)" sectionKey="price" />
        {sections.price && (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-[#A8A8A8] mb-1 block font-medium">Min</label>
              <input
                type="number"
                defaultValue={currentParams.minPrice ?? ''}
                placeholder="0"
                min={0}
                onBlur={(e) => updateParam('minPrice', e.target.value || undefined)}
                className="w-full border border-[#E8E8E8] rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#6BAED6]/20 focus:border-[#6BAED6]"
              />
            </div>
            <div>
              <label className="text-[10px] text-[#A8A8A8] mb-1 block font-medium">Max</label>
              <input
                type="number"
                defaultValue={currentParams.maxPrice ?? ''}
                placeholder="999"
                min={0}
                onBlur={(e) => updateParam('maxPrice', e.target.value || undefined)}
                className="w-full border border-[#E8E8E8] rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#6BAED6]/20 focus:border-[#6BAED6]"
              />
            </div>
          </div>
        )}
      </div>

      {/* In stock */}
      <label className="flex items-center gap-2.5 py-2.5 cursor-pointer group">
        <input
          type="checkbox"
          checked={currentParams.inStock === 'true'}
          onChange={(e) => updateParam('inStock', e.target.checked ? 'true' : undefined)}
          className="h-4 w-4 rounded border-[#E8E8E8] accent-[#6BAED6]"
        />
        <span className="text-sm text-[#1A1A1A] font-medium group-hover:text-[#6BAED6] transition-colors">
          En stock uniquement
        </span>
      </label>

      {hasFilters && (
        <button
          onClick={clearAll}
          className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-[#6BAED6] bg-[#EAF5FC] hover:bg-[#FFE8DC] rounded-lg border border-[#A8D4ED] transition-colors mt-2"
        >
          <X size={12} /> Effacer les filtres
        </button>
      )}
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 text-sm font-bold text-[#1A1A1A] bg-white border border-[#E8E8E8] rounded-lg px-4 py-2.5 hover:border-[#6BAED6] transition-colors"
        >
          <SlidersHorizontal size={16} className="text-[#6BAED6]" />
          Filtres
          {hasFilters && (
            <span className="bg-[#6BAED6] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-black leading-none">
              !
            </span>
          )}
        </button>

        {open && (
          <div className="fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
            <div className="relative ml-auto w-80 bg-white h-full overflow-y-auto shadow-xl">
              <div className="sticky top-0 bg-white border-b border-[#E8E8E8] px-5 py-4 flex items-center justify-between">
                <h2 className="font-extrabold text-[#1A1A1A]">Filtres</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 hover:bg-[#F5F5F5] rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-4">{filtersContent}</div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-56 shrink-0">
        <div className="bg-white rounded-xl border border-[#E8E8E8] overflow-hidden">
          <div className="bg-[#FAFAF7] border-b border-[#E8E8E8] px-4 py-3">
            <h2 className="font-extrabold text-[13px] text-[#1A1A1A] uppercase tracking-wide">Filtres</h2>
          </div>
          <div className="p-4">{filtersContent}</div>
        </div>
      </div>
    </>
  )
}
