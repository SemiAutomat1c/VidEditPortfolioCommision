'use client'

import { useState, useEffect } from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import FeaturedScroll from '@/components/FeaturedScroll'
import SkillsShowcase from '@/components/SkillsShowcase'
import ProjectGrid from '@/components/ProjectGrid'
import Contact from '@/components/Contact'
import ClientWrapper from '@/components/ClientWrapper'
import AnimatedBackground from '@/components/AnimatedBackground'
import BeforeAfterSlider from '@/components/BeforeAfterSlider'
import ProcessTimeline from '@/components/ProcessTimeline'
import SocialProof from '@/components/SocialProof'
import FloatingCTA from '@/components/FloatingCTA'

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // or a loading state
  }

  return (
    <ClientWrapper>
      <AnimatedBackground />
      <main className="bg-primary-light dark:bg-primary text-primary dark:text-white relative">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Featured Work Section */}
        <FeaturedScroll />
        
        {/* Skills & Process Section */}
        <SkillsShowcase />
        <ProcessTimeline />
        
        {/* Portfolio Showcase */}
        <BeforeAfterSlider />
        <ProjectGrid />
        
        {/* Social Proof & Services */}
        <SocialProof />
        <Services />
        
        {/* Contact Section */}
        <Contact />
        <FloatingCTA />
      </main>
    </ClientWrapper>
  )
} 