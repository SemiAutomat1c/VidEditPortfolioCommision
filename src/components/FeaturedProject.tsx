'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { PlayIcon } from '@heroicons/react/24/solid'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import useEmblaCarousel from 'embla-carousel-react'

const featuredProjects = [
  {
    id: 1,
    title: "Brand Commercial",
    description: "High-energy commercial for tech startup",
    categories: ["Commercial", "TechVision"],
    skills: ["editing", "color grading", "motion graphics"],
    thumbnail: "/project1.jpg",
  },
  {
    id: 2,
    title: "Music Video Production",
    description: "Dynamic music video for indie artist",
    categories: ["Music", "Creative"],
    skills: ["editing", "visual effects", "color grading"],
    thumbnail: "/project2.jpg",
  },
  {
    id: 3,
    title: "Documentary Film",
    description: "Award-winning documentary short film",
    categories: ["Documentary", "Film"],
    skills: ["storytelling", "editing", "sound design"],
    thumbnail: "/project3.jpg",
  },
]

export default function FeaturedProject() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  return (
    <div className="py-20 bg-primary-light dark:bg-primary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-accent mb-4">Featured Project</h2>
          <p className="text-gray-dark dark:text-gray-light text-lg">Explore my latest masterpiece</p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex">
              {featuredProjects.map((project) => (
                <div key={project.id} className="flex-[0_0_100%] min-w-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer"
                  >
                    {/* Placeholder/Thumbnail */}
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-light/20 to-gray-light dark:from-gray-dark/20 dark:to-gray-dark">
                      <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-primary-light dark:via-primary to-primary-light dark:to-primary opacity-50" />
                    </div>

                    {/* Project Info - Bottom Left */}
                    <div className="absolute bottom-0 left-0 p-8 z-10">
                      <div className="flex gap-2 mb-4">
                        {project.categories.map((category) => (
                          <span
                            key={category}
                            className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-3xl font-bold text-primary dark:text-white mb-2">{project.title}</h3>
                      <p className="text-gray-dark dark:text-gray-light mb-4">{project.description}</p>
                      <div className="flex gap-3">
                        {project.skills.map((skill) => (
                          <span key={skill} className="text-gray-dark dark:text-gray-light text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 px-6 py-3 bg-accent hover:bg-accent-light text-white rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <span>Watch Full Video</span>
                      </motion.button>
                    </div>

                    {/* Play Button - Center */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-accent rounded-full p-6"
                      >
                        <PlayIcon className="h-12 w-12 text-white" />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-accent/90 hover:bg-accent p-3 rounded-full text-white z-10 transition-colors"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-accent/90 hover:bg-accent p-3 rounded-full text-white z-10 transition-colors"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {featuredProjects.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === selectedIndex ? 'bg-accent' : 'bg-gray-dark/30 dark:bg-gray-light/30'
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 