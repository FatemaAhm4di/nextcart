const ProductSkeleton = () => {
  return (
    <div className="bg-[#EEE6CA] dark:bg-[#2a2a2a] rounded-2xl overflow-hidden shadow-lg animate-pulse">
      <div className="w-full h-48 bg-[#E5BEB5]/50 dark:bg-gray-700" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-[#E5BEB5]/50 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-[#E5BEB5]/50 dark:bg-gray-700 rounded w-1/2" />
        <div className="h-6 bg-[#E5BEB5]/50 dark:bg-gray-700 rounded w-1/3" />
      </div>
    </div>
  )
}

export default ProductSkeleton