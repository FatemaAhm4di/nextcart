import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectWishlistItems, toggleWishlist, clearWishlist } from '../features/wishlist/wishlistSlice';
import { addItem } from '../features/cart/cartSlice';
import { FiHeart, FiShoppingCart, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { formatPrice } from '../utils/formatPrice';
import toast from 'react-hot-toast';

const Wishlist = () => {
  const wishlistItems = useSelector(selectWishlistItems);
  const dispatch = useDispatch();

  const handleRemove = (item) => {
    dispatch(toggleWishlist(item));
    toast.success(`${item.title.slice(0, 30)} removed from wishlist`, { icon: '💔' });
  };

  const handleAddToCart = (item) => {
    dispatch(addItem({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      category: item.category,
    }));
    toast.success(`${item.title.slice(0, 30)} added to cart`, { icon: '🛒' });
  };

  const handleClearAll = () => {
    if (wishlistItems.length === 0) return;
    dispatch(clearWishlist());
    toast.success('Wishlist cleared', { icon: '🧹' });
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center container-custom py-16">
        <div className="text-center max-w-md mx-auto bg-white dark:bg-[#2a2a2a] rounded-3xl shadow-xl p-12">
          <div className="w-24 h-24 bg-[#72BAA9]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiHeart className="text-5xl text-[#AE2448]" />
          </div>
          <h2 className="text-2xl font-bold text-[#2D3A2B] dark:text-white mb-3">Wishlist is empty</h2>
          <p className="text-[#2D3A2B]/60 dark:text-gray-400 mb-8">Save your favorite items here</p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-[#AE2448] hover:bg-[#6E1A37] text-white px-6 py-3 rounded-full transition-all">
            <FiArrowLeft /> Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#D5E7B5] dark:bg-[#1a1a2e] py-8">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-3xl font-bold text-[#2D3A2B] dark:text-white">
            My Wishlist <span className="text-sm text-[#AE2448]">({wishlistItems.length})</span>
          </h1>
          <button onClick={handleClearAll} className="text-red-500 flex items-center gap-1 hover:underline text-sm">
            <FiTrash2 /> Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white dark:bg-[#2a2a2a] rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group border border-[#72BAA9]/20">
              <div className="relative h-48 bg-[#72BAA9]/10 flex items-center justify-center p-4">
                <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                <button
                  onClick={() => handleRemove(item)}
                  className="absolute top-2 right-2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  <FiTrash2 className="text-sm" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[#2D3A2B] dark:text-white line-clamp-2 text-sm mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#2D3A2B]/60 dark:text-gray-400 capitalize mb-2">
                  {item.category}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xl font-bold text-[#AE2448]">{formatPrice(item.price)}</span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="p-2 rounded-full bg-[#AE2448] text-white hover:bg-[#6E1A37] transition-all duration-300 hover:scale-110"
                  >
                    <FiShoppingCart className="text-sm" />
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