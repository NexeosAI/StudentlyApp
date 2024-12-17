import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { locales } from '../config/locales'

type LocaleStore = {
  locale: string
  setLocale: (locale: string) => void
}

const SUPPORTED_LOCALES = Object.keys(locales)
const DEFAULT_LOCALE = 'en-GB'

export const useLocale = create<LocaleStore>()(
  persist(
    (set) => ({
      locale: DEFAULT_LOCALE,
      setLocale: (locale: string) => {
        if (!SUPPORTED_LOCALES.includes(locale)) {
          console.warn(`Locale ${locale} not supported, defaulting to ${DEFAULT_LOCALE}`)
          locale = DEFAULT_LOCALE
        }
        set({ locale })
      },
    }),
    {
      name: 'locale-storage',
    }
  )
)
