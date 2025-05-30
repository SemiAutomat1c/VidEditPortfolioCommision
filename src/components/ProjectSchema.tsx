import { Project } from '@/types/project'

interface ProjectSchemaProps {
  project: Project
}

export default function ProjectSchema({ project }: ProjectSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    dateCreated: project.date,
    creator: {
      '@type': 'Organization',
      name: project.client || 'Personal Project',
    },
    image: project.thumbnail,
    video: project.videoUrl,
    keywords: [...project.categories, ...project.technologies].join(','),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
} 