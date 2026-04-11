import { memo } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useSettings } from '../../hooks/useSettings'

const ThemeToggle = memo(() => {
  const { theme, toggleTheme } = useSettings()

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-6 rounded-full bg-brand-roseLight dark:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-roseDark"
      aria-label="Toggle theme"
    >
      <div
        className={`
          absolute top-0.5 left-0.5 w-5 h-5 rounded-full 
          bg-white shadow-md transform transition-transform duration-300
          flex items-center justify-center
          ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}
        `}
      >
        {theme === 'light' ? (
          <FiMoon className="w-3 h-3 text-gray-700" />
        ) : (
          <FiSun className="w-3 h-3 text-yellow-500" />
        )}
      </div>
    </button>
  )
})

ThemeToggle.displayName = 'ThemeToggle'
export default ThemeToggle