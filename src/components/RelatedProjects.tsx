'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Project } from '@/types/project'

interface RelatedProjectsProps {
  currentProject: Project
  allProjects: Project[]
  maxProjects?: number
}

export default function RelatedProjects({
  currentProject,
  allProjects,
  maxProjects = 3,
}: RelatedProjectsProps) {
  const relatedProjects = useMemo(() => {
    const otherProjects = allProjects.filter((p) => p.id !== currentProject.id)
    
    return otherProjects
      .map((project) => {
        // Calculate relevance score based on matching categories and technologies
        const categoryMatches = project.categories.filter((cat) =>
          currentProject.categories.includes(cat)
        ).length
        const techMatches = project.technologies.filter((tech) =>
          currentProject.technologies.includes(tech)
        ).length

        const score = categoryMatches * 2 + techMatches

        return { ...project, score }
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, maxProjects)
  }, [currentProject, allProjects, maxProjects])

  if (relatedProjects.length === 0) return null

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-primary dark:text-white mb-8">
        Related Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/projects/${project.id}`}>
              <div className="group relative aspect-video rounded-lg overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.categories.slice(0, 2).map((category) => (
                        <span
                          key={category}
                          className="px-2 py-1 bg-white/20 rounded-full text-xs text-white"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
} 