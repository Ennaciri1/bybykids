import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import { Plus } from 'lucide-react'
import { DeleteProductButton } from '@/components/admin/DeleteProductButton'
import { ToggleVisibilityButton } from '@/components/admin/ToggleVisibilityButton'
import { TogglePromoButton } from '@/components/admin/TogglePromoButton'

export default async function AdminProductsPage() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*, categories(name)')
    .order('created_at', { ascending: false })

  return (
    <div className="px-4 md:px-8 py-6 md:py-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Produits</h1>
            <p className="text-neutral-500 text-sm mt-1">{products?.length ?? 0} produit(s)</p>
          </div>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-700 transition-colors"
          >
            <Plus size={16} />
            Ajouter un produit
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">Produit</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">Catégorie</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">Prix</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">Statut</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">Promotions</th>
                  <th className="text-right px-4 py-3 font-medium text-neutral-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {products?.map((product) => (
                  <tr key={product.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-12 rounded-md overflow-hidden bg-neutral-100 shrink-0">
                          {product.images?.[0] && (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <span className="font-medium text-neutral-900 line-clamp-2 max-w-[200px]">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-neutral-500">
                      {(product.categories as any)?.name ?? '—'}
                    </td>
                    <td className="px-4 py-3 font-medium text-neutral-900">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-4 py-3">
                      <ToggleVisibilityButton productId={product.id} isActive={product.is_active} />
                    </td>
                    <td className="px-4 py-3">
                      <TogglePromoButton productId={product.id} isFeatured={product.is_featured} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="text-xs text-neutral-600 hover:text-neutral-900 underline"
                        >
                          Modifier
                        </Link>
                        <DeleteProductButton productId={product.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {(!products || products.length === 0) && (
              <div className="text-center py-16 text-neutral-400">
                <Package size={40} className="mx-auto mb-3 opacity-40" />
                <p>Aucun produit encore</p>
              </div>
            )}
          </div>
        </div>
      </div>
  )
}

function Package({ size, className }: { size: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  )
}
