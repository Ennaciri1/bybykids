import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos — BybykidsStore',
  description: 'Découvrez BybykidsStore, votre boutique de mode femme en ligne au Maroc.',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-3xl font-bold text-neutral-900 mb-6">À propos de BybykidsStore</h1>

      <div className="prose prose-neutral max-w-none text-neutral-600 leading-relaxed space-y-6">
        <p>
          Bienvenue chez <strong className="text-neutral-900">BybykidsStore</strong>, votre destination mode femme au Maroc. Nous proposons une sélection soigneusement choisie de vêtements tendance adaptés au style de vie de la femme marocaine moderne.
        </p>

        <h2 className="text-xl font-bold text-neutral-900">Notre histoire</h2>
        <p>
          Fondée avec passion, BybykidsStore est née d&apos;un désir simple : offrir aux femmes marocaines des pièces de mode accessibles, stylées et de qualité, livrées directement à leur porte.
        </p>

        <h2 className="text-xl font-bold text-neutral-900">Notre engagement</h2>
        <ul className="space-y-2 list-disc list-inside text-neutral-600">
          <li>Des produits sélectionnés avec soin pour leur qualité et leur style</li>
          <li>Des prix accessibles sans compromis sur la qualité</li>
          <li>Une livraison rapide partout au Maroc</li>
          <li>Un service client attentif et réactif</li>
          <li>Paiement à la livraison pour votre tranquillité d&apos;esprit</li>
        </ul>

        <h2 className="text-xl font-bold text-neutral-900">Livraison & retours</h2>
        <p>
          Nous livrons partout au Maroc en 2 à 4 jours ouvrables. Vous n&apos;êtes pas satisfait ? Aucun problème. Nous acceptons les retours et les échanges sous 7 jours.
        </p>

        <h2 className="text-xl font-bold text-neutral-900">Contactez-nous</h2>
        <p>
          Notre équipe est disponible pour répondre à toutes vos questions. N&apos;hésitez pas à nous contacter via notre page <a href="/contact" className="text-neutral-900 underline">Contact</a> ou par WhatsApp.
        </p>
      </div>
    </div>
  )
}
