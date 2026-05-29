'use client'

import { usePathname } from 'next/navigation'
import { AdminSidebar } from './AdminSidebar'

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname === '/admin/login') return <>{children}</>

  return (
    <div className="md:pl-56 min-h-screen bg-neutral-50">
      <AdminSidebar />
      <div className="pt-14 md:pt-0">
        {children}
      </div>
    </div>
  )
}
