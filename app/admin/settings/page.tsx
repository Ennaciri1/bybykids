import { createClient } from '@/lib/supabase/server'
import { SettingsForm } from '@/components/admin/SettingsForm'
import { AdminProfileCard } from '@/components/admin/AdminProfileCard'

export default async function AdminSettingsPage() {
  const supabase = await createClient()
  const [{ data: settings }, { data: { user } }] = await Promise.all([
    supabase.from('store_settings').select('*').single(),
    supabase.auth.getUser(),
  ])

  return (
    <div className="px-4 md:px-8 py-6 md:py-8 max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Paramètres</h1>
      </div>
      <AdminProfileCard email={user?.email ?? ''} />
      <SettingsForm settings={settings} />
    </div>
  )
}
