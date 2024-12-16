import { createContext, useContext, useEffect, useState } from 'react'
import { themes, type Theme } from '@/lib/config/themes'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: string
  storageKey?: string
}

type ThemeProviderState = {
  theme: string
  setTheme: (theme: string) => void
  themes: Theme[]
}

const initialState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => null,
  themes: themes,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'studently-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark', 'blue')
    root.classList.add(theme)

    const currentTheme = themes.find((t) => t.name === theme)
    if (currentTheme) {
      const style = document.documentElement.style
      Object.entries(currentTheme.colors).forEach(([key, value]) => {
        style.setProperty(`--${key}`, value)
      })
    }

    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  const value = {
    theme,
    setTheme,
    themes,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
