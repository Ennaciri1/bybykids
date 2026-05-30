import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { LanguageProvider } from '@/lib/i18n/context'
import { getLocale } from '@/lib/i18n/server'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  return (
    <LanguageProvider initialLocale={locale}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </LanguageProvider>
  )
}
