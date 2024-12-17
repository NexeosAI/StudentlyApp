import { useEffect, useState } from 'react'

export function useLocale() {
  const [locale, setLocale] = useState<string>('en')

  useEffect(() => {
    // Get browser's language preference
    const browserLocale = navigator.language.split('-')[0]
    // You can add more supported languages here
    const supportedLocales = ['en', 'es', 'fr']
    
    if (supportedLocales.includes(browserLocale)) {
      setLocale(browserLocale)
    }
  }, [])

  const changeLocale = (newLocale: string) => {
    setLocale(newLocale)
  }

  return {
    locale,
    changeLocale
  }
}
