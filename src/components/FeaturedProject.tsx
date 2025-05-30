'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import useEmblaCarousel from 'embla-carousel-react'

const featuredProjects = [
  {
    id: 1,
    title: "Cinematic Nature Documentary",
    description: "An immersive journey through breathtaking landscapes and natural wonders, captured in stunning 4K resolution.",
    categories: ["Documentary", "Nature", "4K"],
    skills: ["editing", "color grading", "cinematography"],
    videoUrl: "/videos/8100336-uhd_4096_2160_25fps.mp4",
  },
  {
    id: 2,
    title: "Urban Life Timelapse",
    description: "A dynamic exploration of city life through mesmerizing timelapse sequences.",
    categories: ["Timelapse", "Urban", "4K"],
    skills: ["timelapse", "editing", "color grading"],
    videoUrl: "/videos/8100337-uhd_4096_2160_25fps.mp4",
  },
  {
    id: 3,
    title: "Product Showcase",
    description: "Elegant and sophisticated product demonstration video highlighting design and functionality.",
    categories: ["Commercial", "Product"],
    skills: ["product videography", "lighting", "editing"],
    videoUrl: "/videos/1536315-hd_1920_1080_30fps.mp4",
  },
]

export default function FeaturedProject() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [playingVideo, setPlayingVideo] = useState<number | null>(null)
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({})

  const setVideoRef = (projectId: number) => (el: HTMLVideoElement | null) => {
    videoRefs.current[projectId] = el
  }

  const handlePlayVideo = (projectId: number) => {
    const videoElement = videoRefs.current[projectId]
    if (!videoElement) return

    if (playingVideo === projectId) {
      videoElement.pause()
      videoElement.currentTime = 0
      setPlayingVideo(null)
    } else {
      // Pause any currently playing video
      if (playingVideo !== null && videoRefs.current[playingVideo]) {
        videoRefs.current[playingVideo]!.pause()
        videoRefs.current[playingVideo]!.currentTime = 0
      }
      
      // Play the new video
      videoElement.play()
        .then(() => {
          setPlayingVideo(projectId)
        })
        .catch((error) => {
          console.error('Error playing video:', error)
        })
    }
  }

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      // Pause current video when changing slides
      if (playingVideo !== null && videoRefs.current[playingVideo]) {
        videoRefs.current[playingVideo]!.pause()
        videoRefs.current[playingVideo]!.currentTime = 0
        setPlayingVideo(null)
      }
      emblaApi.scrollPrev()
    }
  }, [emblaApi, playingVideo])

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      // Pause current video when changing slides
      if (playingVideo !== null && videoRefs.current[playingVideo]) {
        videoRefs.current[playingVideo]!.pause()
        videoRefs.current[playingVideo]!.currentTime = 0
        setPlayingVideo(null)
      }
      emblaApi.scrollNext()
    }
  }, [emblaApi, playingVideo])

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-4">
            Featured Project
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Explore my latest masterpiece
          </p>
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
                    <video
                      ref={setVideoRef(project.id)}
                      data-project-id={project.id}
                      src={project.videoUrl}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                      loop
                    />
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

                    {/* Play/Pause Button - Center */}
                    <AnimatePresence>
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePlayVideo(project.id)
                        }}
                        className="absolute inset-0 flex items-center justify-center z-20"
                      >
                        <div className="bg-accent/80 p-4 rounded-full hover:bg-accent transition-colors">
                          {playingVideo === project.id ? (
                            <PauseIcon className="h-8 w-8 text-white" />
                          ) : (
                            <PlayIcon className="h-8 w-8 text-white" />
                          )}
                        </div>
                      </motion.button>
                    </AnimatePresence>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-accent/80 hover:bg-accent text-white p-2 rounded-full transition-colors z-30"
            aria-label="Previous project"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-accent/80 hover:bg-accent text-white p-2 rounded-full transition-colors z-30"
            aria-label="Next project"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  )
} 