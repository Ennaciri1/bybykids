import type { Metadata } from 'next'
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact — BybykidsStore',
  description: 'Contactez BybykidsStore pour toute question sur vos commandes ou nos produits.',
}

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-3xl font-bold text-neutral-900 mb-3">Contactez-nous</h1>
      <p className="text-neutral-500 mb-10">
        Notre équipe est disponible pour répondre à toutes vos questions.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900">Nos coordonnées</h2>

          {[
            {
              icon: <Phone size={20} />,
              title: 'Téléphone',
              desc: '+212 6XX XXX XXX',
              sub: 'Lun–Sam, 9h–19h',
            },
            {
              icon: <MessageCircle size={20} />,
              title: 'WhatsApp',
              desc: '+212 6XX XXX XXX',
              sub: 'Réponse rapide garantie',
            },
            {
              icon: <Mail size={20} />,
              title: 'Email',
              desc: 'contact@bybykidsstore.ma',
              sub: 'Réponse sous 24h',
            },
            {
              icon: <MapPin size={20} />,
              title: 'Localisation',
              desc: 'Maroc',
              sub: 'Livraison nationale',
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700 shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="font-medium text-neutral-900">{item.title}</h3>
                <p className="text-neutral-700 text-sm">{item.desc}</p>
                <p className="text-neutral-400 text-xs">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-neutral-50 rounded-xl p-6 h-fit">
          <h2 className="text-xl font-semibold text-neutral-900 mb-5">Envoyez-nous un message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Nom</label>
              <input
                type="text"
                className="w-full border border-neutral-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Téléphone</label>
              <input
                type="tel"
                className="w-full border border-neutral-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                placeholder="0612345678"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Message</label>
              <textarea
                rows={4}
                className="w-full border border-neutral-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none"
                placeholder="Votre message..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-neutral-900 text-white rounded-lg py-3 text-sm font-medium hover:bg-neutral-700 transition-colors"
            >
              Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
