import { cookies } from 'next/headers'
import { dictionaries, type Locale } from './index'

export async function getLocale(): Promise<Locale> {
  const store = await cookies()
  const val = store.get('locale')?.value
  return val === 'ar' ? 'ar' : 'fr'
}

export async function getT() {
  const locale = await getLocale()
  return { t: dictionaries[locale], locale }
}
