'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { useTranslation } from '@/app/[lang]/lib/useTranslation'
import { useParams } from 'next/navigation'
import { isValidLanguage, defaultLanguage } from '@/app/[lang]/lib/i18n'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { IoIosAddCircle, IoIosAddCircleOutline } from 'react-icons/io'
import { FaLink } from 'react-icons/fa6'
import { getPublicImage } from '@/app/[lang]/lib/utils'

import Image from 'next/image'

interface ProjectCardProps {
  project: {
    id: string
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
    links: {
      live: {
        label: string
        href: string
      }
    }
  }
  onClick: () => void
  index: number
}

export default function ProjectCard({
  project,
  onClick,
  index
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const params = useParams()
  const langParam = params.lang as string
  const lang = isValidLanguage(langParam) ? langParam : defaultLanguage
  const t = useTranslation(lang)

  const allTechs = [
    ...(project.techStack.frontend || []),
    ...(project.techStack.animation || []),
    ...(project.techStack.backend || []),
    ...(project.techStack.database || []),
    ...(project.techStack.devops || []),
    ...(project.techStack.tools || [])
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden h-full hover:border-blue-500/50 transition-all duration-300 flex flex-col"
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Cover Image - OG 1200:630 ratio */}
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: '1200/630' }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent z-10" />
          <Image
            src={getPublicImage(project.coverImage)}
            alt={project.title}
            fill
            className={`object-cover transition-all duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Year Badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1 bg-blue-500/90 text-white text-sm font-medium rounded-full backdrop-blur-sm">
              {project.year}
            </span>
          </div>

          {/* External Link Icon */}
          <motion.div
            className="absolute top-4 right-4 z-20 text-white/80 group-hover:text-white transition-colors"
            animate={{
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {isHovered ? (
                <IoIosAddCircle key="open" className="w-6 h-6" />
              ) : (
                <IoIosAddCircleOutline key="close" className="w-6 h-6" />
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col grow">
          {/* Header */}
          <div className="mb-4">
            <motion.h3
              className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors"
              animate={{ color: isHovered ? '#60a5fa' : '#ffffff' }}
            >
              {project.title}
            </motion.h3>
            <p className="text-sm text-gray-400">{project.subtitle}</p>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Highlights */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {project.highlights.slice(0, 3).map((highlight, idx) => (
                <motion.span
                  key={idx}
                  className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * idx }}
                >
                  {highlight}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {allTechs.slice(0, 6).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded border border-gray-600/50"
                >
                  {tech}
                </span>
              ))}
              {allTechs.length > 6 && (
                <span className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded border border-gray-600/50">
                  +{allTechs.length - 6}
                </span>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-end justify-between grow">
            <motion.button
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              {t.projects.ui.viewDetails}
              <MdKeyboardArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.a
              href={project.links.live.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white rounded-full transition-colors flex items-center gap-1"
              whileHover={{
                scale: 1.05,
                color: '#60a5fa',
              }}
              onClick={e => e.stopPropagation()}
            >
              <FaLink className="w-4 h-4" />
              {t.projects.ui.live}
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
