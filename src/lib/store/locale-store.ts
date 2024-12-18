import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LocaleState {
  locale: string
  setLocale: (locale: string) => void
}

export const useLocale = create<LocaleState>()(
  persist(
    (set) => ({
      locale: 'en-US',
      setLocale: (locale: string) => set({ locale }),
    }),
    {
      name: 'studently-locale',
    }
  )
)
