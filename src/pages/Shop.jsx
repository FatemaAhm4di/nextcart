import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/product/ProductCard";
import ProductSkeleton from "../components/ui/ProductSkeleton";
import Error from "../components/ui/Error";
import ProductFilter from "../components/product/ProductFilter";
import { FiGrid, FiSearch } from "react-icons/fi";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);
  const { data: allProducts, isLoading, error } = useProducts();

  // فیلتر بر اساس جستجو و دسته‌بندی
  const filteredProducts = allProducts?.filter((product) => {
    const matchSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const visibleProducts = filteredProducts?.slice(0, visibleCount);
  const hasMore = filteredProducts?.length > visibleCount;

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

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

  if (error) return <Error message={error.message} />;

  return (
    <div className="min-h-screen bg-[#D5E7B5] dark:bg-[#1a1a2e] py-8 animate-fade-in">
      <div className="container-custom">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-[#2a2a2a] px-4 py-2 rounded-full shadow-md mb-4">
            <FiGrid className="text-[#AE2448]" />
            <span className="text-sm text-[#2D3A2B] dark:text-gray-300">Product Collection</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D3A2B] dark:text-white mb-3">
            {searchQuery ? (
              <>
                Search: <span className="text-[#AE2448]">"{searchQuery}"</span>
              </>
            ) : (
              <>
                All <span className="text-[#AE2448]">Products</span>
              </>
            )}
          </h1>
          <p className="text-[#2D3A2B]/60 dark:text-gray-400 text-lg">
            {filteredProducts?.length || 0} products found
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <ProductFilter 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory}
          />
          
          {searchQuery && (
            <div className="flex items-center gap-2 text-sm text-[#2D3A2B] dark:text-gray-300">
              <FiSearch />
              <span>Search results for: <strong className="text-[#AE2448]">{searchQuery}</strong></span>
              <button 
                onClick={() => window.location.href = '/shop'}
                className="ml-2 text-[#AE2448] hover:underline"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {visibleProducts?.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-[#2a2a2a] rounded-3xl shadow-lg">
            <div className="w-20 h-20 bg-[#72BAA9]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiSearch className="text-3xl text-[#AE2448]" />
            </div>
            <h3 className="text-xl font-semibold text-[#2D3A2B] dark:text-white mb-2">No products found</h3>
            <p className="text-[#2D3A2B]/60 dark:text-gray-400">
              Try changing your category or search term
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={loadMore}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-transparent border-2 border-[#AE2448] text-[#AE2448] hover:bg-[#AE2448] hover:text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Load More ({visibleCount} / {filteredProducts?.length})
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Shop;