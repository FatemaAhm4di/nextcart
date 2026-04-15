import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi'

const Error = ({ message, onRetry, fullScreen = false }) => {
  const wrapperClass = fullScreen 
    ? 'fixed inset-0 flex items-center justify-center bg-[#F5FAE1] dark:bg-[#1a1a2e] z-50'
    : 'flex flex-col items-center justify-center p-8 min-h-[300px]'

  return (
    <div className={wrapperClass}>
      <div className="text-center max-w-md mx-auto animate-fade-in">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-[#7C3AED]/20 rounded-full blur-xl animate-pulse"></div>
          <FiAlertCircle className="relative text-7xl text-[#7C3AED] mx-auto mb-4 animate-bounce" />
        </div>
        
        <h3 className="text-2xl font-bold text-[#896C6C] dark:text-[#E2E8F0] mb-2">
          Oops! Something went wrong
        </h3>
        
        <p className="text-[#896C6C]/70 dark:text-[#E2E8F0]/70 mb-6">
          {message || 'An unexpected error occurred. Please try again.'}
        </p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-primary inline-flex items-center gap-2"
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