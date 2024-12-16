export type Theme = {
  name: string
  label: string
  colors: {
    background: string
    foreground: string
    card: string
    cardForeground: string
    popover: string
    popoverForeground: string
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    muted: string
    mutedForeground: string
    accent: string
    accentForeground: string
    destructive: string
    destructiveForeground: string
    border: string
    input: string
    ring: string
  }
}

export const themes: Theme[] = [
  {
    name: 'light',
    label: 'Light',
    colors: {
      background: '#FFFFFF',
      foreground: '#111827', // neutral-900
      card: '#F9FAFB', // neutral-50
      cardForeground: '#111827',
      popover: '#FFFFFF',
      popoverForeground: '#111827',
      primary: '#FF5C00', // brand-primary
      primaryForeground: '#FFFFFF',
      secondary: '#FF7A2E', // brand-secondary
      secondaryForeground: '#FFFFFF',
      muted: '#F3F4F6', // neutral-100
      mutedForeground: '#374151', // neutral-700
      accent: '#FFF3EB', // brand-accent
      accentForeground: '#111827',
      destructive: '#FF4545', // error-500
      destructiveForeground: '#FFFFFF',
      border: '#D1D5DB', // neutral-300
      input: '#D1D5DB',
      ring: '#FF5C00',
    },
  },
  {
    name: 'dark',
    label: 'Dark',
    colors: {
      background: '#111827', // neutral-900
      foreground: '#F9FAFB', // neutral-50
      card: '#1F2937',
      cardForeground: '#F9FAFB',
      popover: '#1F2937',
      popoverForeground: '#F9FAFB',
      primary: '#FF5C00', // brand-primary
      primaryForeground: '#FFFFFF',
      secondary: '#FF7A2E', // brand-secondary
      secondaryForeground: '#FFFFFF',
      muted: '#374151', // neutral-700
      mutedForeground: '#D1D5DB', // neutral-300
      accent: '#4B5563',
      accentForeground: '#F9FAFB',
      destructive: '#FF4545', // error-500
      destructiveForeground: '#FFFFFF',
      border: '#374151',
      input: '#374151',
      ring: '#FF5C00',
    },
  },
  {
    name: 'blue',
    label: 'Blue',
    colors: {
      background: '#E6F3FF', // primary-100
      foreground: '#111827',
      card: '#FFFFFF',
      cardForeground: '#111827',
      popover: '#FFFFFF',
      popoverForeground: '#111827',
      primary: '#0066CC', // primary-500
      primaryForeground: '#FFFFFF',
      secondary: '#004C99', // primary-700
      secondaryForeground: '#FFFFFF',
      muted: '#F3F4F6',
      mutedForeground: '#374151',
      accent: '#E6F3FF',
      accentForeground: '#111827',
      destructive: '#FF4545',
      destructiveForeground: '#FFFFFF',
      border: '#D1D5DB',
      input: '#D1D5DB',
      ring: '#0066CC',
    },
  },
]
