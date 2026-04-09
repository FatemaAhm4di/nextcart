import { useSettings } from '../../hooks/useSettings'
import { useCategories } from '../../hooks/useProducts'

const ProductFilter = () => {
  const { selectedCategory, setCategory } = useSettings()
  const { data: categories, isLoading } = useCategories()

  if (isLoading) {
    return (
      <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
    )
  }

  return (
    <select
      value={selectedCategory}
      onChange={(e) => setCategory(e.target.value)}
      className="px-4 py-2 rounded-full border border-brand-roseLight bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-roseDark transition-all duration-300"
    >
      <option value="all">All Categories</option>
      {categories?.map((category) => (
        <option key={category} value={category} className="capitalize">
          {category}
        </option>
      ))}
    </select>
  )
}

export default ProductFilter