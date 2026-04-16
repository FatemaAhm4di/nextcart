import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi'

const Error = ({ message, onRetry, fullScreen = false }) => {
  const wrapperClass = fullScreen 
    ? 'fixed inset-0 flex items-center justify-center bg-[#D5E7B5] dark:bg-[#1a1a2e] z-50'
    : 'flex flex-col items-center justify-center p-8 min-h-[300px] bg-white dark:bg-[#2a2a2a] rounded-2xl shadow-lg'

  return (
    <div className={wrapperClass}>
      <div className="text-center max-w-md mx-auto animate-fade-in">
        
        {/* Icon Container */}
        <div className="relative inline-block mb-4">
          <div className="absolute inset-0 bg-[#AE2448]/20 rounded-full blur-xl animate-pulse"></div>
          <div className="relative w-24 h-24 bg-[#AE2448]/10 rounded-full flex items-center justify-center mx-auto">
            <FiAlertCircle className="text-5xl text-[#AE2448] animate-bounce" />
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-2xl font-bold text-[#2D3A2B] dark:text-white mb-3">
          Oops! Something went wrong
        </h3>
        
        {/* Message */}
        <p className="text-[#2D3A2B]/60 dark:text-gray-400 mb-6">
          {message || 'An unexpected error occurred. Please try again.'}
        </p>
        
        {/* Retry Button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 bg-[#AE2448] hover:bg-[#6E1A37] text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-md"
          >
            <FiRefreshCw className="text-lg" />
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}

export default Error