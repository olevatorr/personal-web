'use client'
import { motion } from 'motion/react'
import { useParallax, useParallaxScale } from '@/app/[lang]/lib/useScrollMotion'
import { useTranslation } from '@/app/[lang]/lib/useTranslation'
import { useParams } from 'next/navigation'
import { isValidLanguage, defaultLanguage } from '@/app/[lang]/lib/i18n'

export default function Skills() {
  const params = useParams()
  const langParam = params.lang as string
  const lang = isValidLanguage(langParam) ? langParam : defaultLanguage
  const t = useTranslation(lang)
  return (
    <>
      {' '}
      <section className="min-h-[150vh] px-5 sm:px-10 flex items-center justify-center">
        <motion.div
          className="glass | text-center mx-auto px-8 py-15 w-full min-h-[80vh] rounded-xl"
          style={{ y: useParallax(0.2), scale: useParallaxScale(0.5, 1) }}
        >
          <h2 className="text-5xl font-bold mb-8 text-white">
            {t.homepage.sections.scrollExperience.title}
          </h2>
          <p className="text-xl text-white leading-relaxed">
            {t.homepage.sections.scrollExperience.description}
          </p>
        </motion.div>
      </section>
    </>
  )
}
