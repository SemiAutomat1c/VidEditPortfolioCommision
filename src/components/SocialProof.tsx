'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  TiktokIcon,
  InstagramIcon,
  YoutubeIcon
} from '@/components/SocialIcons'

const socialStats = [
  {
    platform: 'TikTok',
    icon: TiktokIcon,
    followers: '100K+',
    views: '50M+',
    color: 'from-pink-500 to-purple-500'
  },
  {
    platform: 'Instagram',
    icon: InstagramIcon,
    followers: '50K+',
    views: '20M+',
    color: 'from-purple-500 to-pink-500'
  },
  {
    platform: 'YouTube',
    icon: YoutubeIcon,
    followers: '25K+',
    views: '10M+',
    color: 'from-red-500 to-orange-500'
  }
]

const testimonials = [
  {
    name: 'Sarah Chen',
    handle: '@dancewithsarah',
    platform: 'TikTok',
    avatar: '/testimonials/sarah.jpg',
    text: 'The transitions are mind-blowing! My engagement doubled after switching to this editing style.',
    stats: '2.5M+ Views'
  },
  {
    name: 'Mike Rodriguez',
    handle: '@mike.creates',
    platform: 'Instagram',
    avatar: '/testimonials/mike.jpg',
    text: 'Professional, creative, and always on trend. Helped me grow my account from 10K to 100K!',
    stats: '500K+ Likes'
  },
  {
    name: 'Alex Gaming',
    handle: '@alexgaming',
    platform: 'YouTube',
    avatar: '/testimonials/alex.jpg',
    text: 'The editing quality is insane! My shorts are performing better than ever.',
    stats: '1M+ Views'
  }
]

export default function SocialProof() {
  return (
    <section className="py-20 bg-primary-light dark:bg-primary overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-6">
            Social Impact
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Creating content that reaches millions and helps creators grow their audience
          </p>
        </motion.div>

        {/* Social Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {socialStats.map((platform) => (
            <motion.div
              key={platform.platform}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative group"
            >
              <div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl p-6 text-center">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${platform.color} p-4 mb-6`}>
                  <platform.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-primary dark:text-white mb-2">
                  {platform.platform}
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-400">
                    Followers: <span className="font-semibold text-accent">{platform.followers}</span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Views: <span className="font-semibold text-accent">{platform.views}</span>
                  </p>
                </div>
              </div>
              <div
                className={`absolute inset-0 bg-gradient-to-r ${platform.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.handle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 relative"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-primary dark:text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-accent">
                    {testimonial.handle}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                "{testimonial.text}"
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-accent font-semibold">
                  {testimonial.platform}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  {testimonial.stats}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 