'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ClipboardDocumentIcon,
  VideoCameraIcon,
  ScissorsIcon,
  SparklesIcon,
  MusicalNoteIcon,
  ArrowUpRightIcon
} from '@heroicons/react/24/outline'

const steps = [
  {
    icon: ClipboardDocumentIcon,
    title: 'Planning & Storyboarding',
    description: 'Understanding your vision and planning the perfect edit flow',
    color: 'from-pink-500 to-rose-500'
  },
  {
    icon: VideoCameraIcon,
    title: 'Footage Review',
    description: 'Selecting the best clips and organizing content',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    icon: ScissorsIcon,
    title: 'Initial Cut',
    description: 'Creating the basic structure and timing',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: SparklesIcon,
    title: 'Effects & Transitions',
    description: 'Adding dynamic effects and smooth transitions',
    color: 'from-teal-500 to-green-500'
  },
  {
    icon: MusicalNoteIcon,
    title: 'Sound Design',
    description: 'Perfecting audio and adding music',
    color: 'from-amber-500 to-orange-500'
  },
  {
    icon: ArrowUpRightIcon,
    title: 'Final Delivery',
    description: 'Optimizing for platforms and exporting',
    color: 'from-red-500 to-pink-500'
  }
]

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  return (
    <section className="py-20 bg-primary-light dark:bg-primary overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-6">
            The Process
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            From raw footage to viral content: our step-by-step editing journey
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800" />
          
          {/* Timeline Progress */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 w-0.5 bg-accent origin-top"
            style={{ scaleY: scrollYProgress }}
          />

          {/* Timeline Steps */}
          <div className="relative space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <h3 className="text-2xl font-semibold text-primary dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>

                {/* Icon */}
                <div className="relative flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center`}>
                    <step.icon className="w-4 h-4 text-white" />
                  </div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-full blur-lg opacity-20`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 