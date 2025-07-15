import { translations, type Translation } from '@/app/[lang]/data'
import { type Language } from './i18n'

export function useTranslation(lang: Language): Translation {
  return translations[lang] || translations['zh-TW']
}

export function getTranslation(lang: Language): Translation {
  return translations[lang] || translations['zh-TW']
}
