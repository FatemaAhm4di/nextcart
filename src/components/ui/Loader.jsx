import { memo } from 'react'

const Loader = memo(() => {
  return (
    <div className="fixed inset-0 bg-brand-cream/90 dark:bg-gray-900/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        {/* اسپینر مدرن */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-brand-roseLight rounded-full"></div>
          <div className="absolute inset-0 border-4 border-brand-roseDark rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute inset-2 border-4 border-brand-roseMedium rounded-full border-b-transparent animate-spin animation-delay-150"></div>
        </div>
        
        {/* متن لودینگ با انیمیشن نقطه‌گذاری */}
        <div className="flex gap-1 text-lg font-medium text-brand-roseDark">
          <span className="animate-bounce [animation-delay:-0.3s]">L</span>
          <span className="animate-bounce [animation-delay:-0.15s]">o</span>
          <span className="animate-bounce [animation-delay:0s]">a</span>
          <span className="animate-bounce [animation-delay:0.15s]">d</span>
          <span className="animate-bounce [animation-delay:0.3s]">i</span>
          <span className="animate-bounce [animation-delay:0.45s]">n</span>
          <span className="animate-bounce [animation-delay:0.6s]">g</span>
          <span className="animate-bounce [animation-delay:0.75s]">.</span>
          <span className="animate-bounce [animation-delay:0.9s]">.</span>
          <span className="animate-bounce [animation-delay:1.05s]">.</span>
        </div>
      </div>
    </div>
  )
})

Loader.displayName = 'Loader'
export default Loader