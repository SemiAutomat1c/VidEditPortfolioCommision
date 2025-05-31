'use client'

import Services from '@/components/Services'
import ProcessTimeline from '@/components/ProcessTimeline'
import AnimatedBackground from '@/components/AnimatedBackground'

export default function ServicesPage() {
  return (
    <main className="bg-primary-light dark:bg-primary text-primary dark:text-white relative">
      <AnimatedBackground />
      <Services />
      <ProcessTimeline />
    </main>
  )
} 