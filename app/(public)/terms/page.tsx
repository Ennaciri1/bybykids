import type { Metadata } from 'next'
import { getT } from '@/lib/i18n/server'

export const metadata: Metadata = { title: 'CGV — Byby Kids' }

export default async function TermsPage() {
  const { t, locale } = await getT()
  if (locale === 'ar') {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <h1 className="text-3xl font-bold text-neutral-900 mb-6">{t.terms.title}</h1>
        <p className="text-neutral-600 leading-relaxed">{t.terms.content}</p>
      </div>
    )
  }
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">Conditions Générales de Vente</h1>
      <div className="space-y-6 text-neutral-600 text-sm leading-relaxed">
        <p>En passant commande sur Byby Kids, vous acceptez les présentes conditions générales de vente.</p>
        <section>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">1. Propriété intellectuelle</h2>
          <p>Tous les contenus du site sont la propriété exclusive de Byby Kids et sont protégés par le droit de la propriété intellectuelle marocain.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">2. Commandes</h2>
          <p>Toute commande est soumise à confirmation téléphonique. Nous nous réservons le droit de refuser toute commande en cas de rupture de stock ou d&apos;information incorrecte.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">3. Prix</h2>
          <p>Les prix sont en MAD et incluent la TVA. Nous pouvons modifier les prix à tout moment.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">4. Loi applicable</h2>
          <p>Les présentes conditions sont régies par le droit marocain.</p>
        </section>
      </div>
    </div>
  )
}
