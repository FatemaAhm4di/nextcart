import { FiAward, FiUsers, FiTruck, FiShield } from 'react-icons/fi'

const About = () => {
  const features = [
    { icon: <FiAward className="text-4xl" />, title: 'Premium Quality', desc: 'Best products from top brands' },
    { icon: <FiUsers className="text-4xl" />, title: 'Happy Customers', desc: 'Over 10,000+ satisfied users' },
    { icon: <FiTruck className="text-4xl" />, title: 'Fast Delivery', desc: 'Free shipping on orders $50+' },
    { icon: <FiShield className="text-4xl" />, title: 'Secure Payment', desc: '100% secure transactions' },
  ]

  return (
    <div className="container-custom py-12 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
          About <span className="text-brand-roseDark">NexCart</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Your premier destination for quality products and exceptional shopping experience
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600" 
            alt="Shopping"
            className="rounded-2xl shadow-xl w-full"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Our Story</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            Founded in 2024, NexCart was born from a simple idea: make online shopping easy, 
            enjoyable, and accessible to everyone.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Today, we're proud to serve thousands of customers worldwide, offering carefully 
            curated products at competitive prices.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, index) => (
          <div key={index} className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <div className="text-brand-roseDark mb-3 flex justify-center">{item.icon}</div>
            <h3 className="font-bold text-gray-800 dark:text-white mb-2">{item.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default About