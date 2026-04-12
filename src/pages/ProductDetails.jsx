import { useParams } from "react-router-dom";
import { useProduct } from '../hooks/useProducts'  
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";  // ✅ اصلاح شد
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data: product, isLoading, isError, error } = useProduct(id);  // ✅ اصلاح شد

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error?.message || "Failed to load product"}
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark p-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 bg-card-light dark:bg-card-dark p-6 rounded-xl shadow-lg">
        
        {/* Image */}
        <div className="flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="h-80 object-contain"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-text-main dark:text-white">
            {product.title}
          </h1>

          <p className="text-text-secondary dark:text-gray-300 text-sm leading-relaxed">
            {product.description}
          </p>

          <p className="text-primary text-xl font-bold">
            ${product.price}
          </p>

          <p className="text-sm text-text-secondary dark:text-gray-400 capitalize">
            Category: {product.category}
          </p>

          <button
            onClick={handleAddToCart}
            className="btn-primary py-3 rounded-lg transition mt-4"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}