import { memo } from 'react'
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi'

const Error = memo(({ message, onRetry, fullScreen = false }) => {
  const Wrapper = fullScreen ? 'div' : 'div'
  const wrapperClass = fullScreen 
    ? 'fixed inset-0 flex items-center justify-center bg-brand-cream dark:bg-gray-900 z-50'
    : 'flex flex-col items-center justify-center p-8 min-h-[300px]'

  return (
    <Wrapper className={wrapperClass}>
      <div className="text-center max-w-md mx-auto animate-fade-in">
        {/* آیکون خطا با انیمیشن */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-brand-roseDark/20 rounded-full blur-xl animate-pulse"></div>
          <FiAlertCircle className="relative text-7xl text-brand-roseDark mx-auto mb-4 animate-bounce" />
        </div>
        
        {/* عنوان خطا */}
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Oops! Something went wrong
        </h3>
        
        {/* پیام خطا */}
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {message || 'An unexpected error occurred. Please try again.'}
        </p>
        
        {/* دکمه ریترای */}
        <button
          onClick={onRetry}
          className="btn-primary inline-flex items-center gap-2"
        >
          <FiRefreshCw className="text-lg" />
          Try Again
        </button>
      </div>
    </Wrapper>
  )
})

Error.displayName = 'Error'
export default Error