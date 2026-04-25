import { useState, useRef, useEffect } from 'react'
import { FiChevronDown, FiGrid } from 'react-icons/fi'

// دسته‌بندی‌هایی که واقعاً محصول دارن (بر اساس API DummyJSON)
const categoriesList = [
  "Beauty",
  "Fragrances",
  "Furniture",
  "Groceries",
  "Home Decoration",
  "Laptops",
  "Mens Watches",
  "Smartphones",
  "Womens Jewellery",
  "Mobile Accessories",
  "Mens Shirts"
]

const ProductFilter = ({ selectedCategory, setSelectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
        setSearchTerm('')
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (category) => {
    const value = category === "All Products" ? "all" : category
    setSelectedCategory(value)
    setIsOpen(false)
    setSearchTerm('')
  }

  const displayCategory = selectedCategory === "all" ? "All Products" : selectedCategory

  const filteredCategories = categoriesList.filter(cat =>
    cat.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="w-full">
      {/* نمایش دراپ‌داون در موبایل و تبلت */}
      <div className="block md:hidden relative w-full" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between gap-2 px-4 py-2.5 w-full bg-white dark:bg-[#2a2a2a] border border-[#72BAA9] rounded-xl text-[#2D3A2B] dark:text-white hover:border-[#AE2448] transition-all duration-300"
        >
          <div className="flex items-center gap-2">
            <FiGrid className="text-sm" />
            <span className="truncate max-w-[180px]">{displayCategory}</span>
          </div>
          <FiChevronDown className={`transition-transform duration-300 text-sm ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 max-h-72 overflow-y-auto bg-white dark:bg-[#2a2a2a] rounded-xl shadow-xl border border-[#72BAA9] z-50 animate-fade-in">
            <div className="sticky top-0 bg-white dark:bg-[#2a2a2a] p-2 border-b border-[#72BAA9]/30">
              <input
                type="text"
                placeholder="Search category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 pl-8 text-sm bg-[#D5E7B5] dark:bg-gray-800 rounded-lg border border-[#72BAA9] focus:border-[#AE2448] outline-none"
                autoFocus
              />
              <FiChevronDown className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm rotate-90" />
            </div>
            
            <div className="py-1">
              {filteredCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleSelect(cat)}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-200 hover:bg-[#72BAA9]/20 ${
                    displayCategory === cat ? 'text-[#AE2448] font-medium bg-[#72BAA9]/10' : 'text-[#2D3A2B] dark:text-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
              {filteredCategories.length === 0 && (
                <div className="px-4 py-3 text-sm text-gray-500 text-center">No categories found</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* نمایش دکمه‌های عادی در دسکتاپ */}
      <div className="hidden md:flex flex-wrap justify-center gap-3">
        <button
          onClick={() => handleSelect("all")}
          className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
            selectedCategory === "all"
              ? "bg-[#AE2448] text-white shadow-lg scale-105"
              : "bg-white dark:bg-[#2a2a2a] text-[#2D3A2B] dark:text-gray-300 hover:bg-[#72BAA9] hover:text-white"
          }`}
        >
          All Products
        </button>
        {categoriesList.map((cat) => (
          <button
            key={cat}
            onClick={() => handleSelect(cat)}
            className={`px-5 py-2.5 rounded-full capitalize font-medium transition-all duration-300 ${
              selectedCategory === cat
                ? "bg-[#AE2448] text-white shadow-lg scale-105"
                : "bg-white dark:bg-[#2a2a2a] text-[#2D3A2B] dark:text-gray-300 hover:bg-[#72BAA9] hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductFilter