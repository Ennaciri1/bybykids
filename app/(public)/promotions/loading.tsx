export default function PromotionsLoading() {
  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <div className="bg-[#6BAED6]/20 animate-pulse h-40" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="h-7 w-40 bg-[#E8E8E8] rounded-lg animate-pulse mb-6" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-[#E8E8E8] overflow-hidden animate-pulse">
              <div className="aspect-[3/4] bg-[#F5F5F5]" />
              <div className="p-3 space-y-2">
                <div className="h-3.5 bg-[#E8E8E8] rounded w-4/5" />
                <div className="h-4 bg-[#E8E8E8] rounded w-2/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
