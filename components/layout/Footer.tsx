import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="mt-auto">
      {/* COD strip — gradient */}
      <div className="bg-gradient-to-r from-[#6BAED6] via-[#9BBFE8] to-[#EF8DB2]">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-white text-sm font-bold text-center">
            <span>📦 Paiement à la livraison</span>
            <span className="text-white/40 hidden sm:block">·</span>
            <span>🚚 Livraison 2–4 jours partout au Maroc</span>
            <span className="text-white/40 hidden sm:block">·</span>
            <span>🔄 Retour facile sous 7 jours</span>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="mb-3">
                <Image
                  src="/bybykids_logo_no_background.png"
                  alt="BybyKids"
                  width={130}
                  height={52}
                  className="h-14 w-auto object-contain logo-hover drop-shadow-[0_0_8px_rgba(107,174,214,0.4)]"
                />
              </div>
              <p className="text-sm text-white/55 leading-relaxed mb-4">
                Des vêtements doux et pratiques pour bébé et enfant.
                Livraison partout au Maroc.
              </p>
              <div className="flex gap-3">
                <a href="#" className="text-xs text-white/45 hover:text-white transition-colors">Instagram</a>
                <span className="text-white/20">·</span>
                <a href="#" className="text-xs text-white/45 hover:text-white transition-colors">Facebook</a>
                <span className="text-white/20">·</span>
                <a href="#" className="text-xs text-white/45 hover:text-white transition-colors">TikTok</a>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-xs font-bold tracking-[0.1em] uppercase text-white/35 mb-4">Catégories</h3>
              <ul className="space-y-2.5">
                {[
                  ['/shop', 'Toute la boutique'],
                  ['/shop?category=bebe', 'Bébé 0–2 ans'],
                  ['/shop?category=fille', 'Fille 2–12 ans'],
                  ['/shop?category=garcon', 'Garçon 2–12 ans'],
                  ['/shop?category=pyjamas', 'Pyjamas'],
                  ['/shop?featured=true', 'Nouveautés'],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-white/60 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service */}
            <div>
              <h3 className="text-xs font-bold tracking-[0.1em] uppercase text-white/35 mb-4">Service client</h3>
              <ul className="space-y-2.5">
                {[
                  ['/suivi-commande', 'Suivre ma commande'],
                  ['/delivery', 'Livraison & frais'],
                  ['/returns', 'Retours & échanges'],
                  ['/about', 'À propos de nous'],
                  ['/contact', 'Nous contacter'],
                  ['/terms', 'CGV'],
                  ['/privacy', 'Confidentialité'],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-white/60 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xs font-bold tracking-[0.1em] uppercase text-white/35 mb-4">Contact</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-white/35 mb-0.5">WhatsApp</p>
                  <a
                    href="https://wa.me/212600000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    +212 6XX XXX XXX
                  </a>
                </div>
                <div>
                  <p className="text-xs text-white/35 mb-0.5">Email</p>
                  <a href="mailto:contact@bybykids.ma" className="text-sm text-white/70 hover:text-white transition-colors">
                    contact@bybykids.ma
                  </a>
                </div>
                <div>
                  <p className="text-xs text-white/35 mb-0.5">Horaires</p>
                  <p className="text-sm text-white/60">Lun–Sam, 9h–21h</p>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/212600000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-[#1ebe58] transition-colors mt-1"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Commander sur WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/25">
            <p>© {new Date().getFullYear()} Byby Kids — Tous droits réservés</p>
            <p>Paiement à la livraison · Maroc 🇲🇦</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
