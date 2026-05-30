import type { Metadata } from 'next'
import { getT } from '@/lib/i18n/server'

export const metadata: Metadata = {
  title: 'À propos — Byby Kids',
}

export default async function AboutPage() {
  const { t } = await getT()
  const a = t.about
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-3xl font-bold text-neutral-900 mb-6">{a.title}</h1>
      <div className="prose prose-neutral max-w-none text-neutral-600 leading-relaxed space-y-6">
        <p>{a.intro}</p>
        <h2 className="text-xl font-bold text-neutral-900">{a.historyTitle}</h2>
        <p>{a.history}</p>
        <h2 className="text-xl font-bold text-neutral-900">{a.commitTitle}</h2>
        <ul className="space-y-2 list-disc list-inside text-neutral-600">
          {a.commitItems.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <h2 className="text-xl font-bold text-neutral-900">{a.deliveryTitle}</h2>
        <p>{a.deliveryDesc}</p>
        <h2 className="text-xl font-bold text-neutral-900">{a.contactTitle}</h2>
        <p>{a.contactDesc}</p>
      </div>
    </div>
  )
}
