import type { Metadata } from 'next'
import { getT } from '@/lib/i18n/server'

export const metadata: Metadata = { title: 'Confidentialité — Byby Kids' }

export default async function PrivacyPage() {
  const { t, locale } = await getT()
  if (locale === 'ar') {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <h1 className="text-3xl font-bold text-neutral-900 mb-6">{t.privacy.title}</h1>
        <p className="text-neutral-600 leading-relaxed">{t.privacy.content}</p>
      </div>
    )
  }
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">Politique de confidentialité</h1>
      <div className="space-y-6 text-neutral-600 text-sm leading-relaxed">
        <p>Chez Byby Kids, nous prenons la protection de vos données personnelles très au sérieux.</p>
        <section>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">Données collectées</h2>
          <p>Lors d&apos;une commande, nous collectons uniquement : nom complet, téléphone, ville et adresse de livraison.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">Utilisation des données</h2>
          <p>Vos données sont utilisées exclusivement pour traiter et livrer vos commandes. Elles ne sont jamais vendues ni partagées avec des tiers.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">Cookies</h2>
          <p>Nous utilisons uniquement des cookies techniques nécessaires au bon fonctionnement du site. Aucun cookie de tracking n&apos;est utilisé.</p>
        </section>
      </div>
    </div>
  )
}
