'use client'

import { motion, AnimatePresence } from 'motion/react'
import {
  MdClose,
  MdOpenInNew,
  MdFlashOn,
  MdCode,
  MdSmartphone,
  MdStorage,
  MdSearch
} from 'react-icons/md'
import { useEffect, useRef } from 'react'
import { useTranslation } from '@/app/[lang]/lib/useTranslation'
import { useParams } from 'next/navigation'
import { isValidLanguage, defaultLanguage } from '@/app/[lang]/lib/i18n'
import Image from 'next/image'

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
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
    features: Array<{
      title: string
      description: string
      icon: string
      technologies: string[]
    }>
    results: {
      metrics: Array<{
        label: string
        value: string
      }>
      achievements: string[]
    }
    links: {
      live: {
        label: string
        href: string
      }
    }
  }
}

const IconMap = {
  Zap: MdFlashOn,
  Code: MdCode,
  Smartphone: MdSmartphone,
  Database: MdStorage,
  Search: MdSearch
}

export default function ProjectModal({
  isOpen,
  onClose,
  project
}: ProjectModalProps) {
  const params = useParams()
  const langParam = params.lang as string
  const lang = isValidLanguage(langParam) ? langParam : defaultLanguage
  const t = useTranslation(lang)
  const scrollRef = useRef<HTMLDivElement>(null)

  // 阻止背景滾動
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  // 阻止滾動事件傳播到 document
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation()

      // 手動處理滾動
      const { deltaY } = e
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer

      if (deltaY > 0 && scrollTop + clientHeight >= scrollHeight) {
        // 已經滾動到底部，阻止事件
        e.preventDefault()
      } else if (deltaY < 0 && scrollTop <= 0) {
        // 已經滾動到頂部，阻止事件
        e.preventDefault()
      }
    }

    scrollContainer.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel)
    }
  }, [isOpen])

  // ESC 鍵關閉
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
    }

    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-container"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-gray-700/50 max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/50 p-6 z-10">
              <div className="flex items-start justify-between">
                <div className="flex-1 mr-4">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-bold text-white mb-2"
                  >
                    {project.title}
                  </motion.h2>
                  <p className="text-gray-400 mb-2">{project.subtitle}</p>
                  <span className="text-blue-400 font-medium">
                    {project.year}
                  </span>
                </div>

                {/* Right side buttons */}
                <div className="flex items-center gap-2">
                  {/* Website Link */}
                  <motion.a
                    href={project.links.live.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MdOpenInNew className="w-4 h-4" />
                    {project.links.live.label}
                  </motion.a>

                  {/* Close Button */}
                  <motion.button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800/50 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MdClose className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div
              ref={scrollRef}
              className="overflow-y-auto max-h-[calc(90vh-120px)] modal-scrollable"
            >
              {/* Cover Image - OG 1200:630 ratio */}
              <div
                className="relative w-full"
                style={{ aspectRatio: '1200/630' }}
              >
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-8"
                >
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {project.description}
                  </p>
                </motion.div>

                {/* Highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <h3 className="text-xl font-bold text-white mb-4">
                    {t.projects.ui.highlights}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {project.highlights.map((highlight, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30"
                      >
                        {highlight}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Tech Stack */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                  <h3 className="text-xl font-bold text-white mb-4">
                    {t.projects.ui.techStack}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(project.techStack).map(
                      ([category, techs], idx) => (
                        <motion.div
                          key={category}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + idx * 0.1 }}
                          className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50"
                        >
                          <h4 className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">
                            {category}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {techs.map((tech, techIdx) => (
                              <span
                                key={techIdx}
                                className="px-2 py-1 bg-gray-700/50 text-gray-300 text-sm rounded border border-gray-600/50"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )
                    )}
                  </div>
                </motion.div>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8"
                >
                  <h3 className="text-xl font-bold text-white mb-6">
                    {t.projects.ui.features}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.features.map((feature, idx) => {
                      const IconComponent =
                        IconMap[feature.icon as keyof typeof IconMap] ||
                        MdFlashOn
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + idx * 0.1 }}
                          className="bg-gray-800/50 p-6 rounded-lg border border-gray-700/50"
                        >
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-500/20 rounded-lg">
                              <IconComponent className="w-6 h-6 text-blue-400" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-white mb-2">
                                {feature.title}
                              </h4>
                              <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                                {feature.description}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {feature.technologies.map((tech, techIdx) => (
                                  <span
                                    key={techIdx}
                                    className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>

                {/* Results */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-8"
                >
                  <h3 className="text-xl font-bold text-white mb-6">
                    {t.projects.ui.results}
                  </h3>

                  {/* Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {project.results.metrics.map((metric, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + idx * 0.1 }}
                        className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 rounded-lg border border-blue-500/30"
                      >
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white mb-1">
                            {metric.value}
                          </div>
                          <div className="text-sm text-gray-400">
                            {metric.label}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Achievements */}
                  <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700/50">
                    <h4 className="text-lg font-semibold text-white mb-4">
                      {t.projects.ui.achievements}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {project.results.achievements.map((achievement, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + idx * 0.1 }}
                          className="flex items-center gap-3 text-gray-300"
                        >
                          <div className="w-2 h-2 bg-green-400 rounded-full" />
                          <span className="text-sm">{achievement}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
