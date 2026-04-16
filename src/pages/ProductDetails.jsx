import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from '../hooks/useProducts';  
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";
import toast from "react-hot-toast";
import { FiShoppingCart, FiArrowLeft, FiStar, FiTruck, FiShield, FiRefreshCw } from "react-icons/fi";
import { formatPrice } from "../utils/formatPrice";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: product, isLoading, isError, error } = useProduct(id);

  const handleAddToCart = () => {
    dispatch(addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
    }));
    
    toast.success(`${product.title.slice(0, 30)} added to cart!`, {
      icon: "🛒",
      duration: 2000,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#D5E7B5] dark:bg-[#1a1a2e] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#AE2448] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#D5E7B5] dark:bg-[#1a1a2e] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <p className="text-[#AE2448] text-lg">{error?.message || "Failed to load product"}</p>
          <button 
            onClick={() => navigate(-1)} 
            className="mt-4 text-[#2D3A2B] dark:text-white underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-[#D5E7B5] dark:bg-[#1a1a2e] py-8">
      <div className="container-custom">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#2D3A2B] dark:text-gray-400 hover:text-[#AE2448] transition-colors duration-300 mb-6 group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </button>

        {/* Product Card */}
        <div className="bg-white dark:bg-[#2a2a2a] rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-8 p-6 lg:p-10">
            
            {/* Image Section */}
            <div className="lg:w-1/2">
              <div className="sticky top-8 bg-[#72BAA9]/10 rounded-2xl p-8 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-w-full max-h-96 object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Info Section */}
            <div className="lg:w-1/2 space-y-5">
              
              {/* Category & Rating */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs text-white bg-[#AE2448] px-3 py-1 rounded-full capitalize">
                  {product.category}
                </span>
                <div className="flex items-center gap-1">
                  <div className="flex text-yellow-500">
                    <FiStar className="fill-current" />
                    <FiStar className="fill-current" />
                    <FiStar className="fill-current" />
                    <FiStar className="fill-current" />
                    <FiStar className="fill-current" />
                  </div>
                  <span className="text-sm text-[#2D3A2B]/60 dark:text-gray-400">(4.8)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-[#2D3A2B] dark:text-white leading-tight">
                {product.title}
              </h1>

              {/* Description */}
              <p className="text-[#2D3A2B]/70 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>

              {/* Price */}
              <div className="border-t border-b border-[#72BAA9]/20 py-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-[#AE2448]">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.price * 1.2)}
                  </span>
                  <span className="text-sm bg-[#72BAA9] text-white px-2 py-1 rounded-full">
                    Save 20%
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[#2D3A2B] dark:text-gray-300">
                  <FiTruck className="text-[#AE2448] text-xl" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-3 text-[#2D3A2B] dark:text-gray-300">
                  <FiShield className="text-[#AE2448] text-xl" />
                  <span>2-year warranty included</span>
                </div>
                <div className="flex items-center gap-3 text-[#2D3A2B] dark:text-gray-300">
                  <FiRefreshCw className="text-[#AE2448] text-xl" />
                  <span>30-day easy returns</span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#AE2448] hover:bg-[#6E1A37] text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 shadow-lg mt-6"
              >
                <FiShoppingCart className="text-2xl" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}