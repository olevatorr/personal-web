'use client'
import { useTranslation } from '@/app/[lang]/lib/useTranslation'
import { useParams } from 'next/navigation'
import { isValidLanguage, defaultLanguage } from '@/app/[lang]/lib/i18n'

export default function JsonLd() {
  const params = useParams()
  const langParam = params.lang as string
  const lang = isValidLanguage(langParam) ? langParam : defaultLanguage
  const t = useTranslation(lang)

  // Personal/Professional Schema
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Otis Chen',
    alternateName: '陳奕融',
    jobTitle: lang === 'zh-TW' ? '前端工程師' : 'Frontend Developer',
    description: t.meta.description,
    url: 'https://otischen.dev',
    sameAs: [
      'https://github.com/otis1596',
      'https://linkedin.com/in/otis-chen-b7a2a424b',
      'mailto:otis1596@gmail.com'
    ],
    image: 'https://otischen.dev/opengraph-image.png',
    worksFor: {
      '@type': 'Organization',
      name: '亞璿資訊有限公司',
      alternateName: 'YS-Inforware Co., Ltd.'
    },
    knowsAbout: [
      'Frontend Development',
      'Vue.js',
      'Nuxt.js',
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'TailwindCSS',
      'GSAP Animation',
      'SEO Optimization',
      'WordPress Development',
      'Full-Stack Development'
    ],
    alumniOf: {
      '@type': 'Organization',
      name: '國立臺灣師範大學',
      alternateName: 'National Taiwan Normal University'
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TW',
      addressRegion: 'Taiwan'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'otis1596@gmail.com',
      contactType: 'professional inquiry'
    }
  }

  // Website Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: t.meta.title,
    description: t.meta.description,
    url: 'https://otischen.dev',
    author: {
      '@type': 'Person',
      name: 'Otis Chen'
    },
    inLanguage: lang === 'zh-TW' ? 'zh-TW' : 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://otischen.dev/?search={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }

  // Professional Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: lang === 'zh-TW' ? 'Otis Chen 前端開發服務' : 'Otis Chen Frontend Development Services',
    description: lang === 'zh-TW' 
      ? '專業前端開發服務，包含 Vue.js、Nuxt.js、React、Next.js 等現代框架開發，SEO 優化，動畫效果實作'
      : 'Professional frontend development services including Vue.js, Nuxt.js, React, Next.js modern framework development, SEO optimization, animation effects implementation',
    provider: {
      '@type': 'Person',
      name: 'Otis Chen'
    },
    areaServed: {
      '@type': 'Country',
      name: 'Taiwan'
    },
    serviceType: [
      'Frontend Development',
      'Web Development',
      'SEO Optimization',
      'WordPress Development',
      'Animation Development'
    ],
    url: 'https://otischen.dev'
  }

  // Portfolio/CreativeWork Schema for Projects
  const portfolioSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: lang === 'zh-TW' ? 'Otis Chen 作品集' : 'Otis Chen Portfolio',
    description: lang === 'zh-TW' 
      ? '展示前端開發、全端開發、SEO 優化等專業技能的作品集'
      : 'Portfolio showcasing professional skills in frontend development, full-stack development, SEO optimization',
    creator: {
      '@type': 'Person',
      name: 'Otis Chen'
    },
    url: 'https://otischen.dev',
    workExample: t.projects.items.slice(0, 5).map(project => ({
      '@type': 'CreativeWork',
      name: project.title,
      description: project.description,
      url: project.links.live.href,
      dateCreated: project.year,
      creator: {
        '@type': 'Person',
        name: 'Otis Chen'
      },
      keywords: project.techStack.frontend?.concat(project.techStack.backend || []).join(', ')
    }))
  }

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://otischen.dev'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t.header.navigation[0], // Skills
        item: `https://otischen.dev/${lang}#${t.header.navigation[0]}`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: t.header.navigation[1], // Experiences
        item: `https://otischen.dev/${lang}#${t.header.navigation[1]}`
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: t.header.navigation[2], // Projects
        item: `https://otischen.dev/${lang}#${t.header.navigation[2]}`
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: t.header.navigation[3], // Contact
        item: `https://otischen.dev/${lang}#${t.header.navigation[3]}`
      }
    ]
  }

  return (
    <>
      {/* Person Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema)
        }}
      />
      
      {/* Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
      
      {/* Professional Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema)
        }}
      />
      
      {/* Portfolio Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioSchema)
        }}
      />
      
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
    </>
  )
}