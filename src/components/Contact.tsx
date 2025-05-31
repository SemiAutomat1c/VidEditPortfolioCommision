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
import {
  InstagramIcon,
  VimeoIcon,
  LinkedInIcon,
  YoutubeIcon,
} from '@/components/icons/SocialIcons'

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
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Let's Work Together
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Ready to bring your project to life? Let's discuss how we can work together.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Contact Info */}
          <div className="w-full md:w-1/3">
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Get in Touch
              </h3>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <EnvelopeIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Email</p>
                    <p className="text-gray-900 dark:text-white">your.email@example.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <PhoneIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Phone</p>
                    <p className="text-gray-900 dark:text-white">+1 (234) 567-8900</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <MapPinIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Location</p>
                    <p className="text-gray-900 dark:text-white">New York City, NY</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Follow Me
                </h3>
                <div className="flex gap-4">
                  <a 
                    href="#" 
                    className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                  >
                    <InstagramIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                  >
                    <VimeoIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                  >
                    <LinkedInIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                  >
                    <YoutubeIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full md:w-2/3">
            <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors text-gray-900 dark:text-white"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors text-gray-900 dark:text-white"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors text-gray-900 dark:text-white"
                    placeholder="Your message"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-medium transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 