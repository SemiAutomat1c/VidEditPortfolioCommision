'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { 
  FilmIcon, 
  VideoCameraIcon, 
  ComputerDesktopIcon,
  SparklesIcon 
} from '@heroicons/react/24/outline'

const skills = [
  {
    name: 'Video Editing',
    icon: FilmIcon,
    description: 'Professional video editing with industry-standard software.',
  },
  {
    name: 'Cinematography',
    icon: VideoCameraIcon,
    description: 'Expert camera work and visual storytelling techniques.',
  },
  {
    name: 'Post-Production',
    icon: ComputerDesktopIcon,
    description: 'Advanced post-production and color grading.',
  },
  {
    name: 'Visual Effects',
    icon: SparklesIcon,
    description: 'Creative visual effects and motion graphics.',
  },
]

export default function About() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
              <Image
                src="/pillo.jpg"
                alt="Jayrome Pillo"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl" />
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              About Me
            </h2>
            
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                Hi, I'm Jayrome Pillo, a professional videographer and creative director with over 8 years of experience in visual storytelling. My passion lies in transforming ideas into compelling visual narratives that captivate and inspire audiences.
              </p>
              
              <p>
                Throughout my career, I've had the privilege of working with diverse clients across various industries, from startups to established brands. My expertise spans commercial production, documentary filmmaking, and creative direction, always focusing on delivering high-quality content that exceeds expectations.
              </p>

              <p>
                What sets me apart is my commitment to understanding each client's unique vision and translating it into visually stunning content. I believe in the power of storytelling through video and its ability to create meaningful connections with audiences.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">8+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">200+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">15+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Awards Won</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 