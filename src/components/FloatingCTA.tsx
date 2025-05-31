'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TiktokIcon,
  InstagramIcon,
  YoutubeIcon
} from '@/components/SocialIcons'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface ProjectType {
  name: string
  basePrice: number
  description: string
}

const projectTypes: ProjectType[] = [
  {
    name: 'TikTok/Reels',
    basePrice: 150,
    description: 'Short-form vertical video editing'
  },
  {
    name: 'YouTube Shorts',
    basePrice: 200,
    description: 'Engaging shorts optimized for YouTube'
  },
  {
    name: 'Instagram Stories',
    basePrice: 100,
    description: 'Story sequence with transitions'
  }
]

const socialLinks = [
  {
    name: 'TikTok',
    icon: TiktokIcon,
    url: 'https://tiktok.com/@yourusername'
  },
  {
    name: 'Instagram',
    icon: InstagramIcon,
    url: 'https://instagram.com/yourusername'
  },
  {
    name: 'YouTube',
    icon: YoutubeIcon,
    url: 'https://youtube.com/@yourusername'
  }
]

export default function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<ProjectType>(projectTypes[0])
  const [videoCount, setVideoCount] = useState(1)

  const calculatePrice = () => {
    return selectedType.basePrice * videoCount
  }

  return (
    <>
      {/* Floating Button - Moved to the left of scroll-to-top */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-24 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="font-medium">Get Quote</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-2xl p-6 z-50 max-h-[90vh] overflow-y-auto"
            >
              <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-primary dark:text-white">
                    Quick Quote
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                {/* Project Type Selection */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project Type
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {projectTypes.map((type) => (
                      <button
                        key={type.name}
                        onClick={() => setSelectedType(type)}
                        className={`p-4 rounded-lg border-2 text-left transition-colors ${
                          selectedType.name === type.name
                            ? 'border-accent bg-accent/5'
                            : 'border-gray-200 dark:border-gray-700 hover:border-accent/50'
                        }`}
                      >
                        <div className="font-medium text-primary dark:text-white mb-1">
                          {type.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {type.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Video Count */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Number of Videos
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={videoCount}
                    onChange={(e) => setVideoCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-primary dark:text-white"
                  />
                </div>

                {/* Price Display */}
                <div className="mb-8 text-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Estimated Price
                  </div>
                  <div className="text-4xl font-bold text-primary dark:text-white">
                    ${calculatePrice()}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4">
                  <a
                    href="https://calendly.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-accent hover:bg-accent/90 text-white py-3 rounded-lg text-center font-medium"
                  >
                    Book a Call
                  </a>
                  
                  {/* Social Links */}
                  <div className="flex justify-center gap-6">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-accent dark:text-gray-400 dark:hover:text-accent"
                      >
                        <social.icon className="w-6 h-6" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
} 