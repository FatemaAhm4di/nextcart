import { Link } from "react-router-dom";
import { 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiGithub, 
  FiLinkedin,
  FiSend,
  FiMail, 
  FiPhone, 
  FiMapPin,
  FiHeart,
  FiShoppingBag,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiAward,
  FiClock
} from "react-icons/fi";
import { toast } from "sonner";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNewsletter = (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    if (email) {
      toast.success("Subscribed to newsletter!", {
        icon: <FiSend className="w-4 h-4" />,
      });
      e.target.reset();
    }
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Wishlist", path: "/wishlist" },
  ];

  const customerService = [
    { name: "FAQ", path: "/faq" },
    { name: "Shipping Policy", path: "/shipping" },
    { name: "Returns & Exchanges", path: "/returns" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
  ];

  const features = [
    { icon: <FiTruck className="text-xl sm:text-2xl" />, title: "Free Shipping", desc: "On orders over $50" },
    { icon: <FiShield className="text-xl sm:text-2xl" />, title: "Secure Payment", desc: "100% secure" },
    { icon: <FiRefreshCw className="text-xl sm:text-2xl" />, title: "Easy Returns", desc: "30-day policy" },
    { icon: <FiAward className="text-xl sm:text-2xl" />, title: "Premium Quality", desc: "Best products" },
  ];

  const socialLinks = [
    { icon: <FiInstagram />, url: "https://www.instagram.com/_fatem4_", color: "hover:bg-[#E4405F]", name: "Instagram" },
    { icon: <FiTwitter />, url: "https://x.com/_Fatema_Ahmadi_", color: "hover:bg-[#000000]", name: "X (Twitter)" },
    { icon: <FiGithub />, url: "https://github.com/FatemaAhm4di", color: "hover:bg-[#333333]", name: "GitHub" },
    { icon: <FiLinkedin />, url: "https://linkedin.com/in/fatema-ahmadi", color: "hover:bg-[#0077B5]", name: "LinkedIn" },
    { icon: <FiSend />, url: "https://t.me/Fatemah_Ahmadi", color: "hover:bg-[#26A5E4]", name: "Telegram" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-950 text-gray-300 mt-auto">
      
      {/* Features Section*/}
      <div className="border-b border-gray-800">
        <div className="container-custom py-8 md:py-12 px-4 sm:px-6">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 md:gap-4 group">
                <div className="text-[#AE2448] group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm md:text-base">{feature.title}</h4>
                  <p className="text-xs text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-custom py-10 md:py-16 px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand & Newsletter */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#AE2448] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold text-white">NextCart</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your premier destination for quality products and exceptional shopping experience.
            </p>
            
            <div className="pt-4">
              <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <FiSend className="text-[#AE2448]" /> Newsletter
              </h5>
              <form onSubmit={handleNewsletter} className="flex flex-col xs:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  className="flex-1 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg xs:rounded-l-lg xs:rounded-r-none focus:outline-none focus:border-[#AE2448] transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#AE2448] hover:bg-[#6E1A37] text-white rounded-lg xs:rounded-l-none xs:rounded-r-lg transition-all duration-300 hover:scale-105 text-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base md:text-lg mb-5 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#AE2448] rounded-full"></span>
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-[#AE2448] transition-colors duration-300 text-xs sm:text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-[#AE2448] group-hover:scale-150 transition-all"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold text-base md:text-lg mb-5 relative inline-block">
              Customer Service
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#AE2448] rounded-full"></span>
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {customerService.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-[#AE2448] transition-colors duration-300 text-xs sm:text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-[#AE2448] group-hover:scale-150 transition-all"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-base md:text-lg mb-5 relative inline-block">
              Contact Info
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#AE2448] rounded-full"></span>
            </h3>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start gap-3 text-xs sm:text-sm text-gray-400 group">
                <FiMapPin className="text-[#AE2448] text-base sm:text-lg mt-0.5 group-hover:scale-110 transition-transform shrink-0" />
                <span>123 Shopping Street, Herat, Afghanistan</span>
              </li>
              <li className="flex items-center gap-3 text-xs sm:text-sm text-gray-400 group">
                <FiPhone className="text-[#AE2448] text-base sm:text-lg group-hover:scale-110 transition-transform shrink-0" />
                <span>+93 700 100 200</span>
              </li>
              <li className="flex items-center gap-3 text-xs sm:text-sm text-gray-400 group">
                <FiMail className="text-[#AE2448] text-base sm:text-lg group-hover:scale-110 transition-transform shrink-0" />
                <span>fatema.ahmadi1384@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-xs sm:text-sm text-gray-400 group">
                <FiClock className="text-[#AE2448] text-base sm:text-lg group-hover:scale-110 transition-transform shrink-0" />
                <span>Mon - Fri: 9AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-2 sm:gap-3 flex-wrap justify-center">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 transition-all duration-300 hover:text-white ${social.color} hover:scale-110`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            <p className="text-[10px] sm:text-xs text-gray-500 text-center">
              &copy; {currentYear} NextCart. All rights reserved.
            </p>
            
            <p className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-1">
              Made with <FiHeart className="text-[#AE2448] text-xs animate-pulse" /> by Fatema Ahmadi
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;