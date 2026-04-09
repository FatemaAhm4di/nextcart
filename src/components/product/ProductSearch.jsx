import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    // TODO: پیاده‌سازی جستجو
    console.log('Searching for:', searchTerm)
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-4 pr-10 py-2 rounded-full border border-brand-roseLight bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-roseDark transition-all duration-300 w-full sm:w-64"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-brand-roseDark hover:text-brand-roseMedium"
      >
        <FiSearch className="text-xl" />
      </button>
    </form>
  )
}

export default ProductSearch