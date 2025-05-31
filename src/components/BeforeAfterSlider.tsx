'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { comparisonProjects } from '@/data/projects'

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [activeProject, setActiveProject] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleMouseDown = () => {
    isDragging.current = true
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const percentage = (x / rect.width) * 100
    setSliderPosition(percentage)
  }

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp)
    return () => window.removeEventListener('mouseup', handleMouseUp)
  }, [])

  return (
    <section className="py-20 bg-primary-light dark:bg-primary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-6">
            The Transformation
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Drag the slider to see the before and after of our editing process
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Project Selection */}
          <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
            {comparisonProjects.map((project, index) => (
              <button
                key={project.title}
                onClick={() => setActiveProject(index)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  index === activeProject
                    ? 'bg-accent text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {project.category}
              </button>
            ))}
          </div>

          {/* Comparison Viewer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-video rounded-2xl overflow-hidden bg-black"
            ref={containerRef}
            onMouseMove={handleMouseMove}
          >
            {/* Before Video */}
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

            {/* After Video */}
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

            {/* Slider */}
            <div
              className="absolute top-0 bottom-0"
              style={{ left: `${sliderPosition}%` }}
              onMouseDown={handleMouseDown}
            >
              <div className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-lg" />
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg cursor-ew-resize flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              Before
            </div>
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              After
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
} 