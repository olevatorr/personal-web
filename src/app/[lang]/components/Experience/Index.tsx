'use client'
import { motion } from 'motion/react'
import { useTranslation } from '@/app/[lang]/lib/useTranslation'
import { useParams } from 'next/navigation'
import { isValidLanguage, defaultLanguage } from '@/app/[lang]/lib/i18n'
import { useState } from 'react'
import Title from '@/app/[lang]/components/Atom/Title'
import { cn } from '@/app/[lang]/lib/utils'

interface ExperienceItemProps {
  experience: {
    title: string
    company: string
    date: string
    badge: string[]
    description: {
      summary: string
      details: {
        title: string
        list: string[]
      }[]
    }
  }
  index: number
}

const ExperienceItem = ({ experience, index }: ExperienceItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)

  return (
    <motion.div
      className="relative flex items-start mb-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: index * 0.3 }}
      viewport={{ once: true }}
    >
      {/* 時間線 */}
      <div className="flex flex-col items-center mr-8">
        {/* 時間點 */}
        <motion.div
          className="w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full border-3 border-white shadow-lg z-10"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4, delay: index * 0.3 + 0.2 }}
          viewport={{ once: true }}
        />
      </div>

      {/* 內容卡片 */}
      <motion.div
        className={cn(
          'card-glass rounded-xl p-6 flex-1 border border-white/20 hover:border-white/40 relative overflow-hidden',
          animationComplete
            ? 'transition-[all_0.3s_cubic-bezier(0.4,0,0.2,1)]'
            : ''
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.3 + 0.3 }}
        viewport={{ once: true }}
        onAnimationComplete={() => setAnimationComplete(true)}
      >
        {/* 卡片背景特效 */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-sm"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-white/20 to-transparent"></div>

        {/* 動態光效 */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-3 left-3 w-8 h-8 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-3 right-3 w-6 h-6 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-lg animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10">
          {/* 標題和公司 */}
          <div className="mb-4 md:mb-10 flex md:items-center flex-col md:flex-row gap-2 md:gap-10 justify-between">
            <h3 className="text-xl font-bold text-white mb-2 text-left md:text-center">
              {experience.company}
            </h3>
            <div className="flex md:items-center items-start md:gap-5 flex-col md:flex-row gap-2">
              <p className="text-blue-300 font-semibold text-nowrap">
                {experience.title}
              </p>
              <span className="text-gray-300 text-sm hidden md:block"> | </span>
              <p className="text-gray-300 text-sm text-nowrap">
                {experience.date}
              </p>
            </div>
          </div>

          {/* 技術標籤 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {experience.badge.map((tech, techIndex) => (
              <motion.span
                key={tech}
                className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white text-xs rounded-full border border-purple-500/30"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.3 + 0.5 + techIndex * 0.1
                }}
                viewport={{ once: true }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* 描述 */}
          <div className="text-gray-300">
            <p className="mb-4">{experience.description.summary}</p>

            <motion.button
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200 mb-4"
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </motion.button>

            {/* 詳細內容 */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: isExpanded ? 'auto' : 0,
                opacity: isExpanded ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-4">
                {experience.description.details.map((detail, detailIndex) => (
                  <div key={detailIndex}>
                    <h4 className="text-white font-semibold mb-2">
                      {detail.title}
                    </h4>
                    <ul className="space-y-1">
                      {detail.list.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="text-gray-300 text-sm pl-4 relative"
                        >
                          <span className="absolute left-0 text-purple-400">
                            •
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Experience() {
  const params = useParams()
  const langParam = params.lang as string
  const lang = isValidLanguage(langParam) ? langParam : defaultLanguage
  const t = useTranslation(lang)

  const experienceData = t.experiences

  return (
    <motion.section
      id={t.header.navigation[1]}
      className="relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <motion.div className="text-center mx-auto px-8 py-15 w-full rounded-xl relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          {/* 標題 */}
          <Title title={experienceData.title} />

          {/* 時間線容器 */}
          <div className="relative">
            {/* 主時間線 */}
            <motion.div
              className="absolute left-[23px] top-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500 timeline-neon"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              transition={{ duration: 1.5, delay: 0.2 }}
              viewport={{ once: true }}
            />

            {/* 霓虹燈效果動畫 */}
            <motion.div
              className="absolute left-[23px] top-0 w-0.5 timeline-glow"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              transition={{ duration: 1.5, delay: 0.2 }}
              viewport={{ once: true }}
            />

            {/* 經驗項目 */}
            <div className="pl-4">
              {experienceData.items.map((experience, index) => (
                <ExperienceItem
                  key={index}
                  experience={experience}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}
