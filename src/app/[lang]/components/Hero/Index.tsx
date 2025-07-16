'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useTranslation } from '@/app/[lang]/lib/useTranslation'
import { useParams } from 'next/navigation'
import { isValidLanguage, defaultLanguage } from '@/app/[lang]/lib/i18n'
import ShinyText from '@/app/[lang]/components/Atom/ShinyText'
import RotatingText from '@/app/[lang]/components/RotatingText'
import { useState, useEffect, useRef } from 'react'
import { cn } from '@/app/[lang]/lib/utils'

// 響應式 hook
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

export default function Hero() {
  const params = useParams()
  const langParam = params.lang as string
  const lang = isValidLanguage(langParam) ? langParam : defaultLanguage
  const t = useTranslation(lang)
  const [hoverItem, sethoverItem] = useState<string | null>(null)
  const [showBackend, setShowBackend] = useState(false)
  const [typewriterText, setTypewriterText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const typewriterRef = useRef<NodeJS.Timeout | null>(null)

  // 響應式媒體查詢
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  // 打字機效果
  useEffect(() => {
    const constTexts = t.hero.const
    const currentText = constTexts[currentIndex]

    const typeSpeed = isDeleting ? 50 : 100
    const deleteSpeed = 50

    if (typewriterRef.current) {
      clearTimeout(typewriterRef.current)
    }

    typewriterRef.current = setTimeout(
      () => {
        if (!isDeleting) {
          // 打字階段
          if (typewriterText.length < currentText.length) {
            setTypewriterText(
              currentText.substring(0, typewriterText.length + 1)
            )
          } else {
            // 完成打字，等待2秒後開始刪除
            typewriterRef.current = setTimeout(() => {
              setIsDeleting(true)
            }, 2000)
            return
          }
        } else {
          // 刪除階段
          if (typewriterText.length > 0) {
            setTypewriterText(
              typewriterText.substring(0, typewriterText.length - 1)
            )
          } else {
            // 完成刪除，切換到下一個文字
            setIsDeleting(false)
            setCurrentIndex(prev => (prev + 1) % constTexts.length)
          }
        }
      },
      isDeleting ? deleteSpeed : typeSpeed
    )

    return () => {
      if (typewriterRef.current) {
        clearTimeout(typewriterRef.current)
      }
    }
  }, [typewriterText, currentIndex, isDeleting, t.hero.const])

  // Backend 元素顯示
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBackend(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // 清理函數
  useEffect(() => {
    return () => {
      if (typewriterRef.current) {
        clearTimeout(typewriterRef.current)
      }
    }
  }, [])
  return (
    <motion.section
      className="h-screen flex max-w-7xl mx-auto items-center justify-center relative px-5 sm:px-10"
    >
      <motion.div
        className="text-left text-white z-10 w-full"
        initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl font-bold mb-4 flex items-center gap-5 justify-start flex-wrap">
          <motion.span
            whileHover={{ scale: 1.05, origin: 'center', rotate: -3 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="text-blue-500"
            onMouseEnter={() => sethoverItem('title')}
            onMouseLeave={() => sethoverItem(null)}
          >
            {hoverItem === 'title' ? t.hero.titleHover : t.hero.title}
          </motion.span>
          <RotatingText
            texts={t.hero.titleTexts}
            staggerFrom={'first'}
            staggerDuration={0.04}
            splitLevelClassName="overflow-hidden py-1 md:py-2 bg-blue-500 px-3 rounded-lg"
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            rotationInterval={3000}
          />
        </h1>
        <motion.div
          className={cn(
            'text-xl mb-8 text-gray-300 rounded-lg',
            hoverItem !== 'subtitle' && 'w-full'
          )}
          initial={{
            opacity: 0,
            x: -50,
            filter: 'blur(10px)',
            width: isDesktop ? '40vw' : '100%'
          }}
          animate={{
            opacity: 1,
            x: 0,
            filter: hoverItem === 'subtitle' ? 'blur(0px)' : 'blur(0px)',
            width: isDesktop ? '40vw' : '100%'
          }}
          onMouseEnter={() => sethoverItem('subtitle')}
          onMouseLeave={() => sethoverItem(null)}
          whileHover={{
            padding: '10px 20px',
            fontSize: '32px',
            width: '100%',
            minHeight: '10vh',
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }}
          transition={{
            type: 'spring',
            damping: 30,
            stiffness: 400,
            delay: 0.4,
            duration: 0.6
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={hoverItem === 'subtitle' ? 'hover' : 'normal'}
              initial={{ opacity: 0, filter: 'blur(5px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(5px)' }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut'
              }}
            >
              {hoverItem === 'subtitle' ? (
                <span className="text-xl mb-8 text-gray-300">
                  {t.hero.hoverSubtitle}
                </span>
              ) : (
                <ShinyText text={t.hero.subtitle} />
              )}
            </motion.div>
          </AnimatePresence>
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
        className="absolute inset-0 opacity-60 pointer-events-none"
      >
        {/* Coding-style background: angle brackets, code block, and cursor */}
        <motion.div
          className="absolute top-24 left-24 flex items-center space-x-2"
          animate={{
            y: [0, -8, 0],
            rotate: [0, 2, -2, 0]
          }}
          transition={{
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          <motion.span
            className="text-6xl font-bold text-white/80 select-none"
            style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.5)' }}
            animate={{
              scale: [1, 1.1, 1],
              textShadow: [
                '0 0 20px rgba(255, 255, 255, 0.5)',
                '0 0 30px rgba(147, 51, 234, 0.8)',
                '0 0 20px rgba(255, 255, 255, 0.5)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {'<'}
          </motion.span>
          <motion.span
            className="bg-white/80 rounded px-4 font-mono text-[30px] text-black shadow-lg select-none"
            animate={{
              backgroundColor: [
                'rgba(255, 255, 255, 0.8)',
                'rgba(147, 51, 234, 0.9)',
                'rgba(255, 255, 255, 0.8)'
              ],
              color: [
                'rgba(0, 0, 0, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(0, 0, 0, 1)'
              ],
              boxShadow: [
                '0 4px 6px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.3)',
                '0 8px 15px rgba(147, 51, 234, 0.6), 0 0 30px rgba(147, 51, 234, 0.8)',
                '0 4px 6px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.3)'
              ]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {'code'}
          </motion.span>
          <motion.span
            className="text-6xl font-bold text-white/80 select-none"
            style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.5)' }}
            animate={{
              scale: [1, 1.1, 1],
              textShadow: [
                '0 0 20px rgba(255, 255, 255, 0.5)',
                '0 0 30px rgba(147, 51, 234, 0.8)',
                '0 0 20px rgba(255, 255, 255, 0.5)'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5
            }}
          >
            {'/>'}
          </motion.span>
        </motion.div>

        <motion.div
          className="absolute bottom-24 right-24 flex items-center"
          animate={{
            x: [0, 10, 0],
            y: [0, -5, 0]
          }}
          transition={{
            x: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          {/* const 元素 */}
          <motion.span
            className="bg-white/80 rounded px-3 py-1 font-mono text-base text-black shadow select-none"
            animate={{
              scale: [1, 1.05, 1],
              backgroundColor: [
                'rgba(255, 255, 255, 0.8)',
                'rgba(59, 130, 246, 0.9)',
                'rgba(255, 255, 255, 0.8)'
              ],
              color: [
                'rgba(0, 0, 0, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(0, 0, 0, 1)'
              ],
              boxShadow: [
                '0 4px 6px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 255, 255, 0.3)',
                '0 8px 15px rgba(59, 130, 246, 0.6), 0 0 25px rgba(59, 130, 246, 0.8)',
                '0 4px 6px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 255, 255, 0.3)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            const
          </motion.span>

          {/* otis 元素 */}
          <motion.span
            className="ml-2 bg-white/75 rounded px-2 py-1 font-mono text-base text-green-700 shadow select-none"
            animate={{
              scale: [1, 1.08, 1],
              backgroundColor: [
                'rgba(255, 255, 255, 0.75)',
                'rgba(34, 197, 94, 0.8)',
                'rgba(255, 255, 255, 0.75)'
              ],
              color: [
                'rgba(21, 128, 61, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(21, 128, 61, 1)'
              ],
              boxShadow: [
                '0 4px 6px rgba(0, 0, 0, 0.3), 0 0 15px rgba(34, 197, 94, 0.4)',
                '0 8px 15px rgba(34, 197, 94, 0.6), 0 0 25px rgba(34, 197, 94, 0.8)',
                '0 4px 6px rgba(0, 0, 0, 0.3), 0 0 15px rgba(34, 197, 94, 0.4)'
              ]
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5
            }}
          >
            otis
          </motion.span>

          {/* = 元素 */}
          <motion.span
            className="ml-2 bg-white/70 rounded px-2 py-1 font-mono text-base text-orange-700 shadow select-none"
            animate={{
              scale: [1, 1.12, 1],
              backgroundColor: [
                'rgba(255, 255, 255, 0.7)',
                'rgba(249, 115, 22, 0.8)',
                'rgba(255, 255, 255, 0.7)'
              ],
              color: [
                'rgba(194, 65, 12, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(194, 65, 12, 1)'
              ],
              boxShadow: [
                '0 4px 6px rgba(0, 0, 0, 0.3), 0 0 15px rgba(249, 115, 22, 0.4)',
                '0 8px 15px rgba(249, 115, 22, 0.6), 0 0 25px rgba(249, 115, 22, 0.8)',
                '0 4px 6px rgba(0, 0, 0, 0.3), 0 0 15px rgba(249, 115, 22, 0.4)'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1
            }}
          >
            =
          </motion.span>

          {/* "" 打字機元素 */}
          <motion.span
            className="ml-2 bg-white/70 rounded px-2 py-1 font-mono text-base text-purple-700 shadow select-none inline-block"
            animate={{
              scale: [1, 1.1, 1],
              backgroundColor: [
                'rgba(255, 255, 255, 0.7)',
                'rgba(147, 51, 234, 0.8)',
                'rgba(255, 255, 255, 0.7)'
              ],
              color: [
                'rgba(126, 34, 206, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(126, 34, 206, 1)'
              ],
              boxShadow: [
                '0 4px 6px rgba(0, 0, 0, 0.3), 0 0 15px rgba(147, 51, 234, 0.4)',
                '0 8px 15px rgba(147, 51, 234, 0.6), 0 0 25px rgba(147, 51, 234, 0.8)',
                '0 4px 6px rgba(0, 0, 0, 0.3), 0 0 15px rgba(147, 51, 234, 0.4)'
              ]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5
            }}
          >
            {typewriterText}
          </motion.span>
          <motion.span
            className="ml-2 w-1 h-6 bg-purple-400 rounded-sm"
            style={{ boxShadow: '0 0 10px rgba(168, 85, 247, 0.8)' }}
            animate={{
              opacity: [1, 0, 1],
              scaleY: [1, 1.2, 1],
              boxShadow: [
                '0 0 10px rgba(168, 85, 247, 0.8)',
                '0 0 20px rgba(168, 85, 247, 1)',
                '0 0 10px rgba(168, 85, 247, 0.8)'
              ]
            }}
            transition={{
              opacity: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
              scaleY: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
              boxShadow: { duration: 1, repeat: Infinity, ease: 'easeInOut' }
            }}
          />
        </motion.div>

        <motion.div
          className="absolute top-3/4 left-1/3 -translate-y-1/2 flex items-center"
          animate={{
            rotate: [0, 3, -3, 0],
            y: [0, -12, 0]
          }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          <motion.span
            className="bg-white/75 rounded px-2 py-1 font-mono text-sm text-black shadow select-none"
            animate={{
              scale: [1, 1.15, 1],
              backgroundColor: [
                'rgba(255, 255, 255, 0.75)',
                'rgba(34, 197, 94, 0.9)',
                'rgba(255, 255, 255, 0.75)'
              ],
              color: [
                'rgba(0, 0, 0, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(0, 0, 0, 1)'
              ],
              boxShadow: [
                '0 4px 6px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 255, 255, 0.3)',
                '0 8px 15px rgba(34, 197, 94, 0.6), 0 0 25px rgba(34, 197, 94, 0.8)',
                '0 4px 6px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 255, 255, 0.3)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {'['}
          </motion.span>
          <motion.span
            className="mx-2 bg-white/65 rounded px-2 py-1 font-mono text-xs text-black shadow select-none"
            animate={{
              scale: [1, 1.2, 1],
              backgroundColor: [
                'rgba(255, 255, 255, 0.65)',
                'rgba(34, 197, 94, 0.8)',
                'rgba(255, 255, 255, 0.65)'
              ],
              color: [
                'rgba(0, 0, 0, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(0, 0, 0, 1)'
              ],
              boxShadow: [
                '0 4px 6px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 255, 255, 0.3)',
                '0 8px 15px rgba(34, 197, 94, 0.6), 0 0 25px rgba(34, 197, 94, 0.8)',
                '0 4px 6px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 255, 255, 0.3)'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2
            }}
          >
            {'frontend'}
          </motion.span>
          <AnimatePresence>
            {showBackend && (
              <>
                <motion.span
                  className="bg-white/60 rounded px-2 py-1 font-mono text-xs text-black shadow select-none"
                  initial={{ opacity: 0, scale: 0, x: -5 }}
                  animate={{
                    opacity: 1,
                    scale: [0, 0.5, 1],
                    x: 0,
                    backgroundColor: [
                      'rgba(255, 255, 255, 0.6)',
                      'rgba(147, 51, 234, 0.8)',
                      'rgba(255, 255, 255, 0.6)'
                    ],
                    color: [
                      'rgba(0, 0, 0, 1)',
                      'rgba(255, 255, 255, 1)',
                      'rgba(0, 0, 0, 1)'
                    ],
                    boxShadow: [
                      '0 4px 6px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 255, 255, 0.3)',
                      '0 8px 15px rgba(239, 68, 68, 0.6), 0 0 25px rgba(239, 68, 68, 0.8)',
                      '0 4px 6px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 255, 255, 0.3)'
                    ]
                  }}
                  transition={{
                    scale: { duration: 0.6, ease: 'easeOut' },
                    opacity: { duration: 0.6, ease: 'easeOut' },
                    x: { duration: 0.6, ease: 'easeOut' },
                    backgroundColor: {
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1
                    },
                    color: {
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1
                    },
                    boxShadow: {
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1
                    }
                  }}
                >
                  {','}
                </motion.span>
                <motion.span
                  className="mx-2 bg-white/60 rounded px-2 py-1 font-mono text-xs text-black shadow select-none"
                  initial={{ opacity: 0, scale: 0, x: -10 }}
                  animate={{
                    opacity: 1,
                    scale: [0, 1.3, 1],
                    x: 0,
                    backgroundColor: [
                      'rgba(255, 255, 255, 0.6)',
                      'rgba(239, 68, 68, 0.8)',
                      'rgba(255, 255, 255, 0.6)'
                    ],
                    color: [
                      'rgba(0, 0, 0, 1)',
                      'rgba(255, 255, 255, 1)',
                      'rgba(0, 0, 0, 1)'
                    ],
                    boxShadow: [
                      '0 4px 6px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 255, 255, 0.3)',
                      '0 8px 15px rgba(239, 68, 68, 0.6), 0 0 25px rgba(239, 68, 68, 0.8)',
                      '0 4px 6px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 255, 255, 0.3)'
                    ]
                  }}
                  transition={{
                    scale: { duration: 0.6, ease: 'easeOut' },
                    opacity: { duration: 0.6, ease: 'easeOut' },
                    x: { duration: 0.6, ease: 'easeOut' },
                    backgroundColor: {
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1
                    },
                    color: {
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1
                    },
                    boxShadow: {
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1
                    }
                  }}
                >
                  {'backend'}
                </motion.span>
              </>
            )}
          </AnimatePresence>
          <motion.span
            className="bg-white/75 rounded px-2 py-1 font-mono text-sm text-black shadow select-none"
            animate={{
              scale: [1, 1.15, 1],
              backgroundColor: [
                'rgba(255, 255, 255, 0.75)',
                'rgba(34, 197, 94, 0.9)',
                'rgba(255, 255, 255, 0.75)'
              ],
              color: [
                'rgba(0, 0, 0, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(0, 0, 0, 1)'
              ],
              boxShadow: [
                '0 4px 6px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 255, 255, 0.3)',
                '0 8px 15px rgba(34, 197, 94, 0.6), 0 0 25px rgba(34, 197, 94, 0.8)',
                '0 4px 6px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 255, 255, 0.3)'
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5
            }}
          >
            {']'}
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
