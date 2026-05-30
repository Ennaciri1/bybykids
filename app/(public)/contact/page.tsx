import type { Metadata } from 'next'
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import { getT } from '@/lib/i18n/server'

export const metadata: Metadata = { title: 'Contact — Byby Kids' }

export default async function ContactPage() {
  const { t } = await getT()
  const c = t.contact
  const items = [
    { icon: <Phone size={20} />, title: c.phone, desc: '+212 6XX XXX XXX', sub: c.phoneSub },
    { icon: <MessageCircle size={20} />, title: c.whatsapp, desc: '+212 6XX XXX XXX', sub: c.whatsappSub },
    { icon: <Mail size={20} />, title: c.email, desc: 'contact@bybykids.ma', sub: c.emailSub },
    { icon: <MapPin size={20} />, title: c.location, desc: c.locationDesc, sub: c.locationSub },
  ]
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-3xl font-bold text-neutral-900 mb-3">{c.title}</h1>
      <p className="text-neutral-500 mb-10">{c.subtitle}</p>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900">{c.coordTitle}</h2>
          {items.map((item) => (
            <div key={item.title} className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700 shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="font-medium text-neutral-900">{item.title}</h3>
                <p className="text-neutral-700 text-sm">{item.desc}</p>
                <p className="text-neutral-400 text-xs">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-neutral-50 rounded-xl p-6 h-fit">
          <h2 className="text-xl font-semibold text-neutral-900 mb-5">{c.formTitle}</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">{c.name}</label>
              <input type="text" className="w-full border border-neutral-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900" placeholder={c.namePlaceholder} />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">{c.tel}</label>
              <input type="tel" className="w-full border border-neutral-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900" placeholder={c.telPlaceholder} />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">{c.message}</label>
              <textarea rows={4} className="w-full border border-neutral-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none" placeholder={c.messagePlaceholder} />
            </div>
            <button type="submit" className="w-full bg-neutral-900 text-white rounded-lg py-3 text-sm font-medium hover:bg-neutral-700 transition-colors">
              {c.send}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
