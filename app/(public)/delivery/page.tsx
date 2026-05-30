import type { Metadata } from 'next'
import { getT } from '@/lib/i18n/server'

export const metadata: Metadata = { title: 'Livraison — Byby Kids' }

export default async function DeliveryPage() {
  const { t } = await getT()
  const d = t.delivery
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">{d.title}</h1>
      <div className="space-y-8 text-neutral-600">
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">{d.delaysTitle}</h2>
          <p>{d.delaysDesc}</p>
          <ul className="mt-3 space-y-1 list-disc list-inside text-sm">
            {d.delaysItems.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">{d.feesTitle}</h2>
          <p>{d.feesDesc}</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">{d.codTitle}</h2>
          <p>{d.codDesc}</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">{d.confirmTitle}</h2>
          <p>{d.confirmDesc}</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">{d.trackTitle}</h2>
          <p>{d.trackDesc}</p>
        </section>
      </div>
    </div>
  )
}
