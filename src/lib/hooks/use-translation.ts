import { useLocale } from '@/lib/store/locale-store'
import { translations, Translations } from '@/lib/i18n/translations'

type PathsToStringProps<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>]
    }[Extract<keyof T, string>]

type Join<T extends string[], D extends string> = T extends []
  ? never
  : T extends [infer F]
  ? F
  : T extends [infer F, ...infer R]
  ? F extends string
    ? `${F}${D}${Join<Extract<R, string[]>, D>}`
    : never
  : string

type TranslationKeys = Join<PathsToStringProps<Translations[keyof Translations]>, '.'>

export function useTranslation() {
  const { locale } = useLocale()

  const getNestedValue = <T extends Record<string, any>>(
    obj: T,
    path: string[]
  ): string | undefined => {
    return path.reduce((acc, key) => {
      if (acc && typeof acc === 'object' && key in acc) {
        return acc[key]
      }
      return undefined
    }, obj as any)
  }

  const t = (path: TranslationKeys): string => {
    try {
      const keys = path.split('.')
      const localeTranslations = translations[locale] || translations['en-GB']
      
      if (!localeTranslations) {
        console.error(`No translations found for locale: ${locale}`)
        return path
      }
      
      const value = getNestedValue(localeTranslations, keys)
      
      if (value === undefined) {
        console.warn(`Translation key not found: ${path} in locale: ${locale}`)
        // Try fallback locale
        const fallbackValue = getNestedValue(translations['en-GB'], keys)
        return fallbackValue || path
      }
      
      if (typeof value !== 'string') {
        console.error(`Invalid translation type for key: ${path}. Expected string, got ${typeof value}`)
        return path
      }
      
      return value
    } catch (error) {
      console.error('Translation error:', error)
      return path
    }
  }

  const hasTranslation = (path: TranslationKeys): boolean => {
    try {
      const keys = path.split('.')
      const localeTranslations = translations[locale]
      
      if (!localeTranslations) return false
      
      const value = getNestedValue(localeTranslations, keys)
      return typeof value === 'string'
    } catch {
      return false
    }
  }

  return { t, locale, hasTranslation }
}