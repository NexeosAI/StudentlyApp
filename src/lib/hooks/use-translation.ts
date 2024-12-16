import { useLocale } from '@/lib/store/locale-store'
import { translations } from '@/lib/i18n/translations'

export function useTranslation() {
  const { locale } = useLocale()
  return {
    t: (path: string) => {
      const keys = path.split('.')
      let current: any = translations[locale]
      
      for (const key of keys) {
        if (current[key] === undefined) {
          console.warn(`Translation key not found: ${path}`)
          return path
        }
        current = current[key]
      }
      
      return current
    },
    locale,
  }
}
