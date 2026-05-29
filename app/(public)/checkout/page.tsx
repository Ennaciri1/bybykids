'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCartStore, selectSubtotal } from '@/lib/store/cart'
import { checkoutSchema, type CheckoutSchema } from '@/lib/validations/checkout'
import { formatPrice, MOROCCAN_CITIES } from '@/lib/utils'
import { validatePromoCode, placeOrder, getDeliveryFee } from '@/lib/actions'
import { Tag, X, Check, Loader2, Truck } from 'lucide-react'

type AppliedPromo = {
  id: string
  code: string
  label: string
  discount: number
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart } = useCartStore()
  const sub = useCartStore(selectSubtotal)

  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState<string | null>(null)
  const [promoInput, setPromoInput]     = useState('')
  const [promoLoading, setPromoLoading] = useState(false)
  const [promoError, setPromoError]     = useState<string | null>(null)
  const [applied, setApplied]           = useState<AppliedPromo | null>(null)
  const [deliveryFee, setDeliveryFee]   = useState<number | null>(null)
  const [orderDone, setOrderDone]       = useState(false)

  useEffect(() => {
    getDeliveryFee().then(setDeliveryFee)
  }, [])

  useEffect(() => {
    if (items.length === 0 && !orderDone) router.replace('/cart')
  }, [items.length, orderDone, router])

  const discount = applied?.discount ?? 0
  const total    = sub + (deliveryFee ?? 0) - discount

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
  })

  if (items.length === 0) return null

  const handleApplyPromo = async () => {
    if (!promoInput.trim()) return
    setPromoLoading(true)
    setPromoError(null)
    const result = await validatePromoCode(promoInput.trim(), sub)
    if (!result.valid) {
      setPromoError(result.error)
    } else {
      setApplied({ id: result.id, code: promoInput.trim().toUpperCase(), label: result.label, discount: result.discount })
      setPromoInput('')
    }
    setPromoLoading(false)
  }

  const removePromo = () => { setApplied(null); setPromoError(null) }

  const onSubmit = async (data: CheckoutSchema) => {
    setLoading(true)
    setError(null)
    const result = await placeOrder({
      fullName:      data.fullName,
      phone:         data.phone,
      city:          data.city,
      address:       data.address,
      notes:         data.notes,
      items,
      subtotal:      sub,
      deliveryFee:   deliveryFee ?? 0,
      total,
      promoDiscount: applied?.discount,
      promoCodeId:   applied?.id,
    })
    if ('error' in result) {
      setError(result.error)
      setLoading(false)
      return
    }
    setOrderDone(true)
    clearCart()
    router.push(`/order-success?ref=${result.orderNumber}&name=${encodeURIComponent(data.fullName)}&phone=${encodeURIComponent(data.phone)}`)
  }

  const field = (hasError: boolean) =>
    `w-full border rounded-lg px-4 py-3 text-sm bg-white text-[#1A1A1A] placeholder:text-[#A8A8A8] focus:outline-none focus:ring-2 transition-colors ${
      hasError
        ? 'border-red-300 focus:ring-red-200'
        : 'border-[#E8E8E8] focus:ring-[#6BAED6]/20 focus:border-[#6BAED6]'
    }`

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-14">

      <h1 className="text-[26px] font-extrabold text-[#1A1A1A] mb-8">
        Finaliser la commande
      </h1>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">

        {/* Form */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

            <div className="space-y-5">
              <h2 className="text-sm font-bold text-[#1A1A1A] border-b border-[#E8E8E8] pb-3">
                Informations de livraison
              </h2>

              <div>
                <label className="block text-xs font-bold text-[#6B6B6B] uppercase tracking-wide mb-1.5">
                  Nom complet *
                </label>
                <input {...register('fullName')} placeholder="Prénom et nom" className={field(!!errors.fullName)} />
                {errors.fullName && <p className="text-red-500 text-xs mt-1.5">{errors.fullName.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#6B6B6B] uppercase tracking-wide mb-1.5">
                  Téléphone *
                </label>
                <input {...register('phone')} type="tel" placeholder="06 XX XX XX XX" className={field(!!errors.phone)} />
                {errors.phone && <p className="text-red-500 text-xs mt-1.5">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#6B6B6B] uppercase tracking-wide mb-1.5">
                  Ville *
                </label>
                <select {...register('city')} className={field(!!errors.city)}>
                  <option value="">Sélectionnez votre ville</option>
                  {MOROCCAN_CITIES.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {errors.city && <p className="text-red-500 text-xs mt-1.5">{errors.city.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#6B6B6B] uppercase tracking-wide mb-1.5">
                  Adresse complète *
                </label>
                <textarea {...register('address')} rows={3} placeholder="Numéro, rue, quartier..." className={`${field(!!errors.address)} resize-none`} />
                {errors.address && <p className="text-red-500 text-xs mt-1.5">{errors.address.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#6B6B6B] uppercase tracking-wide mb-1.5">
                  Notes pour le livreur <span className="normal-case font-normal text-[#A8A8A8] ml-1">(optionnel)</span>
                </label>
                <textarea {...register('notes')} rows={2} placeholder="Instructions particulières..." className={`${field(false)} resize-none`} />
              </div>
            </div>

            {/* COD notice */}
            <div className="border border-[#B4D4C0] bg-[#EEF6F1] rounded-lg p-4">
              <p className="text-sm font-bold text-[#2F6A40] mb-1">Paiement à la livraison</p>
              <p className="text-xs text-[#3A8A50] leading-relaxed">
                Vous payez uniquement quand vous recevez votre commande.
                On vous appelle pour confirmer avant expédition.
              </p>
            </div>

            {error && (
              <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6BAED6] text-white text-sm font-bold py-3.5 rounded-lg hover:bg-[#4A8FBA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" />Envoi en cours...</>
              ) : (
                'Confirmer la commande'
              )}
            </button>
          </form>
        </div>

        {/* Order summary */}
        <div>
          <div className="bg-white border border-[#E8E8E8] rounded-xl p-5 sticky top-20">
            <h2 className="text-sm font-bold text-[#1A1A1A] mb-4 pb-3 border-b border-[#E8E8E8]">
              Votre commande
            </h2>

            {/* Items */}
            <div className="space-y-4 mb-5">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-3">
                  <div className="relative w-14 h-[72px] rounded-lg overflow-hidden bg-[#F5F5F5] shrink-0">
                    <Image src={item.image} alt={item.productName} fill className="object-cover" />
                    <span className="absolute -top-1 -right-1 bg-[#1A1A1A] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold leading-none">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#1A1A1A] line-clamp-2 leading-snug">{item.productName}</p>
                    <p className="text-xs text-[#A8A8A8] mt-0.5">{item.size} · {item.color}</p>
                  </div>
                  <span className="text-xs font-bold text-[#1A1A1A] shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Promo code input */}
            <div className="border-t border-[#E8E8E8] pt-4 mb-4">
              {applied ? (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-green-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-green-800 font-mono tracking-wide">{applied.code}</p>
                      <p className="text-[10px] text-green-600">{applied.label} appliqué</p>
                    </div>
                  </div>
                  <button onClick={removePromo} className="text-green-400 hover:text-green-700 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-[#6B6B6B] uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                    <Tag size={11} />
                    Code promo
                  </label>
                  <div className="flex gap-2">
                    <input
                      value={promoInput}
                      onChange={(e) => { setPromoInput(e.target.value.toUpperCase()); setPromoError(null) }}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleApplyPromo())}
                      placeholder="Entrez votre code"
                      className="flex-1 border border-[#E8E8E8] rounded-lg px-3 py-2 text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-[#6BAED6]/20 focus:border-[#6BAED6]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      disabled={promoLoading || !promoInput.trim()}
                      className="shrink-0 bg-[#1A1A1A] text-white text-xs font-bold px-4 rounded-lg hover:bg-[#333] transition-colors disabled:opacity-40"
                    >
                      {promoLoading ? <Loader2 size={13} className="animate-spin" /> : 'Appliquer'}
                    </button>
                  </div>
                  {promoError && <p className="text-red-500 text-xs mt-1.5">{promoError}</p>}
                </div>
              )}
            </div>

            {/* Totals */}
            <div className="border-t border-[#E8E8E8] pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-[#6B6B6B]">
                <span>Sous-total</span>
                <span>{formatPrice(sub)}</span>
              </div>
              <div className="flex justify-between text-[#6B6B6B]">
                <span className="flex items-center gap-1"><Truck size={12} /> Livraison</span>
                {deliveryFee === null ? (
                  <span className="w-10 h-3.5 bg-[#F5F5F5] rounded animate-pulse inline-block" />
                ) : deliveryFee === 0 ? (
                  <span className="text-[#2F6A40] font-bold text-xs">Gratuite</span>
                ) : (
                  <span>{formatPrice(deliveryFee)}</span>
                )}
              </div>
              {applied && (
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Réduction ({applied.code})</span>
                  <span>-{formatPrice(applied.discount)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-[#1A1A1A] text-base pt-2 border-t border-[#E8E8E8]">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
