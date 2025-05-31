'use client'

import { motion } from 'framer-motion'
import { PlayIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { scrollToElement } from '@/utils/scroll'

export default function Hero() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, elementId: string) => {
    e.preventDefault()
    scrollToElement(elementId)
  }

  return (
    <section className="min-h-screen relative flex items-center overflow-hidden bg-primary-light dark:bg-primary">
      {/* Background Video Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-6 gap-4 p-4">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="aspect-[9/16] bg-gradient-to-br from-accent-pink via-accent-purple to-accent-blue rounded-xl" />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-accent-pink via-accent-purple to-accent-blue text-transparent bg-clip-text">
              Short-Form Video Editor
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-8">
              Crafting Viral Moments for{' '}
              <span className="text-accent-pink font-semibold">TikTok</span>,{' '}
              <span className="text-accent-purple font-semibold">Reels</span>, and{' '}
              <span className="text-accent-blue font-semibold">YouTube Shorts</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl"
          >
            Specializing in quick-paced edits, seamless transitions, and engaging effects
            that keep your audience watching and sharing.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#portfolio"
              onClick={(e) => handleScroll(e, 'portfolio')}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent-pink via-accent-purple to-accent-blue text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              <PlayIcon className="w-5 h-5 mr-2" />
              View My Work
            </a>
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, 'contact')}
              className="inline-flex items-center px-6 py-3 bg-gray-800/10 dark:bg-white/10 hover:bg-gray-800/20 dark:hover:bg-white/20 text-primary dark:text-white rounded-lg font-medium transition-colors"
            >
              Let's Collaborate
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-accent-pink to-accent-purple text-transparent bg-clip-text mb-2">50M+</h3>
              <p className="text-gray-600 dark:text-gray-400">Total Views</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-accent-purple to-accent-blue text-transparent bg-clip-text mb-2">200+</h3>
              <p className="text-gray-600 dark:text-gray-400">Videos Edited</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-accent-blue to-accent-cyan text-transparent bg-clip-text mb-2">50+</h3>
              <p className="text-gray-600 dark:text-gray-400">Happy Creators</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-accent-cyan to-accent-coral text-transparent bg-clip-text mb-2">15+</h3>
              <p className="text-gray-600 dark:text-gray-400">Viral Hits</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 