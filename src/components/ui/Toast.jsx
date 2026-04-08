import { memo, useEffect } from 'react'
import { FiCheckCircle, FiXCircle, FiInfo } from 'react-icons/fi'

const ToastIcon = ({ type }) => {
  switch (type) {
    case 'success':
      return <FiCheckCircle className="text-green-500 text-xl" />
    case 'error':
      return <FiXCircle className="text-brand-roseDark text-xl" />
    default:
      return <FiInfo className="text-primary text-xl" />
  }
}

const Toast = memo(({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl px-5 py-3 border-l-4 border-brand-roseDark">
        <ToastIcon type={type} />
        <p className="text-gray-800 dark:text-white font-medium">{message}</p>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <FiXCircle />
        </button>
      </div>
    </div>
  )
})

Toast.displayName = 'Toast'
export default Toast