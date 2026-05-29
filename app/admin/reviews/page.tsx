import { createClient } from '@/lib/supabase/server'
import { Star } from 'lucide-react'
import { ReviewsManager } from '@/components/admin/ReviewsManager'

export default async function AdminReviewsPage() {
  const supabase = await createClient()

  const { data: raw } = await (supabase as any)
    .from('reviews')
    .select('id, author_name, rating, comment, is_approved, created_at, product_id, products(name)')
    .order('created_at', { ascending: false })

  const reviews = (raw ?? []).map((r: any) => ({
    id:           r.id,
    author_name:  r.author_name,
    rating:       r.rating,
    comment:      r.comment,
    is_approved:  r.is_approved,
    created_at:   r.created_at,
    product_id:   r.product_id,
    product_name: r.products?.name ?? '—',
  }))

  const pending = reviews.filter((r: any) => !r.is_approved).length

  return (
    <div className="px-4 md:px-8 py-6 md:py-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-extrabold text-neutral-900 flex items-center gap-2">
            <Star size={20} className="text-[#F5C333] fill-[#F5C333]" />
            Avis clients
          </h1>
          <p className="text-sm text-neutral-400 mt-0.5">
            {reviews.length} avis au total
            {pending > 0 && (
              <span className="ml-2 inline-flex items-center bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">
                {pending} en attente
              </span>
            )}
          </p>
        </div>
      </div>

      <ReviewsManager reviews={reviews} />
    </div>
  )
}
