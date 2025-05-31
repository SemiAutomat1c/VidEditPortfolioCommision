'use client'

import About from '@/components/About'
import AnimatedBackground from '@/components/AnimatedBackground'

export default function AboutPage() {
  return (
    <main className="bg-primary-light dark:bg-primary text-primary dark:text-white relative">
      <AnimatedBackground />
      <About />
    </main>
  )
} 