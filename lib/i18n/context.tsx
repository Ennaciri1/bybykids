'use client'

import { createContext, useContext, useState, useTransition, type ReactNode } from 'react'
import { dictionaries, type Locale, type Dictionary } from './index'

type I18nCtx = {
  locale: Locale
  t: Dictionary
  setLocale: (l: Locale) => void
  isPending: boolean
}

const Ctx = createContext<I18nCtx | null>(null)

export function LanguageProvider({ children, initialLocale }: { children: ReactNode; initialLocale: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)
  const [isPending, startTransition] = useTransition()

  const setLocale = (l: Locale) => {
    document.cookie = `locale=${l};path=/;max-age=31536000`
    document.documentElement.lang = l
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr'
    startTransition(() => setLocaleState(l))
  }

  return (
    <Ctx.Provider value={{ locale, t: dictionaries[locale], setLocale, isPending }}>
      {children}
    </Ctx.Provider>
  )
}

export function useT() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useT must be inside LanguageProvider')
  return ctx
}
