import { createClient } from '@/lib/supabase/server'
import { ProductForm } from '@/components/admin/ProductForm'

export default async function NewProductPage() {
  const supabase = await createClient()
  const { data: categories } = await supabase.from('categories').select('*').order('name')

  return (
    <div className="px-4 md:px-8 py-6 md:py-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-neutral-900 mb-8">Ajouter un produit</h1>
      <ProductForm categories={categories ?? []} />
    </div>
  )
}
