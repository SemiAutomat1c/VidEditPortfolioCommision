'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PlayIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

const projects = [
  {
    id: 1,
    title: "Cinematic Nature Documentary",
    category: "Documentary",
    description: "An immersive journey through breathtaking landscapes.",
    videoUrl: "/videos/8100336-uhd_4096_2160_25fps.mp4",
  },
  {
    id: 2,
    title: "Urban Life Timelapse",
    category: "Timelapse",
    description: "Dynamic city life through mesmerizing sequences.",
    videoUrl: "/videos/8100337-uhd_4096_2160_25fps.mp4",
  },
  {
    id: 3,
    title: "Product Showcase",
    category: "Commercial",
    description: "Elegant product demonstration video.",
    videoUrl: "/videos/1536315-hd_1920_1080_30fps.mp4",
  },
  {
    id: 4,
    title: "Corporate Overview",
    category: "Corporate",
    description: "Professional corporate presentation video.",
    videoUrl: "/videos/1536322-hd_1920_1080_30fps.mp4",
  },
  {
    id: 5,
    title: "Event Highlights",
    category: "Event",
    description: "Dynamic coverage of major events.",
    videoUrl: "/videos/4285872-hd_1920_1080_30fps.mp4",
  }
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
              <Link href={`/projects/${project.id}`}>
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <video
                    src={project.videoUrl}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause()
                      e.currentTarget.currentTime = 0
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                      <p className="text-gray-200 text-sm mb-3">{project.category}</p>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-fit px-4 py-2 bg-accent hover:bg-accent-light text-white rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <PlayIcon className="h-4 w-4" />
                        <span>Watch</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 