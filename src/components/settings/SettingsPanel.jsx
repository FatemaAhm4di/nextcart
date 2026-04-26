import { useState } from 'react'
import { useSettings } from '../../hooks/useSettings'
import { FiSun, FiMoon, FiGrid, FiList, FiRefreshCw, FiX, FiSettings } from 'react-icons/fi'

const SettingsPanel = () => {
  const { theme, toggleTheme, viewMode, toggleViewMode } = useSettings()
  const [isOpen, setIsOpen] = useState(false)

  const resetSettings = () => {
    localStorage.removeItem('nexcart_theme')
    localStorage.removeItem('nexcart_viewMode')
    // ریست کردن تم به light
    document.documentElement.classList.remove('dark')
    window.location.reload()
  }

  return (
    <>
      {/* دکمه تنظیمات شناور */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#AE2448] text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Settings"
      >
        <FiSettings className="text-xl group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* پنل تنظیمات */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 bg-white dark:bg-[#2a2a2a] rounded-2xl shadow-2xl p-5 w-72 border border-[#72BAA9]/30 animate-fade-in">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#72BAA9]/30">
            <h3 className="font-bold text-[#2D3A2B] dark:text-white flex items-center gap-2">
              <FiSettings className="text-[#AE2448]" /> Settings
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-[#AE2448] transition-colors"
            >
              <FiX />
            </button>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center justify-between py-3">
            <div>
              <span className="text-[#2D3A2B] dark:text-gray-300 text-sm">Dark Mode</span>
              <p className="text-xs text-gray-500">Switch theme</p>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-[#72BAA9]/20 hover:bg-[#72BAA9]/40 transition-all"
            >
              {theme === 'dark' ? <FiSun className="text-yellow-500" /> : <FiMoon className="text-[#2D3A2B]" />}
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between py-3 border-t border-[#72BAA9]/20">
            <div>
              <span className="text-[#2D3A2B] dark:text-gray-300 text-sm">View Mode</span>
              <p className="text-xs text-gray-500">Grid or List</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => viewMode !== 'grid' && toggleViewMode()}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-[#AE2448] text-white' : 'bg-[#72BAA9]/20 text-[#2D3A2B]'}`}
              >
                <FiGrid />
              </button>
              <button
                onClick={() => viewMode !== 'list' && toggleViewMode()}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-[#AE2448] text-white' : 'bg-[#72BAA9]/20 text-[#2D3A2B]'}`}
              >
                <FiList />
              </button>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={resetSettings}
            className="w-full mt-4 py-2 text-sm bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FiRefreshCw className="text-sm" /> Reset All Settings
          </button>
        </div>
      )}
    </>
  )
}

export default SettingsPanel