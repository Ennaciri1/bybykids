import { Star } from 'lucide-react'
import { dictionaries, type Locale } from '@/lib/i18n'

type Review = {
  id: string
  author_name: string
  rating: number
  comment: string
  created_at: string
}

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          className={s <= rating ? 'text-[#F5C333] fill-[#F5C333]' : 'text-[#DDEEF8] fill-[#DDEEF8]'}
        />
      ))}
    </div>
  )
}

export function ReviewsList({ reviews, locale = 'fr' }: { reviews: Review[]; locale?: Locale }) {
  const t = dictionaries[locale].review

  if (reviews.length === 0) {
    return (
      <div className="text-center py-10 bg-[#FAFAF7] rounded-2xl border border-[#EBEBEB]">
        <Star size={32} className="mx-auto text-[#DDEEF8] fill-[#DDEEF8] mb-2" />
        <p className="text-sm font-bold text-[#1C1C1E]">{t.noReviews}</p>
        <p className="text-xs text-[#A8A8A8] mt-1">{t.noReviewsFirst}</p>
      </div>
    )
  }

  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
  const avgRounded = Math.round(avg * 10) / 10

  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    pct: Math.round((reviews.filter((r) => r.rating === star).length / reviews.length) * 100),
  }))

  const dateLocale = locale === 'ar' ? 'ar-MA' : 'fr-MA'

  return (
    <div className="space-y-6">

      {/* Résumé */}
      <div className="bg-gradient-to-br from-[#EAF5FC] to-[#FEF0F6] rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-6">
        <div className="text-center shrink-0">
          <p className="text-5xl font-extrabold text-[#1C1C1E] leading-none">{avgRounded}</p>
          <StarRow rating={Math.round(avg)} size={18} />
          <p className="text-xs text-[#6B6B6B] mt-1">{t.reviewsLabel(reviews.length)}</p>
        </div>

        <div className="flex-1 w-full space-y-1.5">
          {dist.map(({ star, count, pct }) => (
            <div key={star} className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 shrink-0 w-20">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={10}
                    className={s <= star ? 'text-[#F5C333] fill-[#F5C333]' : 'text-[#DDEEF8] fill-[#DDEEF8]'} />
                ))}
              </div>
              <div className="flex-1 bg-white rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#6BAED6] to-[#EF8DB2] rounded-full transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-[11px] text-[#6B6B6B] shrink-0 w-8 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Liste des avis */}
      <div className="space-y-3">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white border border-[#EBEBEB] rounded-2xl p-4 hover:border-[#DEEEF8] hover:shadow-sm transition-all">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6BAED6] to-[#EF8DB2] flex items-center justify-center shrink-0">
                  <span className="text-white font-extrabold text-sm">
                    {review.author_name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1C1C1E]">{review.author_name}</p>
                  <StarRow rating={review.rating} size={12} />
                </div>
              </div>
              <span className="text-[11px] text-[#A8A8A8] shrink-0">
                {new Date(review.created_at).toLocaleDateString(dateLocale, {
                  day: 'numeric', month: 'short', year: 'numeric'
                })}
              </span>
            </div>
            <p className="text-sm text-[#4A4A4A] leading-relaxed pl-11">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
