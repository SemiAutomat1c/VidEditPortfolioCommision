'use client'

import Contact from '@/components/Contact'
import AnimatedBackground from '@/components/AnimatedBackground'

export default function ContactPage() {
  return (
    <main className="bg-primary-light dark:bg-primary text-primary dark:text-white relative">
      <AnimatedBackground />
      <Contact />
    </main>
  )
} 