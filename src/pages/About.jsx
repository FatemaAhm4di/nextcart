import { Link } from "react-router-dom";
import { FiArrowRight, FiAward, FiUsers, FiTruck, FiShield, FiHeart, FiStar } from "react-icons/fi";
import aboutImage from "../assets/images/about.jpg";

const About = () => {
  const stats = [
    { value: "5000+", label: "Happy Customers", icon: <FiUsers className="text-3xl" /> },
    { value: "200+", label: "Products", icon: <FiStar className="text-3xl" /> },
    { value: "50+", label: "Brands", icon: <FiAward className="text-3xl" /> },
    { value: "30+", label: "Countries", icon: <FiTruck className="text-3xl" /> },
  ];

  const values = [
    { title: "Quality First", desc: "We never compromise on quality. Every product is carefully selected.", icon: <FiAward /> },
    { title: "Customer Centric", desc: "Your satisfaction is our top priority. We're here 24/7.", icon: <FiUsers /> },
    { title: "Fast Delivery", desc: "Free shipping on orders over $50. Get your items in 3-5 days.", icon: <FiTruck /> },
    { title: "Secure Shopping", desc: "Your data is protected with 256-bit SSL encryption.", icon: <FiShield /> },
  ];

  const team = [
    { name: "Sarah Johnson", role: "CEO & Founder", image: "https://randomuser.me/api/portraits/women/68.jpg" },
    { name: "Michael Chen", role: "Head of Product", image: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Emily Rodriguez", role: "Customer Success", image: "https://randomuser.me/api/portraits/women/45.jpg" },
    { name: "David Kim", role: "Tech Lead", image: "https://randomuser.me/api/portraits/men/91.jpg" },
  ];

  return (
    <div className="min-h-screen bg-[#D5E7B5] dark:bg-[#1a1a2e]">
      
      {/* Hero Section - بدون فاصله از ناوبار */}
      <section className="relative bg-gradient-to-r from-[#AE2448] to-[#6E1A37] py-12 sm:py-16 md:py-20">
        <div className="container-custom text-center text-white px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            About <span className="text-[#F9D0CD]">NexCart</span>
          </h1>
          <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Your premier destination for quality products and exceptional shopping experience.
          </p>
        </div>
      </section>

      {/* Story Section - با تصویر about.jpg */}
      <section className="container-custom py-12 md:py-20 px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          <div className="lg:w-1/2">
            <div className="rounded-2xl shadow-2xl overflow-hidden">
              <img 
                src={aboutImage}
                alt="About NexCart"
                className="w-full h-64 sm:h-80 md:h-96 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          <div className="lg:w-1/2">
            <span className="text-[#AE2448] font-semibold text-sm uppercase tracking-wider">Our Story</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3A2B] dark:text-white mt-2 mb-4">
              Born from a passion for <span className="text-[#AE2448]">quality</span>
            </h2>
            <p className="text-[#2D3A2B]/70 dark:text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
              Founded in 2024, NexCart emerged with a simple yet powerful vision: 
              to revolutionize online shopping by offering premium products at accessible prices.
            </p>
            <p className="text-[#2D3A2B]/70 dark:text-gray-300 leading-relaxed mb-6 text-sm sm:text-base">
              Today, we're proud to serve thousands of customers worldwide, carefully curating 
              products that blend style, functionality, and value.
            </p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-[#AE2448] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-[#6E1A37] transition-all hover:scale-105">
              Explore Products <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section - ریسپانسیو */}
      <section className="bg-white dark:bg-[#2a2a2a] py-10 md:py-16">
        <div className="container-custom px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-[#AE2448] mb-2 md:mb-3 flex justify-center">{stat.icon}</div>
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D3A2B] dark:text-white">{stat.value}</div>
                <div className="text-xs sm:text-sm text-[#2D3A2B]/60 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section - ریسپانسیو */}
      <section className="container-custom py-12 md:py-20 px-4">
        <div className="text-center mb-8 md:mb-14">
          <span className="text-[#AE2448] font-semibold text-sm uppercase tracking-wider">Our Values</span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D3A2B] dark:text-white mt-2">What makes us different</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white dark:bg-[#2a2a2a] p-5 md:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#AE2448]/10 flex items-center justify-center mb-3 md:mb-4 text-[#AE2448] text-base md:text-xl">
                {value.icon}
              </div>
              <h3 className="text-base md:text-lg font-bold text-[#2D3A2B] dark:text-white mb-1 md:mb-2">{value.title}</h3>
              <p className="text-xs md:text-sm text-[#2D3A2B]/60 dark:text-gray-400">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section - ریسپانسیو */}
      <section className="bg-white dark:bg-[#2a2a2a] py-12 md:py-20">
        <div className="container-custom px-4">
          <div className="text-center mb-8 md:mb-14">
            <span className="text-[#AE2448] font-semibold text-sm uppercase tracking-wider">Leadership</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3A2B] dark:text-white mt-2">Meet our team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden mb-3 md:mb-4 ring-4 ring-[#AE2448]/20 group-hover:ring-[#AE2448] transition-all">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-[#2D3A2B] dark:text-white text-sm sm:text-base">{member.name}</h3>
                <p className="text-xs sm:text-sm text-[#2D3A2B]/60 dark:text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - ریسپانسیو */}
      <section className="container-custom py-12 md:py-20 px-4">
        <div className="bg-gradient-to-r from-[#AE2448] to-[#6E1A37] rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 text-center text-white">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3">Ready to start shopping?</h3>
          <p className="text-white/80 text-sm sm:text-base mb-5 md:mb-6 max-w-md mx-auto">Join thousands of happy customers who trust NexCart</p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-white text-[#AE2448] px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold text-sm sm:text-base hover:shadow-xl transition-all hover:scale-105">
            Shop Now <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;