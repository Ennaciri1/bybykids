'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { ShoppingBag, Search, Menu, X } from 'lucide-react'
import { useState, useEffect, useRef, Suspense } from 'react'
import { useCartStore, selectItemCount } from '@/lib/store/cart'
import { cn } from '@/lib/utils'

type NavLink = { href: string; label: string; promo?: boolean }

const SHOP_LINKS: NavLink[] = [
  { href: '/shop?category=fille',       label: 'Fille' },
  { href: '/shop?category=garcon',      label: 'Garçon' },
  { href: '/shop?category=pyjamas',     label: 'Pyjamas' },
  { href: '/shop?category=ensembles',   label: 'Ensembles' },
  { href: '/shop?category=accessoires', label: 'Accessoires' },
  { href: '/promotions',                 label: 'Promotions', promo: true },
]

const DRAWER_LINKS: NavLink[] = [
  ...SHOP_LINKS,
  { href: '/about',   label: 'À propos' },
  { href: '/contact', label: 'Contact' },
]

function NavbarInner() {
  const pathname     = usePathname()
  const searchParams = useSearchParams()
  const router   = useRouter()
  const [open, setOpen]               = useState(false)
  const [scrolled, setScrolled]       = useState(false)
  const [searchOpen, setSearchOpen]   = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const itemCount = useCartStore(selectItemCount)

  const currentHref = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false); setSearchOpen(false) }, [pathname, searchParams])

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus()
  }, [searchOpen])

  useEffect(() => {
    if (!searchOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSearchOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [searchOpen])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchQuery.trim()
    if (q) router.push(`/shop?q=${encodeURIComponent(q)}`)
    setSearchOpen(false)
    setSearchQuery('')
  }

  const isActive = (href: string) => currentHref === href

  return (
    <>
      {/* ── Announcement bar — gradient logo ─────────────────── */}
      <div className="bg-gradient-to-r from-[#6BAED6] via-[#9BBFE8] to-[#EF8DB2] text-white text-center py-2 px-4 text-xs font-semibold tracking-wide">
        🚚 Livraison partout au Maroc &nbsp;·&nbsp; 💳 Paiement à la livraison &nbsp;·&nbsp; 🔄 Retour sous 7 jours
      </div>

      {/* ── Main header ───────────────────────────────────────── */}
      <header className={cn(
        'sticky top-0 z-50 bg-white border-b border-[#E8E8E8] transition-shadow duration-200',
        scrolled && 'shadow-sm'
      )}>

        {/* Logo + actions row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-[68px]">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" prefetch={false}>
            <Image
              src="/bybykids_one_baby_logo_transparent.png"
              alt="BybyKids"
              width={140}
              height={56}
              className="h-12 md:h-14 w-auto object-contain logo-float logo-hover drop-shadow-sm"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {SHOP_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3.5 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap',
                  link.promo
                    ? isActive(link.href)
                      ? 'bg-[#FEF0F6] text-[#EF8DB2] font-bold'
                      : 'text-[#EF8DB2] font-bold hover:bg-[#FEF0F6]'
                    : isActive(link.href)
                    ? 'bg-[#F5F5F5] text-[#1C1C1E] font-bold'
                    : 'text-[#6B6B6B] hover:text-[#1C1C1E] hover:bg-[#F5F5F5]'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
              aria-label="Rechercher"
            >
              <Search size={20} />
            </button>

            <Link
              href="/cart"
              className="relative flex items-center gap-2 bg-[#6BAED6] text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-[#4A8FBA] transition-colors"
              aria-label="Panier"
            >
              <ShoppingBag size={16} />
              <span className="hidden sm:inline">Panier</span>
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-black min-w-[18px] h-[18px] rounded-full flex items-center justify-center leading-none px-0.5 shadow-sm">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            <button
              className="lg:hidden p-2 text-[#1A1A1A] hover:bg-[#F5F5F5] rounded-lg transition-colors"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Tablet scrollable category bar (md only) */}
        <div className="hidden md:flex lg:hidden border-t border-[#F0F0F0] overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-1 px-4 py-2 min-w-max">
            {SHOP_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-1.5 text-[12px] font-semibold whitespace-nowrap transition-colors rounded-full',
                  link.promo
                    ? 'text-[#EF8DB2] font-bold hover:bg-[#FEF0F6]'
                    : 'text-[#6B6B6B] hover:text-[#1C1C1E] hover:bg-[#F5F5F5]'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Search overlay */}
        {searchOpen && (
          <div className="absolute inset-x-0 top-0 h-16 md:h-[68px] z-60 bg-white border-b border-[#E8E8E8] shadow-md flex items-center px-4 gap-3">
            <Search size={18} className="text-[#A8A8A8] shrink-0" />
            <form onSubmit={handleSearchSubmit} className="flex-1">
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un produit…"
                className="w-full text-sm text-[#1A1A1A] placeholder:text-[#A8A8A8] bg-transparent outline-none"
              />
            </form>
            <button
              onClick={() => { setSearchOpen(false); setSearchQuery('') }}
              className="p-1.5 text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors shrink-0"
              aria-label="Fermer la recherche"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Mobile drawer */}
        {open && (
          <div className="lg:hidden bg-white border-t border-[#E8E8E8] max-h-[80vh] overflow-y-auto">
            <div className="px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#A8A8A8] mb-2 px-1">
                Boutique
              </p>
              {DRAWER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center py-3 px-2 text-sm font-semibold border-b border-[#F5F5F5] last:border-0 transition-colors',
                    link.promo
                      ? 'text-[#EF8DB2] font-bold'
                      : isActive(link.href)
                      ? 'text-[#6BAED6] font-bold'
                      : 'text-[#1C1C1E]'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  )
}

export function Navbar() {
  return (
    <Suspense fallback={
      <div className="bg-[#1A1A1A] h-8" />
    }>
      <NavbarInner />
    </Suspense>
  )
}
