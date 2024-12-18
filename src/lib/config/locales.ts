export interface Locale {
  code: string
  country: string
  flag: string
  language: string
}

export const locales: Record<string, Locale> = {
  'en-US': {
    code: 'en-US',
    country: 'United States',
    flag: '🇺🇸',
    language: 'English',
  },
  'en-GB': {
    code: 'en-GB',
    country: 'United Kingdom',
    flag: '🇬🇧',
    language: 'English',
  },
  'es-ES': {
    code: 'es-ES',
    country: 'Spain',
    flag: '🇪🇸',
    language: 'Spanish',
  },
  'fr-FR': {
    code: 'fr-FR',
    country: 'France',
    flag: '🇫🇷',
    language: 'French',
  },
  'de-DE': {
    code: 'de-DE',
    country: 'Germany',
    flag: '🇩🇪',
    language: 'German',
  },
  'it-IT': {
    code: 'it-IT',
    country: 'Italy',
    flag: '🇮🇹',
    language: 'Italian',
  },
  'pt-BR': {
    code: 'pt-BR',
    country: 'Brazil',
    flag: '🇧🇷',
    language: 'Portuguese',
  },
  'zh-CN': {
    code: 'zh-CN',
    country: 'China',
    flag: '🇨🇳',
    language: 'Chinese',
  },
  'ja-JP': {
    code: 'ja-JP',
    country: 'Japan',
    flag: '🇯🇵',
    language: 'Japanese',
  },
  'ko-KR': {
    code: 'ko-KR',
    country: 'South Korea',
    flag: '🇰🇷',
    language: 'Korean',
  },
}
