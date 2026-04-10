import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartTotalQuantity } from '../../features/cart/cartSlice'
// import { useSettings } from '../../hooks/useSettings'
import { FiShoppingCart, FiMenu, FiX, FiUser, FiSun, FiMoon } from 'react-icons/fi'
import ThemeToggle from '../ui/ThemeToggle'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const cartQuantity = useSelector(selectCartTotalQuantity)
  const navigate = useNavigate()

  // تشخیص اسکرول برای تغییر استایل نوار
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // لینک‌های منو
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${isScrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg py-3' 
            : 'bg-white dark:bg-gray-900 py-5 shadow-md'
          }
        `}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            
            {/* لوگو */}
            <Link 
              to="/" 
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-brand-roseDark to-brand-roseMedium rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-brand-roseDark to-brand-roseMedium bg-clip-text text-transparent">
                NexCart
              </span>
            </Link>

            {/* دسکتاپ منو */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-700 dark:text-gray-300 hover:text-brand-roseDark dark:hover:text-brand-roseDark transition-colors duration-300 font-medium relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-roseDark transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* راست: دکمه‌ها */}
            <div className="flex items-center gap-3">
              
              {/* دکمه تم */}
              <ThemeToggle />

              {/* دکمه سبد خرید */}
              <button
                onClick={() => navigate('/cart')}
                className="relative p-2 rounded-full hover:bg-brand-roseLight/50 dark:hover:bg-gray-800 transition-all duration-300 group"
              >
                <FiShoppingCart className="text-xl text-gray-700 dark:text-gray-300 group-hover:text-brand-roseDark transition-colors" />
                {cartQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-roseDark text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                    {cartQuantity > 9 ? '9+' : cartQuantity}
                  </span>
                )}
              </button>

              {/* دکمه پروفایل */}
              <button
                className="hidden sm:flex p-2 rounded-full hover:bg-brand-roseLight/50 dark:hover:bg-gray-800 transition-all duration-300"
              >
                <FiUser className="text-xl text-gray-700 dark:text-gray-300 hover:text-brand-roseDark transition-colors" />
              </button>

              {/* دکمه منو موبایل */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-full hover:bg-brand-roseLight/50 dark:hover:bg-gray-800 transition-all duration-300"
              >
                {isMobileMenuOpen ? (
                  <FiX className="text-xl text-gray-700 dark:text-gray-300" />
                ) : (
                  <FiMenu className="text-xl text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* اسپیس برای جبران ارتفاع نوار (برای اینکه محتوا زیر نوار نره) */}
      <div className="h-20"></div>

      {/* منوی موبایل */}
      <div
        className={`
          fixed top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-xl z-40 md:hidden
          transition-all duration-300 overflow-hidden
          ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="flex flex-col p-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 dark:text-gray-300 hover:text-brand-roseDark dark:hover:text-brand-roseDark transition-colors py-2 px-3 rounded-lg hover:bg-brand-roseLight/30"
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-gray-200 dark:border-gray-700" />
          <button
            onClick={() => {
              setIsMobileMenuOpen(false)
              navigate('/profile')
            }}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-brand-roseDark py-2 px-3 rounded-lg hover:bg-brand-roseLight/30"
          >
            <FiUser /> Profile
          </button>
        </div>
      </div>
    </>
  )
}

export default Navbar