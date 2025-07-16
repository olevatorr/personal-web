'use client'

import Hero from '@/app/[lang]/components/Hero/Index'
import { motion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useTranslation } from '@/app/[lang]/lib/useTranslation'
import { type Language } from '@/app/[lang]/lib/i18n'
import Skills from '@/app/[lang]/components/Skills/Index'
import Aurora from '@/app/[lang]/components/AuroraBg'

export default function HomePage() {
  const pathname = usePathname()
  const currentLang = pathname.split('/')[1] as Language
  const t = useTranslation(currentLang)

  return (
    <main className="overflow-hidden relative space-y-20">
      <div className="absolute inset-0 h-[500px]">
        <Aurora
          colorStops={['#3A29FF', '#FF94B4', '#FF3232']}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      {/* Hero Section */}
      <Hero />

      <Skills />

      <section className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold mb-6 text-gray-800">
                {t.homepage.sections.customScrollbar.title}
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                {t.homepage.sections.customScrollbar.description}
              </p>
              <ul className="space-y-2 text-gray-600">
                {t.homepage.sections.customScrollbar.features.map(
                  (feature, index) => (
                    <li key={index}>• {feature}</li>
                  )
                )}
              </ul>
            </motion.div>
            <motion.div
              className="bg-white rounded-xl p-8 shadow-lg"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="text-2xl font-bold mb-4 text-gray-800">
                {t.homepage.sections.customScrollbar.highlights.title}
              </h4>
              <div className="space-y-3 text-gray-600">
                {t.homepage.sections.customScrollbar.highlights.items.map(
                  (item, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full mr-3 ${
                          index === 0
                            ? 'bg-blue-500'
                            : index === 1
                              ? 'bg-purple-500'
                              : 'bg-green-500'
                        }`}
                      ></div>
                      <span>{item}</span>
                    </div>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 內容區域 3 */}
      <section className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
        <motion.div
          className="text-center max-w-4xl mx-auto p-8"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-8 text-white">
            {t.homepage.sections.technicalFeatures.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <motion.div
              className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4 text-white">
                {t.homepage.sections.technicalFeatures.lenis.title}
              </h3>
              <p className="text-gray-200">
                {t.homepage.sections.technicalFeatures.lenis.description}
              </p>
            </motion.div>
            <motion.div
              className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4 text-white">
                {t.homepage.sections.technicalFeatures.motion.title}
              </h3>
              <p className="text-gray-200">
                {t.homepage.sections.technicalFeatures.motion.description}
              </p>
            </motion.div>
            <motion.div
              className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4 text-white">
                {t.homepage.sections.technicalFeatures.react.title}
              </h3>
              <p className="text-gray-200">
                {t.homepage.sections.technicalFeatures.react.description}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
