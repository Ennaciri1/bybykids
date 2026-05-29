import Link from 'next/link'
import { CheckCircle, Package, Phone, Truck, Clock, ShoppingBag } from 'lucide-react'

type Props = { searchParams: Promise<{ ref?: string; name?: string }> }

export default async function OrderSuccessPage({ searchParams }: Props) {
  const { ref, name } = await searchParams
  const decodedName = name ? decodeURIComponent(name) : null

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">

        {/* Success icon */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center mb-5">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#EAF5FC] to-[#FEF0F6] flex items-center justify-center shadow-lg shadow-[#6BAED6]/20">
              <CheckCircle size={48} className="text-[#6BAED6]" strokeWidth={1.5} />
            </div>
            <span className="absolute -top-1 -right-1 text-2xl">🎉</span>
          </div>

          <h1 className="text-2xl md:text-[28px] font-extrabold text-[#1A1A1A] mb-3">
            Merci pour votre commande !
          </h1>
          <p className="text-[#6B6B6B] text-sm leading-relaxed max-w-sm mx-auto">
            {decodedName ? (
              <>Bonjour <strong className="text-[#1A1A1A]">{decodedName}</strong>, votre commande a bien été reçue.</>
            ) : (
              'Votre commande a bien été reçue.'
            )}
            {' '}Notre équipe vous rappellera dans les plus brefs délais pour confirmer et organiser la livraison.
          </p>
        </div>

        {/* Call-out card */}
        <div className="bg-gradient-to-r from-[#EAF5FC] to-[#FEF0F6] border border-[#6BAED6]/20 rounded-2xl p-5 mb-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
            <Phone size={20} className="text-[#6BAED6]" />
          </div>
          <div>
            <p className="font-extrabold text-[#1A1A1A] text-sm mb-1">On vous rappelle très bientôt !</p>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Vous recevrez un appel de notre équipe pour confirmer votre commande avant l'expédition.
            </p>
          </div>
        </div>

        {/* Order details card */}
        {ref && (
          <div className="bg-white rounded-2xl border border-[#EBEBEB] p-5 mb-5">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#F5F5F5]">
              <Package size={16} className="text-[#6BAED6]" />
              <span className="font-extrabold text-[#1A1A1A] text-sm">Détails de la commande</span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-[#A8A8A8]">Numéro de référence</span>
                <span className="font-mono font-extrabold text-[#6BAED6] bg-[#EAF5FC] px-2.5 py-1 rounded-lg text-xs">
                  {ref}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#A8A8A8]">Statut</span>
                <span className="flex items-center gap-1.5 text-amber-700 font-bold text-xs bg-amber-50 px-2.5 py-1 rounded-lg">
                  <Clock size={11} /> En attente de confirmation
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#A8A8A8]">Paiement</span>
                <span className="font-semibold text-[#2F6A40] text-xs bg-[#EEF6F1] px-2.5 py-1 rounded-lg">
                  À la livraison
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#A8A8A8]">Délai de livraison</span>
                <span className="flex items-center gap-1.5 text-[#2A7BAD] font-bold text-xs">
                  <Truck size={11} /> 2 – 4 jours ouvrables
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Next steps */}
        <div className="bg-white rounded-2xl border border-[#EBEBEB] p-5 mb-6">
          <p className="text-xs font-extrabold text-[#A8A8A8] uppercase tracking-wide mb-3">Prochaines étapes</p>
          <div className="space-y-3">
            {[
              { icon: Phone,        color: '#6BAED6', bg: '#EAF5FC', step: '1', text: 'Nous vous appelons pour confirmer la commande' },
              { icon: Package,      color: '#EF8DB2', bg: '#FEF0F6', step: '2', text: 'Votre colis est préparé et remis au livreur' },
              { icon: Truck,        color: '#2F6A40', bg: '#EEF6F1', step: '3', text: 'Livraison à votre domicile en 2–4 jours' },
            ].map(({ icon: Icon, color, bg, step, text }) => (
              <div key={step} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: bg }}>
                  <Icon size={15} style={{ color }} />
                </div>
                <p className="text-xs text-[#4A4A4A] leading-snug flex-1">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/shop"
            className="flex-1 bg-gradient-to-r from-[#6BAED6] to-[#5A9EC6] text-white font-bold py-3.5 rounded-xl text-sm hover:from-[#5A9EC6] hover:to-[#4A8FBA] transition-all text-center flex items-center justify-center gap-2 shadow-sm shadow-[#6BAED6]/25"
          >
            <ShoppingBag size={15} />
            Continuer les achats
          </Link>
        </div>

      </div>
    </div>
  )
}
