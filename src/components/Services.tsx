'use client'

import { motion } from 'framer-motion'
import {
  SparklesIcon,
  FilmIcon,
  ChartBarIcon,
  RocketLaunchIcon,
  PaintBrushIcon,
  SpeakerWaveIcon
} from '@heroicons/react/24/outline'

const services = [
  {
    title: 'Trending Edits',
    description: 'Fast-paced, engaging edits following the latest TikTok and Reels trends to maximize reach and engagement.',
    icon: SparklesIcon,
  },
  {
    title: 'Transition Effects',
    description: 'Smooth, creative transitions that keep viewers watching and create that "how did they do that?" moment.',
    icon: FilmIcon,
  },
  {
    title: 'Sound Design',
    description: "Perfect sync with trending sounds, custom audio effects, and music that amplifies your content's impact.",
    icon: SpeakerWaveIcon,
  },
  {
    title: 'Visual Effects',
    description: 'Eye-catching effects, text animations, and overlays that make your content stand out in the feed.',
    icon: PaintBrushIcon,
  },
  {
    title: 'Growth Strategy',
    description: 'Data-driven advice on trending formats, optimal posting times, and content strategies for your niche.',
    icon: ChartBarIcon,
  },
  {
    title: 'Viral Optimization',
    description: 'Fine-tuning your content with proven techniques to increase shareability and engagement.',
    icon: RocketLaunchIcon,
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-primary-light dark:bg-primary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-6">
            Short-Form Video Services
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Specialized in creating scroll-stopping content that drives engagement
            and helps you grow your social media presence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                <service.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-primary dark:text-white mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 