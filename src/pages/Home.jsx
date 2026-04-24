import { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/product/ProductCard";
import ProductSkeleton from "../components/ui/ProductSkeleton";
import ProductFilter from "../components/product/ProductFilter";
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw, FiAward } from "react-icons/fi";

const Home = () => {
  const { data: allProducts, isLoading } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);

  // فیلتر بر اساس دسته
  const filteredProducts = allProducts?.filter((product) => {
    if (selectedCategory === "all") return true;
    return product.category?.toLowerCase() === selectedCategory?.toLowerCase();
  });

  const visibleProducts = filteredProducts?.slice(0, visibleCount);
  const hasMore = filteredProducts?.length > visibleCount;

  const features = [
    { icon: <FiTruck className="text-2xl sm:text-3xl" />, title: "Free Shipping", desc: "On orders over $50" },
    { icon: <FiShield className="text-2xl sm:text-3xl" />, title: "Secure Payment", desc: "100% secure" },
    { icon: <FiRefreshCw className="text-2xl sm:text-3xl" />, title: "Easy Returns", desc: "30 days policy" },
    { icon: <FiAward className="text-2xl sm:text-3xl" />, title: "Premium Quality", desc: "Best products" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#D5E7B5] dark:bg-[#1a1a2e] py-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#D5E7B5] dark:bg-[#1a1a2e]">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#72BAA9]/20 via-[#D5E7B5] to-[#AE2448]/10 py-12 sm:py-16 md:py-20">
        <div className="container-custom text-center relative z-10 px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#2D3A2B] dark:text-white mb-3 sm:mb-4 animate-slide-up">
            Welcome to <span className="text-[#a92045]">NextCart</span>
          </h1>
          <p className="text-[#2D3A2B]/70 dark:text-gray-300 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Discover amazing products at unbeatable prices. Fast shipping & secure payment.
          </p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-[#AE2448] hover:bg-[#6E1A37] text-white px-6 sm:px-8 py-2.5 sm:py-3 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
            Shop Now <FiArrowRight className="text-sm sm:text-base md:text-lg" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container-custom py-12 sm:py-16 px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-3 sm:p-4 md:p-6 bg-white dark:bg-[#2a2a2a] rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer">
              <div className="text-[#AE2448] mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                {feature.icon}
              </div>
              <h4 className="font-bold text-[#2D3A2B] dark:text-white text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1">{feature.title}</h4>
              <p className="text-[10px] sm:text-xs md:text-sm text-[#2D3A2B]/60 dark:text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories - ProductFilter */}
      <section className="container-custom py-4 px-4 sm:px-6">
        <ProductFilter 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory}
        />
      </section>

      {/* Products Grid */}
      <section className="container-custom py-8 sm:py-12 px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D3A2B] dark:text-white mb-2 sm:mb-3">
            Featured <span className="text-[#AE2448]">Products</span>
          </h2>
          <p className="text-sm sm:text-base text-[#2D3A2B]/60 dark:text-gray-400">Hand-picked just for you</p>
        </div>

        {visibleProducts?.length === 0 ? (
          <div className="text-center py-8 sm:py-12 bg-white dark:bg-[#2a2a2a] rounded-2xl">
            <p className="text-[#2D3A2B] dark:text-gray-300 text-sm sm:text-base">No products in this category.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-8 sm:mt-12">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full bg-transparent border-2 border-[#AE2448] text-[#AE2448] hover:bg-[#AE2448] hover:text-white font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  View More ({visibleCount} / {filteredProducts?.length})
                  <FiArrowRight className="text-sm sm:text-base" />
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* CTA Banner */}
      <section className="container-custom py-12 sm:py-16 px-4 sm:px-6">
        <div className="relative overflow-hidden bg-gradient-to-r from-[#AE2448] to-[#6E1A37] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-16 text-center text-white shadow-2xl">
          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4">Ready to Start Shopping?</h3>
            <p className="text-white/80 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8 max-w-md mx-auto px-4">Get the best deals on your favorite products</p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-white text-[#AE2448] px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full font-semibold text-sm sm:text-base hover:shadow-xl transition-all duration-300 hover:scale-105">
              Shop Now <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;