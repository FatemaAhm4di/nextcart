export const TOGGLE_THEME = 'TOGGLE_THEME'
export const TOGGLE_VIEW = 'TOGGLE_VIEW'
export const SET_CATEGORY = 'SET_CATEGORY'

// تابع کمکی برای اعمال تم به html
const applyTheme = (theme) => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// بارگذاری اولیه تم از localStorage و اعمال به html
const loadInitialTheme = () => {
  const savedTheme = localStorage.getItem('nexcart_theme') || 'light'
  applyTheme(savedTheme)
  return savedTheme
}

export const initialState = {
  theme: loadInitialTheme(),
  viewMode: localStorage.getItem('nexcart_viewMode') || 'grid',
  selectedCategory: 'all',
}

export const settingsReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_THEME: {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('nexcart_theme', newTheme)
      applyTheme(newTheme)  // مستقیماً اعمال کن
      return { ...state, theme: newTheme }
    }
    
    case TOGGLE_VIEW: {
      const newView = state.viewMode === 'grid' ? 'list' : 'grid'
      localStorage.setItem('nexcart_viewMode', newView)
      return { ...state, viewMode: newView }
    }
    
    case SET_CATEGORY: {
      return { ...state, selectedCategory: action.payload }
    }
    
    default:
      return state
  }
}