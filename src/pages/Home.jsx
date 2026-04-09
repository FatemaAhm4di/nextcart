import ProductList from '../components/product/ProductList'
import ProductFilter from '../components/product/ProductFilter'
import ProductSearch from '../components/product/ProductSearch'
import { useSettings } from '../hooks/useSettings'

const Home = () => {
  const { viewMode } = useSettings()

  return (
    <div className="container-custom py-8 animate-fade-in">
      {/* هدر صفحه */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
          Our <span className="text-brand-roseDark">Products</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Discover the best products at the best prices
          {/* نمایش viewMode (اختیاری) */}
          <span className="text-xs block mt-1 opacity-50">
            View: {viewMode === 'grid' ? 'Grid' : 'List'}
          </span>
        </p>
      </div>
      
      {/* فیلتر و جستجو */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <ProductFilter />
        <ProductSearch />
      </div>
      
      {/* لیست محصولات */}
      <ProductList />
    </div>
  )
}

export default Home