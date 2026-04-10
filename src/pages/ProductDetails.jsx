import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useProduct } from '../hooks/useProducts'
import { addItem } from '../features/cart/cartSlice'
import { formatPrice } from '../utils/formatPrice'
import Loader from '../components/ui/Loader'
import Error from '../components/ui/Error'
import { FiShoppingCart, FiArrowLeft, FiStar, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi'
import toast from 'react-hot-toast'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data: product, isLoading, error, refetch } = useProduct(id)

  const handleAddToCart = () => {
    dispatch(addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
    }))
    
    toast.success(`${product.title.slice(0, 40)}... added to cart!`, {
      icon: '🛒',
      duration: 2000,
    })
  }

  if (isLoading) return <Loader />
  if (error) return <Error message={error.message} onRetry={refetch} />
  if (!product) return <Error message="Product not found" onRetry={() => navigate('/')} />

  return (
    <div className="container-custom py-8 animate-fade-in">
      {/* دکمه بازگشت */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-brand-roseDark transition-colors duration-300 mb-6 group"
      >
        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        Back to Products
      </button>

      {/* جزئیات محصول */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-8 p-6 lg:p-8">
          
          {/* تصویر محصول */}
          <div className="lg:w-1/2">
            <div className="sticky top-8 bg-gradient-to-br from-brand-roseLight/20 to-brand-roseMedium/10 rounded-2xl p-8 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="max-w-full max-h-96 object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* اطلاعات محصول */}
          <div className="lg:w-1/2 space-y-6">
            {/* دسته‌بندی */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-brand-roseDark bg-brand-roseLight/50 px-3 py-1 rounded-full capitalize">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-yellow-400">
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
              </div>
              <span className="text-sm text-gray-500">(4.8)</span>
            </div>

            {/* عنوان */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
              {product.title}
            </h1>

            {/* توضیحات */}
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>

            {/* قیمت */}
            <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-brand-roseDark">
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.price * 1.2)}
                </span>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Save 20%
                </span>
              </div>
            </div>

            {/* ویژگی‌ها */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <FiTruck className="text-brand-roseDark text-xl" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <FiShield className="text-brand-roseDark text-xl" />
                <span>2-year warranty included</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <FiRefreshCw className="text-brand-roseDark text-xl" />
                <span>30-day easy returns</span>
              </div>
            </div>

            {/* دکمه افزودن به سبد خرید */}
            <button
              onClick={handleAddToCart}
              className="w-full btn-primary flex items-center justify-center gap-3 text-lg py-4"
            >
              <FiShoppingCart className="text-2xl" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails