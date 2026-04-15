import { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts, useCategories } from "../hooks/useProducts";
import ProductCard from "../components/product/ProductCard";
import Loader from "../components/ui/Loader";
import ProductSkeleton from "../components/ui/ProductSkeleton";
import { FiArrowRight, FiStar, FiTruck, FiShield, FiRefreshCw, FiAward } from "react-icons/fi";

const Home = () => {
  const { data: allProducts, isLoading } = useProducts();
  const { data: categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);

  // فیلتر بر اساس دسته
  const filteredProducts = allProducts?.filter((product) =>
    selectedCategory === "all" ? true : product.category === selectedCategory
  );

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
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#E5BEB5]/30 to-[#EEE6CA]/50 py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#896C6C] dark:text-[#E2E8F0] mb-4">
            Welcome to <span className="text-[#7C3AED]">NexCart</span>
          </h1>
          <p className="text-[#896C6C]/80 dark:text-[#E2E8F0]/80 text-lg mb-6">
            Discover amazing products at unbeatable prices
          </p>
          <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
            Shop Now <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container-custom py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-4 bg-[#EEE6CA] dark:bg-[#2a2a2a] rounded-2xl shadow-lg hover:shadow-xl transition-all group">
              <div className="text-[#7C3AED] mb-3 group-hover:scale-110 transition-transform inline-block">
                {feature.icon}
              </div>
              <h4 className="font-semibold text-[#896C6C] dark:text-[#E2E8F0]">{feature.title}</h4>
              <p className="text-xs text-[#896C6C]/70 dark:text-[#E2E8F0]/70">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container-custom py-4">
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full transition ${
              selectedCategory === "all"
                ? "bg-[#7C3AED] text-white"
                : "bg-[#EEE6CA] dark:bg-[#2a2a2a] text-[#896C6C] dark:text-[#E2E8F0] hover:bg-[#E5BEB5]/50"
            }`}
          >
            All
          </button>
          {categories?.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full capitalize transition ${
                selectedCategory === cat
                  ? "bg-[#7C3AED] text-white"
                  : "bg-[#EEE6CA] dark:bg-[#2a2a2a] text-[#896C6C] dark:text-[#E2E8F0] hover:bg-[#E5BEB5]/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="container-custom py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#896C6C] dark:text-[#E2E8F0]">
            Featured Products
          </h2>
        </div>

        {visibleProducts?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#896C6C] dark:text-[#E2E8F0]">No products in this category.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="btn-outline px-8 py-3 text-lg flex items-center gap-2 mx-auto hover:scale-105 transition-transform"
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
      <section className="container-custom py-12">
        <div className="bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] rounded-3xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">Ready to Start Shopping?</h3>
          <p className="opacity-90 mb-6">Get the best deals on your favorite products</p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-white text-[#7C3AED] px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105">
            Shop Now <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;