'use client'

import { useState } from 'react'
import { Star, Send, CheckCircle } from 'lucide-react'
import { submitReview } from '@/lib/actions'

export function ReviewForm({ productId }: { productId: string }) {
  const [rating, setRating]     = useState(0)
  const [hover, setHover]       = useState(0)
  const [name, setName]         = useState('')
  const [comment, setComment]   = useState('')
  const [loading, setLoading]   = useState(false)
  const [success, setSuccess]   = useState(false)
  const [error, setError]       = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) { setError('Veuillez choisir une note.'); return }
    setLoading(true)
    setError('')
    const res = await submitReview({ productId, authorName: name, rating, comment })
    setLoading(false)
    if ('error' in res) { setError(res.error); return }
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="bg-[#D4F0E4] border border-[#A8DCBF] rounded-2xl p-6 text-center">
        <CheckCircle size={36} className="mx-auto text-[#2A8A5A] mb-3" />
        <p className="font-extrabold text-[#1C1C1E] text-base mb-1">Merci pour votre avis !</p>
        <p className="text-sm text-[#6B6B6B]">Votre commentaire sera visible après validation.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#EBEBEB] rounded-2xl p-5 space-y-4">
      <h3 className="font-extrabold text-[#1C1C1E] text-base">Laisser un avis</h3>

      {/* Stars */}
      <div>
        <p className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wide mb-2">Votre note</p>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                size={28}
                className={`transition-colors ${
                  star <= (hover || rating)
                    ? 'text-[#F5C333] fill-[#F5C333]'
                    : 'text-[#DDEEF8] fill-[#DDEEF8]'
                }`}
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="ml-2 text-sm font-bold text-[#F5C333]">
              {['', 'Mauvais', 'Passable', 'Bien', 'Très bien', 'Excellent !'][rating]}
            </span>
          )}
        </div>
      </div>

      {/* Name */}
      <div>
        <label className="block text-xs font-bold text-[#6B6B6B] uppercase tracking-wide mb-1.5">
          Votre prénom
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex : Fatima"
          required
          maxLength={50}
          className="w-full border border-[#EBEBEB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6BAED6]/40 focus:border-[#6BAED6] transition-colors"
        />
      </div>

      {/* Comment */}
      <div>
        <label className="block text-xs font-bold text-[#6B6B6B] uppercase tracking-wide mb-1.5">
          Votre commentaire
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Partagez votre expérience avec ce produit…"
          required
          maxLength={500}
          rows={3}
          className="w-full border border-[#EBEBEB] rounded-xl px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#6BAED6]/40 focus:border-[#6BAED6] transition-colors"
        />
        <p className="text-[10px] text-[#A8A8A8] text-right mt-1">{comment.length}/500</p>
      </div>

      {error && (
        <p className="text-xs font-bold text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#6BAED6] to-[#5A9EC6] text-white font-bold py-3 rounded-xl hover:from-[#5A9EC6] hover:to-[#4A8FBA] transition-all disabled:opacity-60 shadow-sm shadow-[#6BAED6]/30"
      >
        <Send size={15} />
        {loading ? 'Envoi en cours…' : 'Publier mon avis'}
      </button>

      <p className="text-[10px] text-center text-[#A8A8A8]">
        Votre avis sera visible après validation par notre équipe.
      </p>
    </form>
  )
}
