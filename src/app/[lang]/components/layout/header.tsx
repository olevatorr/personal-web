'use client'

import { cn } from '@/app/[lang]/lib/utils'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useTranslation } from '@/app/[lang]/lib/useTranslation'
import { type Language } from '@/app/[lang]/lib/i18n'
import LanguageSwitcher from '@/app/[lang]/components/LanguageSwitcher'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const pathname = usePathname()

  // 獲取當前語系
  const currentLang = pathname.split('/')[1] as Language
  const t = useTranslation(currentLang)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="px-4 py-4 flex justify-end items-center gap-4">
          {/* 語系切換器 */}
          <LanguageSwitcher />

          {/* 選單按鈕 */}
          <button
            className="flex flex-col items-center justify-center cursor-pointer hover:opacity-70 transition-opacity duration-300 group"
            aria-label={t.header.ariaLabel}
            onClick={() => setIsOpen(!isOpen)}
            type="button"
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              <span
                className={cn(
                  'block absolute w-7 h-px bg-white rounded transition-all duration-300',
                  isOpen
                    ? 'rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                    : 'rotate-0 top-[38%] left-1/2 -translate-x-1/2'
                )}
              />
              <span
                className={cn(
                  'block absolute w-7 h-px group-hover:-rotate-10 bg-white rounded transition-all duration-300',
                  isOpen
                    ? '!-rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                    : 'rotate-0 top-[62%] left-1/2 -translate-x-1/2'
                )}
              />
            </div>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm z-40 min-w-[400px] w-[40vw] h-screen"
            initial={{
              x: '100%'
            }}
            animate={{
              x: 0
            }}
            exit={{
              x: '100%'
            }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
              delayChildren: 0.5,
              staggerChildren: 0.2
            }}
          >
            <div className="px-4 py-15 flex flex-col gap-5">
              <div className="flex flex-col gap-4 text-6xl justify-center text-white items-end font-bold">
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative"
                >
                  <Link
                    href="#portfolio"
                    onClick={() => setIsOpen(false)}
                    onMouseEnter={() => setHoveredItem('portfolio')}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="relative z-10"
                  >
                    {t.header.navigation.portfolio}
                  </Link>
                  <AnimatePresence>
                    {hoveredItem === 'portfolio' && (
                      <motion.div
                        className="absolute bottom-0 right-0 h-[60%] bg-blue-500 -z-1"
                        initial={{ width: 0 }}
                        animate={{ width: '90%' }}
                        exit={{ width: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="relative"
                >
                  <Link
                    href="#skills"
                    onClick={() => setIsOpen(false)}
                    onMouseEnter={() => setHoveredItem('skills')}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="relative z-10"
                  >
                    {t.header.navigation.skills}
                  </Link>
                  <AnimatePresence>
                    {hoveredItem === 'skills' && (
                      <motion.div
                        className="absolute bottom-0 right-0 h-[60%] bg-blue-500 -z-1"
                        initial={{ width: 0 }}
                        animate={{ width: '90%' }}
                        exit={{ width: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="relative"
                >
                  <Link
                    href="#projects"
                    onClick={() => setIsOpen(false)}
                    onMouseEnter={() => setHoveredItem('projects')}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="relative z-10"
                  >
                    {t.header.navigation.projects}
                  </Link>
                  <AnimatePresence>
                    {hoveredItem === 'projects' && (
                      <motion.div
                        className="absolute bottom-0 right-0 h-[60%] bg-blue-500 -z-1"
                        initial={{ width: 0 }}
                        animate={{ width: '90%' }}
                        exit={{ width: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
              <div className="flex flex-col gap-4 text-6xl justify-center items-end font-bold">
                <Link
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="relative z-10 text-white"
                >
                  {t.header.navigation.contact}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
