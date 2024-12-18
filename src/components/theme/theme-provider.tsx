import { createContext, useContext, useEffect, useState } from 'react'
import { themes, type Theme } from '../../lib/config/themes'

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
  defaultTheme = 'system',
  storageKey = 'studently-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<string>(() => {
    const storedTheme = localStorage.getItem(storageKey)
    if (storedTheme) return storedTheme
    
    if (defaultTheme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }
    
    return defaultTheme
  })

  useEffect(() => {
    const root = window.document.documentElement

    // Remove all possible theme classes first
    root.classList.remove('light', 'dark', 'blue')
    
    // Add the current theme class
    root.classList.add(theme)

    // Find and apply the current theme colors
    const currentTheme = themes.find((t) => t.name === theme)
    if (currentTheme) {
      Object.entries(currentTheme.colors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}`, value)
      })
    }

    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  // Listen for system theme changes if using system theme
  useEffect(() => {
    if (defaultTheme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      
      const handleChange = (e: MediaQueryListEvent) => {
        setTheme(e.matches ? 'dark' : 'light')
      }
      
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [defaultTheme])

  const value = {
    theme,
    setTheme,
    themes,
  }

  return (
    <ThemeProviderContext.Provider value={value} {...props}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
