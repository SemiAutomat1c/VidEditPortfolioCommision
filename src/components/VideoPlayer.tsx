'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PlayIcon, SpeakerWaveIcon, SpeakerXMarkIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/solid'

interface VideoPlayerProps {
  src: string
  title: string
  isPortrait?: boolean
  priority?: boolean
  startMuted?: boolean
  showSoundControl?: boolean
  onEnterFullscreen?: () => void
}

export default function VideoPlayer({ 
  src, 
  title, 
  isPortrait = true,
  priority = false,
  startMuted = false,
  showSoundControl = true,
  onEnterFullscreen
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(startMuted)
  const [volume, setVolume] = useState(1)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadingRef = useRef<boolean>(false)
  const retryCount = useRef<number>(0)

  // Reset state when src changes
  useEffect(() => {
    setIsLoaded(false)
    setError(null)
    setIsPlaying(false)
    loadingRef.current = false
  }, [src])

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

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
        setIsMuted(startMuted)

        // Error Recovery 1: Handle spaces in video paths
        const videoPath = src.startsWith('./') ? 
          src.substring(2).replace(/ /g, '%20') : 
          src.replace(/ /g, '%20')

        // Error Recovery 2: Validate video path before loading
        if (!videoPath) {
          throw new Error('Invalid video path')
        }

        // Error Recovery 3: Set up timeout for loading
        const loadTimeout = setTimeout(() => {
          if (!video.readyState) {
            throw new Error('Video load timeout')
          }
        }, 10000) // 10 second timeout

        // Load video first with error handling
        await new Promise((resolve, reject) => {
          // Error Recovery 4: Multiple event listeners for different error scenarios
          const handleError = (e: string | Event) => {
            clearTimeout(loadTimeout)
            const error = (video.error as MediaError)
            let errorMessage = 'Failed to load video'
            
            if (error) {
              switch(error.code) {
                case MediaError.MEDIA_ERR_ABORTED:
                  errorMessage = 'Video loading aborted'
                  break
                case MediaError.MEDIA_ERR_NETWORK:
                  errorMessage = 'Network error while loading video'
                  break
                case MediaError.MEDIA_ERR_DECODE:
                  errorMessage = 'Video decode error'
                  break
                case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                  errorMessage = 'Video format not supported'
                  break
              }
            }
            
            reject(new Error(errorMessage))
          }

          video.onloadeddata = () => {
            clearTimeout(loadTimeout)
            resolve(undefined)
          }
          
          video.onerror = handleError
          video.onabort = handleError
          video.onstalled = handleError

          // Error Recovery 5: Try both relative and absolute paths
          try {
            video.src = videoPath
            video.load()
          } catch (e) {
            handleError(new Event('error'))
          }
        })

        setIsLoaded(true)
        
        // Error Recovery 6: Progressive playback attempts
        if (priority || document.visibilityState === 'visible') {
          try {
            await video.play()
            setIsPlaying(true)
          } catch (err) {
            // Error Recovery 7: Fallback options for playback
            const fallbackOptions = [
              async () => {
                video.muted = true
                setIsMuted(true)
                await video.play()
              },
              async () => {
                video.currentTime = 0
                video.muted = true
                setIsMuted(true)
                await video.play()
              },
              async () => {
                video.load()
                video.muted = true
                setIsMuted(true)
                await video.play()
              }
            ]

            for (const fallback of fallbackOptions) {
              try {
                await fallback()
                setIsPlaying(true)
                break
              } catch (fallbackErr) {
                continue
              }
            }
          }
        }
      } catch (err) {
        console.error('Error loading/playing video:', err)
        setError(err instanceof Error ? err.message : 'Failed to load video')
        setIsLoaded(false)

        // Error Recovery 8: Automatic retry with backoff
        if (!retryCount.current) {
          retryCount.current = 0
        }
        
        if (retryCount.current < 3) {
          const retryDelay = Math.pow(2, retryCount.current) * 1000
          retryCount.current++
          
          setTimeout(() => {
            if (videoRef.current) {
              setError(null)
              loadingRef.current = false
              playVideo()
            }
          }, retryDelay)
        }
      } finally {
        loadingRef.current = false
      }
    }

    if (src) {
      playVideo()
    }

    return () => {
      if (video) {
        video.pause()
        if (video.src) {
          video.removeAttribute('src')
          video.load()
        }
        setIsPlaying(false)
        setError(null)
        loadingRef.current = false
        retryCount.current = 0
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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return

    const newVolume = parseFloat(e.target.value)
    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const handleFullscreen = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const container = containerRef.current
    if (!container) return

    try {
      if (!isFullscreen) {
        await container.requestFullscreen()
        onEnterFullscreen?.()
      } else {
        await document.exitFullscreen()
      }
    } catch (err) {
      console.error('Error toggling fullscreen:', err)
    }
  }

  const handleLoadedData = () => {
    setIsLoaded(true)
    setError(null)
    loadingRef.current = false
  }

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.target as HTMLVideoElement
    if (video.src) {
      setError('Failed to load video')
      setIsPlaying(false)
      setIsLoaded(false)
    }
    loadingRef.current = false
  }

  return (
    <div 
      ref={containerRef}
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

        {/* Control Buttons */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          {/* Sound Control */}
          {showSoundControl && (
            <div 
              className="relative group"
              onMouseEnter={() => setShowVolumeSlider(true)}
              onMouseLeave={() => setShowVolumeSlider(false)}
            >
              <button
                onClick={toggleMute}
                className="p-2 bg-black/40 rounded-full hover:bg-black/60 transition-colors"
              >
                {isMuted ? (
                  <SpeakerXMarkIcon className="w-6 h-6 text-white" />
                ) : (
                  <SpeakerWaveIcon className="w-6 h-6 text-white" />
                )}
              </button>
              
              {/* Volume Slider */}
              <div 
                className={`absolute bottom-full mb-2 -left-12 bg-black/40 backdrop-blur-sm p-2 rounded-lg transition-opacity duration-200 ${
                  showVolumeSlider ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}

          {/* Fullscreen Control */}
          <button
            onClick={handleFullscreen}
            className="p-2 bg-black/40 rounded-full hover:bg-black/60 transition-colors"
          >
            <ArrowsPointingOutIcon className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
} 