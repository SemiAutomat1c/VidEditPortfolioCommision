'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlayIcon, PauseIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

const projects = [
  {
    id: 1,
    title: "Cinematic Travel Documentary",
    description: "A visually stunning travel documentary showcasing breathtaking landscapes and cultural experiences.",
    category: "Documentary",
    thumbnail: "/project1.jpg",
    videoUrl: "#",
  },
  {
    id: 2,
    title: "Commercial Brand Campaign",
    description: "High-energy commercial edit with dynamic transitions and compelling storytelling.",
    category: "Commercial",
    thumbnail: "/project2.jpg",
    videoUrl: "#",
  },
  {
    id: 3,
    title: "Music Video Production",
    description: "Creative music video with synchronized cuts, effects, and artistic direction.",
    category: "Music Video",
    thumbnail: "/project3.jpg",
    videoUrl: "#",
  },
]

export default function ProjectShowcase() {
  const [currentProject, setCurrentProject] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  if (!mounted) {
    return null
  }

  return (
    <section id="portfolio" className="section bg-primary/50 min-h-screen flex items-center">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Featured Projects
        </motion.h2>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-video rounded-xl overflow-hidden group"
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
              <div className="absolute inset-0 bg-gray-800 overflow-hidden">
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full relative"
                >
                  {/* Placeholder div - replace with actual images/videos */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary" />
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-0 left-0 right-0 p-8 z-20"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  className="text-sm uppercase tracking-wider"
                >
                  {projects[currentProject].category}
                </motion.span>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-bold mt-2"
                >
                  {projects[currentProject].title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-gray-300 mt-2 max-w-2xl"
                >
                  {projects[currentProject].description}
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center z-30 bg-black/40"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-accent rounded-full p-4 hover:bg-accent/90 transition-colors"
                >
                  <PlayIcon className="h-8 w-8 text-white" />
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between z-30">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevProject}
              className="bg-white/10 backdrop-blur-sm rounded-full p-3 hover:bg-white/20 transition-colors"
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextProject}
              className="bg-white/10 backdrop-blur-sm rounded-full p-3 hover:bg-white/20 transition-colors"
            >
              <ArrowRightIcon className="h-6 w-6" />
            </motion.button>
          </div>
        </div>

        {/* Project Timeline */}
        <div className="mt-8 flex justify-center gap-2">
          {projects.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentProject(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentProject ? 'w-8 bg-accent' : 'w-4 bg-white/20'
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 