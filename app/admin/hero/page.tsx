import { createClient } from '@/lib/supabase/server'
import { HeroForm } from '@/components/admin/HeroForm'

export default async function AdminHeroPage() {
  const supabase = await createClient()
  const { data: settings } = await supabase.from('store_settings').select('*').single()

  return (
    <div className="px-4 md:px-8 py-6 md:py-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Hero — Page d&apos;accueil</h1>
        <p className="text-neutral-500 text-sm mt-1">
          Modifier le titre, la description et la vidéo du hero.
        </p>
      </div>
      <HeroForm settings={settings} />
    </div>
  )
}
