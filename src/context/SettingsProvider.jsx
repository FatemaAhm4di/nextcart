import { useReducer, useEffect } from 'react'
import { SettingsContext } from './SettingsContext'
import { settingsReducer, initialState } from './settingsReducer'

export const SettingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, initialState)

  useEffect(() => {
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => dispatch({ type: 'TOGGLE_THEME' })
  const toggleViewMode = () => dispatch({ type: 'TOGGLE_VIEW' })
  const setCategory = (category) => dispatch({ type: 'SET_CATEGORY', payload: category })

  const value = {
    theme: state.theme,
    viewMode: state.viewMode,
    selectedCategory: state.selectedCategory,
    toggleTheme,
    toggleViewMode,
    setCategory,
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}