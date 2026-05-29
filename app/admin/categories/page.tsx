import { createClient } from '@/lib/supabase/server'
import { CategoryManager } from '@/components/admin/CategoryManager'

export default async function AdminCategoriesPage() {
  const supabase = await createClient()
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  return (
    <div className="px-4 md:px-8 py-6 md:py-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Catégories</h1>
        <p className="text-neutral-500 text-sm mt-1">{categories?.length ?? 0} catégorie(s)</p>
      </div>
      <CategoryManager initialCategories={categories ?? []} />
    </div>
  )
}
