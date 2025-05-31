'use client'

import { useCallback, useState, useEffect } from 'react'
import Particles from 'react-tsparticles'
import type { Container, Engine } from "tsparticles-engine"
import { loadFull } from "tsparticles"
import { useTheme } from 'next-themes'

export default function AnimatedBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Optional: Add any initialization after particles are loaded
  }, [])

  if (!mounted) return null

  const isDark = theme === 'dark'

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
              value: [
                isDark ? "#FF0080" : "#7928CA",
                isDark ? "#7928CA" : "#2563EB",
                isDark ? "#2563EB" : "#00B4D8"
              ],
            },
            links: {
              color: isDark ? "#7928CA" : "#2563EB",
              distance: 150,
              enable: true,
              opacity: isDark ? 0.2 : 0.4,
              width: 1,
              triangles: {
                enable: true,
                opacity: isDark ? 0.05 : 0.1,
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
              value: isDark ? 0.3 : 0.5,
              random: true,
              animation: {
                enable: true,
                speed: 1,
                minimumValue: isDark ? 0.1 : 0.2,
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
            color: isDark ? "#0A0A0F" : "#FFFFFF",
          },
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-light/50 via-primary-light/80 to-primary-light dark:from-primary/50 dark:via-primary/80 dark:to-primary opacity-80">
        <div className="absolute inset-0 bg-gradient-main from-accent-pink/10 via-accent-purple/10 to-accent-blue/10 dark:from-accent-pink/20 dark:via-accent-purple/20 dark:to-accent-blue/20 opacity-50" />
      </div>
    </div>
  )
} 