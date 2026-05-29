'use client'

import Link from 'next/link'
import NextImage from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Package, Tag, ShoppingCart,
  Settings, LogOut, Menu, X, Image, Percent, Ticket, Star,
} from 'lucide-react'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin',            label: 'Tableau de bord', icon: LayoutDashboard, exact: true },
  { href: '/admin/products',   label: 'Produits',        icon: Package },
  { href: '/admin/promos',       label: 'Promotions',      icon: Percent },
  { href: '/admin/coupon-codes', label: 'Codes promo',     icon: Ticket },
  { href: '/admin/categories', label: 'Catégories',      icon: Tag },
  { href: '/admin/orders',     label: 'Commandes',       icon: ShoppingCart },
  { href: '/admin/reviews',    label: 'Avis clients',    icon: Star },
  { href: '/admin/hero',       label: 'Hero / Accueil',  icon: Image },
  { href: '/admin/settings',   label: 'Paramètres',      icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const isActive = (item: (typeof navItems)[0]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href)

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="px-4 py-4 border-b border-neutral-200 flex items-center gap-3">
        <Link href="/" target="_blank">
          <NextImage
            src="/bybykids_logo_no_background.png"
            alt="BybyKids"
            width={44}
            height={44}
            className="w-11 h-11 object-contain"
          />
        </Link>
        <div>
          <p className="font-bold text-neutral-900 text-sm leading-tight">BybyKids</p>
          <p className="text-xs text-neutral-400">Administration</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              isActive(item)
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
            )}
          >
            <item.icon size={18} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-neutral-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-600 hover:bg-red-50 hover:text-red-700 w-full transition-colors"
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 shrink-0 bg-white border-r border-neutral-200 min-h-screen fixed left-0 top-0 bottom-0">
        <NavContent />
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between px-4 h-14 bg-white border-b border-neutral-200 fixed top-0 left-0 right-0 z-40">
        <Link href="/" className="font-bold text-neutral-900">BybykidsStore</Link>
        <button onClick={() => setOpen(true)} className="p-2 text-neutral-700">
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative w-64 bg-white h-full">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-1 text-neutral-600"
            >
              <X size={22} />
            </button>
            <NavContent />
          </div>
        </div>
      )}
    </>
  )
}
