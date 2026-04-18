import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();

  const cartCount = useSelector(
    (state) => state.cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0
  );

  const { theme, toggleTheme } = useSettings();

  // جستجو
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

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/", icon: <FiHome className="text-lg" /> },
    { name: "Shop", path: "/shop", icon: <FiGrid className="text-lg" /> },
    { name: "About", path: "/about", icon: <FiInfo className="text-lg" /> },
    { name: "Contact", path: "/contact", icon: <FiPhone className="text-lg" /> },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#1a1a2e] shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <div className="w-9 h-9 bg-[#AE2448] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div>
                <span className="text-xl font-bold text-[#AE2448]">NexCart</span>
                <p className="text-xs text-[#2D3A2B] dark:text-[#E2E8F0] hidden sm:block">Premium Store</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    relative flex items-center gap-2 px-3 lg:px-4 py-2 rounded-full 
                    transition-all duration-300 overflow-hidden group
                    ${isActive(link.path) 
                      ? 'text-white' 
                      : 'text-[#2D3A2B] dark:text-[#E2E8F0] hover:text-[#AE2448]'
                    }
                  `}
                >
                  {isActive(link.path) && (
                    <span className="absolute inset-0 bg-[#AE2448] rounded-full -z-0"></span>
                  )}
                  <span className={`
                    absolute inset-0 bg-[#72BAA9]/20 rounded-full -z-0 
                    transition-all duration-300 scale-0 group-hover:scale-100
                    ${isActive(link.path) ? 'hidden' : ''}
                  `}></span>
                  <span className="relative z-10 flex items-center gap-2">
                    {link.icon}
                    <span>{link.name}</span>
                  </span>
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
                      className="w-40 sm:w-56 lg:w-64 px-4 py-2 pl-10 rounded-full bg-[#D5E7B5] dark:bg-gray-800 text-[#2D3A2B] dark:text-[#E2E8F0] border border-[#72BAA9] focus:border-[#AE2448] focus:ring-2 focus:ring-[#AE2448]/20 outline-none transition-all duration-300"
                    />
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2D3A2B] dark:text-[#E2E8F0]" />
                    {searchTerm && (
                      <button
                        type="button"
                        onClick={() => setSearchTerm("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        <FiX className="text-[#2D3A2B] dark:text-[#E2E8F0] hover:text-[#AE2448] transition-colors" />
                      </button>
                    )}
                  </div>
                </form>

                {showResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-[#72BAA9] overflow-hidden z-50 animate-fade-in">
                    {searchResults.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-[#72BAA9]/20 transition-all duration-200 text-left group"
                      >
                        <img src={product.thumbnail} alt={product.title} className="w-10 h-10 object-cover rounded-lg" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#2D3A2B] dark:text-[#E2E8F0] line-clamp-1 group-hover:text-[#AE2448] transition-colors">
                            {product.title}
                          </p>
                          <p className="text-xs text-[#AE2448]">${product.price}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Wishlist Button - لینک به صفحه ویسلینت */}
              <Link to="/wishlist" className="hidden sm:flex p-2 rounded-full hover:bg-[#72BAA9]/20 transition-all duration-300 hover:scale-110 group">
                <FiHeart className="text-xl text-[#2D3A2B] dark:text-[#E2E8F0] group-hover:text-[#AE2448] transition-colors" />
              </Link>

              {/* Cart Button */}
              <Link to="/cart" className="relative p-2 rounded-full hover:bg-[#72BAA9]/20 transition-all duration-300 hover:scale-110 group">
                <FiShoppingCart className="text-xl text-[#2D3A2B] dark:text-[#E2E8F0] group-hover:text-[#AE2448] transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-[#AE2448] text-white text-xs rounded-full flex items-center justify-center px-1 animate-pulse">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-[#72BAA9]/20 transition-all duration-300 hover:scale-110"
              >
                {theme === "dark" ? (
                  <FiSun className="text-xl text-yellow-500" />
                ) : (
                  <FiMoon className="text-xl text-[#2D3A2B]" />
                )}
              </button>

              {/* User Button */}
              <button className="hidden sm:flex p-2 rounded-full hover:bg-[#72BAA9]/20 transition-all duration-300 hover:scale-110 group">
                <FiUser className="text-xl text-[#2D3A2B] dark:text-[#E2E8F0] group-hover:text-[#AE2448] transition-colors" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-full hover:bg-[#72BAA9]/20 transition-all duration-300"
              >
                {isMobileMenuOpen ? (
                  <FiX className="text-2xl text-[#2D3A2B] dark:text-[#E2E8F0]" />
                ) : (
                  <FiMenu className="text-2xl text-[#2D3A2B] dark:text-[#E2E8F0]" />
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
          fixed top-16 left-0 right-0 bg-white dark:bg-[#1a1a2e] shadow-xl z-40 md:hidden
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
              className="flex items-center gap-3 py-3 px-4 rounded-xl text-[#2D3A2B] dark:text-[#E2E8F0] hover:bg-[#72BAA9]/20 hover:text-[#AE2448] transition-all duration-300 group"
            >
              <span className="group-hover:scale-110 transition-transform">{link.icon}</span>
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}
          <hr className="border-[#72BAA9]/30 my-2" />
          <Link
            to="/wishlist"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 py-3 px-4 rounded-xl text-[#2D3A2B] dark:text-[#E2E8F0] hover:bg-[#72BAA9]/20 hover:text-[#AE2448] transition-all duration-300 group"
          >
            <FiHeart className="group-hover:scale-110 transition-transform" /> Wishlist
          </Link>
          <Link
            to="/profile"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 py-3 px-4 rounded-xl text-[#2D3A2B] dark:text-[#E2E8F0] hover:bg-[#72BAA9]/20 hover:text-[#AE2448] transition-all duration-300 group"
          >
            <FiUser className="group-hover:scale-110 transition-transform" /> Profile
          </Link>
        </div>
      </div>
    </>
  );
}