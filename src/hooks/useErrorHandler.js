import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'

export const useErrorHandler = () => {
  const [error, setError] = useState(null)

  const handleError = useCallback((err, customMessage = null) => {
    let errorMessage = customMessage
    
    if (!errorMessage) {
      if (typeof err === 'string') {
        errorMessage = err
      } else if (err?.response?.data?.message) {
        errorMessage = err.response.data.message
      } else if (err?.message) {
        errorMessage = err.message
      } else {
        errorMessage = 'An unexpected error occurred'
      }
    }
    
    setError(errorMessage)
    
    // توی ناتیفیکیشن هم نشون بده
    toast.error(errorMessage, {
      icon: '❌',
      style: {
        background: '#F13E93',
        color: '#fff',
      },
    })
    
    return errorMessage
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return { error, handleError, clearError }
}