'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PlayIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid'

interface VideoPlayerProps {
  src: string
  title: string
  isPortrait?: boolean
  priority?: boolean
  startMuted?: boolean
  showSoundControl?: boolean
}

export default function VideoPlayer({ 
  src, 
  title, 
  isPortrait = true,
  priority = false,
  startMuted = false,
  showSoundControl = true
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(startMuted)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadingRef = useRef<boolean>(false)

  // Reset state when src changes
  useEffect(() => {
    setIsLoaded(false)
    setError(null)
    setIsPlaying(false)
    loadingRef.current = false
  }, [src])

  // Intersection Observer setup
  useEffect(() => {
    if (priority) {
      setIsVisible(true)
      return
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      {
        threshold: 0.5,
      }
    )

    if (videoRef.current) {
      observerRef.current.observe(videoRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [priority])

  // Handle video loading and playback
  useEffect(() => {
    const video = videoRef.current
    if (!video || !isVisible || loadingRef.current) return

    const playVideo = async () => {
      try {
        loadingRef.current = true
        video.playsInline = true
        video.preload = priority ? "auto" : "metadata"
        video.muted = startMuted

        if (priority || document.visibilityState === 'visible') {
          try {
            await video.play()
          } catch (err) {
            video.muted = true
            setIsMuted(true)
            await video.play()
          }
          setIsPlaying(true)
        }
      } catch (err) {
        console.error('Error auto-playing video:', err)
        setError('Failed to play video')
      } finally {
        loadingRef.current = false
      }
    }

    // Only load if we have a valid src
    if (src) {
      video.load()
      playVideo()
    }

    return () => {
      // Only cleanup if we're unmounting or src is changing
      if (video) {
        video.pause()
        // Remove src and clear error states before cleanup
        if (video.src) {
          video.removeAttribute('src')
          video.load()
        }
        setIsPlaying(false)
        setError(null)
        loadingRef.current = false
      }
    }
  }, [src, isVisible, priority, startMuted])

  // Handle visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      const video = videoRef.current
      if (!video || !isVisible || loadingRef.current) return

      if (document.visibilityState === 'visible' && !isPlaying) {
        video.play().catch(() => {})
      } else if (document.visibilityState === 'hidden' && isPlaying) {
        video.pause()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isPlaying, isVisible])

  const togglePlayback = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video || loadingRef.current) return

    try {
      if (isPlaying) {
        video.pause()
      } else {
        await video.play()
      }
      setIsPlaying(!isPlaying)
    } catch (err) {
      console.error('Error toggling video playback:', err)
      setError('Failed to play video')
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  const handleLoadedData = () => {
    setIsLoaded(true)
    setError(null)
    loadingRef.current = false
  }

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.target as HTMLVideoElement
    // Only set error if we have a src and it's not a cleanup-related error
    if (video.src) {
      setError('Failed to load video')
      setIsPlaying(false)
      setIsLoaded(false)
    }
    loadingRef.current = false
  }

  return (
    <div 
      className="relative bg-black"
      style={{ aspectRatio: isPortrait ? '9/16' : '16/9' }}
    >
      {/* Loading State */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-center">
            <p className="text-white mb-2">{error}</p>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setError(null)
                if (videoRef.current && !loadingRef.current) {
                  videoRef.current.load()
                }
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
        ref={videoRef}
        src={isVisible ? src : undefined}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        loop
        preload={priority ? "auto" : "metadata"}
        onLoadedData={handleLoadedData}
        onError={handleError}
      />

      {/* Controls Overlay */}
      <div 
        className="absolute inset-0 flex items-center justify-center cursor-pointer"
        onClick={togglePlayback}
      >
        {/* Play/Pause Button */}
        {!isPlaying && isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-black/40 rounded-full p-4"
          >
            <PlayIcon className="w-16 h-16 text-white" />
          </motion.div>
        )}

        {/* Sound Control */}
        {showSoundControl && (
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 p-2 bg-black/40 rounded-full hover:bg-black/60 transition-colors"
          >
            {isMuted ? (
              <SpeakerXMarkIcon className="w-6 h-6 text-white" />
            ) : (
              <SpeakerWaveIcon className="w-6 h-6 text-white" />
            )}
          </button>
        )}
      </div>
    </div>
  )
} 