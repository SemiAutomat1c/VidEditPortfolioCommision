'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PlayIcon } from '@heroicons/react/24/solid'

const projects = [
  {
    id: 1,
    title: "Star Atlas Game Trailer",
    category: "Game Trailer",
    thumbnail: "/project1.jpg",
    videoUrl: "#",
  },
  {
    id: 2,
    title: "The Little Mermaid",
    category: "Film",
    thumbnail: "/project2.jpg",
    videoUrl: "#",
  },
  {
    id: 3,
    title: "Digital Art Collection",
    category: "Animation",
    thumbnail: "/project3.jpg",
    videoUrl: "#",
  },
  {
    id: 4,
    title: "Meta Quest Prisms",
    category: "VR Experience",
    thumbnail: "/project4.jpg",
    videoUrl: "#",
  },
  {
    id: 5,
    title: "Lion King 360°",
    category: "360° Video",
    thumbnail: "/project5.jpg",
    videoUrl: "#",
  },
  {
    id: 6,
    title: "Xenosphere",
    category: "Game Trailer",
    thumbnail: "/project6.jpg",
    videoUrl: "#",
  },
]

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section id="portfolio" className="py-20 bg-primary-light dark:bg-primary">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-12"
        >
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="relative aspect-video group cursor-pointer"
              onHoverStart={() => setHoveredId(project.id)}
              onHoverEnd={() => setHoveredId(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Placeholder for thumbnail */}
              <div className="absolute inset-0 bg-gray-light dark:bg-gray-dark rounded-lg overflow-hidden">
                <motion.div
                  className="w-full h-full bg-gradient-to-b from-gray-light/20 to-gray-light dark:from-gray-dark/20 dark:to-gray-dark"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Project Info */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-xl font-semibold text-primary dark:text-white mb-2">{project.title}</h3>
                <p className="text-gray-dark dark:text-gray-light text-sm mb-3">{project.category}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-fit px-4 py-2 bg-accent hover:bg-accent-light text-white rounded-lg flex items-center gap-2 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <PlayIcon className="h-4 w-4" />
                  <span>Watch</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 