import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartTotalQuantity } from '../../features/cart/cartSlice'
// import { useSettings } from '../../hooks/useSettings'
import { 
  FiShoppingCart, 
  FiMenu, 
  FiX, 
  FiUser, 
  FiHome, 
  FiGrid, 
  FiInfo, 
  FiPhone, 
  FiHeart,
  FiLogOut,
  FiSettings,
  FiChevronDown
} from 'react-icons/fi'
import ThemeToggle from '../ui/ThemeToggle'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const cartQuantity = useSelector(selectCartTotalQuantity)
  // const { theme } = useSettings()
  const navigate = useNavigate()
  const location = useLocation()

  // تشخیص اسکرول
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // بستن منو هنگام کلیک خارج
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isUserDropdownOpen && !e.target.closest('.user-dropdown')) {
        setIsUserDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isUserDropdownOpen])

  // لینک‌های اصلی منو
  const navLinks = [
    { name: 'Home', path: '/', icon: <FiHome className="text-lg" /> },
    { name: 'Shop', path: '/shop', icon: <FiGrid className="text-lg" /> },
    { name: 'About', path: '/about', icon: <FiInfo className="text-lg" /> },
    { name: 'Contact', path: '/contact', icon: <FiPhone className="text-lg" /> },
  ]

  // وضعیت فعال بودن لینک
  const isActive = (path) => location.pathname === path

  // فرضی: وضعیت لاگین (بعداً به Redux auth متصل میشه)
  const isLoggedIn = false

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${isScrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl py-3' 
            : 'bg-white dark:bg-gray-900 shadow-lg py-5'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* ========== لوگو ========== */}
            <Link 
              to="/" 
              className="flex items-center gap-2 group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-brand-roseDark rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-9 h-9 bg-gradient-to-br from-brand-roseDark to-brand-roseMedium rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-brand-roseDark to-brand-roseMedium bg-clip-text text-transparent">
                  NexCart
                </span>
                <span className="text-[10px] text-gray-400 -mt-1 hidden sm:block">Premium Store</span>
              </div>
            </Link>

            {/* ========== دسکتاپ منو (md به بالا) ========== */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    relative px-3 lg:px-4 py-2 rounded-full transition-all duration-300
                    flex items-center gap-2 font-medium text-sm lg:text-base
                    ${isActive(link.path)
                      ? 'text-brand-roseDark bg-brand-roseLight/30' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-brand-roseDark dark:hover:text-brand-roseDark hover:bg-brand-roseLight/20'
                    }
                  `}
                >
                  {link.icon}
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-roseDark rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* ========== راست: دکمه‌ها ========== */}
            <div className="flex items-center gap-1 sm:gap-2">
              
              {/* دکمه علاقه‌مندی‌ها */}
              <button
                onClick={() => navigate('/wishlist')}
                className="relative p-2 rounded-full hover:bg-brand-roseLight/50 dark:hover:bg-gray-800 transition-all duration-300 group"
                aria-label="Wishlist"
              >
                <FiHeart className="text-xl text-gray-700 dark:text-gray-300 group-hover:text-brand-roseDark transition-colors" />
              </button>

              {/* دکمه تم */}
              <ThemeToggle />

              {/* دکمه سبد خرید */}
              <button
                onClick={() => navigate('/cart')}
                className="relative p-2 rounded-full hover:bg-brand-roseLight/50 dark:hover:bg-gray-800 transition-all duration-300 group"
                aria-label="Cart"
              >
                <FiShoppingCart className="text-xl text-gray-700 dark:text-gray-300 group-hover:text-brand-roseDark transition-colors" />
                {cartQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-brand-roseDark text-white text-xs rounded-full flex items-center justify-center px-1 animate-pulse">
                    {cartQuantity > 99 ? '99+' : cartQuantity}
                  </span>
                )}
              </button>

              {/* ===== دکمه کاربر / دراپ داون ===== */}
              <div className="relative user-dropdown">
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className="flex items-center gap-2 p-1.5 rounded-full hover:bg-brand-roseLight/50 dark:hover:bg-gray-800 transition-all duration-300"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-brand-roseDark to-brand-roseMedium rounded-full flex items-center justify-center">
                        <FiUser className="text-white text-sm" />
                      </div>
                      <FiChevronDown className={`text-gray-500 transition-transform duration-300 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* دراپ داون منو */}
                    {isUserDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-fade-in">
                        <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                          <p className="font-medium text-gray-800 dark:text-white">John Doe</p>
                          <p className="text-xs text-gray-500">john@example.com</p>
                        </div>
                        <div className="py-2">
                          <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-brand-roseLight/30 flex items-center gap-3 transition-colors">
                            <FiUser /> My Profile
                          </button>
                          <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-brand-roseLight/30 flex items-center gap-3 transition-colors">
                            <FiSettings /> Settings
                          </button>
                          <hr className="my-1 border-gray-100 dark:border-gray-700" />
                          <button className="w-full px-4 py-2 text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-colors">
                            <FiLogOut /> Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => navigate('/login')}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-brand-roseDark to-brand-roseMedium text-white hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <FiUser className="text-sm" />
                    <span className="text-sm font-medium hidden sm:inline">Sign In</span>
                  </button>
                )}
              </div>

              {/* دکمه همبرگر (موبایل) */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-full hover:bg-brand-roseLight/50 dark:hover:bg-gray-800 transition-all duration-300"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <FiX className="text-2xl text-gray-700 dark:text-gray-300" />
                ) : (
                  <FiMenu className="text-2xl text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* اسپیس برای جبران ارتفاع نوار */}
      <div className="h-20 md:h-24"></div>

      {/* ========== منوی موبایل (همبرگر) ========== */}
      <div
        className={`
          fixed top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-2xl z-40 md:hidden
          transition-all duration-400 ease-in-out overflow-hidden
          ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="flex flex-col p-5 space-y-2">
          {/* لینک‌های اصلی */}
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`
                flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-300
                ${isActive(link.path)
                  ? 'bg-brand-roseLight/30 text-brand-roseDark' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-brand-roseLight/20'
                }
              `}
            >
              {link.icon}
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}

          <hr className="my-2 border-gray-200 dark:border-gray-700" />

          {/* لینک‌های اضافی موبایل */}
          <Link
            to="/wishlist"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 py-3 px-4 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-brand-roseLight/20 transition-all duration-300"
          >
            <FiHeart className="text-lg" />
            <span>Wishlist</span>
          </Link>

          {!isLoggedIn && (
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 py-3 px-4 rounded-xl text-brand-roseDark hover:bg-brand-roseLight/20 transition-all duration-300"
            >
              <FiUser className="text-lg" />
              <span>Sign In / Register</span>
            </Link>
          )}

          {/* تنظیمات موبایل */}
          <div className="flex items-center justify-between py-3 px-4">
            <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar