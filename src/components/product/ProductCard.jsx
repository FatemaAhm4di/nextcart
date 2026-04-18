import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi'
import { addItem } from '../../features/cart/cartSlice'
import { toggleWishlist, selectWishlistItems } from '../../features/wishlist/wishlistSlice'
import { formatPrice } from '../../utils/formatPrice'
import toast from 'react-hot-toast'
import { useSettings } from '../../hooks/useSettings'

const ProductCard = memo(({ product }) => {
  const dispatch = useDispatch()
  const { viewMode } = useSettings()
  const wishlistItems = useSelector(selectWishlistItems)
  const isWishlisted = wishlistItems.some(item => item.id === product.id)

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

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product))
    if (!isWishlisted) {
      toast.success(`${product.title.slice(0, 30)} added to wishlist!`, {
        icon: '❤️',
        duration: 2000,
      })
    } else {
      toast.success(`${product.title.slice(0, 30)} removed from wishlist!`, {
        icon: '💔',
        duration: 2000,
      })
    }
  }

  // حالت لیست ویو
  if (viewMode === 'list') {
    return (
      <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-[#2a2a2a] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-[#72BAA9]/20">
        <div className="sm:w-32 h-32 bg-[#72BAA9]/10 flex items-center justify-center p-3 relative">
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-sm transition-all duration-300 z-10 ${
              isWishlisted ? 'bg-[#AE2448] text-white' : 'bg-white/80 dark:bg-gray-800/80 text-gray-500 hover:text-[#AE2448]'
            }`}
          >
            <FiHeart className={`text-sm ${isWishlisted ? 'fill-white' : ''}`} />
          </button>
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="flex-1 p-4 sm:p-3 sm:pr-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h3 className="font-semibold text-[#2D3A2B] dark:text-white line-clamp-1 text-base">
                {product.title}
              </h3>
              <p className="text-xs text-[#2D3A2B]/60 dark:text-gray-400 capitalize mt-1">
                {product.category}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-[#AE2448]">
                {formatPrice(product.price)}
              </span>
              <button
                onClick={handleAddToCart}
                className="bg-[#AE2448] hover:bg-[#6E1A37] text-white px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm transition-all duration-300 hover:scale-105"
              >
                <FiShoppingCart className="text-sm" /> Add
              </button>
            </div>
          </div>
          <p className="text-[#2D3A2B]/60 dark:text-gray-400 text-xs mt-2 line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>
    )
  }

  // حالت گرید ویو (پیش‌فرض)
  return (
    <div className="group relative bg-white dark:bg-[#2a2a2a] rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden card-hover border border-[#72BAA9]/20">
      
      {/* Wishlist Button */}
      <button
        onClick={handleToggleWishlist}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
          isWishlisted 
            ? 'bg-[#AE2448] text-white' 
            : 'bg-white/80 dark:bg-gray-800/80 text-gray-500 hover:text-[#AE2448] opacity-0 group-hover:opacity-100'
        }`}
      >
        <FiHeart className={`text-base ${isWishlisted ? 'fill-white' : ''}`} />
      </button>
      
      {/* Image Container */}
      <div className="h-44 bg-gradient-to-br from-[#72BAA9]/20 to-[#72BAA9]/5 flex items-center justify-center p-4">
        <img 
          src={product.image} 
          alt={product.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      
      {/* Content */}
      <div className="p-3">
        {/* Category Badge */}
        <span className="text-xs text-white bg-[#AE2448] px-2 py-0.5 rounded-full capitalize inline-block">
          {product.category}
        </span>
        
        {/* Title */}
        <h3 className="font-semibold text-[#2D3A2B] dark:text-white mt-2 line-clamp-2 h-10 text-sm">
          {product.title}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          <div className="flex text-yellow-500 text-xs">
            <FiStar className="fill-current w-3 h-3" />
            <FiStar className="fill-current w-3 h-3" />
            <FiStar className="fill-current w-3 h-3" />
            <FiStar className="fill-current w-3 h-3" />
            <FiStar className="fill-current w-3 h-3" />
          </div>
          <span className="text-xs text-[#2D3A2B]/50 dark:text-gray-400">(4.5)</span>
        </div>
        
        {/* Price & Cart Button */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-[#AE2448]">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleAddToCart}
            className="p-1.5 rounded-full bg-[#AE2448] text-white hover:bg-[#6E1A37] transition-all duration-300 hover:scale-110"
            aria-label="Add to cart"
          >
            <FiShoppingCart className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  )
})

ProductCard.displayName = 'ProductCard'
export default ProductCard