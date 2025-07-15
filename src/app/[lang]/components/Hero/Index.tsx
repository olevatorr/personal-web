'use client'

import { motion } from 'motion/react'
import { useScrollMotion, useParallax } from '@/app/[lang]/lib/useScrollMotion'
import { useTranslation } from '@/app/[lang]/lib/useTranslation'
import { useParams } from 'next/navigation'
import { isValidLanguage, defaultLanguage } from '@/app/[lang]/lib/i18n'
import ShinyText from '@/app/[lang]/components/Atom/ShinyText'
import RotatingText from '@/app/[lang]/components/RotatingText'

export default function Hero() {
  const { scrollY } = useScrollMotion()
  const parallaxY = useParallax(0.5)
  const params = useParams()
  const langParam = params.lang as string
  const lang = isValidLanguage(langParam) ? langParam : defaultLanguage
  const t = useTranslation(lang)

  return (
    <motion.section
      className="h-screen flex max-w-7xl mx-auto items-center justify-center relative px-5 sm:px-10"
      style={{ y: parallaxY }}
    >
      <motion.div
        className="text-left text-white z-10 w-full"
        initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
        animate={{ opacity: 1, x: 0, filter: 'blur(0px)'}}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-6xl font-bold mb-4 flex items-center gap-10"
          whileHover={{ scale: 1.05, origin: 'center' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <span className="text-blue-500">{t.hero.title}</span>
          <RotatingText
            texts={t.hero.titleTexts}
            staggerFrom={'last'}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden py-1 md:py-2 bg-blue-500 px-3 rounded-lg"
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </motion.h1>
        <motion.div
          className="text-xl mb-8 text-gray-300 max-w-[40vw]"
          initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.4, duration: 0.6 }}
        >
          <ShinyText text={t.hero.subtitle} />
        </motion.div>
        <motion.button
          className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t.hero.cta}
        </motion.button>
      </motion.div>

      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          y: useParallax(0.2),
          rotate: scrollY
        }}
      >
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full opacity-40" />
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full opacity-40" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full opacity-40" />
      </motion.div>
    </motion.section>
  )
}
