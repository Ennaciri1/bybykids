export default function Loading() {
  return (
    <div className="bg-[#FAFAF7] min-h-screen animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-3 w-16 bg-[#E8E8E8] rounded" />
              {i < 2 && <div className="h-3 w-2 bg-[#E8E8E8] rounded" />}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-14">
          {/* Image skeleton */}
          <div className="space-y-2.5">
            <div className="aspect-[3/4] rounded-xl bg-[#F0F0F0] border border-[#E8E8E8]" />
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-lg bg-[#F0F0F0]" />
              ))}
            </div>
          </div>

          {/* Info skeleton */}
          <div className="flex flex-col gap-4">
            <div className="h-5 w-20 bg-[#EAF5FC] rounded" />
            <div className="h-8 w-3/4 bg-[#E0DBD4] rounded" />
            <div className="h-8 w-32 bg-[#6BAED6]/20 rounded" />
            <div className="h-8 w-28 bg-[#E8E8E8] rounded-full" />

            <div className="space-y-3 mt-2">
              <div className="h-4 w-16 bg-[#E8E8E8] rounded" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-9 w-16 bg-[#F0F0F0] rounded-lg" />
                ))}
              </div>
            </div>

            <div className="h-12 w-full bg-[#6BAED6]/30 rounded-lg mt-4" />

            <div className="grid grid-cols-3 gap-2 mt-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-16 rounded-lg bg-[#F0F0F0]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
