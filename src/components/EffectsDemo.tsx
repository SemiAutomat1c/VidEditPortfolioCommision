'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Effect {
  name: string
  description: string
  beforeImage: string
  afterImage: string
  category: string
}

const effects: Effect[] = [
  {
    name: 'Glitch Transition',
    description: 'A dynamic glitch effect perfect for high-energy transitions',
    beforeImage: '/effects/glitch-before.jpg',
    afterImage: '/effects/glitch-after.jpg',
    category: 'Transitions'
  },
  {
    name: 'Color Pop',
    description: 'Selective color enhancement to make your subject stand out',
    beforeImage: '/effects/color-before.jpg',
    afterImage: '/effects/color-after.jpg',
    category: 'Color'
  },
  {
    name: 'Motion Blur',
    description: 'Smooth motion blur effect for dynamic action sequences',
    beforeImage: '/effects/blur-before.jpg',
    afterImage: '/effects/blur-after.jpg',
    category: 'Motion'
  }
]

export default function EffectsDemo() {
  const [activeEffect, setActiveEffect] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

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
            Effects Gallery
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Hover over the images to see the transformation. Click to explore different effects.
          </p>
        </motion.div>

        {/* Effects Navigation */}
        <div className="flex justify-center gap-4 mb-12 overflow-x-auto pb-4">
          {effects.map((effect, index) => (
            <button
              key={effect.name}
              onClick={() => setActiveEffect(index)}
              className={`px-6 py-3 rounded-full whitespace-nowrap transition-colors ${
                index === activeEffect
                  ? 'bg-accent text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {effect.category}
            </button>
          ))}
        </div>

        {/* Effect Display */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-video rounded-2xl overflow-hidden bg-black"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Before Image */}
            <div className="absolute inset-0">
              <Image
                src={effects[activeEffect].beforeImage}
                alt={`Before ${effects[activeEffect].name}`}
                fill
                className="object-cover"
              />
            </div>

            {/* After Image */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovering ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={effects[activeEffect].afterImage}
                alt={`After ${effects[activeEffect].name}`}
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Hover Instruction */}
            {!isHovering && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <p className="text-white text-lg font-medium">
                  Hover to see the effect
                </p>
              </div>
            )}
          </motion.div>

          <div className="mt-8 text-center">
            <h3 className="text-2xl font-semibold text-primary dark:text-white mb-3">
              {effects[activeEffect].name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {effects[activeEffect].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 