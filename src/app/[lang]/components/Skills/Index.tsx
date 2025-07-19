'use client'
import { motion } from 'motion/react'
import { useTranslation } from '@/app/[lang]/lib/useTranslation'
import { useParams } from 'next/navigation'
import { isValidLanguage, defaultLanguage } from '@/app/[lang]/lib/i18n'
import TextPressure from '../Atom/TextPressure'
import SkillCard from './SkillCard'
import Title from '@/app/[lang]/components/Atom/Title'

interface Skill {
  title: string
  icon: string
  highlight?: 'primary' | 'secondary' | boolean
  level?: 'expert' | 'proficient' | 'familiar'
}

interface SkillSectionProps {
  title: string
  skills: Skill[]
  delay: number
}

const SkillSection = ({ title, skills, delay }: SkillSectionProps) => {
  return (
    <div className="mb-12 grid grid-cols-1 lg:grid-cols-[150px_1fr] lg:gap-10">
      <motion.h3
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        className="text-2xl font-bold text-white mb-6 text-left"
      >
        {title}
      </motion.h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {skills.map((skill, index) => (
          <SkillCard
            key={skill.title}
            skill={skill}
            index={index}
            delay={delay}
          />
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const params = useParams()
  const langParam = params.lang as string
  const lang = isValidLanguage(langParam) ? langParam : defaultLanguage
  const t = useTranslation(lang)

  const skillsData = t.skills

  return (
    <motion.section
      id={t.header.navigation[0]}
      className="relative"
      initial={{ padding: '0px 0px' }}
      whileInView={{ padding: '0px 40px' }}
      transition={{ duration: 0.6, delay: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="text-center mx-auto px-8 py-15 w-full rounded-xl relative overflow-hidden">
        {/* 背景裝飾 */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 backdrop-blur-sm" />
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-xl" />
          <div className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-xl" />
          <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-xl" />
          <div className="absolute bottom-32 right-1/4 w-18 h-18 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full blur-xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 py-20">
          <Title title={skillsData.title} />

          <div className="space-y-16">
            {skillsData.categories.map((category, index) => (
              <SkillSection
                key={category.title}
                title={category.title}
                skills={category.skills}
                delay={0.2 + index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>

      <motion.div className="">
        <TextPressure
          text="Accelerate"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="#ffffff30"
          minFontSize={36}
        />
      </motion.div>
    </motion.section>
  )
}
