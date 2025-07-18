'use client'

import { ReactNode, useEffect, useRef, createContext, useContext } from 'react'
import Lenis from 'lenis'

interface LenisProviderProps {
  children: ReactNode
}

interface LenisContextType {
  lenis: Lenis | null
  disable: () => void
  enable: () => void
}

const LenisContext = createContext<LenisContextType | null>(null)

export const useLenis = () => {
  const context = useContext(LenisContext)
  if (!context) {
    throw new Error('useLenis must be used within a LenisProvider')
  }
  return context
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef = useRef<number | null>(null)

  const createLenis = () => {
    if (lenisRef.current) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false
    })

    lenisRef.current = lenis

    function raf(time: number) {
      if (lenisRef.current) {
        lenisRef.current.raf(time)
        rafRef.current = requestAnimationFrame(raf)
      }
    }

    rafRef.current = requestAnimationFrame(raf)
  }

  const destroyLenis = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    if (lenisRef.current) {
      lenisRef.current.destroy()
      lenisRef.current = null
    }
  }

  useEffect(() => {
    createLenis()
    return destroyLenis
  }, [])

  const disable = () => {
    destroyLenis()
  }

  const enable = () => {
    createLenis()
  }

  const contextValue = {
    lenis: lenisRef.current,
    disable,
    enable
  }

  return (
    <LenisContext.Provider value={contextValue}>
      {children}
    </LenisContext.Provider>
  )
}
