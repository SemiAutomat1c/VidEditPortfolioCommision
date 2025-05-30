'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Project } from '@/types/project'
import VideoPlayer from '@/components/VideoPlayer'
import ProjectSchema from '@/components/ProjectSchema'
import ShareProject from '@/components/ShareProject'
import RelatedProjects from '@/components/RelatedProjects'
import { motion } from 'framer-motion'

// Sample project data using actual videos
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Cinematic Nature Documentary',
    description: 'An immersive journey through breathtaking landscapes and natural wonders, captured in stunning 4K resolution.',
    videoUrl: '/videos/8100336-uhd_4096_2160_25fps.mp4',
    categories: ['Documentary', 'Nature', '4K'],
    technologies: ['Adobe Premiere Pro', 'DaVinci Resolve', 'RED Camera'],
    date: '2024-03-20',
    client: 'National Geographic',
  },
  {
    id: '2',
    title: 'Urban Life Timelapse',
    description: 'A dynamic exploration of city life through mesmerizing timelapse sequences, showcasing the rhythm of urban environments.',
    videoUrl: '/videos/8100337-uhd_4096_2160_25fps.mp4',
    categories: ['Timelapse', 'Urban', '4K'],
    technologies: ['After Effects', 'LRTimelapse', 'Sony A7III'],
    date: '2024-03-15',
    client: 'City Tourism Board',
  },
  {
    id: '3',
    title: 'Product Showcase',
    description: 'Elegant and sophisticated product demonstration video highlighting design and functionality.',
    videoUrl: '/videos/1536315-hd_1920_1080_30fps.mp4',
    categories: ['Commercial', 'Product'],
    technologies: ['Adobe Premiere Pro', 'Product Photography'],
    date: '2024-03-10',
    client: 'Tech Innovations Inc.',
  },
  {
    id: '4',
    title: 'Corporate Overview',
    description: 'Professional corporate video presenting company culture, values, and achievements.',
    videoUrl: '/videos/1536322-hd_1920_1080_30fps.mp4',
    categories: ['Corporate', 'Interview'],
    technologies: ['Final Cut Pro', 'Corporate Communications'],
    date: '2024-03-05',
    client: 'Global Solutions Ltd.',
  },
  {
    id: '5',
    title: 'Event Highlights',
    description: 'Dynamic coverage of a major event, capturing key moments and audience reactions.',
    videoUrl: '/videos/4285872-hd_1920_1080_30fps.mp4',
    categories: ['Event', 'Highlights'],
    technologies: ['Adobe Premiere Pro', 'Event Coverage'],
    date: '2024-02-28',
    client: 'Event Masters',
  },
]

export default function ProjectPage() {
  const { id } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const fetchProject = async () => {
      const found = mockProjects.find(p => p.id === id)
      setProject(found || mockProjects[0])
    }

    fetchProject()
  }, [id])

  const handleEnterFullscreen = () => {
    const videoElement = document.querySelector('video')
    if (videoElement?.requestFullscreen) {
      videoElement.requestFullscreen()
    }
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  const currentUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : `https://yourdomain.com/projects/${project.id}`

  return (
    <main className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="relative">
            <VideoPlayer
              src={project.videoUrl}
              title={project.title}
              onEnterFullscreen={handleEnterFullscreen}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-4xl font-bold text-primary dark:text-white">
                  {project.title}
                </h1>
                <ShareProject
                  title={project.title}
                  description={project.description}
                  url={currentUrl}
                />
              </div>

              <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
                {project.description}
              </p>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary dark:text-white">
                  Project Details
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Client</h3>
                    <p className="text-gray-600 dark:text-gray-400">{project.client}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Date</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {new Date(project.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-primary dark:text-white mb-3">
                  Categories
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.categories.map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary dark:text-white mb-3">
                  Technologies Used
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <RelatedProjects
          currentProject={project}
          allProjects={mockProjects}
          maxProjects={3}
        />

        <ProjectSchema project={project} />
      </div>
    </main>
  )
} 