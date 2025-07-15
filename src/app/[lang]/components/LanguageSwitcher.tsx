'use client'

import { usePathname, useRouter } from 'next/navigation'
import { languages, type Language } from '@/app/[lang]/lib/i18n'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/app/[lang]/lib/utils'

const languageNames = {
  'en-US': 'English',
  'zh-TW': '繁體中文'
} as const

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  // 從路徑中提取當前語系
  const currentLang = pathname.split('/')[1] as Language

  const handleLanguageChange = (lang: Language) => {
    // 建構新的路徑
    const segments = pathname.split('/')
    segments[1] = lang
    const newPath = segments.join('/')

    router.push(newPath)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-white hover:text-gray-300 transition-colors duration-200 border border-white/20 rounded-lg backdrop-blur-sm"
        aria-label="切換語系"
      >
        <span className="text-sm font-mono">
          {currentLang === 'zh-TW' ? '繁' : 'EN'}
        </span>
        <svg
          className={cn(
            'w-4 h-4 transition-transform duration-200',
            isOpen ? 'rotate-180' : 'rotate-0'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 min-w-[120px] bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden z-50"
          >
            {languages.map(lang => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={cn(
                  'w-full px-4 py-2 text-left text-sm font-mono transition-colors duration-200',
                  currentLang === lang
                    ? 'bg-white/20 text-white'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                )}
              >
                {languageNames[lang]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
