export type Locale = {
  code: string
  country: string
  flag: string
  language: string
  currency: string
  currencySymbol: string
}

export const locales: Record<string, Locale> = {
  'en-GB': {
    code: 'en-GB',
    country: 'United Kingdom',
    flag: '🇬🇧',
    language: 'British English',
    currency: 'GBP',
    currencySymbol: '£',
  },
  'en-US': {
    code: 'en-US',
    country: 'United States',
    flag: '🇺🇸',
    language: 'American English',
    currency: 'USD',
    currencySymbol: '$',
  },
  'en-NZ': {
    code: 'en-NZ',
    country: 'New Zealand',
    flag: '🇳🇿',
    language: 'New Zealand English',
    currency: 'NZD',
    currencySymbol: '$',
  },
  'en-AU': {
    code: 'en-AU',
    country: 'Australia',
    flag: '🇦🇺',
    language: 'Australian English',
    currency: 'AUD',
    currencySymbol: '$',
  },
  'en-CA': {
    code: 'en-CA',
    country: 'Canada',
    flag: '🇨🇦',
    language: 'Canadian English',
    currency: 'CAD',
    currencySymbol: '$',
  },
}
