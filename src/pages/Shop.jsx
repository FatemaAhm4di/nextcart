import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/product/ProductCard";
import ProductSkeleton from "../components/ui/ProductSkeleton";
import Error from "../components/ui/Error";
import ProductFilter from "../components/product/ProductFilter";
import PriceSort from "../components/product/PriceSort";
import { FiSearch, FiArrowRight } from "react-icons/fi";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const { data: allProducts, isLoading, error } = useProducts();

  let filteredProducts = allProducts?.filter((product) => {
    const matchSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory === "all" || 
      product.category?.toLowerCase().trim() === selectedCategory?.toLowerCase().trim();
    return matchSearch && matchCategory;
  });

  if (sortOrder === 'low-to-high') {
    filteredProducts = [...(filteredProducts || [])].sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'high-to-low') {
    filteredProducts = [...(filteredProducts || [])].sort((a, b) => b.price - a.price);
  }

  const visibleProducts = filteredProducts?.slice(0, visibleCount);
  const hasMore = filteredProducts?.length > visibleCount;

  const loadMore = () => setVisibleCount((prev) => prev + 6);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#D5E7B5] dark:bg-[#1a1a2e] py-6 sm:py-8">
        <div className="container-custom px-4 sm:px-6">
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {[...Array(6)].map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  if (error) return <Error message={error.message} />;

  return (
    <div className="min-h-screen bg-[#D5E7B5] dark:bg-[#1a1a2e] py-6 sm:py-8">
      <div className="container-custom px-4 sm:px-6">
        
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D3A2B] dark:text-white">
            {searchQuery ? (
              <>Search: <span className="text-[#AE2448]">"{searchQuery}"</span></>
            ) : (
              <>All <span className="text-[#AE2448]">Products</span></>
            )}
          </h1>
          <p className="text-sm text-[#2D3A2B]/60 dark:text-gray-400 mt-2">
            {filteredProducts?.length || 0} products found
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-3">
            <ProductFilter 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory}
            />
            <PriceSort 
              sortOrder={sortOrder} 
              setSortOrder={setSortOrder}
            />
          </div>
          
          {searchQuery && (
            <button 
              onClick={() => window.location.href = '/shop'}
              className="text-sm text-[#AE2448] hover:underline flex items-center gap-1"
            >
              <FiSearch className="text-xs" /> Clear Search
            </button>
          )}
        </div>

        {visibleProducts?.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#2a2a2a] rounded-2xl shadow-lg">
            <FiSearch className="text-5xl text-[#AE2448] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#2D3A2B] dark:text-white mb-2">No products found</h3>
            <p className="text-sm text-[#2D3A2B]/60 dark:text-gray-400">Try changing your category or search term</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-10">
                <button
                  onClick={loadMore}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#AE2448] text-[#AE2448] hover:bg-[#AE2448] hover:text-white font-semibold transition-all duration-300 hover:scale-105"
                >
                  Load More ({visibleCount} / {filteredProducts?.length})
                  <FiArrowRight />
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