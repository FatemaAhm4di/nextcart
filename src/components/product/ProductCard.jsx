import { memo } from 'react'
import { useDispatch } from 'react-redux'
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi'
import { addItem } from '../../features/cart/cartSlice'  // ✅ addToCart -> addItem
import { formatPrice } from '../../utils/formatPrice'
import toast from 'react-hot-toast'
import { useSettings } from '../../hooks/useSettings'

const ProductCard = memo(({ product }) => {
  const dispatch = useDispatch()
  const { viewMode } = useSettings()

  const handleAddToCart = () => {
    dispatch(addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
    }))
    
    toast.success(`${product.title.slice(0, 30)}... added to cart!`, {
      icon: '🛒',
      duration: 2000,
    })
  }

  if (viewMode === 'list') {
    return (
      <div className="flex flex-col sm:flex-row gap-4 bg-card-light dark:bg-card-dark rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
        <div className="sm:w-32 h-32 bg-secondary/20 flex items-center justify-center p-2">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="flex-1 p-4 sm:p-2 sm:pr-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h3 className="font-semibold text-text-main dark:text-white line-clamp-1">
                {product.title}
              </h3>
              <p className="text-sm text-text-secondary dark:text-gray-400 capitalize mt-1">
                {product.category}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              <button
                onClick={handleAddToCart}
                className="btn-primary !px-4 !py-2 flex items-center gap-2 text-sm"
              >
                <FiShoppingCart /> Add
              </button>
            </div>
          </div>
          <p className="text-text-secondary dark:text-gray-300 text-sm mt-2 line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative bg-card-light dark:bg-card-dark rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden card-hover">
      <button className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-primary">
        <FiHeart className="text-lg" />
      </button>
      
      <div className="h-48 bg-gradient-to-br from-secondary/30 to-secondary/20 flex items-center justify-center p-4">
        <img 
          src={product.image} 
          alt={product.title}
          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      
      <div className="p-4">
        <span className="text-xs text-primary-dark bg-primary-light/30 px-2 py-1 rounded-full capitalize">
          {product.category}
        </span>
        
        <h3 className="font-semibold text-text-main dark:text-white mt-2 line-clamp-2 h-12">
          {product.title}
        </h3>
        
        <div className="flex items-center gap-1 mt-2">
          <div className="flex text-yellow-400">
            <FiStar className="fill-current" />
            <FiStar className="fill-current" />
            <FiStar className="fill-current" />
            <FiStar className="fill-current" />
            <FiStar className="fill-current" />
          </div>
          <span className="text-xs text-text-secondary">(4.5)</span>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleAddToCart}
            className="p-2 rounded-full bg-primary text-white hover:bg-primary-dark transition-all duration-300 hover:scale-110"
            aria-label="Add to cart"
          >
            <FiShoppingCart className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  )
})

ProductCard.displayName = 'ProductCard'
export default ProductCard