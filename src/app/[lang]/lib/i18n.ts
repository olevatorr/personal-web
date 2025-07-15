export const languages = ['en-US', 'zh-TW'] as const
export type Language = (typeof languages)[number]

export const defaultLanguage: Language = 'zh-TW'

export function isValidLanguage(lang: string): lang is Language {
  return languages.includes(lang as Language)
}

export function getLanguageFromPath(path: string): Language {
  const lang = path.split('/')[1]
  return isValidLanguage(lang) ? lang : defaultLanguage
}

export function createLocalizedPath(path: string, lang: Language): string {
  return `/${lang}${path}`
}
