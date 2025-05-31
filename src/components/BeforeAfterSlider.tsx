'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
// import { comparisonProjects } from '@/data/projects'

export default function BeforeAfterSlider() {
  // Since we don't have comparison projects yet, we'll return null
  return null

  // Keep the code commented for future use
  /*
  const [sliderPosition, setSliderPosition] = useState(50)
  const [activeProject, setActiveProject] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    setSliderPosition(Math.min(Math.max(x, 0), 100))
  }

  return (
    <section className="py-20 bg-secondary-light dark:bg-secondary overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-6">
            Before & After
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            See the transformation from raw footage to polished content
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-video rounded-2xl overflow-hidden bg-black"
            ref={containerRef}
            onMouseMove={handleMouseMove}
          >
            {/* Before Video *//*}
            <div className="absolute inset-0">
              <video
                src={comparisonProjects[activeProject].beforeVideo}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>

            {/* After Video *//*}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <video
                src={comparisonProjects[activeProject].afterVideo}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                style={{ width: `${100 / (sliderPosition / 100)}%` }}
              />
            </div>

            {/* Slider *//*}
            <div
              className="absolute inset-y-0"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute inset-y-0 -left-px w-0.5 bg-white" />
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab">
                <div className="w-1 h-4 bg-gray-800 rounded-full" />
              </div>
            </div>
          </motion.div>

          <div className="mt-8 text-center">
            <h3 className="text-2xl font-semibold text-primary dark:text-white mb-3">
              {comparisonProjects[activeProject].title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {comparisonProjects[activeProject].description}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {comparisonProjects[activeProject].tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
  */
} 