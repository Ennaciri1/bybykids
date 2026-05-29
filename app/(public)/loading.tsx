export default function Loading() {
  return (
    <div className="bg-[#FAFAF7] min-h-screen animate-pulse">
      {/* Hero skeleton */}
      <div className="grid md:grid-cols-[55fr_45fr] min-h-[380px] md:min-h-[520px]">
        <div className="bg-[#F0EDE8] flex flex-col justify-center px-6 sm:px-10 md:px-16 py-10 gap-4">
          <div className="h-3 w-28 bg-[#E0DBD4] rounded" />
          <div className="h-9 w-3/4 bg-[#E0DBD4] rounded" />
          <div className="h-4 w-1/2 bg-[#E0DBD4] rounded" />
          <div className="flex gap-3 mt-2">
            <div className="h-10 w-36 bg-[#6BAED6]/30 rounded-lg" />
            <div className="h-10 w-24 bg-[#E0DBD4] rounded-lg" />
          </div>
        </div>
        <div className="bg-[#E8E8E8] order-first md:order-last h-72 md:h-auto" />
      </div>

      {/* Category tiles skeleton */}
      <div className="bg-white border-b border-[#E8E8E8] py-5 md:py-7">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="rounded-2xl py-4 px-2 h-16 bg-[#F0F0F0]" />
            ))}
          </div>
        </div>
      </div>

      {/* Products grid skeleton */}
      <div className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-5 w-40 bg-[#E0DBD4] rounded mb-5" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
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
  )
}
