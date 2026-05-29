'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="text-center max-w-sm">
        <p className="text-3xl font-extrabold text-neutral-900 mb-2">Erreur</p>
        <p className="text-sm text-neutral-500 mb-5">
          Une erreur inattendue s&apos;est produite dans le tableau de bord.
        </p>
        <button
          onClick={reset}
          className="bg-neutral-900 text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-neutral-700 transition-colors"
        >
          Réessayer
        </button>
      </div>
    </div>
  )
}
