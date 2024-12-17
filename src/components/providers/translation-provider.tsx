import { createContext, useContext, ReactNode } from 'react'
import { useLocale } from '@/lib/store/locale-store'
import { translations } from '@/lib/i18n/translations'

type TranslationContextType = {
  t: (key: string) => string
  locale: string
}

const TranslationContext = createContext<TranslationContextType | null>(null)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const { locale } = useLocale()

  const t = (path: string) => {
    try {
      const keys = path.split('.')
      let current: any = translations[locale]

      if (!current) {
        console.warn(`Locale ${locale} not found, falling back to 'en'`)
        current = translations['en']
      }
      
      for (const key of keys) {
        if (!current || current[key] === undefined) {
          console.warn(`Translation key not found: ${path}`)
          return path
        }
        current = current[key]
      }
      
      return current
    } catch (error) {
      console.error('Translation error:', error)
      return path
    }
  }

  const value = {
    t,
    locale
  }

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === null) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}
