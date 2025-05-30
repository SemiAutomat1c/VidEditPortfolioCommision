'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import ClientWrapper from '@/components/ClientWrapper'
import Projects from '@/components/ProjectGrid'
import FeaturedProject from '@/components/FeaturedProject'
import AnimatedBackground from '@/components/AnimatedBackground'
import { ArrowDownIcon } from '@heroicons/react/24/outline'

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // or a loading state
  }

  return (
    <ClientWrapper>
      <AnimatedBackground />
      <main className="bg-primary-light dark:bg-primary text-primary dark:text-white relative">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center relative overflow-hidden">
          <div className="container mx-auto px-4 relative">
            {/* Hero Content */}
            <div className="mt-20">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="absolute -top-20 left-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl"
                  />
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="absolute -top-10 right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl"
                  />
                  <div className="relative z-10">
                    <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold mb-8 tracking-tight">
                      <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="block text-primary dark:text-white"
                      >
                        Let's Work
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="block text-accent"
                      >
                        Together
                      </motion.span>
                    </h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="text-xl md:text-2xl text-gray-light-light dark:text-gray-light max-w-2xl mb-12"
                    >
                      Ready to bring your vision to life? Get in touch and let's create something amazing.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      className="flex gap-6"
                    >
                      <Link href="#portfolio">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-8 py-4 bg-accent text-white rounded-lg font-medium hover:bg-accent-light transition-colors"
                        >
                          View Portfolio
                        </motion.button>
                      </Link>
                      <Link href="#contact">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-8 py-4 border border-accent/50 text-accent rounded-lg font-medium hover:bg-accent/10 transition-colors"
                        >
                          Contact Me
                        </motion.button>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-32 pt-12"
            >
              {[
                { number: '5+', label: 'Years Experience' },
                { number: '100+', label: 'Projects Completed' },
                { number: '50+', label: 'Happy Clients' },
                { number: '15+', label: 'Awards Won' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-accent mb-2">{stat.number}</div>
                  <div className="text-gray-light-light dark:text-gray-light">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            >
              <div className="text-gray-light-light dark:text-gray-light text-sm mb-2">Scroll Down</div>
              <ArrowDownIcon className="h-6 w-6 text-accent animate-bounce" />
            </motion.div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio">
          {/* Featured Project */}
          <FeaturedProject />

          {/* Projects Grid */}
          <Projects />
        </section>

        {/* Services Section */}
        <Services />

        {/* Contact Section */}
        <Contact />
      </main>
    </ClientWrapper>
  )
} 