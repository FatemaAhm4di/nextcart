import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSettings } from "../../hooks/useSettings";
import { 
  FiShoppingCart, 
  FiMenu, 
  FiX, 
  FiUser, 
  FiSearch,
  FiSun,
  FiMoon,
  FiGrid,
  FiInfo,
  FiPhone,
  FiHome,
  FiHeart
} from "react-icons/fi";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const cartCount = useSelector(
    (state) => state.cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0
  );

  const { theme, toggleTheme } = useSettings();

 // جستجوی محصولات
useEffect(() => {
  let isMounted = true;

  const fetchSearchResults = async () => {
    if (searchTerm.length > 1) {
      try {
        const res = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}&limit=5`);
        const data = await res.json();
        if (isMounted) {
          setSearchResults(data.products || []);
          setShowResults(true);
        }
      } catch (error) {
        console.error("Search failed:", error);
        if (isMounted) {
          setSearchResults([]);
          setShowResults(false);
        }
      }
    } else {
      if (isMounted) {
        setSearchResults([]);
        setShowResults(false);
      }
    }
  };

  const delayDebounce = setTimeout(fetchSearchResults, 300);
  return () => {
    clearTimeout(delayDebounce);
    isMounted = false;
  };
}, [searchTerm]);
  // بستن نتایج جستجو
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${searchTerm}`);
      setShowResults(false);
      setSearchTerm("");
    }
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
    setShowResults(false);
    setSearchTerm("");
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <FiHome className="text-lg" /> },
    { name: "Shop", path: "/shop", icon: <FiGrid className="text-lg" /> },
    { name: "About", path: "/about", icon: <FiInfo className="text-lg" /> },
    { name: "Contact", path: "/contact", icon: <FiPhone className="text-lg" /> },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#EEE6CA] dark:bg-[#1a1a2e] shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <div className="w-9 h-9 bg-[#7C3AED] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div>
                <span className="text-xl font-bold text-[#7C3AED]">NexCart</span>
                <p className="text-xs text-[#896C6C] dark:text-[#E2E8F0] hidden sm:block">Premium Store</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-full text-[#896C6C] dark:text-[#E2E8F0] hover:bg-[#E5BEB5]/30 transition-all duration-300"
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              
              {/* Search Box */}
              <div ref={searchRef} className="relative">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onFocus={() => searchTerm.length > 1 && setShowResults(true)}
                      className="w-40 sm:w-56 lg:w-64 px-4 py-2 pl-10 rounded-full bg-white dark:bg-gray-800 text-[#896C6C] dark:text-[#E2E8F0] border border-[#E5BEB5] focus:border-[#7C3AED] outline-none transition-all duration-300"
                    />
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#896C6C] dark:text-[#E2E8F0]" />
                    {searchTerm && (
                      <button
                        type="button"
                        onClick={() => setSearchTerm("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        <FiX className="text-[#896C6C] dark:text-[#E2E8F0] hover:text-[#7C3AED]" />
                      </button>
                    )}
                  </div>
                </form>

                {/* Search Results */}
                {showResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-[#E5BEB5] overflow-hidden z-50">
                    {searchResults.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-[#E5BEB5]/30 transition-colors text-left"
                      >
                        <img src={product.thumbnail} alt={product.title} className="w-10 h-10 object-cover rounded" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#896C6C] dark:text-[#E2E8F0] line-clamp-1">{product.title}</p>
                          <p className="text-xs text-[#7C3AED]">${product.price}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Wishlist Button */}
              <button className="hidden sm:flex p-2 rounded-full hover:bg-[#E5BEB5]/30 transition-all duration-300">
                <FiHeart className="text-xl text-[#896C6C] dark:text-[#E2E8F0] hover:text-[#7C3AED] transition-colors" />
              </button>

              {/* Cart Button */}
              <Link to="/cart" className="relative p-2 rounded-full hover:bg-[#E5BEB5]/30 transition-all duration-300">
                <FiShoppingCart className="text-xl text-[#896C6C] dark:text-[#E2E8F0] hover:text-[#7C3AED] transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-[#7C3AED] text-white text-xs rounded-full flex items-center justify-center px-1 animate-pulse">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-[#E5BEB5]/30 transition-all duration-300"
              >
                {theme === "dark" ? (
                  <FiSun className="text-xl text-yellow-500" />
                ) : (
                  <FiMoon className="text-xl text-[#896C6C]" />
                )}
              </button>

              {/* User Button */}
              <button className="hidden sm:flex p-2 rounded-full hover:bg-[#E5BEB5]/30 transition-all duration-300">
                <FiUser className="text-xl text-[#896C6C] dark:text-[#E2E8F0] hover:text-[#7C3AED] transition-colors" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-full hover:bg-[#E5BEB5]/30 transition-all duration-300"
              >
                {isMobileMenuOpen ? (
                  <FiX className="text-2xl text-[#896C6C] dark:text-[#E2E8F0]" />
                ) : (
                  <FiMenu className="text-2xl text-[#896C6C] dark:text-[#E2E8F0]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-20"></div>

      {/* Mobile Menu */}
      <div
        className={`
          fixed top-16 left-0 right-0 bg-[#EEE6CA] dark:bg-[#1a1a2e] shadow-xl z-40 md:hidden
          transition-all duration-300 ease-in-out overflow-hidden
          ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="flex flex-col p-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 py-3 px-4 rounded-xl text-[#896C6C] dark:text-[#E2E8F0] hover:bg-[#E5BEB5]/30 transition-all duration-300"
            >
              {link.icon}
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}
          <hr className="border-[#E5BEB5] my-2" />
          <Link
            to="/wishlist"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 py-3 px-4 rounded-xl text-[#896C6C] dark:text-[#E2E8F0] hover:bg-[#E5BEB5]/30"
          >
            <FiHeart /> Wishlist
          </Link>
          <Link
            to="/profile"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 py-3 px-4 rounded-xl text-[#896C6C] dark:text-[#E2E8F0] hover:bg-[#E5BEB5]/30"
          >
            <FiUser /> Profile
          </Link>
        </div>
      </div>
    </>
  );
}