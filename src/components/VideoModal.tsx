'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, ShareIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/solid'
import VideoPlayer from './VideoPlayer'
import { Project } from '@/types/project'

interface VideoModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export default function VideoModal({ project, isOpen, onClose }: VideoModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose()
    }
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-5xl bg-gray-900 rounded-2xl overflow-hidden shadow-2xl flex"
          >
            {/* Video Section - Left */}
            <div className="w-[400px] relative flex-shrink-0">
              <div className="relative">
                <VideoPlayer
                  src={project.videoUrl}
                  title={project.title}
                  isPortrait={project.isPortrait}
                  priority={true}
                />
              </div>
            </div>

            {/* Details Section - Right */}
            <div className="flex-1 p-6 relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-2 right-2 z-10 p-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm transition-colors"
                aria-label="Close modal"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>

              {/* Title and Share */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                <button 
                  className="p-2 text-white/80 hover:text-white transition-colors"
                  onClick={() => navigator.share?.({
                    title: project.title,
                    text: project.description,
                    url: window.location.href
                  })}
                >
                  <ShareIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-6">{project.description}</p>

              {/* Meta Info */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{project.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <UserIcon className="w-4 h-4" />
                  <span>{project.client}</span>
                </div>
              </div>

              {/* Stats */}
              {project.stats && (
                <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-gray-800/50 rounded-xl">
                  <div className="text-center">
                    <div className="text-accent text-lg font-medium">{project.stats.likes}</div>
                    <div className="text-gray-400 text-xs">Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-accent text-lg font-medium">{project.stats.views}</div>
                    <div className="text-gray-400 text-xs">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-accent text-lg font-medium">{project.stats.shares}</div>
                    <div className="text-gray-400 text-xs">Shares</div>
                  </div>
                  <div className="text-center">
                    <div className="text-accent text-lg font-medium">{project.stats.comments}</div>
                    <div className="text-gray-400 text-xs">Comments</div>
                  </div>
                </div>
              )}

              {/* Categories */}
              <div className="mb-4">
                <h4 className="text-white text-sm font-medium mb-2">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {project.categories.map((category) => (
                    <span
                      key={category}
                      className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-white text-sm font-medium mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 