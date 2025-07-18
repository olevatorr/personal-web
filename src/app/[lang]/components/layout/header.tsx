'use client'

import { cn } from '@/app/[lang]/lib/utils'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useTranslation } from '@/app/[lang]/lib/useTranslation'
import { type Language } from '@/app/[lang]/lib/i18n'
import LanguageSwitcher from '@/app/[lang]/components/LanguageSwitcher'
import { useLenis } from '@/app/[lang]/lib/useLenis'
import { FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const pathname = usePathname()
  const lenis = useLenis()

  // 獲取當前語系
  const currentLang = pathname.split('/')[1] as Language
  const t = useTranslation(currentLang)

  const handleScrollTo = (target: string) => {
    setIsOpen(false)
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.5 })
    }
  }

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
            className="fixed top-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm z-40 min-w-[400px] w-[100vw] lg:w-[40vw] h-dvh"
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
            <div className="px-4 pt-20 pb-10 flex flex-col justify-between h-full">
              <div className="flex flex-col gap-4 text-4xl lg:text-6xl justify-center text-white items-end font-bold">
                {t.header.navigation.map((item, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.5, delay: 0.3 * index }}
                    className="relative"
                    key={item}
                  >
                    <button
                      onClick={() => handleScrollTo(`#${item}`)}
                      onMouseEnter={() => setHoveredItem(item)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className="relative z-10 text-white hover:text-gray-300 transition-colors"
                    >
                      {item}
                    </button>
                    <AnimatePresence>
                      {hoveredItem === item && (
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
                ))}
              </div>

              {/* Social Media Links */}
              <motion.div
                initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex gap-3 items-center justify-end mt-8"
              >
                <Link
                  href="https://github.com/otischen"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center gap-3 px-2 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-200 text-sm"
                >
                  <FaGithub className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
                </Link>

                <Link
                  href="https://linkedin.com/in/otischen"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center gap-3 px-2 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-200 text-sm"
                >
                  <FaLinkedin className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
                </Link>

                <Link
                  href="/cv/otis-chen-cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg transition-all duration-200 text-sm"
                >
                  <FaDownload className="w-4 h-4 text-white" />
                  <span className="text-white font-medium">
                    {t.header.social.resume}
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
