'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HeartIcon, ShareIcon, ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { projects } from '@/data/projects'

export default function FeaturedScroll() {
  const [activeVideo, setActiveVideo] = useState(0)
  const [liked, setLiked] = useState<{ [key: string]: boolean }>({})
  const [videoErrors, setVideoErrors] = useState<{ [key: string]: boolean }>({})
  const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({})
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({})
  const playTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({})
  const containerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Handle video playback based on visibility
  useEffect(() => {
    const options = {
      root: containerRef.current,
      threshold: 0.7, // Video needs to be 70% visible
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement
        const videoId = video.dataset.videoid || ''

        // Clear any existing timeout for this video
        if (playTimeouts.current[videoId]) {
          clearTimeout(playTimeouts.current[videoId])
        }

        if (entry.isIntersecting) {
          // Add a small delay before playing
          playTimeouts.current[videoId] = setTimeout(async () => {
            try {
              video.currentTime = 0
              await video.play()
              setIsPlaying(prev => ({ ...prev, [videoId]: true }))
            } catch (err) {
              // Only log non-abort errors
              if (err instanceof Error && !err.message.includes('aborted')) {
                console.error('Video play error:', err)
                setVideoErrors(prev => ({ ...prev, [videoId]: true }))
              }
            }
          }, 100)
          
          setActiveVideo(parseInt(video.dataset.index || '0'))
        } else {
          video.pause()
          video.currentTime = 0
          setIsPlaying(prev => ({ ...prev, [videoId]: false }))
        }
      })
    }, options)

    // Observe all videos
    Object.values(videoRefs.current).forEach((video) => {
      if (video) observerRef.current?.observe(video)
    })

    return () => {
      // Clear all timeouts
      Object.values(playTimeouts.current).forEach(timeout => clearTimeout(timeout))
      observerRef.current?.disconnect()
    }
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && activeVideo > 0) {
        setActiveVideo(prev => prev - 1)
      } else if (e.key === 'ArrowDown' && activeVideo < projects.length - 1) {
        setActiveVideo(prev => prev + 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeVideo])

  const toggleLike = (videoId: string) => {
    setLiked(prev => ({ ...prev, [videoId]: !prev[videoId] }))
  }

  const handleRetry = async (videoId: string) => {
    const video = videoRefs.current[videoId]
    if (!video) return

    setVideoErrors(prev => ({ ...prev, [videoId]: false }))
    
    try {
      await video.load()
      await video.play()
      setIsPlaying(prev => ({ ...prev, [videoId]: true }))
    } catch (err) {
      if (err instanceof Error && !err.message.includes('aborted')) {
        console.error('Video retry error:', err)
        setVideoErrors(prev => ({ ...prev, [videoId]: true }))
      }
    }
  }

  return (
    <section className="min-h-screen bg-black/95 py-20 relative flex items-center justify-center">
      <div className="container mx-auto px-4 flex items-center justify-center">
        {/* Video Player Container */}
        <div className="relative w-full max-w-[400px] bg-black rounded-2xl overflow-hidden shadow-2xl">
          {/* Video Container */}
          <div
            ref={containerRef}
            className="h-[calc(100vh-200px)] max-h-[800px] overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="h-full w-full snap-start snap-always relative aspect-[9/16]"
              >
                {/* Video or Fallback */}
                {videoErrors[project.id] ? (
                  <div 
                    className="h-full w-full bg-cover bg-center flex items-center justify-center"
                    style={{ background: project.gradient }}
                  >
                    <div className="text-center">
                      <p className="text-white text-lg mb-4">Failed to load video</p>
                      <button
                        onClick={() => handleRetry(project.id)}
                        className="px-4 py-2 bg-accent hover:bg-accent-light rounded-lg text-white transition-colors"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                ) : (
                  <video
                    ref={el => {
                      if (el) videoRefs.current[project.id] = el
                    }}
                    data-index={index}
                    data-videoid={project.id}
                    src={project.videoUrl}
                    className="h-full w-full object-cover"
                    playsInline
                    loop
                    muted
                    preload="metadata"
                  />
                )}

                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-200 text-sm mb-4">{project.description}</p>
                  
                  {/* Interaction Stats */}
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => toggleLike(project.id)}
                      className="flex items-center gap-2 text-white transition-transform hover:scale-110"
                    >
                      {liked[project.id] ? (
                        <HeartSolidIcon className="w-6 h-6 text-red-500" />
                      ) : (
                        <HeartIcon className="w-6 h-6" />
                      )}
                      <span>{project.stats?.likes}</span>
                    </button>

                    <div className="flex items-center gap-2 text-white">
                      <ChatBubbleOvalLeftIcon className="w-6 h-6" />
                      <span>{project.stats?.comments}</span>
                    </div>

                    <div className="flex items-center gap-2 text-white">
                      <ShareIcon className="w-6 h-6" />
                      <span>{project.stats?.shares}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 