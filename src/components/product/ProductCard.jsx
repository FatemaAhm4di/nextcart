import { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiShoppingCart, FiHeart, FiStar, FiCheck, FiAlertCircle } from 'react-icons/fi'
import { addItem } from '../../features/cart/cartSlice'
import { toggleWishlist, selectWishlistItems } from '../../features/wishlist/wishlistSlice'
import { formatPrice } from '../../utils/formatPrice'
import { toast } from 'sonner'
import { useSettings } from '../../hooks/useSettings'

const ProductCard = memo(({ product }) => {
  const dispatch = useDispatch()
  const { viewMode } = useSettings()
  const wishlistItems = useSelector(selectWishlistItems)
  const isWishlisted = wishlistItems.some(item => item.id === product.id)
  const [isAdding, setIsAdding] = useState(false)
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false)

  const handleImageError = (e) => {
    e.target.src = 'https://picsum.photos/id/1/300/300'
  }

  const handleAddToCart = () => {
    if (isAdding) return
    setIsAdding(true)
    
    dispatch(addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
    }))
    
    toast.success(`${product.title.slice(0, 30)} added to cart`, {
      icon: <FiShoppingCart className="w-4 h-4" />,
      duration: 2000,
    })
    
    setTimeout(() => setIsAdding(false), 500)
  }

  const handleToggleWishlist = () => {
    if (isTogglingWishlist) return
    setIsTogglingWishlist(true)
    
    dispatch(toggleWishlist(product))
    
    if (!isWishlisted) {
      toast.success(`${product.title.slice(0, 30)} added to wishlist`, {
        icon: <FiHeart className="w-4 h-4 text-[#AE2448]" />,
        duration: 2000,
      })
    } else {
      toast.success(`${product.title.slice(0, 30)} removed from wishlist`, {
        icon: <FiCheck className="w-4 h-4 text-green-500" />,
        duration: 2000,
      })
    }
    
    setTimeout(() => setIsTogglingWishlist(false), 500)
  }

  if (viewMode === 'list') {
    return (
      <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 bg-white dark:bg-[#2a2a2a] rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-[#72BAA9]/20">
        <div className="relative w-full xs:w-28 sm:w-32 md:w-36 h-32 xs:h-28 sm:h-32 md:h-36 bg-[#72BAA9]/10 flex items-center justify-center p-2 sm:p-3">
          <button
            onClick={handleToggleWishlist}
            disabled={isTogglingWishlist}
            className={`absolute top-1 right-1 sm:top-2 sm:right-2 p-1 sm:p-1.5 rounded-full backdrop-blur-sm transition-all duration-300 z-10 ${
              isWishlisted ? 'bg-[#AE2448] text-white' : 'bg-white/80 dark:bg-gray-800/80 text-gray-500 hover:text-[#AE2448]'
            } ${isTogglingWishlist ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <FiHeart className={`text-xs sm:text-sm ${isWishlisted ? 'fill-white' : ''}`} />
          </button>
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={handleImageError}
          />
        </div>
        
        <div className="flex-1 p-3 sm:p-4 sm:p-3 sm:pr-4">
          <div className="flex flex-col xs:flex-row xs:items-start sm:items-center justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-semibold text-[#2D3A2B] dark:text-white line-clamp-1 text-sm sm:text-base">
                {product.title}
              </h3>
              <p className="text-[10px] sm:text-xs text-[#2D3A2B]/60 dark:text-gray-400 capitalize mt-0.5 sm:mt-1">
                {product.category}
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-base sm:text-lg md:text-xl font-bold text-[#AE2448] whitespace-nowrap">
                {formatPrice(product.price)}
              </span>
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="bg-[#AE2448] hover:bg-[#6E1A37] text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg flex items-center gap-1 text-xs sm:text-sm transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAdding ? (
                  <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FiShoppingCart className="text-xs sm:text-sm" />
                )}
                <span className="hidden xs:inline">Add</span>
              </button>
            </div>
          </div>
          <p className="text-[#2D3A2B]/60 dark:text-gray-400 text-[10px] sm:text-xs mt-1 sm:mt-2 line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative bg-white dark:bg-[#2a2a2a] rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden card-hover border border-[#72BAA9]/20">
      
      <button
        onClick={handleToggleWishlist}
        disabled={isTogglingWishlist}
        className={`absolute top-2 right-2 sm:top-3 sm:right-3 z-10 p-1.5 sm:p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
          isWishlisted 
            ? 'bg-[#AE2448] text-white' 
            : 'bg-white/80 dark:bg-gray-800/80 text-gray-500 hover:text-[#AE2448] opacity-0 group-hover:opacity-100'
        } ${isTogglingWishlist ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <FiHeart className={`text-sm sm:text-base ${isWishlisted ? 'fill-white' : ''}`} />
      </button>
      
      <div className="h-36 xs:h-40 sm:h-44 md:h-48 bg-gradient-to-br from-[#72BAA9]/20 to-[#72BAA9]/5 flex items-center justify-center p-3 sm:p-4">
        <img 
          src={product.image} 
          alt={product.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={handleImageError}
        />
      </div>
      
      <div className="p-2.5 sm:p-3">
        {/* دسته‌بندی */}
        <span className="text-[10px] sm:text-xs text-white bg-[#AE2448] px-1.5 sm:px-2 py-0.5 rounded-full capitalize inline-block">
          {product.category}
        </span>
        
        {/* عنوان */}
        <h3 className="font-semibold text-[#2D3A2B] dark:text-white mt-1.5 sm:mt-2 line-clamp-2 h-8 sm:h-10 text-xs sm:text-sm">
          {product.title}
        </h3>
        
        {/* امتیاز */}
        <div className="flex items-center gap-0.5 sm:gap-1 mt-1 sm:mt-1.5">
          <div className="flex text-yellow-500">
            <FiStar className="fill-current w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <FiStar className="fill-current w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <FiStar className="fill-current w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <FiStar className="fill-current w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <FiStar className="fill-current w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </div>
          <span className="text-[10px] sm:text-xs text-[#2D3A2B]/50 dark:text-gray-400">(4.5)</span>
        </div>
        
        {/* قیمت و دکمه سبد خرید */}
        <div className="flex items-center justify-between mt-2 sm:mt-3">
          <span className="text-sm sm:text-base md:text-lg font-bold text-[#AE2448]">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="p-1.5 sm:p-2 rounded-full bg-[#AE2448] text-white hover:bg-[#6E1A37] transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Add to cart"
          >
            {isAdding ? (
              <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <FiShoppingCart className="text-xs sm:text-sm" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
})

ProductCard.displayName = 'ProductCard'
export default ProductCard