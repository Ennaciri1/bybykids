export default function Loading() {
  return (
    <div className="animate-pulse space-y-6 p-6">
      <div className="h-8 w-48 bg-neutral-200 rounded" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-neutral-200 p-5 space-y-3">
            <div className="h-4 w-24 bg-neutral-200 rounded" />
            <div className="h-8 w-16 bg-neutral-300 rounded" />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-neutral-200 p-5">
        <div className="h-5 w-32 bg-neutral-200 rounded mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-12 bg-neutral-100 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}
