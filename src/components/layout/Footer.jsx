import { Link } from 'react-router-dom'
import { 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiGithub, 
  FiMail, 
  FiPhone, 
  FiMapPin,
  FiHeart,
  FiShoppingBag,
  FiTruck,
  FiShield,
  FiRefreshCw
} from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  const customerService = [
    { name: 'FAQ', path: '/faq' },
    { name: 'Shipping Policy', path: '/shipping' },
    { name: 'Returns & Exchanges', path: '/returns' },
    { name: 'Privacy Policy', path: '/privacy' },
  ]

  const features = [
    { icon: <FiTruck className="text-2xl" />, title: 'Free Shipping', desc: 'On orders over $50' },
    { icon: <FiShield className="text-2xl" />, title: 'Secure Payment', desc: '100% secure transactions' },
    { icon: <FiRefreshCw className="text-2xl" />, title: 'Easy Returns', desc: '30-day return policy' },
    { icon: <FiShoppingBag className="text-2xl" />, title: 'Best Prices', desc: 'Price match guarantee' },
  ]

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 mt-16">
      {/* ویژگی‌ها */}
      <div className="border-b border-gray-800">
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="text-brand-roseDark">{feature.icon}</div>
                <div>
                  <h4 className="font-semibold text-white">{feature.title}</h4>
                  <p className="text-sm text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* بخش اصلی فوتر */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* برند */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-roseDark to-brand-roseMedium rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold text-white">NexCart</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Your premier destination for quality products and exceptional shopping experience.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-brand-roseDark transition-colors duration-300">
                <FiFacebook className="text-sm" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-brand-roseDark transition-colors duration-300">
                <FiTwitter className="text-sm" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-brand-roseDark transition-colors duration-300">
                <FiInstagram className="text-sm" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-brand-roseDark transition-colors duration-300">
                <FiGithub className="text-sm" />
              </a>
            </div>
          </div>

          {/* لینک‌های سریع */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-brand-roseDark transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* خدمات مشتریان */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              {customerService.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-brand-roseDark transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* اطلاعات تماس */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <FiMapPin className="text-brand-roseDark" />
                123 Shopping Street, NY 10001
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <FiPhone className="text-brand-roseDark" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <FiMail className="text-brand-roseDark" />
                support@nexcart.com
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* کپی رایت */}
      <div className="border-t border-gray-800 py-6">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>
              &copy; {currentYear} NexCart. All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              Made with <FiHeart className="text-brand-roseDark text-xs" /> by NexCart Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer