import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all required fields", { icon: <FiAlertCircle className="w-4 h-4" /> });
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.", { 
        icon: <FiCheckCircle className="w-4 h-4 text-green-500" /> 
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    { icon: <FiMapPin className="text-2xl" />, title: "Visit Us", details: "123 Shopping Street, Herat - Afghanistan", extra: "Downtown District" },
    { icon: <FiPhone className="text-2xl" />, title: "Call Us", details: "+93 700 100 200", extra: "Mon-Fri 9AM-6PM" },
    { icon: <FiMail className="text-2xl" />, title: "Email Us", details: "fatema.ahmadi1384@gmail.com", extra: "24/7 response" },
    { icon: <FiClock className="text-2xl" />, title: "Working Hours", details: "Saturday - Wednesday", extra: "9:00 AM - 6:00 PM" },
  ];

  return (
    <div className="min-h-screen bg-[#D5E7B5] dark:bg-[#1a1a2e]">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#AE2448] to-[#6E1A37] py-16 md:py-24">
        <div className="container-custom text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Contact <span className="text-[#F9D0CD]">Us</span></h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">We'd love to hear from you. Get in touch with our team.</p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container-custom py-12 md:py-16 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item, index) => (
            <div key={index} className="bg-white dark:bg-[#2a2a2a] p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="w-12 h-12 rounded-full bg-[#AE2448]/10 flex items-center justify-center mx-auto mb-4 text-[#AE2448]">
                {item.icon}
              </div>
              <h3 className="font-bold text-[#2D3A2B] dark:text-white mb-1">{item.title}</h3>
              <p className="text-sm text-[#2D3A2B]/70 dark:text-gray-300">{item.details}</p>
              {item.extra && <p className="text-xs text-[#2D3A2B]/50 dark:text-gray-400 mt-1">{item.extra}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="container-custom pb-16 md:pb-24 px-4">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          
          {/* Form */}
          <div className="lg:w-1/2">
            <div className="bg-white dark:bg-[#2a2a2a] rounded-2xl shadow-xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-[#2D3A2B] dark:text-white mb-2">Send us a message</h3>
              <p className="text-sm text-[#2D3A2B]/60 dark:text-gray-400 mb-6">Fill out the form below and we'll respond asap.</p>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#2D3A2B] dark:text-gray-300 mb-1">Your Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-[#AE2448] focus:ring-2 focus:ring-[#AE2448]/20 outline-none transition" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D3A2B] dark:text-gray-300 mb-1">Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-[#a21f42] focus:ring-2 focus:ring-[#AE2448]/20 outline-none transition" placeholder="Your email" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D3A2B] dark:text-gray-300 mb-1">Subject</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-[#AE2448] focus:ring-2 focus:ring-[#AE2448]/20 outline-none transition" placeholder="Order inquiry" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D3A2B] dark:text-gray-300 mb-1">Message *</label>
                  <textarea name="message" rows="4" value={formData.message} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-[#AE2448] focus:ring-2 focus:ring-[#AE2448]/20 outline-none transition resize-none" placeholder="Tell us how we can help..."></textarea>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-[#AE2448] hover:bg-[#6E1A37] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 disabled:opacity-70">
                  {isSubmitting ? "Sending..." : <><FiSend /> Send Message</>}
                </button>
              </form>
            </div>
          </div>

          {/* Map */}
          <div className="lg:w-1/2">
            <div className="bg-white dark:bg-[#2a2a2a] rounded-2xl shadow-xl p-6 md:p-8 h-full">
              <h3 className="text-xl md:text-2xl font-bold text-[#2D3A2B] dark:text-white mb-2">Visit our store</h3>
              <p className="text-sm text-[#2D3A2B]/60 dark:text-gray-400 mb-6">Come say hello at our flagship location.</p>
              <div className="rounded-xl overflow-hidden h-64 md:h-80">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3255.834601954786!2d62.19183607453209!3d34.35209285521738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f9c4a8b7c5e6f8d%3A0x8e9f7c6b5a4d3e2f!2sHerat%2C%20Afghanistan!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  className="w-full h-full" 
                  allowFullScreen="" 
                  loading="lazy" 
                  title="Herat, Afghanistan Location Map"
                ></iframe>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-[#2D3A2B]/70 dark:text-gray-300">
                <FiMapPin className="text-[#AE2448]" />
                <span>123 Shopping Street, Herat - Afghanistan</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;