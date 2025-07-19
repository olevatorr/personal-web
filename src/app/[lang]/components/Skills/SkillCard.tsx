'use client'
import { motion } from 'motion/react'
import { getSkillIcon } from '@/app/[lang]/lib/utils'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { isValidLanguage, defaultLanguage } from '@/app/[lang]/lib/i18n'

interface SkillCardProps {
  skill: {
    title: string
    icon: string
    highlight?: 'primary' | 'secondary' | boolean
    level?: 'expert' | 'proficient' | 'familiar'
  }
  index: number
  delay: number
}

export default function SkillCard({ skill, index, delay }: SkillCardProps) {
  const IconComponent = getSkillIcon(skill.icon)
  const [isHovered, setIsHovered] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)

  const params = useParams()
  const langParam = params.lang as string
  const lang = isValidLanguage(langParam) ? langParam : defaultLanguage

  // 判斷是否為強調技能
  const isHighlighted =
    skill.highlight === 'primary' || skill.highlight === true
  const isSecondaryHighlight = skill.highlight === 'secondary'

  // 國際化文字
  const getTexts = () => {
    if (lang === 'zh-TW') {
      return {
        coreSkill: '核心技能',
        proficientSkill: '熟練技能'
      }
    } else {
      return {
        coreSkill: 'Core',
        proficientSkill: 'Proficient'
      }
    }
  }

  const texts = getTexts()

  // 根據強調等級設定樣式
  const getCardStyles = () => {
    const baseStyles = animationComplete 
      ? 'rounded-lg p-6 relative transition-all duration-300'
      : 'rounded-lg p-6 relative'

    if (isHighlighted) {
      return `${baseStyles} bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-2 border-purple-400/50 hover:border-purple-400/80 hover:bg-gradient-to-br hover:from-purple-500/30 hover:to-blue-500/30 shadow-xl shadow-purple-500/25 hover:shadow-2xl hover:shadow-purple-500/40${animationComplete ? ' hover:scale-105' : ''}`
    }

    if (isSecondaryHighlight) {
      return `${baseStyles} bg-gradient-to-br from-blue-500/15 to-cyan-500/15 border-2 border-blue-400/40 hover:border-blue-400/70 hover:bg-gradient-to-br hover:from-blue-500/25 hover:to-cyan-500/25 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30${animationComplete ? ' hover:scale-105' : ''}`
    }

    return `${baseStyles} bg-white/10 border border-white/20 hover:bg-white/20 shadow-md shadow-white/10 hover:shadow-lg${animationComplete ? ' hover:scale-105' : ''}`
  }

  // 根據強調等級設定圖示和文字樣式
  const getIconSize = () => {
    if (isHighlighted) return 'w-10 h-10'
    if (isSecondaryHighlight) return 'w-9 h-9'
    return 'w-8 h-8'
  }

  const getTextStyles = () => {
    return 'text-white font-medium text-sm'
  }

  const getContainerSize = () => {
    return 'w-12 h-12'
  }

  // 星級評分系統
  const getStarRating = () => {
    if (isHighlighted) return 3
    if (isSecondaryHighlight) return 2
    return 1
  }

  // 重要程度標籤
  const getImportanceLabel = () => {
    if (isHighlighted) return texts.coreSkill
    if (isSecondaryHighlight) return texts.proficientSkill
    return null
  }


  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: 3 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: delay + index * 0.1,
        ease: [0.4, 0, 0.2, 1] // 使用更高效的 easing
      }}
      viewport={{ once: true }}
      className={getCardStyles()}
      style={{ 
        willChange: animationComplete ? 'auto' : 'opacity, transform',
        backfaceVisibility: 'hidden',
        perspective: 1000
      }}
      onAnimationComplete={() => setAnimationComplete(true)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 重要程度標籤 */}
      {getImportanceLabel() && (
        <div className="absolute top-2 right-2 bg-white/30 rounded-full px-2 py-px text-[10px] font-medium text-white border border-white/40 z-10">
          {getImportanceLabel()}
        </div>
      )}

      <div className="flex flex-col items-center justify-between gap-3 h-full">
        <div
          className={`flex-shrink-0 ${getContainerSize()} flex items-center justify-center relative`}
        >
          <IconComponent
            className={`${getIconSize()} text-white transition-all duration-300`}
          />
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className={`${getTextStyles()} text-center`}>
            {skill.title}
          </span>

          {/* 星級評分 */}
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-3 h-1 rounded-sm transition-all duration-300 ${
                  i < getStarRating()
                    ? 'bg-yellow-400 shadow-sm shadow-yellow-400/50'
                    : 'bg-gray-500/50'
                }`}
                animate={{
                  scale: isHovered && i < getStarRating() ? [1, 1.2, 1] : 1
                }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>

          {/* 技能等級指示器（如果有設定） */}
          {skill.level && (
            <div className="flex gap-1 mt-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-1 rounded-full transition-all duration-300 ${
                    skill.level === 'expert'
                      ? 'bg-green-400'
                      : skill.level === 'proficient' && i < 2
                        ? 'bg-yellow-400'
                        : skill.level === 'familiar' && i < 1
                          ? 'bg-orange-400'
                          : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
