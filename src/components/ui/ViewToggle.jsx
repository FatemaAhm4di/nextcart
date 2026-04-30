import { memo } from 'react'
import { FiGrid, FiList } from 'react-icons/fi'
import { useSettings } from '../../hooks/useSettings'

const ViewToggle = memo(() => {
  const { viewMode, toggleViewMode } = useSettings()

  return (
    <div className="flex items-center gap-1 bg-white/10 dark:bg-gray-800/50 rounded-full p-1 backdrop-blur-sm">
      <button
        onClick={() => viewMode !== 'grid' && toggleViewMode()}
        className={`
          p-2 rounded-lg transition-all duration-300
          ${viewMode === 'grid' 
            ? 'bg-[#AE2448] text-white shadow-md' 
            : 'text-gray-600 dark:text-gray-400 hover:bg-[#AE2448]/20 hover:text-[#AE2448]'
          }
        `}
        aria-label="Grid view"
        title="Grid View"
      >
        <FiGrid className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
      
      <button
        onClick={() => viewMode !== 'list' && toggleViewMode()}
        className={`
          p-2 rounded-lg transition-all duration-300
          ${viewMode === 'list' 
            ? 'bg-[#AE2448] text-white shadow-md' 
            : 'text-gray-600 dark:text-gray-400 hover:bg-[#AE2448]/20 hover:text-[#AE2448]'
          }
        `}
        aria-label="List view"
        title="List View"
      >
        <FiList className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  )
})

ViewToggle.displayName = 'ViewToggle'
export default ViewToggle