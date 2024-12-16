import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { locales } from '@/lib/config/locales'

type LocaleStore = {
  locale: string
  setLocale: (locale: string) => void
}

export const useLocale = create<LocaleStore>()(
  persist(
    (set) => ({
      locale: 'en-GB',
      setLocale: (locale: string) => {
        if (!locales[locale]) {
          console.warn(`Invalid locale: ${locale}, defaulting to en-GB`)
          locale = 'en-GB'
        }
        set({ locale })
      },
    }),
    {
      name: 'locale-storage',
    }
  )
)
