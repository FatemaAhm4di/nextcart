const ProductSkeleton = () => {
  return (
    <div className="bg-white dark:bg-[#2a2a2a] rounded-2xl overflow-hidden shadow-lg animate-pulse border border-[#72BAA9]/20">
      {/* Image Skeleton */}
      <div className="w-full h-44 bg-gradient-to-br from-[#72BAA9]/30 to-[#72BAA9]/10" />
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Category Badge Skeleton */}
        <div className="h-5 w-16 bg-[#AE2448]/20 rounded-full" />
        
        {/* Title Skeleton */}
        <div className="h-4 bg-[#72BAA9]/30 rounded w-3/4" />
        <div className="h-4 bg-[#72BAA9]/20 rounded w-1/2" />
        
        {/* Rating Skeleton */}
        <div className="flex gap-1">
          <div className="h-3 w-3 bg-[#72BAA9]/30 rounded-full" />
          <div className="h-3 w-3 bg-[#72BAA9]/30 rounded-full" />
          <div className="h-3 w-3 bg-[#72BAA9]/30 rounded-full" />
          <div className="h-3 w-3 bg-[#72BAA9]/30 rounded-full" />
          <div className="h-3 w-3 bg-[#72BAA9]/30 rounded-full" />
        </div>
        
        {/* Price & Button Skeleton */}
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 w-20 bg-[#AE2448]/30 rounded" />
          <div className="h-8 w-8 bg-[#AE2448]/30 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default ProductSkeleton