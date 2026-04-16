import { useState, useRef, useEffect } from 'react'
import { FiChevronDown, FiX } from 'react-icons/fi'

const categories = [
  "All Products",
  "Beauty",
  "Fragrances",
  "Furniture",
  "Groceries",
  "Home Decoration",
  "Kitchen Accessories",
  "Laptops",
  "Mens Shirts",
  "Mens Shoes",
  "Mens Watches",
  "Mobile Accessories",
  "Motorcycle",
  "Skin Care",
  "Smartphones",
  "Sports Accessories",
  "Sunglasses",
  "Tablets",
  "Tops",
  "Vehicle",
  "Womens Bags",
  "Womens Dresses",
  "Womens Jewellery",
  "Womens Shoes",
  "Womens Watches"
]

const ProductFilter = ({ selectedCategory, setSelectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (category) => {
    const value = category === "All Products" ? "all" : category
    setSelectedCategory(value)
    setIsOpen(false)
  }

  const displayCategory = selectedCategory === "all" ? "All Products" : selectedCategory

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 px-5 py-2.5 bg-white dark:bg-[#2a2a2a] border border-[#72BAA9] rounded-full text-[#2D3A2B] dark:text-white hover:border-[#AE2448] transition-all duration-300 min-w-[180px]"
      >
        <span className="truncate">{displayCategory}</span>
        <FiChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 max-h-80 overflow-y-auto bg-white dark:bg-[#2a2a2a] rounded-xl shadow-xl border border-[#72BAA9] z-50 animate-fade-in">
          <div className="sticky top-0 bg-white dark:bg-[#2a2a2a] p-2 border-b border-[#72BAA9]/30">
            <div className="relative">
              <input
                type="text"
                placeholder="Search category..."
                className="w-full px-3 py-1.5 pl-8 text-sm bg-[#D5E7B5] dark:bg-gray-800 rounded-lg border border-[#72BAA9] focus:border-[#AE2448] outline-none"
              />
              <FiChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm rotate-90" />
            </div>
          </div>
          
          <div className="py-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleSelect(cat)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 hover:bg-[#72BAA9]/20 ${
                  displayCategory === cat ? 'text-[#AE2448] font-medium bg-[#72BAA9]/10' : 'text-[#2D3A2B] dark:text-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductFilter