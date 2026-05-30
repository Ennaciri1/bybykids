import type { Metadata } from 'next'
import { getT } from '@/lib/i18n/server'

export const metadata: Metadata = { title: 'Retours & échanges — Byby Kids' }

export default async function ReturnsPage() {
  const { t } = await getT()
  const r = t.returns
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">{r.title}</h1>
      <div className="space-y-8 text-neutral-600">
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">{r.conditionsTitle}</h2>
          <p>{r.conditionsDesc}</p>
          <ul className="mt-3 space-y-1 list-disc list-inside text-sm">
            {r.conditionsItems.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">{r.noReturnTitle}</h2>
          <ul className="space-y-1 list-disc list-inside text-sm">
            {r.noReturnItems.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">{r.processTitle}</h2>
          <ol className="space-y-2 list-decimal list-inside text-sm">
            {r.processItems.map((item, i) => <li key={i}>{item}</li>)}
          </ol>
        </section>
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-3">{r.refundTitle}</h2>
          <p>{r.refundDesc}</p>
        </section>
      </div>
    </div>
  )
}
