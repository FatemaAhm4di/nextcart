import { useState } from 'react'
import { FiArrowUp, FiArrowDown, FiDollarSign } from 'react-icons/fi'

const PriceSort = ({ sortOrder, setSortOrder }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSort = (order) => {
    setSortOrder(order)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#2a2a2a] border border-[#72BAA9] rounded-full text-[#2D3A2B] dark:text-white hover:border-[#AE2448] transition-all duration-300 text-sm"
      >
        <FiDollarSign className="text-sm" />
        {sortOrder === 'low-to-high' ? (
          <>Price: Low to High <FiArrowUp className="text-xs" /></>
        ) : sortOrder === 'high-to-low' ? (
          <>Price: High to Low <FiArrowDown className="text-xs" /></>
        ) : (
          'Sort by Price'
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-[#2a2a2a] rounded-xl shadow-xl border border-[#72BAA9] z-50 overflow-hidden">
          <button
            onClick={() => handleSort('low-to-high')}
            className="w-full text-left px-4 py-2 text-sm text-[#2D3A2B] dark:text-gray-300 hover:bg-[#72BAA9]/20 flex items-center gap-2"
          >
            <FiArrowUp className="text-xs" /> Price: Low to High
          </button>
          <button
            onClick={() => handleSort('high-to-low')}
            className="w-full text-left px-4 py-2 text-sm text-[#2D3A2B] dark:text-gray-300 hover:bg-[#72BAA9]/20 flex items-center gap-2"
          >
            <FiArrowDown className="text-xs" /> Price: High to Low
          </button>
        </div>
      )}
    </div>
  )
}

export default PriceSort