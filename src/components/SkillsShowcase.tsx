'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  VideoCameraIcon,
  MusicalNoteIcon,
  CursorArrowRaysIcon,
  SparklesIcon,
  HashtagIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

const skills = [
  {
    name: 'Fast-Paced Editing',
    icon: VideoCameraIcon,
    description: 'Quick cuts, dynamic transitions, and perfect timing that keeps viewers engaged.',
    stats: ['0.5-3s', 'Clip Duration', '100+', 'Transitions'],
    color: 'from-pink-500 to-rose-500'
  },
  {
    name: 'Sound Design',
    icon: MusicalNoteIcon,
    description: 'Beat-matched cuts, trending sounds, and custom audio effects.',
    stats: ['Perfect', 'Beat Sync', '1000+', 'Sound Effects'],
    color: 'from-purple-500 to-indigo-500'
  },
  {
    name: 'Motion Graphics',
    icon: CursorArrowRaysIcon,
    description: 'Eye-catching text animations and dynamic overlays.',
    stats: ['Custom', 'Animations', '50+', 'Templates'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Visual Effects',
    icon: SparklesIcon,
    description: 'Creative transitions and effects that make content pop.',
    stats: ['Unique', 'Style', '200+', 'Effects'],
    color: 'from-teal-500 to-green-500'
  },
  {
    name: 'Trend Mastery',
    icon: HashtagIcon,
    description: 'Up-to-date with latest editing trends and viral styles.',
    stats: ['Daily', 'Research', '10+', 'Niches'],
    color: 'from-amber-500 to-orange-500'
  },
  {
    name: 'Analytics',
    icon: ChartBarIcon,
    description: 'Data-driven approach to optimize content performance.',
    stats: ['50M+', 'Views', '15+', 'Viral Hits'],
    color: 'from-red-500 to-pink-500'
  }
]

export default function SkillsShowcase() {
  const [activeSkill, setActiveSkill] = useState<number | null>(null)

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
            Editing Expertise
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Combining technical skills with creative vision to make your content stand out.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setActiveSkill(index)}
              onHoverEnd={() => setActiveSkill(null)}
              className="relative group"
            >
              <div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl p-6 h-full transform transition-transform group-hover:-translate-y-2">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${skill.color} flex items-center justify-center mb-6`}>
                  <skill.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-primary dark:text-white mb-4">
                  {skill.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {skill.description}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {skill.stats.map((stat, i) => (
                    <div key={i} className={i % 2 === 0 ? 'text-right' : 'text-left'}>
                      <p className={`text-lg font-semibold bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>
                        {stat}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Animated Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 