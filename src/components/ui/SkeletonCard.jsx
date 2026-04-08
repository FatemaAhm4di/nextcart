import { memo } from 'react'

const SkeletonCard = memo(() => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg animate-pulse">
      {/* اسکلت تصویر */}
      <div className="w-full h-48 bg-gradient-to-r from-brand-roseLight/50 via-brand-roseMedium/30 to-brand-roseLight/50 bg-[length:200%_100%] animate-shimmer"></div>
      
      <div className="p-4 space-y-3">
        {/* اسکلت عنوان */}
        <div className="h-5 bg-gradient-to-r from-brand-roseLight/70 to-brand-roseMedium/50 rounded-lg w-3/4"></div>
        
        {/* اسکلت قیمت */}
        <div className="h-6 bg-gradient-to-r from-brand-roseDark/70 to-brand-roseMedium/50 rounded-lg w-1/4"></div>
        
        {/* اسکلت دکمه */}
        <div className="h-10 bg-gradient-to-r from-brand-roseLight/50 via-brand-roseMedium/30 to-brand-roseLight/50 rounded-full mt-4"></div>
      </div>
    </div>
  )
})

SkeletonCard.displayName = 'SkeletonCard'
export default SkeletonCard