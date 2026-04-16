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
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowLeft, FiCreditCard } from 'react-icons/fi'
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
      <div className="min-h-[60vh] flex items-center justify-center container-custom py-16 animate-fade-in">
        <div className="max-w-md mx-auto text-center bg-white dark:bg-[#2a2a2a] rounded-3xl shadow-xl p-12">
          <div className="w-24 h-24 bg-[#72BAA9]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiShoppingBag className="text-5xl text-[#AE2448]" />
          </div>
          <h2 className="text-2xl font-bold text-[#2D3A2B] dark:text-white mb-3">
            Your cart is empty
          </h2>
          <p className="text-[#2D3A2B]/60 dark:text-gray-400 mb-8">
            Looks like you haven't added any items yet
          </p>
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 bg-[#AE2448] hover:bg-[#6E1A37] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <FiArrowLeft /> Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#D5E7B5] dark:bg-[#1a1a2e] min-h-screen py-8">
      <div className="container-custom animate-fade-in">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white dark:bg-[#2a2a2a] rounded-2xl shadow-xl overflow-hidden">
              <div className="p-5 border-b border-[#72BAA9]/20 flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#2D3A2B] dark:text-white">
                  Shopping Cart <span className="text-[#AE2448]">({totalQuantity} items)</span>
                </h2>
                <button
                  onClick={handleClearCart}
                  className="text-sm text-red-500 hover:text-red-600 transition-colors flex items-center gap-1 hover:scale-105 transition-transform"
                >
                  <FiTrash2 /> Clear All
                </button>
              </div>

              <div className="divide-y divide-[#72BAA9]/20">
                {items.map((item) => (
                  <div key={item.id} className="p-5 flex flex-col sm:flex-row gap-5 hover:bg-[#72BAA9]/5 transition-colors">
                    {/* Product Image */}
                    <div className="sm:w-24 h-24 bg-[#72BAA9]/10 rounded-xl flex items-center justify-center p-2">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#2D3A2B] dark:text-white line-clamp-2 text-lg">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#2D3A2B]/60 dark:text-gray-400 capitalize mt-1">
                        {item.category}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xl font-bold text-[#AE2448]">
                          {formatPrice(item.totalPrice)}
                        </span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleDecrease(item.id)}
                            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-[#72BAA9] hover:text-white transition-all duration-300 flex items-center justify-center"
                          >
                            <FiMinus className="text-sm" />
                          </button>
                          <span className="w-8 text-center font-semibold text-[#2D3A2B] dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncrease(item.id)}
                            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-[#72BAA9] hover:text-white transition-all duration-300 flex items-center justify-center"
                          >
                            <FiPlus className="text-sm" />
                          </button>
                          <button
                            onClick={() => handleRemove(item.id, item.title)}
                            className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center ml-1"
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

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-[#2a2a2a] rounded-2xl shadow-xl p-6 sticky top-8">
              <h2 className="text-xl font-bold text-[#2D3A2B] dark:text-white mb-5 pb-2 border-b border-[#72BAA9]/20">
                Order Summary
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-[#2D3A2B]/70 dark:text-gray-300">
                  <span>Subtotal</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-[#2D3A2B]/70 dark:text-gray-300">
                  <span>Shipping</span>
                  <span className="text-[#72BAA9] font-medium">Free</span>
                </div>
                <div className="flex justify-between text-[#2D3A2B]/70 dark:text-gray-300">
                  <span>Tax</span>
                  <span className="font-medium">$0.00</span>
                </div>
              </div>

              <div className="border-t border-[#72BAA9]/20 pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-[#2D3A2B] dark:text-white">Total</span>
                  <span className="text-[#AE2448]">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button className="w-full bg-[#AE2448] hover:bg-[#6E1A37] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg">
                <FiCreditCard className="text-lg" />
                Proceed to Checkout
              </button>

              <Link
                to="/shop"
                className="block text-center text-sm text-[#2D3A2B]/60 dark:text-gray-400 mt-5 hover:text-[#AE2448] transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart