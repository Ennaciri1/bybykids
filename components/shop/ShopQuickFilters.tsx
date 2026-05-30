'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Percent } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CategoryIcon } from '@/components/ui/CategoryIcon'
import type { Category } from '@/lib/types'
import { useT } from '@/lib/i18n/context'

type Props = {
  categories: Category[]
  currentCategory?: string
}

export function ShopQuickFilters({ categories, currentCategory }: Props) {
  const { t } = useT()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const buildUrl = (category?: string) => {
    const params = new URLSearchParams()
    const sort = searchParams.get('sort')
    if (sort) params.set('sort', sort)
    if (category) params.set('category', category)
    const q = params.toString()
    return `${pathname}${q ? `?${q}` : ''}`
  }

  return (
    <div className="flex items-center gap-2 flex-wrap mb-5">

      {/* Promotions — badge rose, isolé des catégories */}
      <Link
        href="/promotions"
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-bold border-2 border-[#EF8DB2] text-[#EF8DB2] bg-[#FEF0F6] hover:bg-[#EF8DB2] hover:text-white transition-colors shrink-0"
      >
        <Percent size={13} />
        {t.shop.promotions}
      </Link>

      {/* Séparateur */}
      <div className="w-px h-6 bg-[#EBEBEB] shrink-0" />

      {/* Toutes catégories */}
      <Link
        href={buildUrl(undefined)}
        className={cn(
          'px-3.5 py-1.5 rounded-full text-sm font-semibold border transition-colors shrink-0',
          !currentCategory
            ? 'bg-[#1C1C1E] text-white border-[#1C1C1E]'
            : 'bg-white text-[#6B6B6B] border-[#EBEBEB] hover:border-[#1C1C1E] hover:text-[#1C1C1E]'
        )}
      >
        {t.shop.all}
      </Link>

      {/* Pills catégories */}
      {categories.map((cat) => {
        const active = currentCategory === cat.slug
        return (
          <Link
            key={cat.id}
            href={buildUrl(cat.slug)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors shrink-0',
              active
                ? 'bg-[#6BAED6] text-white border-[#6BAED6]'
                : 'bg-white text-[#6B6B6B] border-[#EBEBEB] hover:border-[#6BAED6] hover:text-[#6BAED6]'
            )}
          >
            <CategoryIcon slug={cat.slug} size={16} />
            {cat.name}
          </Link>
        )
      })}
    </div>
  )
}
