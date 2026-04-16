import { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts, useCategories } from "../hooks/useProducts";
import ProductCard from "../components/product/ProductCard";
import ProductSkeleton from "../components/ui/ProductSkeleton";
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw, FiAward } from "react-icons/fi";

const Home = () => {
  const { data: allProducts, isLoading } = useProducts();
  const { data: categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);

  // ✅ فیلتر بر اساس دسته (این قسمت رو چک کن)
  const filteredProducts = allProducts?.filter((product) => {
    if (selectedCategory === "all") return true;
    // مقایسه با حذف فاصله و حساسیت به حروف کوچک/بزرگ
    return product.category?.toLowerCase() === selectedCategory?.toLowerCase();
  });

  const visibleProducts = filteredProducts?.slice(0, visibleCount);
  const hasMore = filteredProducts?.length > visibleCount;

  const features = [
    { icon: <FiTruck className="text-3xl" />, title: "Free Shipping", desc: "On orders over $50" },
    { icon: <FiShield className="text-3xl" />, title: "Secure Payment", desc: "100% secure" },
    { icon: <FiRefreshCw className="text-3xl" />, title: "Easy Returns", desc: "30 days policy" },
    { icon: <FiAward className="text-3xl" />, title: "Premium Quality", desc: "Best products" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#D5E7B5] dark:bg-[#1a1a2e] py-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#D5E7B5] dark:bg-[#1a1a2e] animate-fade-in">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#72BAA9]/20 via-[#D5E7B5] to-[#AE2448]/10 py-20">
        <div className="container-custom text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-[#2D3A2B] dark:text-white mb-4 animate-slide-up">
            Welcome to <span className="text-[#AE2448]">NexCart</span>
          </h1>
          <p className="text-[#2D3A2B]/70 dark:text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Discover amazing products at unbeatable prices. Fast shipping & secure payment.
          </p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-[#AE2448] hover:bg-[#6E1A37] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
            Shop Now <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container-custom py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white dark:bg-[#2a2a2a] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer">
              <div className="text-[#AE2448] mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                {feature.icon}
              </div>
              <h4 className="font-bold text-[#2D3A2B] dark:text-white mb-1">{feature.title}</h4>
              <p className="text-sm text-[#2D3A2B]/60 dark:text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories - دکمه‌های دسته‌بندی */}
      <section className="container-custom py-4">
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === "all"
                ? "bg-[#AE2448] text-white shadow-lg scale-105"
                : "bg-white dark:bg-[#2a2a2a] text-[#2D3A2B] dark:text-gray-300 hover:bg-[#72BAA9] hover:text-white"
            }`}
          >
            All Products
          </button>
          {categories?.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full capitalize font-medium transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-[#AE2448] text-white shadow-lg scale-105"
                  : "bg-white dark:bg-[#2a2a2a] text-[#2D3A2B] dark:text-gray-300 hover:bg-[#72BAA9] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="container-custom py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D3A2B] dark:text-white mb-3">
            Featured <span className="text-[#AE2448]">Products</span>
          </h2>
          <p className="text-[#2D3A2B]/60 dark:text-gray-400">Hand-picked just for you</p>
        </div>

        {visibleProducts?.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-[#2a2a2a] rounded-2xl">
            <p className="text-[#2D3A2B] dark:text-gray-300">No products in this category.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-transparent border-2 border-[#AE2448] text-[#AE2448] hover:bg-[#AE2448] hover:text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  View More ({visibleCount} / {filteredProducts?.length})
                  <FiArrowRight />
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* CTA Banner */}
      <section className="container-custom py-16">
        <div className="relative overflow-hidden bg-gradient-to-r from-[#AE2448] to-[#6E1A37] rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl">
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Shopping?</h3>
            <p className="text-white/80 text-lg mb-8 max-w-md mx-auto">Get the best deals on your favorite products</p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-white text-[#AE2448] px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105">
              Shop Now <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;