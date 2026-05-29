import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl font-bold text-neutral-200 mb-4">404</p>
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Page introuvable</h1>
      <p className="text-neutral-500 mb-8 max-w-sm">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <div className="flex gap-3">
        <Link href="/">
          <Button>Retour à l&apos;accueil</Button>
        </Link>
        <Link href="/shop">
          <Button variant="outline">Voir la boutique</Button>
        </Link>
      </div>
    </div>
  )
}
