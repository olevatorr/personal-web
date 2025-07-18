'use client'

import { motion } from 'motion/react'
import { useState } from 'react'
import { useTranslation } from '@/app/[lang]/lib/useTranslation'
import { useParams } from 'next/navigation'
import { isValidLanguage, defaultLanguage } from '@/app/[lang]/lib/i18n'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import Title from '@/app/[lang]/components/Atom/Title'

interface Project {
  id: string
  status: number
  title: string
  subtitle: string
  year: string
  coverImage: string
  description: string
  highlights: string[]
  techStack: {
    frontend: string[]
    animation: string[]
    backend: string[]
    database: string[]
    devops: string[]
    tools: string[]
  }
  features: {
    title: string
    description: string
    icon: string
    technologies: string[]
  }[]
  results: {
    metrics: { label: string; value: string }[]
    achievements: string[]
  }
  links: {
    live: {
      label: string
      href: string
    }
  }
  order: number
}

export default function Projects() {
  const params = useParams()
  const langParam = params.lang as string
  const lang = isValidLanguage(langParam) ? langParam : defaultLanguage
  const t = useTranslation(lang)

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <motion.section
      id={t.header.navigation[2]}
      className="relative py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <Title title={t.projects.title} />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.projects.items.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => handleProjectClick(project)}
            />
          ))}
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
        </div>
      </motion.div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={closeModal}
          project={selectedProject}
        />
      )}
    </motion.section>
  )
}
