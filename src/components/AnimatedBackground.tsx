'use client'

import { useCallback, useState, useEffect } from 'react'
import Particles from 'react-tsparticles'
import type { Container, Engine } from "tsparticles-engine"
import { loadFull } from "tsparticles"
import { useTheme } from '@/context/ThemeContext'

export default function AnimatedBackground() {
  const { theme } = useTheme()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Optional: Add any initialization after particles are loaded
  }, [])

  if (!isClient) return null

  return (
    <div className="fixed inset-0 -z-10">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: {
            enable: false,
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "grab",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 140,
                links: {
                  opacity: 0.5,
                },
              },
            },
          },
          particles: {
            color: {
              value: theme === 'dark' ? "#B44FFF" : "#9333EA",
            },
            links: {
              color: theme === 'dark' ? "#B44FFF" : "#9333EA",
              distance: 150,
              enable: true,
              opacity: theme === 'dark' ? 0.2 : 0.4,
              width: 1,
              triangles: {
                enable: true,
                opacity: theme === 'dark' ? 0.05 : 0.1,
              },
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "bounce",
              },
              attract: {
                enable: true,
                rotateX: 600,
                rotateY: 600,
              },
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: theme === 'dark' ? 0.3 : 0.5,
              random: true,
              animation: {
                enable: true,
                speed: 1,
                minimumValue: theme === 'dark' ? 0.1 : 0.2,
                sync: false,
              },
            },
            shape: {
              type: ["circle", "triangle"],
            },
            size: {
              value: { min: 1, max: 3 },
              random: true,
              animation: {
                enable: true,
                speed: 2,
                minimumValue: 0.1,
                sync: false,
              },
            },
          },
          detectRetina: true,
          background: {
            color: theme === 'dark' ? "#0A0A0F" : "#FFFFFF",
          },
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-light/50 via-primary-light/80 to-primary-light dark:from-primary/50 dark:via-primary/80 dark:to-primary opacity-80" />
    </div>
  )
} 