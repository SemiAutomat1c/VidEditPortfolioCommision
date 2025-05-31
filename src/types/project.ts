export interface Project {
  id: string
  title: string
  description: string
  videoUrl: string
  thumbnailUrl?: string
  isPortrait: boolean
  date: string
  categories: string[]
  technologies: string[]
  client: string
  stats?: {
    likes: string
    views: string
    shares: string
    comments: string
  }
  gradient?: string
}

export interface ComparisonProject {
  title: string
  description: string
  beforeVideo: string
  afterVideo: string
  category: string
  tags: string[]
} 