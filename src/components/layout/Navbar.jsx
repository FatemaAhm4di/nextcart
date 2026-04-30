import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSettings } from "../../hooks/useSettings";
import { selectIsAuthenticated, selectUser, logout } from "../../features/auth/authSlice";
import { 
  FiShoppingCart, FiMenu, FiX, FiUser, FiSearch, 
  FiGrid, FiInfo, FiPhone, FiHome, FiHeart, FiLogOut, 
  FiUserCheck, FiSettings, FiTag, FiSun, FiMoon
} from "react-icons/fi";
import { toast } from "sonner";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const cartCount = useSelector((state) => state.cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const { theme, toggleTheme } = useSettings();

  useEffect(() => {
    let isMounted = true;
    const fetchSearchResults = async () => {
      if (searchTerm.length > 1) {
        try {
          const res = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}&limit=5`);
          const data = await res.json();
          if (isMounted) setSearchResults(data.products || []);
          setShowResults(true);
        } catch (error) { console.error("Search failed:", error); }
      } else {
        if (isMounted) setSearchResults([]);
        setShowResults(false);
      }
    };
    const delay = setTimeout(fetchSearchResults, 300);
    return () => { clearTimeout(delay); isMounted = false; };
  }, [searchTerm]);

  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${searchTerm}`);
      setShowResults(false);
      setIsSearchOpen(false);
      setSearchTerm("");
    }
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
    setShowResults(false);
    setIsSearchOpen(false);
    setSearchTerm("");
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsUserDropdownOpen(false);
    toast.success("Logged out successfully", {
      icon: <FiLogOut className="w-4 h-4" />,
    });
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/", icon: <FiHome className="text-base sm:text-lg" /> },
    { name: "Shop", path: "/shop", icon: <FiGrid className="text-base sm:text-lg" /> },
    { name: "About", path: "/about", icon: <FiInfo className="text-base sm:text-lg" /> },
    { name: "Contact", path: "/contact", icon: <FiPhone className="text-base sm:text-lg" /> },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-[#1a1a2e]/90 shadow-md transition-all duration-300 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            
            <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-[#AE2448] to-[#6E1A37] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                <span className="text-white font-bold text-base sm:text-lg md:text-xl">N</span>
              </div>
              <div className="block">
                <span className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-[#AE2448] to-[#6E1A37] bg-clip-text text-transparent">NextCart</span>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 hidden sm:block tracking-wide">Premium Store</p>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className={`relative flex items-center gap-2 px-4 lg:px-5 py-2 rounded-full transition-all duration-300 text-sm lg:text-base font-medium ${isActive(link.path) ? 'text-white bg-[#AE2448] shadow-md' : 'text-gray-700 dark:text-gray-300 hover:text-[#AE2448] hover:bg-[#AE2448]/10'}`}>
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2.5">
              
              <div ref={searchRef} className="hidden md:block relative">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input 
                      type="text" 
                      placeholder="Search products..." 
                      value={searchTerm} 
                      onChange={(e) => setSearchTerm(e.target.value)} 
                      onFocus={() => setShowResults(true)} 
                      className="w-44 lg:w-56 xl:w-72 px-4 py-2 pl-10 rounded-full bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-200 border border-transparent focus:border-[#AE2448] focus:ring-2 focus:ring-[#AE2448]/20 outline-none text-sm transition-all" 
                    />
                  </div>
                </form>
                {showResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-fade-in">
                    {searchResults.slice(0, 5).map((p) => (
                      <button key={p.id} onClick={() => handleProductClick(p.id)} className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left">
                        <img src={p.thumbnail} className="w-10 h-10 object-cover rounded-lg" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800 dark:text-white line-clamp-1">{p.title}</p>
                          <p className="text-xs text-[#AE2448] font-semibold">${p.price}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <FiSearch className="text-lg sm:text-xl text-gray-600 dark:text-gray-300" />
              </button>

              <Link to="/wishlist" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <FiHeart className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 hover:text-[#AE2448] transition-colors" />
              </Link>

              <button onClick={toggleTheme} className="hidden lg:block p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                {theme === "dark" ? <FiSun className="text-lg sm:text-xl text-yellow-500" /> : <FiMoon className="text-lg sm:text-xl text-gray-600" />}
              </button>

              <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <FiShoppingCart className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 hover:text-[#AE2448] transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#AE2448] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-md">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>

              <div className="relative" ref={dropdownRef}>
                {isAuthenticated && user ? (
                  <>
                    <button onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} className="flex items-center gap-1.5 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      {user.avatar ? (
                        <img src={user.avatar} alt="avatar" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-[#AE2448]" />
                      ) : (
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#AE2448] to-[#6E1A37] flex items-center justify-center">
                          <FiUser className="text-white text-sm" />
                        </div>
                      )}
                      <span className="hidden lg:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                        {user.name?.split(' ')[0] || user.email?.split('@')[0]}
                      </span>
                    </button>
                    {isUserDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-fade-in">
                        <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
                          {user.avatar ? (
                            <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#AE2448] to-[#6E1A37] flex items-center justify-center">
                              <FiUser className="text-white text-lg" />
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800 dark:text-white text-sm">{user.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                          </div>
                        </div>
                        <div className="py-1">
                          <Link to="/profile" onClick={() => setIsUserDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <FiUserCheck className="text-base" /> Profile
                          </Link>
                          <Link to="/orders" onClick={() => setIsUserDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <FiTag className="text-base" /> Orders
                          </Link>
                          <Link to="/settings" onClick={() => setIsUserDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <FiSettings className="text-base" /> Settings
                          </Link>
                          <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                            <FiLogOut className="text-base" /> Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link to="/login" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#AE2448] to-[#6E1A37] text-white hover:shadow-lg transition-all hover:scale-105 text-sm font-medium">
                    <FiUser className="text-sm" />
                    <span className="hidden lg:inline">Sign In</span>
                  </Link>
                )}
              </div>

              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                {isMobileMenuOpen ? <FiX className="text-lg sm:text-xl text-gray-600 dark:text-gray-300" /> : <FiMenu className="text-lg sm:text-xl text-gray-600 dark:text-gray-300" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Search Bar */}
      <div className={`fixed top-16 left-0 right-0 z-40 bg-white dark:bg-gray-900 shadow-xl p-4 transition-all duration-300 md:hidden ${isSearchOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <form onSubmit={handleSearch} className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="w-full px-4 py-3 pl-11 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-[#AE2448] focus:ring-2 focus:ring-[#AE2448]/20 outline-none text-base" 
            autoFocus 
          />
          <button type="button" onClick={() => setIsSearchOpen(false)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            <FiX className="text-xl" />
          </button>
        </form>
        {showResults && searchResults.length > 0 && (
          <div className="mt-3 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-h-80 overflow-y-auto">
            {searchResults.map((p) => (
              <button key={p.id} onClick={() => handleProductClick(p.id)} className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <img src={p.thumbnail} className="w-12 h-12 object-cover rounded-lg" />
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-800 dark:text-white line-clamp-1">{p.title}</p>
                  <p className="text-xs text-[#AE2448] font-semibold">${p.price}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-xl z-40 md:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? "max-h-[calc(100vh-64px)] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="flex flex-col p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-64px)]">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-all ${isActive(link.path) ? 'bg-[#AE2448] text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
              {link.icon}<span className="font-medium">{link.name}</span>
            </Link>
          ))}
          <hr className="border-gray-200 dark:border-gray-700 my-2" />
          <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-all ${isActive('/wishlist') ? 'bg-[#AE2448] text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            <FiHeart /> Wishlist
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 py-3 px-4 rounded-xl ${isActive('/profile') ? 'bg-[#AE2448] text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                <FiUserCheck /> Profile
              </Link>
              <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 py-3 px-4 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-3 px-4 rounded-xl bg-gradient-to-r from-[#AE2448] to-[#6E1A37] text-white">
              <FiUser /> Sign In
            </Link>
          )}
        </div>
      </div>
    </>
  );
}