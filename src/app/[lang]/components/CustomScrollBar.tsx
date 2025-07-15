'use client'

import { motion, useTransform } from 'motion/react'
import { useScrollMotion } from '@/app/[lang]/lib/useScrollMotion'
import { useEffect, useRef, useState } from 'react'

export default function CustomScrollBar() {
  const { scrollProgress, lenis } = useScrollMotion()
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const scrollBarRef = useRef<HTMLDivElement>(null)

  const opacity = useTransform(scrollProgress, [0, 0.01], [0.3, 0.7])
  
  const indicatorHeight = useTransform(scrollProgress, [0, 1], ["4px", "100%"])
  
  // 處理點擊跳轉
  const handleClick = (e: React.MouseEvent) => {
    if (!scrollBarRef.current || !lenis) return

    const rect = scrollBarRef.current.getBoundingClientRect()
    const clickY = e.clientY - rect.top
    const percentage = clickY / rect.height

    // 獲取文檔總高度
    const documentHeight = document.documentElement.scrollHeight
    const windowHeight = window.innerHeight
    const maxScroll = documentHeight - windowHeight

    // 計算目標滾動位置
    const targetScroll = percentage * maxScroll

    lenis.scrollTo(targetScroll)
  }

  // 拖拽功能
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    handleClick(e)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    handleClick(e)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // 監聽全域滑鼠事件
  useEffect(() => {
    if (!isDragging) return

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!scrollBarRef.current || !lenis) return

      const rect = scrollBarRef.current.getBoundingClientRect()
      const mouseY = e.clientY - rect.top
      const percentage = Math.max(0, Math.min(1, mouseY / rect.height))

      const documentHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight
      const maxScroll = documentHeight - windowHeight
      const targetScroll = percentage * maxScroll

      lenis.scrollTo(targetScroll)
    }

    const handleGlobalMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mousemove', handleGlobalMouseMove)
    document.addEventListener('mouseup', handleGlobalMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging, lenis])

  return (
    <div className="fixed right-4 top-0 h-full flex items-center z-10">
      <div
        ref={scrollBarRef}
        className="relative h-[80px] w-1.5 bg-gray-200 dark:bg-gray-800 rounded-full cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <motion.div
          className="absolute inset-0 bg-gray-300 dark:bg-gray-700 rounded-full"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: isHovered || isDragging ? 0.6 : 0.3 }}
          transition={{ duration: 0.2 }}
        />

        <motion.div
          className="absolute left-0 w-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full shadow-lg"
          style={{ 
            height: indicatorHeight,
            opacity: opacity
          }}
          animate={{ 
            scaleX: isHovered || isDragging ? 1.2 : 1,
            opacity: isHovered || isDragging ? 1 : 0.7
          }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </div>
  )
}
