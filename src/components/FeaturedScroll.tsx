'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HeartIcon, ShareIcon, ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid'
import { projects } from '@/data/projects'

export default function FeaturedScroll() {
  const [activeVideo, setActiveVideo] = useState(0)
  const [liked, setLiked] = useState<{ [key: string]: boolean }>({})
  const [videoErrors, setVideoErrors] = useState<{ [key: string]: boolean }>({})
  const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({})
  const [isLoaded, setIsLoaded] = useState<{ [key: string]: boolean }>({})
  const [isMuted, setIsMuted] = useState<{ [key: string]: boolean }>({})
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({})
  const observerRef = useRef<IntersectionObserver | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInitializedRef = useRef<boolean>(false)

  // Initialize video refs
  useEffect(() => {
    if (isInitializedRef.current) return
    isInitializedRef.current = true

    projects.forEach(project => {
      videoRefs.current[project.id] = null
    })
  }, [])

  // Handle video playback based on visibility
  useEffect(() => {
    if (!containerRef.current) return

    const options = {
      root: containerRef.current,
      threshold: 0.7,
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement
        const videoId = video.dataset.videoid

        if (!videoId || !videoRefs.current[videoId]) return

        if (entry.isIntersecting) {
          try {
            video.currentTime = 0
            video.muted = true
            setVideoErrors(prev => ({ ...prev, [videoId]: false }))
            
            // Attempt to play
            const playPromise = video.play()
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  setIsPlaying(prev => ({ ...prev, [videoId]: true }))
                })
                .catch(err => {
                  console.error('Video play error:', err)
                  setVideoErrors(prev => ({ ...prev, [videoId]: true }))
                  setIsPlaying(prev => ({ ...prev, [videoId]: false }))
                })
            }
          } catch (err) {
            console.error('Video error:', err)
            setVideoErrors(prev => ({ ...prev, [videoId]: true }))
            setIsPlaying(prev => ({ ...prev, [videoId]: false }))
          }
        } else {
          try {
            video.pause()
            video.currentTime = 0
            setIsPlaying(prev => ({ ...prev, [videoId]: false }))
          } catch (err) {
            console.warn('Error pausing video:', err)
          }
        }
      })
    }

    observerRef.current = new IntersectionObserver(handleIntersection, options)

    // Observe videos that are already mounted
    Object.entries(videoRefs.current).forEach(([id, video]) => {
      if (video && !video.dataset.observed) {
        video.dataset.observed = 'true'
        observerRef.current?.observe(video)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // Handle video ref updates
  const setVideoRef = (el: HTMLVideoElement | null, projectId: string) => {
    if (!el || videoRefs.current[projectId] === el) return

    videoRefs.current[projectId] = el
    
    if (el && !el.dataset.observed && observerRef.current) {
      el.dataset.observed = 'true'
      observerRef.current.observe(el)
    }
  }

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
    if (!video) {
      console.error('Video element not found for ID:', videoId)
      return
    }

    try {
      // Reset error state first
      setVideoErrors(prev => ({ ...prev, [videoId]: false }))
      setIsLoaded(prev => ({ ...prev, [videoId]: false }))
      
      // Reset video element
      video.currentTime = 0
      video.load() // Reload the video element
      
      // Try to play
      await video.play()
      setIsPlaying(prev => ({ ...prev, [videoId]: true }))
      setIsLoaded(prev => ({ ...prev, [videoId]: true }))
    } catch (err) {
      console.error('Video retry error:', err)
      setVideoErrors(prev => ({ ...prev, [videoId]: true }))
      setIsLoaded(prev => ({ ...prev, [videoId]: false }))
      setIsPlaying(prev => ({ ...prev, [videoId]: false }))
    }
  }

  const toggleMute = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation()
    const video = videoRefs.current[projectId]
    if (!video) return

    video.muted = !video.muted
    setIsMuted(prev => ({ ...prev, [projectId]: video.muted }))
  }

  return (
    <section className="min-h-screen relative overflow-hidden bg-white dark:bg-[#0a0a0f]">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 opacity-30 dark:opacity-40">
          {/* Gradient Mesh - Light Theme */}
          <div className="absolute -inset-[10%] blur-3xl dark:opacity-0">
            <div className="absolute top-0 -left-20 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-sky-400/40 to-indigo-400/40 mix-blend-multiply animate-mesh-1" />
            <div className="absolute top-1/3 -right-20 w-[600px] h-[600px] rounded-full bg-gradient-to-l from-orange-400/40 to-pink-400/40 mix-blend-multiply animate-mesh-2" />
            <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] rounded-full bg-gradient-to-t from-emerald-400/40 to-teal-400/40 mix-blend-multiply animate-mesh-3" />
          </div>

          {/* Gradient Mesh - Dark Theme */}
          <div className="absolute -inset-[10%] blur-3xl opacity-0 dark:opacity-100">
            <div className="absolute top-0 -left-20 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-violet-600/30 to-indigo-600/30 mix-blend-screen animate-mesh-1" />
            <div className="absolute top-1/3 -right-20 w-[600px] h-[600px] rounded-full bg-gradient-to-l from-fuchsia-600/30 to-purple-600/30 mix-blend-screen animate-mesh-2" />
            <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] rounded-full bg-gradient-to-t from-blue-600/30 to-cyan-600/30 mix-blend-screen animate-mesh-3" />
          </div>
          
          {/* Noise Texture */}
          <div className="absolute inset-0 bg-noise opacity-[0.15] mix-blend-soft-light" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-20">
        <div className="w-full max-w-[400px]">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/40 dark:bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Video Container */}
            <div
              ref={containerRef}
              className="h-[calc(100vh-200px)] max-h-[800px] overflow-y-auto snap-y snap-mandatory"
              style={{ scrollbarWidth: 'none' }}
            >
              <div className="relative">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className="h-full w-full snap-start snap-always relative aspect-[9/16]"
                  >
                    {/* Loading State */}
                    {!isLoaded[project.id] && !videoErrors[project.id] && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-gray-300/30 border-t-gray-800 dark:border-white/30 dark:border-t-white rounded-full animate-spin" />
                      </div>
                    )}

                    {/* Error State */}
                    {videoErrors[project.id] && (
                      <div 
                        className="h-full w-full bg-cover bg-center flex items-center justify-center"
                        style={{ background: project.gradient }}
                      >
                        <div className="text-center">
                          <p className="text-white text-lg mb-4">Failed to load video</p>
                          <button
                            onClick={() => handleRetry(project.id)}
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-white transition-colors"
                          >
                            Retry
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Video */}
                    <video
                      ref={el => setVideoRef(el, project.id)}
                      data-index={index}
                      data-videoid={project.id}
                      src={project.videoUrl}
                      className={`h-full w-full object-cover transition-opacity duration-300 ${
                        isLoaded[project.id] && !videoErrors[project.id] ? 'opacity-100' : 'opacity-0'
                      }`}
                      playsInline
                      loop
                      muted
                      preload="auto"
                      onError={(e) => {
                        const target = e.target as HTMLVideoElement
                        console.error('Video load error:', {
                          id: project.id,
                          src: target.src,
                          error: target.error
                        })
                        setVideoErrors(prev => ({ ...prev, [project.id]: true }))
                        setIsLoaded(prev => ({ ...prev, [project.id]: false }))
                      }}
                      onLoadedData={() => {
                        console.log('Video loaded:', project.id)
                        setIsLoaded(prev => ({ ...prev, [project.id]: true }))
                        setVideoErrors(prev => ({ ...prev, [project.id]: false }))
                      }}
                    />

                    {/* Video Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/50 to-transparent">
                      <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                      <p className="text-sm text-gray-300 mb-4">{project.description}</p>
                      
                      {/* Engagement Stats */}
                      <div className="flex items-center gap-4">
                        <button 
                          className="flex items-center gap-1"
                          onClick={() => toggleLike(project.id)}
                        >
                          {liked[project.id] ? (
                            <HeartSolidIcon className="h-6 w-6 text-red-500" />
                          ) : (
                            <HeartIcon className="h-6 w-6 text-white" />
                          )}
                          <span className="text-white">{project.stats?.likes || '0'}</span>
                        </button>
                        <div className="flex items-center gap-1">
                          <ChatBubbleOvalLeftIcon className="h-6 w-6 text-white" />
                          <span className="text-white">{project.stats?.comments || '0'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ShareIcon className="h-6 w-6 text-white" />
                          <span className="text-white">{project.stats?.shares || '0'}</span>
                        </div>
                        <button 
                          className="flex items-center gap-1"
                          onClick={(e) => toggleMute(e, project.id)}
                        >
                          {isMuted[project.id] ? (
                            <SpeakerXMarkIcon className="h-6 w-6 text-white" />
                          ) : (
                            <SpeakerWaveIcon className="h-6 w-6 text-white" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 