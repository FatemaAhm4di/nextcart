import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/product/ProductCard";
import Loader from "../components/ui/Loader";
import Error from "../components/ui/Error";
import ProductSkeleton from "../components/ui/ProductSkeleton";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [visibleCount, setVisibleCount] = useState(6);
  const { data: allProducts, isLoading, error } = useProducts();

  // فیلتر بر اساس جستجو
  const filteredProducts = allProducts?.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleProducts = filteredProducts?.slice(0, visibleCount);
  const hasMore = filteredProducts?.length > visibleCount;

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

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

  if (error) return <Error message={error.message} />;

  return (
    <div className="container-custom py-8 animate-fade-in">
      {/* هدر صفحه */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#896C6C] dark:text-[#E2E8F0]">
          {searchQuery ? `Search: "${searchQuery}"` : "All Products"}
        </h1>
        <p className="text-[#896C6C]/70 dark:text-[#E2E8F0]/70 mt-2">
          {filteredProducts?.length || 0} products found
        </p>
      </div>

      {/* لیست محصولات */}
      {visibleProducts?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[#896C6C] dark:text-[#E2E8F0]">No products found.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* دکمه Load More */}
          {hasMore && (
            <div className="text-center mt-10">
              <button
                onClick={loadMore}
                className="btn-primary px-8 py-3 text-lg flex items-center gap-2 mx-auto hover:scale-105 transition-transform"
              >
                Load More ({visibleCount} / {filteredProducts?.length})
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Shop;