'use client'

import Hero from '@/app/[lang]/components/Hero/Index'
import Skills from '@/app/[lang]/components/Skills/Index'
import Experience from '@/app/[lang]/components/Experience/Index'
import Aurora from '@/app/[lang]/components/AuroraBg'

export default function HomePage() {
  return (
    <main className="overflow-hidden relative space-y-20">
      <div className="absolute inset-0 h-[500px]">
        <Aurora
          colorStops={['#64113F', '#34D1BF', '#2B7FFF']}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      {/* Hero Section */}
      <Hero />

      <Skills />

      <Experience />

    </main>
  )
}
