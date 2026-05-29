import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de livraison — BybykidsStore',
}

export default function DeliveryPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">Politique de livraison</h1>
      <div className="space-y-8 text-neutral-600">

        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">Délais de livraison</h2>
          <p>
            Nous livrons partout au Maroc. Les commandes sont traitées et expédiées sous 24 à 48h ouvrables après confirmation. Le délai de livraison est de <strong className="text-neutral-900">2 à 4 jours ouvrables</strong> selon votre région.
          </p>
          <ul className="mt-3 space-y-1 list-disc list-inside text-sm">
            <li>Casablanca, Rabat, Marrakech : 1 à 2 jours</li>
            <li>Autres grandes villes : 2 à 3 jours</li>
            <li>Zones rurales et éloignées : 3 à 5 jours</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">Frais de livraison</h2>
          <p>
            Les frais de livraison sont de <strong className="text-neutral-900">30 MAD</strong> pour toute commande au Maroc. La livraison est assurée par des transporteurs fiables et reconnus.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">Paiement à la livraison</h2>
          <p>
            Nous proposons uniquement le paiement à la livraison (Cash on Delivery). Vous payez le livreur directement lors de la réception de votre commande. Aucun paiement en ligne n&apos;est requis.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">Confirmation de commande</h2>
          <p>
            Après avoir passé votre commande, notre équipe vous contactera par téléphone dans les 24h pour confirmer les détails et le créneau de livraison.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">Suivi de commande</h2>
          <p>
            Une fois votre commande expédiée, vous recevrez les informations de suivi par téléphone ou WhatsApp. N&apos;hésitez pas à nous contacter pour toute question.
          </p>
        </section>
      </div>
    </div>
  )
}
