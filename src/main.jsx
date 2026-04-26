import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'  
import { store } from './app/store'
import { SettingsProvider } from './context/SettingsProvider'
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
            {/* ✅ Toaster از Sonner */}
            <Toaster
              position="bottom-right"
              richColors
              closeButton
              duration={2000}
              toastOptions={{
                style: {
                  background: 'white',
                  color: '#2D3A2B',
                  border: '1px solid #72BAA9',
                  borderRadius: '12px',
                  padding: '10px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                },
                success: {
                  style: {
                    borderLeft: '4px solid #22c55e',
                  },
                },
                error: {
                  style: {
                    borderLeft: '4px solid #ef4444',
                  },
                },
              }}
            />
          </SettingsProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
)