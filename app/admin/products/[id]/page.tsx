import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ProductForm } from '@/components/admin/ProductForm'

type Props = { params: Promise<{ id: string }> }

export default async function EditProductPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: product }, { data: categories }] = await Promise.all([
    supabase
      .from('products')
      .select('*, product_variants(*)')
      .eq('id', id)
      .single(),
    supabase.from('categories').select('*').order('name'),
  ])

  if (!product) notFound()

  return (
    <div className="px-4 md:px-8 py-6 md:py-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-neutral-900 mb-8">Modifier le produit</h1>
      <ProductForm product={product as any} categories={categories ?? []} />
    </div>
  )
}
