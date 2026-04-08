import { memo } from 'react'
import { FiGrid, FiList } from 'react-icons/fi'
import { useSettings } from '../../context/SettingsContext'

const ViewToggle = memo(() => {
  const { viewMode, toggleViewMode } = useSettings()

  return (
    <div className="flex items-center gap-1 bg-brand-roseLight/30 dark:bg-gray-800 rounded-full p-1">
      <button
        onClick={toggleViewMode}
        className={`
          p-2 rounded-full transition-all duration-300
          ${viewMode === 'grid' 
            ? 'bg-brand-roseDark text-white shadow-md' 
            : 'text-gray-600 dark:text-gray-400 hover:bg-brand-roseLight/50'
          }
        `}
        aria-label="Grid view"
      >
        <FiGrid className="w-5 h-5" />
      </button>
      
      <button
        onClick={toggleViewMode}
        className={`
          p-2 rounded-full transition-all duration-300
          ${viewMode === 'list' 
            ? 'bg-brand-roseDark text-white shadow-md' 
            : 'text-gray-600 dark:text-gray-400 hover:bg-brand-roseLight/50'
          }
        `}
        aria-label="List view"
      >
        <FiList className="w-5 h-5" />
      </button>
    </div>
  )
})

ViewToggle.displayName = 'ViewToggle'
export default ViewToggle