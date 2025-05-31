'use client'

import FeaturedScroll from '@/components/FeaturedScroll'
import ProjectGrid from '@/components/ProjectGrid'
import BeforeAfterSlider from '@/components/BeforeAfterSlider'
import AnimatedBackground from '@/components/AnimatedBackground'

export default function PortfolioPage() {
  return (
    <main className="bg-primary-light dark:bg-primary text-primary dark:text-white relative">
      <AnimatedBackground />
      <FeaturedScroll />
      <BeforeAfterSlider />
      <ProjectGrid />
    </main>
  )
} 