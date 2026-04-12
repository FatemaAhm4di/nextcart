import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  selectCartItems,
  selectCartTotalQuantity,
  selectCartTotalPrice,
} from '../features/cart/cartSlice'
import { formatPrice } from '../utils/formatPrice'
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowLeft } from 'react-icons/fi'
import toast from 'react-hot-toast'

const Cart = () => {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const totalQuantity = useSelector(selectCartTotalQuantity)
  const totalPrice = useSelector(selectCartTotalPrice)

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id))
    toast.success('Quantity increased', { icon: '➕', duration: 1500 })
  }

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id))
    toast.success('Quantity decreased', { icon: '➖', duration: 1500 })
  }

  const handleRemove = (id, title) => {
    dispatch(removeItem(id))
    toast.success(`${title.slice(0, 30)} removed from cart`, { icon: '🗑️', duration: 2000 })
  }

  const handleClearCart = () => {
    if (items.length === 0) return
    dispatch(clearCart())
    toast.success('Cart cleared', { icon: '🧹', duration: 2000 })
  }

  if (items.length === 0) {
    return (
      <div className="container-custom py-16 text-center animate-fade-in">
        <div className="max-w-md mx-auto">
          <FiShoppingBag className="text-6xl text-secondary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-text-main dark:text-white mb-2">
            Your cart is empty
          </h2>
          <p className="text-text-secondary dark:text-gray-400 mb-6">
            Looks like you haven't added any items yet
          </p>
          <Link to="/" className="btn-primary inline-flex items-center gap-2">
            <FiArrowLeft /> Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom py-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-card-light dark:bg-card-dark rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-text-main dark:text-white">
                Shopping Cart ({totalQuantity} items)
              </h2>
              <button
                onClick={handleClearCart}
                className="text-sm text-red-500 hover:text-red-600 transition-colors flex items-center gap-1"
              >
                <FiTrash2 /> Clear All
              </button>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {items.map((item) => (
                <div key={item.id} className="p-4 flex flex-col sm:flex-row gap-4">
                  <div className="sm:w-24 h-24 bg-secondary/20 rounded-xl flex items-center justify-center p-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-text-main dark:text-white line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-secondary dark:text-gray-400 capitalize">
                      {item.category}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-bold text-primary">
                        {formatPrice(item.totalPrice)}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDecrease(item.id)}
                          className="p-1 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-secondary transition-colors"
                        >
                          <FiMinus className="text-sm" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrease(item.id)}
                          className="p-1 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-secondary transition-colors"
                        >
                          <FiPlus className="text-sm" />
                        </button>
                        <button
                          onClick={() => handleRemove(item.id, item.title)}
                          className="p-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 hover:text-red-600 transition-colors ml-2"
                        >
                          <FiTrash2 className="text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-card-light dark:bg-card-dark rounded-2xl shadow-lg p-6 sticky top-8">
            <h2 className="text-xl font-bold text-text-main dark:text-white mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 border-b border-gray-200 dark:border-gray-700 pb-4">
              <div className="flex justify-between">
                <span className="text-text-secondary dark:text-gray-400">Subtotal</span>
                <span className="font-medium">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary dark:text-gray-400">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
            </div>

            <div className="flex justify-between mt-4 text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">{formatPrice(totalPrice)}</span>
            </div>

            <button className="btn-primary w-full mt-6 py-3 text-lg">
              Proceed to Checkout
            </button>

            <Link
              to="/"
              className="block text-center text-sm text-text-secondary dark:text-gray-400 mt-4 hover:text-primary transition-colors"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart