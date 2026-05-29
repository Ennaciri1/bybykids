export default function Loading() {
  return (
    <div className="bg-[#FAFAF7] min-h-screen animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="h-7 w-48 bg-[#E0DBD4] rounded mb-2" />
          <div className="h-4 w-24 bg-[#E8E8E8] rounded" />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar skeleton */}
          <aside className="w-full md:w-56 shrink-0 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#E8E8E8] p-4 space-y-3">
                <div className="h-3 w-20 bg-[#E0DBD4] rounded" />
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="h-7 w-12 bg-[#F0F0F0] rounded-lg" />
                  ))}
                </div>
              </div>
            ))}
          </aside>

          {/* Products grid skeleton */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-[#E8E8E8] overflow-hidden">
                  <div className="aspect-[3/4] bg-[#F0F0F0]" />
                  <div className="p-3 space-y-2">
                    <div className="h-3 w-4/5 bg-[#E8E8E8] rounded" />
                    <div className="h-3 w-2/5 bg-[#6BAED6]/20 rounded" />
                    <div className="h-8 w-full bg-[#E8E8E8] rounded mt-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
