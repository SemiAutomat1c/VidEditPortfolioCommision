export interface Project {
  id: string
  title: string
  description: string
  thumbnail?: string
  videoUrl: string
  categories: string[]
  technologies: string[]
  date: string
  client?: string
} 