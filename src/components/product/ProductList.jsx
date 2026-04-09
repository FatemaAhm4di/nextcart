import { memo } from 'react'
import { useProducts } from '../../hooks/useProducts'
import ProductCard from './ProductCard'
import Loader from '../ui/Loader'
import Error from '../ui/Error'
import SkeletonCard from '../ui/SkeletonCard'
import { useSettings } from '../../hooks/useSettings'

const ProductList = memo(() => {
  const { data: products, isLoading, error, refetch } = useProducts()
  const { viewMode, selectedCategory } = useSettings()

  // فیلتر بر اساس دسته‌بندی
  const filteredProducts = products?.filter(product => {
    if (selectedCategory === 'all') return true
    return product.category === selectedCategory
  })

  // نمایش لودینگ
  if (isLoading) {
    return (
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
      }`}>
        {[...Array(8)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  // نمایش خطا
  if (error) {
    return <Error message={error.message} onRetry={refetch} />
  }

  // خالی بودن محصولات
  if (!filteredProducts?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No products found in this category.
        </p>
      </div>
    )
  }

  // نمایش محصولات
  return (
    <div className={`grid gap-6 ${
      viewMode === 'grid' 
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
        : 'grid-cols-1'
    }`}>
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
})

ProductList.displayName = 'ProductList'
export default ProductList