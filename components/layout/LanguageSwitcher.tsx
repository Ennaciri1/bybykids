'use client'

import { useT } from '@/lib/i18n/context'

export function LanguageSwitcher() {
  const { locale, setLocale } = useT()
  return (
    <button
      onClick={() => setLocale(locale === 'fr' ? 'ar' : 'fr')}
      className="text-[11px] font-bold px-2.5 py-1 rounded-lg border border-[#E8E8E8] hover:border-[#6BAED6] text-[#6B6B6B] hover:text-[#6BAED6] transition-colors shrink-0"
      aria-label="Changer la langue"
    >
      {locale === 'fr' ? 'عربي' : 'FR'}
    </button>
  )
}
