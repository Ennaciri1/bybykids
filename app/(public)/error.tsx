'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="bg-[#FAFAF7] min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <p className="text-4xl font-extrabold text-[#6BAED6] mb-3">Oups</p>
        <h1 className="text-xl font-bold text-[#1A1A1A] mb-2">Une erreur est survenue</h1>
        <p className="text-sm text-[#6B6B6B] mb-6">
          Quelque chose s&apos;est mal passé. Veuillez réessayer.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="bg-[#6BAED6] text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-[#4A8FBA] transition-colors"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="text-sm font-semibold text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
          >
            Accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
