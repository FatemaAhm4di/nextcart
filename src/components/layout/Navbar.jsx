import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSettings } from "../../hooks/useSettings";
import { selectIsAuthenticated, selectUser, logout } from "../../features/auth/authSlice";
import { 
  FiShoppingCart, FiMenu, FiX, FiUser, FiSearch, FiSun, FiMoon,
  FiGrid, FiInfo, FiPhone, FiHome, FiHeart, FiLogOut, FiUserCheck, FiSettings, FiTag
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
        setIsSearchOpen(false);
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
    toast.success("Logged out successfully", { icon: <FiLogOut className="w-4 h-4" /> });
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
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 dark:bg-[#1a1a2e]/80 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-2 sm:py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1.5 sm:gap-2 group shrink-0">
  <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-gradient-to-br from-[#AE2448] to-[#6E1A37] rounded-lg sm:rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
    <span className="text-white font-bold text-base sm:text-lg">N</span>
  </div>
  <div className="block">
    <span className="text-sm sm:text-base md:text-xl font-bold text-[#AE2448] dark:text-white">NextCart</span>
    <p className="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 hidden sm:block">Premium Store</p>
  </div>
</Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className={`relative flex items-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full transition-all duration-300 text-sm lg:text-base ${isActive(link.path) ? 'text-[#AE2448] font-semibold' : 'text-gray-700 dark:text-gray-300 hover:text-[#AE2448]'}`}>
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-1 sm:gap-2">
              
              {/* Search Desktop */}
              <div ref={searchRef} className="hidden md:block relative">
                <form onSubmit={handleSearch}>
                  <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onFocus={() => setShowResults(true)} className="w-32 lg:w-48 xl:w-64 px-3 py-1.5 pl-8 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 focus:border-[#AE2448] focus:ring-1 focus:ring-[#AE2448] outline-none text-sm transition-all" />
                  <FiSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                </form>
                {showResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                    {searchResults.slice(0, 5).map((p) => (
                      <button key={p.id} onClick={() => handleProductClick(p.id)} className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                        <img src={p.thumbnail} className="w-8 h-8 object-cover rounded" />
                        <div className="flex-1 text-left"><p className="text-xs font-medium truncate">{p.title}</p><p className="text-[10px] text-[#AE2448]">${p.price}</p></div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Mobile Icon */}
              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="md:hidden p-1.5 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <FiSearch className="text-base sm:text-xl text-gray-600 dark:text-gray-300" />
              </button>

              {/* Wishlist */}
              <Link to="/wishlist" className="hidden sm:flex p-1.5 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"><FiHeart className="text-base sm:text-xl text-gray-600 dark:text-gray-300 hover:text-[#AE2448]" /></Link>

              {/* Cart */}
              <Link to="/cart" className="relative p-1.5 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <FiShoppingCart className="text-base sm:text-xl text-gray-600 dark:text-gray-300 hover:text-[#AE2448]" />
                {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-[#AE2448] text-white text-[10px] rounded-full flex items-center justify-center px-1 shadow-md">{cartCount > 99 ? "99+" : cartCount}</span>}
              </Link>

              {/* Theme Toggle */}
              <button onClick={toggleTheme} className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                {theme === "dark" ? <FiSun className="text-base sm:text-xl text-yellow-500" /> : <FiMoon className="text-base sm:text-xl text-gray-600" />}
              </button>

              {/* User Dropdown */}
              <div className="relative" ref={dropdownRef}>
                {isAuthenticated && user ? (
                  <>
                    <button onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} className="flex items-center gap-1 sm:gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                      {user.avatar ? <img src={user.avatar} className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full object-cover border border-[#AE2448]" /> : <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-[#AE2448] to-[#6E1A37] rounded-full flex items-center justify-center"><FiUser className="text-white text-xs sm:text-sm" /></div>}
                      <span className="hidden md:inline text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">{user.name?.split(' ')[0] || user.email?.split('@')[0]}</span>
                    </button>
                    {isUserDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                        <div className="p-2 sm:p-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2 sm:gap-3">
                          {user.avatar ? <img src={user.avatar} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover" /> : <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#AE2448] to-[#6E1A37] rounded-full flex items-center justify-center"><FiUser className="text-white text-sm sm:text-base" /></div>}
                          <div><p className="font-semibold text-gray-800 dark:text-white text-xs sm:text-sm truncate">{user.name}</p><p className="text-[10px] sm:text-xs text-gray-500 truncate">{user.email}</p></div>
                        </div>
                        <div className="py-1 sm:py-2">
                          <Link to="/profile" onClick={() => setIsUserDropdownOpen(false)} className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"><FiUserCheck /> Profile</Link>
                          <Link to="/orders" onClick={() => setIsUserDropdownOpen(false)} className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"><FiTag /> Orders</Link>
                          <Link to="/settings" onClick={() => setIsUserDropdownOpen(false)} className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"><FiSettings /> Settings</Link>
                          <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                          <button onClick={handleLogout} className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 text-xs sm:text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"><FiLogOut /> Logout</button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link to="/login" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-[#AE2448] to-[#6E1A37] text-white hover:shadow-md transition-all hover:scale-105 text-xs sm:text-sm"><FiUser /><span className="hidden sm:inline">Sign In</span></Link>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-1.5 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                {isMobileMenuOpen ? <FiX className="text-base sm:text-xl text-gray-600 dark:text-gray-300" /> : <FiMenu className="text-base sm:text-xl text-gray-600 dark:text-gray-300" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Search Bar */}
      <div className={`fixed top-14 left-0 right-0 z-40 backdrop-blur-md bg-white/70 dark:bg-[#1a1a2e]/80 shadow-md p-3 transition-all md:hidden ${isSearchOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <form onSubmit={handleSearch} className="relative">
          <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-3 py-2 pl-8 rounded-full bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:border-[#AE2448] outline-none text-sm" autoFocus />
          <FiSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <button type="button" onClick={() => setIsSearchOpen(false)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><FiX /></button>
        </form>
        {showResults && searchResults.length > 0 && (
          <div className="mt-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto">
            {searchResults.map((p) => (
              <button key={p.id} onClick={() => handleProductClick(p.id)} className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <img src={p.thumbnail} className="w-8 h-8 object-cover rounded" />
                <div className="flex-1 text-left"><p className="text-xs font-medium truncate">{p.title}</p><p className="text-[10px] text-[#AE2448]">${p.price}</p></div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="h-14 sm:h-16 md:h-20"></div>

      {/* Mobile Menu */}
      <div className={`fixed top-14 sm:top-16 left-0 right-0 backdrop-blur-md bg-white/95 dark:bg-[#1a1a2e]/95 shadow-xl z-40 md:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? "max-h-[calc(100vh-56px)] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="flex flex-col p-4 space-y-2 overflow-y-auto">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-all ${isActive(link.path) ? 'bg-[#AE2448] text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
              {link.icon}<span className="font-medium">{link.name}</span>
            </Link>
          ))}
          <hr className="border-gray-200 dark:border-gray-700" />
          <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-all ${isActive('/wishlist') ? 'bg-[#AE2448] text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}><FiHeart /> Wishlist</Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-all ${isActive('/profile') ? 'bg-[#AE2448] text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}><FiUserCheck /> Profile</Link>
              <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 py-3 px-4 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"><FiLogOut /> Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-3 px-4 rounded-xl bg-gradient-to-r from-[#AE2448] to-[#6E1A37] text-white"><FiUser /> Sign In</Link>
          )}
        </div>
      </div>
    </>
  );
}