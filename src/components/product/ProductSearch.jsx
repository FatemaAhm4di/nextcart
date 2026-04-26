const ProductSearch = () => {
    return (
        <div className="w-full h-[400px] bg-[#F5F5F5] rounded-lg flex items-center justify-center gap-6">
            <div className="flex flex-col items-start gap-4">
                <h2 className="text-2xl font-bold text-[#2D3A2B] dark:text-white">Find Your Desired Products</h2>
                <p className="text-[#2D3A2B] dark:text-gray-300">Search through our extensive catalog to find the perfect items for you.</p>
                <input
                    type="text"
                    placeholder="Search products..."
                    className="bg-white text-[#2D3A2B] placeholder:text-[#2D3A2B] dark:placeholder:text-gray-500 dark:bg-gray-700 dark:text-white border border-[#2D3A2B] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
    );
};

export default ProductSearch;