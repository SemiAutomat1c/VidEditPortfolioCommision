'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'
import {
  FaInstagram,
  FaVimeoV,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa'

const socialLinks = [
  {
    name: 'Instagram',
    icon: FaInstagram,
    url: '#',
    color: 'hover:text-[#E4405F]'
  },
  {
    name: 'Vimeo',
    icon: FaVimeoV,
    url: '#',
    color: 'hover:text-[#1AB7EA]'
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedinIn,
    url: '#',
    color: 'hover:text-[#0A66C2]'
  },
  {
    name: 'YouTube',
    icon: FaYoutube,
    url: '#',
    color: 'hover:text-[#FF0000]'
  },
]

type FormData = {
  name: string;
  email: string;
  message: string;
}

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = () => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }
      
      setIsSuccess(true)
      setFormData({ name: '', email: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    } catch (error) {
      setErrors({ 
        message: error instanceof Error ? error.message : 'Failed to send message. Please try again.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-secondary-light dark:bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-4">Let's Work Together</h2>
          <p className="text-xl text-gray-light-light dark:text-gray-light max-w-2xl mx-auto">
            Ready to bring your project to life? Let's discuss how we can work together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-primary dark:text-white mb-6">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-dark-light dark:bg-gray-dark p-3 rounded-lg">
                    <EnvelopeIcon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-gray-light-light dark:text-gray-light text-sm">Email</p>
                    <a href="mailto:your.email@example.com" className="text-primary dark:text-white hover:text-accent transition-colors">
                      your.email@example.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-dark-light dark:bg-gray-dark p-3 rounded-lg">
                    <PhoneIcon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-gray-light-light dark:text-gray-light text-sm">Phone</p>
                    <a href="tel:+12345678900" className="text-primary dark:text-white hover:text-accent transition-colors">
                      +1 (234) 567-8900
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-dark-light dark:bg-gray-dark p-3 rounded-lg">
                    <MapPinIcon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-gray-light-light dark:text-gray-light text-sm">Location</p>
                    <p className="text-primary dark:text-white">New York City, NY</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-primary dark:text-white mb-6">Follow Me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-gray-dark-light dark:bg-gray-dark p-4 rounded-lg text-gray-light-light dark:text-gray-light ${social.color} transition-colors`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="bg-gray-dark-light dark:bg-gray-dark p-8 rounded-2xl space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-light-light dark:text-gray-light">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-primary-light dark:bg-primary border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary dark:text-white ${
                  errors.name ? 'border-red-500' : 'border-transparent'
                }`}
                required
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-light-light dark:text-gray-light">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-primary-light dark:bg-primary border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary dark:text-white ${
                  errors.email ? 'border-red-500' : 'border-transparent'
                }`}
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-light-light dark:text-gray-light">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-3 bg-primary-light dark:bg-primary border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary dark:text-white resize-none ${
                  errors.message ? 'border-red-500' : 'border-transparent'
                }`}
                required
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message}</p>
              )}
            </div>

            <div className="relative">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full px-8 py-4 bg-accent hover:bg-accent-light text-white rounded-lg font-medium transition-colors ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>

              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-12 left-0 right-0 flex items-center justify-center text-green-500 gap-2"
                >
                  <CheckCircleIcon className="h-5 w-5" />
                  <span>Message sent successfully!</span>
                </motion.div>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
} 