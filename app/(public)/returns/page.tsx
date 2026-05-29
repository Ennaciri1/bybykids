import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Retours & échanges — BybykidsStore' }

export default function ReturnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">Retours & échanges</h1>
      <div className="space-y-8 text-neutral-600">
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">Conditions de retour</h2>
          <p>Vous disposez de <strong className="text-neutral-900">7 jours</strong> à compter de la réception pour retourner ou échanger un article. Les articles doivent être :</p>
          <ul className="mt-3 space-y-1 list-disc list-inside text-sm">
            <li>Non portés, non lavés, non altérés</li>
            <li>Dans leur emballage et état d&apos;origine</li>
            <li>Accompagnés du bon de commande</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">Articles non retournables</h2>
          <ul className="space-y-1 list-disc list-inside text-sm">
            <li>Articles en promotion ou soldés</li>
            <li>Articles personnalisés sur demande</li>
            <li>Sous-vêtements et articles d&apos;hygiène</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">Procédure de retour</h2>
          <ol className="space-y-2 list-decimal list-inside text-sm">
            <li>Contactez-nous par WhatsApp ou téléphone pour signaler votre retour</li>
            <li>Notre équipe vous confirmera la procédure sous 24h</li>
            <li>Remettez l&apos;article au livreur ou envoyez-le à notre adresse</li>
            <li>Remboursement ou échange traité sous 3 à 5 jours ouvrables</li>
          </ol>
        </section>
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">Remboursements</h2>
          <p>Les remboursements sont effectués via le même mode de paiement utilisé lors de la commande (virement bancaire ou espèces selon les cas). Les frais de livraison initiaux ne sont pas remboursés, sauf en cas d&apos;article défectueux ou d&apos;erreur de notre part.</p>
        </section>
      </div>
    </div>
  )
}
