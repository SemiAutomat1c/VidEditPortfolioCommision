'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface ProjectFiltersProps {
  categories: string[]
  technologies: string[]
  onFilterChange: (filters: { categories: string[]; technologies: string[] }) => void
}

export default function ProjectFilters({
  categories,
  technologies,
  onFilterChange,
}: ProjectFiltersProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])

  const toggleCategory = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category]
    setSelectedCategories(newCategories)
    onFilterChange({ categories: newCategories, technologies: selectedTechnologies })
  }

  const toggleTechnology = (technology: string) => {
    const newTechnologies = selectedTechnologies.includes(technology)
      ? selectedTechnologies.filter((t) => t !== technology)
      : [...selectedTechnologies, technology]
    setSelectedTechnologies(newTechnologies)
    onFilterChange({ categories: selectedCategories, technologies: newTechnologies })
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedTechnologies([])
    onFilterChange({ categories: [], technologies: [] })
  }

  return (
    <div className="space-y-6 mb-8">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-primary dark:text-white">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => toggleCategory(category)}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategories.includes(category)
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-primary dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3 text-primary dark:text-white">Technologies</h3>
        <div className="flex flex-wrap gap-2">
          {technologies.map((technology) => (
            <motion.button
              key={technology}
              onClick={() => toggleTechnology(technology)}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTechnologies.includes(technology)
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-primary dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {technology}
            </motion.button>
          ))}
        </div>
      </div>

      {(selectedCategories.length > 0 || selectedTechnologies.length > 0) && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          onClick={clearFilters}
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
        >
          Clear all filters
        </motion.button>
      )}
    </div>
  )
} 