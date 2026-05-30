import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { getLocale } from '@/lib/i18n/server'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Byby Kids — Vêtements bébé & enfant au Maroc',
    template: '%s | Byby Kids',
  },
  description:
    'Boutique de vêtements bébé et enfant au Maroc. Des pièces douces pour tous les jours. Livraison partout au Maroc. Paiement à la livraison.',
  keywords: ['vêtements bébé', 'vêtements enfant', 'mode enfant maroc', 'boutique enfant', 'livraison maroc'],
  openGraph: { type: 'website', locale: 'fr_MA', siteName: 'Byby Kids' },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={`h-full ${nunito.variable}`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased bg-[#FAFAF8] text-[#1A1A1A]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
