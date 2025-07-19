import { MetadataRoute } from 'next'
import { languages } from '@/app/[lang]/lib/i18n'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://otischen.dev'
  
  // Generate sitemap entries for each language
  const languageRoutes = languages.flatMap(lang => [
    {
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/${lang}#Skills`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/${lang}#Experiences`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/${lang}#Projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/${lang}#Contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    }
  ])

  // Add root redirect
  const rootRoute = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1.0,
  }

  return [rootRoute, ...languageRoutes]
}