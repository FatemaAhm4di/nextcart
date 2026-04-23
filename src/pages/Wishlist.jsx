import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectWishlistItems, toggleWishlist, clearWishlist } from '../features/wishlist/wishlistSlice';
import { addItem } from '../features/cart/cartSlice';
import { FiHeart, FiShoppingCart, FiTrash2, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { formatPrice } from '../utils/formatPrice';
import { toast } from 'sonner';

const Wishlist = () => {
  const wishlistItems = useSelector(selectWishlistItems);
  const dispatch = useDispatch();

  const handleRemove = (item) => {
    dispatch(toggleWishlist(item));
    toast.success(`${item.title.slice(0, 30)} removed from wishlist`, {
      icon: <FiTrash2 className="w-4 h-4" />,
      duration: 2000,
    });
  };

  const handleAddToCart = (item) => {
    dispatch(addItem({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      category: item.category,
    }));
    toast.success(`${item.title.slice(0, 30)} added to cart`, {
      icon: <FiShoppingCart className="w-4 h-4" />,
      duration: 2000,
    });
  };

  const handleClearAll = () => {
    if (wishlistItems.length === 0) return;
    dispatch(clearWishlist());
    toast.success('Wishlist cleared', {
      icon: <FiCheckCircle className="w-4 h-4" />,
      duration: 2000,
    });
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center container-custom py-12 sm:py-16">
        <div className="text-center max-w-md mx-auto bg-white dark:bg-[#2a2a2a] rounded-2xl sm:rounded-3xl shadow-xl p-8 sm:p-12 m-4 sm:m-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#72BAA9]/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <FiHeart className="text-4xl sm:text-5xl text-[#AE2448]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#2D3A2B] dark:text-white mb-2 sm:mb-3">Wishlist is empty</h2>
          <p className="text-sm sm:text-base text-[#2D3A2B]/60 dark:text-gray-400 mb-6 sm:mb-8">Save your favorite items here</p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-[#AE2448] hover:bg-[#6E1A37] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base transition-all duration-300 hover:scale-105">
            <FiArrowLeft /> Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#D5E7B5] dark:bg-[#1a1a2e] py-6 sm:py-8">
      <div className="container-custom px-4 sm:px-6">
        
        {/* Header - ریسپانسیو */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2D3A2B] dark:text-white text-center sm:text-left">
            My Wishlist <span className="text-sm text-[#AE2448]">({wishlistItems.length})</span>
          </h1>
          <button 
            onClick={handleClearAll} 
            className="text-red-500 flex items-center gap-1 hover:underline text-xs sm:text-sm transition-colors"
          >
            <FiTrash2 className="text-sm sm:text-base" /> Clear All
          </button>
        </div>

        {/* Products Grid - کاملاً ریسپانسیو */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {wishlistItems.map((item) => (
            <div 
              key={item.id} 
              className="group bg-white dark:bg-[#2a2a2a] rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#72BAA9]/20 hover:-translate-y-1"
            >
              {/* Image Container - ریسپانسیو */}
              <div className="relative aspect-square bg-[#72BAA9]/10 flex items-center justify-center p-4 sm:p-5">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" 
                />
                <button
                  onClick={() => handleRemove(item)}
                  className="absolute top-2 right-2 p-1.5 sm:p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                  aria-label="Remove from wishlist"
                >
                  <FiTrash2 className="text-xs sm:text-sm" />
                </button>
              </div>
              
              {/* Content - ریسپانسیو */}
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-[#2D3A2B] dark:text-white line-clamp-2 text-xs sm:text-sm mb-1 min-h-[2.5rem] sm:min-h-[3rem]">
                  {item.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-[#2D3A2B]/60 dark:text-gray-400 capitalize mb-2 truncate">
                  {item.category}
                </p>
                <div className="flex items-center justify-between mt-2 sm:mt-3">
                  <span className="text-sm sm:text-base md:text-lg font-bold text-[#AE2448]">
                    {formatPrice(item.price)}
                  </span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="p-1.5 sm:p-2 rounded-full bg-[#AE2448] text-white hover:bg-[#6E1A37] transition-all duration-300 hover:scale-110"
                    aria-label="Add to cart"
                  >
                    <FiShoppingCart className="text-xs sm:text-sm" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;