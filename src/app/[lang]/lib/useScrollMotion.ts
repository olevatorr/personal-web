import { useEffect, useRef } from 'react'
import { useMotionValue, useTransform, useScroll } from 'motion/react'
import { useLenis } from './useLenis'

export function useScrollMotion() {
  const lenis = useLenis()
  const scrollY = useMotionValue(0)
  const scrollProgress = useMotionValue(0)

  useEffect(() => {
    if (!lenis) return

    const updateScrollValues = () => {
      scrollY.set(lenis.scroll)
      scrollProgress.set(lenis.progress)
    }

    lenis.on('scroll', updateScrollValues)

    return () => {
      lenis.off('scroll', updateScrollValues)
    }
  }, [lenis, scrollY, scrollProgress])

  return {
    scrollY,
    scrollProgress,
    lenis
  }
}

export function useParallax(offset: number = 0.5) {
  const { scrollY } = useScrollMotion()

  return useTransform(scrollY, [0, 1000], [0, offset * 1000])
}

export function useParallaxScale(
  startScale: number = 0.8,
  endScale: number = 1.2,
  scrollRange: number = 1000
) {
  const { scrollY } = useScrollMotion()

  return useTransform(scrollY, [0, scrollRange], [startScale, endScale])
}

export function useScrollOpacity(start: number = 0, end: number = 500) {
  const { scrollY } = useScrollMotion()

  return useTransform(scrollY, [start, end], [0, 1])
}
