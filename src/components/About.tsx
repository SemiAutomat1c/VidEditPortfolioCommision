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
    <section id="about" className="py-20 bg-secondary-light dark:bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-primary dark:text-white mb-6">
              About Me
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                With over 5 years of experience in video editing and production,
                I've had the privilege of working on diverse projects ranging from
                documentaries to commercial content.
              </p>
              <p>
                My passion lies in crafting compelling visual narratives that
                captivate audiences and deliver impactful messages. I specialize
                in both creative and technical aspects of video production.
              </p>
              <p>
                Whether it's a corporate video, a creative short film, or a
                full-length documentary, I bring dedication, creativity, and
                technical expertise to every project.
              </p>
            </div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-[4/5] relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
              <Image
                src="/pillo.jpg"
                alt="Profile"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-primary dark:text-white mb-8 text-center">
            My Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-primary-light dark:bg-primary p-6 rounded-xl hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <skill.icon className="h-8 w-8 text-accent mb-4" />
                <h3 className="text-xl font-semibold text-primary dark:text-white mb-2">
                  {skill.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 