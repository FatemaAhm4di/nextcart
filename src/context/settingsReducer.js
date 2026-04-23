export const TOGGLE_THEME = 'TOGGLE_THEME'
export const TOGGLE_VIEW = 'TOGGLE_VIEW'
export const SET_CATEGORY = 'SET_CATEGORY'

export const initialState = {
  theme: localStorage.getItem('nexcart_theme') || 'light',
  viewMode: localStorage.getItem('nexcart_viewMode') || 'grid',
  selectedCategory: 'all',
}

export const settingsReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_THEME: {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('nexcart_theme', newTheme)
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
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