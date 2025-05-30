'use client'

import { motion } from 'framer-motion'
import {
  FilmIcon,
  SparklesIcon,
  VideoCameraIcon,
  MusicalNoteIcon,
} from '@heroicons/react/24/outline'

const services = [
  {
    title: 'Video Editing',
    description: 'Professional video editing with attention to pacing, transitions, and storytelling.',
    icon: FilmIcon,
  },
  {
    title: 'Visual Effects',
    description: 'Creative visual effects and motion graphics to enhance your content.',
    icon: SparklesIcon,
  },
  {
    title: 'Color Grading',
    description: 'Professional color correction and grading to achieve the perfect look.',
    icon: VideoCameraIcon,
  },
  {
    title: 'Sound Design',
    description: 'Expert audio mixing, sound effects, and music selection.',
    icon: MusicalNoteIcon,
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-primary-light dark:bg-primary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-primary dark:text-white">Services</h2>
          <p className="text-xl text-gray-dark dark:text-gray-light max-w-2xl mx-auto">
            Bringing your vision to life with professional video editing services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-secondary-light dark:bg-secondary p-8 rounded-2xl hover:bg-gray-light dark:hover:bg-gray-dark transition-colors group"
            >
              <service.icon className="h-12 w-12 text-accent mb-6 group-hover:text-accent-light transition-colors" />
              <h3 className="text-xl font-semibold mb-3 text-primary dark:text-white">{service.title}</h3>
              <p className="text-gray-dark dark:text-gray-light">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 