'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PlayIcon } from '@heroicons/react/24/solid'
import VideoModal from './VideoModal'
import { projects } from '@/data/projects'
import { Project } from '@/types/project'
import Image from 'next/image'

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loadedVideos, setLoadedVideos] = useState<{ [key: string]: boolean }>({})
  const [videoErrors, setVideoErrors] = useState<{ [key: string]: boolean }>({})
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({})
  const videoTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({})
  const abortControllers = useRef<{ [key: string]: AbortController }>({})

  // Cleanup function for video resources
  const cleanupVideo = (projectId: string) => {
    if (videoTimeouts.current[projectId]) {
      clearTimeout(videoTimeouts.current[projectId])
      delete videoTimeouts.current[projectId]
    }
    if (abortControllers.current[projectId]) {
      abortControllers.current[projectId].abort()
      delete abortControllers.current[projectId]
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      Object.keys(videoTimeouts.current).forEach(cleanupVideo)
    }
  }, [])

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  const handleVideoError = (projectId: string) => {
    setVideoErrors(prev => ({ ...prev, [projectId]: true }))
    setLoadedVideos(prev => ({ ...prev, [projectId]: false }))
  }

  const handleRetry = async (projectId: string) => {
    setVideoErrors(prev => ({ ...prev, [projectId]: false }))
    const video = videoRefs.current[projectId]
    if (!video) return

    try {
      // Create new abort controller for this request
      cleanupVideo(projectId)
      abortControllers.current[projectId] = new AbortController()
      
      // Reset video element
      video.load()
      await video.play()
      setLoadedVideos(prev => ({ ...prev, [projectId]: true }))
    } catch (err) {
      if (err instanceof Error && !err.message.includes('aborted')) {
        console.error('Video retry error:', err)
        handleVideoError(projectId)
      }
    }
  }

  const handleMouseEnter = async (e: React.MouseEvent<HTMLVideoElement>, projectId: string) => {
    const video = e.currentTarget;
    cleanupVideo(projectId)

    try {
      // Reset video position
      video.currentTime = 0
      
      // Add a small delay before playing to prevent rapid play/pause cycles
      videoTimeouts.current[projectId] = setTimeout(async () => {
        if (document.activeElement !== video) {
          try {
            await video.play()
          } catch (err) {
            if (err instanceof Error && !err.message.includes('aborted')) {
              console.error('Video play error:', err)
              handleVideoError(projectId)
            }
          }
        }
      }, 100)
    } catch (err) {
      console.error('Video setup error:', err)
      handleVideoError(projectId)
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLVideoElement>, projectId: string) => {
    const video = e.currentTarget;
    cleanupVideo(projectId)

    // Pause the video
    video.pause()
    video.currentTime = 0
  }

  const handleVideoLoaded = (projectId: string) => {
    setLoadedVideos(prev => ({ ...prev, [projectId]: true }))
    setVideoErrors(prev => ({ ...prev, [projectId]: false }))
  }

  return (
    <section id="portfolio" className="py-20 bg-primary-light dark:bg-primary">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-12"
        >
          Latest Edits
        </motion.h2>

        {/* Responsive grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="relative aspect-[9/16] group cursor-pointer"
              onHoverStart={() => setHoveredId(project.id)}
              onHoverEnd={() => setHoveredId(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => handleOpenModal(project)}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-900 shadow-lg">
                {/* Loading Placeholder */}
                {!loadedVideos[project.id] && !videoErrors[project.id] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                    <div className="w-12 h-12 rounded-full border-4 border-accent border-t-transparent animate-spin" />
                  </div>
                )}

                {/* Error State */}
                {videoErrors[project.id] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                    <div className="text-center">
                      <p className="text-white text-lg mb-4">Failed to load video</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRetry(project.id)
                        }}
                        className="px-4 py-2 bg-accent hover:bg-accent-light rounded-lg text-white transition-colors"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                )}

                {/* Video */}
                <video
                  ref={el => {
                    if (el) videoRefs.current[project.id] = el
                  }}
                  src={project.videoUrl}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    loadedVideos[project.id] && !videoErrors[project.id] ? 'opacity-100' : 'opacity-0'
                  }`}
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  poster={project.thumbnailUrl}
                  onLoadedData={() => handleVideoLoaded(project.id)}
                  onError={() => handleVideoError(project.id)}
                  onMouseEnter={(e) => handleMouseEnter(e, project.id)}
                  onMouseLeave={(e) => handleMouseLeave(e, project.id)}
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.categories.slice(0, 2).map((category) => (
                        <span
                          key={category}
                          className="px-2 py-1 bg-accent/20 backdrop-blur-sm text-white rounded-full text-xs font-medium"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{project.title}</h3>
                    <p className="text-gray-200 text-sm mb-4 line-clamp-2">{project.description}</p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-fit px-4 py-2 bg-accent hover:bg-accent-light text-white rounded-lg flex items-center gap-2 transition-colors text-sm font-medium backdrop-blur-sm"
                    >
                      <PlayIcon className="h-4 w-4" />
                      <span>Watch Edit</span>
                    </motion.div>
                  </div>
                </div>

                {/* Loading Gradient */}
                {!loadedVideos[project.id] && !videoErrors[project.id] && (
                  <div 
                    className="absolute inset-0 animate-pulse"
                    style={{ 
                      background: project.gradient || 'linear-gradient(to bottom right, #4158D0, #C850C0)'
                    }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <VideoModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  )
} 