import { useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'
import toast from 'react-hot-toast'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      toast.success('Message sent successfully!', { icon: '📧' })
      setFormData({ name: '', email: '', message: '' })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="container-custom py-12 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
          Contact <span className="text-brand-roseDark">Us</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300">We'd love to hear from you</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-brand-roseDark outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-brand-roseDark outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Message</label>
              <textarea
                rows="4"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-brand-roseDark outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              <FiSend /> {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center gap-4">
            <FiMail className="text-3xl text-brand-roseDark" />
            <div>
              <h3 className="font-bold">Email Us</h3>
              <p className="text-gray-500">support@nexcart.com</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center gap-4">
            <FiPhone className="text-3xl text-brand-roseDark" />
            <div>
              <h3 className="font-bold">Call Us</h3>
              <p className="text-gray-500">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center gap-4">
            <FiMapPin className="text-3xl text-brand-roseDark" />
            <div>
              <h3 className="font-bold">Visit Us</h3>
              <p className="text-gray-500">123 Shopping St, New York, NY 10001</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact