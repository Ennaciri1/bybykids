import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Politique de confidentialité — BybykidsStore' }

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">Politique de confidentialité</h1>
      <div className="space-y-6 text-neutral-600 text-sm leading-relaxed">
        <p>Chez BybykidsStore, nous prenons la protection de vos données personnelles très au sérieux.</p>
        <section>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">Données collectées</h2>
          <p>Lors d&apos;une commande, nous collectons uniquement les données nécessaires : nom complet, numéro de téléphone, ville et adresse de livraison. Aucun compte client n&apos;est créé.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">Utilisation des données</h2>
          <p>Vos données sont utilisées exclusivement pour traiter et livrer vos commandes. Elles ne sont jamais vendues ni partagées avec des tiers, sauf les transporteurs nécessaires à la livraison.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">Conservation des données</h2>
          <p>Vos données de commande sont conservées pendant une durée de 3 ans à des fins comptables et légales.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">Cookies</h2>
          <p>Nous utilisons uniquement des cookies techniques nécessaires au bon fonctionnement du site (panier d&apos;achat). Aucun cookie de tracking ou publicitaire n&apos;est utilisé.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">Vos droits</h2>
          <p>Conformément à la loi 09-08 relative à la protection des données personnelles au Maroc, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. Contactez-nous pour exercer ces droits.</p>
        </section>
      </div>
    </div>
  )
}
