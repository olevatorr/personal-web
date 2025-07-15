import { en } from './en'
import { zh } from './zh'

export const translations = {
  'en-US': en,
  'zh-TW': zh
} as const

export type TranslationKey = keyof typeof translations
export type Translation = (typeof translations)[TranslationKey]

export { en, zh }
