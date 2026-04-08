import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { store } from './app/store'
import { SettingsProvider } from './context/SettingsProvider'  // تغییر این خط
import App from './App'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SettingsProvider>
            <App />
            <Toaster 
              position="bottom-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#F13E93',
                  color: '#fff',
                  borderRadius: '9999px',
                },
              }}
            />
          </SettingsProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
)