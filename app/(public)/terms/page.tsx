import type { Metadata } from 'next'

export const metadata: Metadata = { title: "Conditions d'utilisation — BybykidsStore" }

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">Conditions d&apos;utilisation</h1>
      <div className="space-y-6 text-neutral-600 text-sm leading-relaxed">
        <p>En utilisant le site BybykidsStore, vous acceptez les présentes conditions d&apos;utilisation. Veuillez les lire attentivement avant de passer commande.</p>
        <section>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">1. Propriété intellectuelle</h2>
          <p>Tous les contenus du site (images, textes, logos) sont la propriété exclusive de BybykidsStore et sont protégés par le droit de la propriété intellectuelle marocain.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">2. Commandes</h2>
          <p>Toute commande passée sur notre site est soumise à confirmation téléphonique par notre équipe. Nous nous réservons le droit de refuser ou d&apos;annuler toute commande en cas de problème de stock ou d&apos;information incorrecte.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">3. Prix</h2>
          <p>Les prix affichés sont en MAD (Dirham marocain) et incluent la TVA. Nous nous réservons le droit de modifier les prix à tout moment sans préavis.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">4. Responsabilité</h2>
          <p>BybykidsStore ne peut être tenu responsable des dommages indirects liés à l&apos;utilisation de notre site ou de nos produits. Notre responsabilité est limitée au montant de la commande.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">5. Loi applicable</h2>
          <p>Les présentes conditions sont régies par le droit marocain. En cas de litige, les tribunaux de Casablanca seront compétents.</p>
        </section>
      </div>
    </div>
  )
}
