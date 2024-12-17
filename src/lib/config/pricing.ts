type PricingTier = {
  id: string
  price: Record<string, number>
  interval: 'monthly' | 'yearly'
}

export type Plan = {
  id: string
  name: string
  description: string
  features: string[]
  tiers: PricingTier[]
}

export const pricing: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Perfect for individual students',
    features: [
      'AI-powered study recommendations',
      'Basic note-taking tools',
      'Flashcard creation',
      'Limited practice tests',
    ],
    tiers: [
      {
        id: 'basic-monthly',
        interval: 'monthly',
        price: {
          'en-GB': 4.99,  // GBP
          'en-US': 5.99,  // USD
          'en-CA': 7.99,  // CAD
          'en-AU': 8.99,  // AUD
          'en-NZ': 9.99,  // NZD
          'en-IE': 4.99,  // EUR
          'en-ZA': 99.99, // ZAR
          'en-IN': 499,   // INR
          'en-SG': 7.99,  // SGD
          'de-DE': 4.99,  // EUR
          'fr-FR': 4.99,  // EUR
          'it-IT': 4.99,  // EUR
          'es-ES': 4.99,  // EUR
          'pt-PT': 4.99,  // EUR
          'nl-NL': 4.99,  // EUR
          'el-GR': 4.99,  // EUR
          'pl-PL': 19.99, // PLN
          'hu-HU': 1799,  // HUF
          'cs-CZ': 129,   // CZK
          'sk-SK': 4.99,  // EUR
          'ro-RO': 24.99, // RON
          'bg-BG': 9.99,  // BGN
          'hr-HR': 4.99,  // EUR
          'sl-SI': 4.99,  // EUR
          'et-EE': 4.99,  // EUR
          'lv-LV': 4.99,  // EUR
          'lt-LT': 4.99,  // EUR
          'fi-FI': 4.99,  // EUR
          'sv-SE': 59.99, // SEK
          'da-DK': 39.99, // DKK
          'mt-MT': 4.99,  // EUR
          'cy-CY': 4.99,  // EUR
          'be-BE': 4.99,  // EUR
          'lu-LU': 4.99,  // EUR
        }
      },
      {
        id: 'basic-yearly',
        interval: 'yearly',
        price: {
          'en-GB': 49.99,   // GBP
          'en-US': 59.99,   // USD
          'en-CA': 79.99,   // CAD
          'en-AU': 89.99,   // AUD
          'en-NZ': 99.99,   // NZD
          'en-IE': 49.99,   // EUR
          'en-ZA': 999.99,  // ZAR
          'en-IN': 4999,    // INR
          'en-SG': 79.99,   // SGD
          'de-DE': 49.99,   // EUR
          'fr-FR': 49.99,   // EUR
          'it-IT': 49.99,   // EUR
          'es-ES': 49.99,   // EUR
          'pt-PT': 49.99,   // EUR
          'nl-NL': 49.99,   // EUR
          'el-GR': 49.99,   // EUR
          'pl-PL': 199.99,  // PLN
          'hu-HU': 17999,   // HUF
          'cs-CZ': 1299,    // CZK
          'sk-SK': 49.99,   // EUR
          'ro-RO': 249.99,  // RON
          'bg-BG': 99.99,   // BGN
          'hr-HR': 49.99,   // EUR
          'sl-SI': 49.99,   // EUR
          'et-EE': 49.99,   // EUR
          'lv-LV': 49.99,   // EUR
          'lt-LT': 49.99,   // EUR
          'fi-FI': 49.99,   // EUR
          'sv-SE': 599.99,  // SEK
          'da-DK': 399.99,  // DKK
          'mt-MT': 49.99,   // EUR
          'cy-CY': 49.99,   // EUR
          'be-BE': 49.99,   // EUR
          'lu-LU': 49.99,   // EUR
        }
      }
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Best for serious students',
    features: [
      'Everything in Basic',
      'Advanced AI study planning',
      'Unlimited practice tests',
      'Progress analytics',
      'Study group collaboration',
    ],
    tiers: [
      {
        id: 'pro-monthly',
        interval: 'monthly',
        price: {
          'en-GB': 9.99,   // GBP
          'en-US': 11.99,  // USD
          'en-CA': 15.99,  // CAD
          'en-AU': 16.99,  // AUD
          'en-NZ': 17.99,  // NZD
          'en-IE': 9.99,   // EUR
          'en-ZA': 199.99, // ZAR
          'en-IN': 999,    // INR
          'en-SG': 15.99,  // SGD
          'de-DE': 9.99,   // EUR
          'fr-FR': 9.99,   // EUR
          'it-IT': 9.99,   // EUR
          'es-ES': 9.99,   // EUR
          'pt-PT': 9.99,   // EUR
          'nl-NL': 9.99,   // EUR
          'el-GR': 9.99,   // EUR
          'pl-PL': 39.99,  // PLN
          'hu-HU': 3599,   // HUF
          'cs-CZ': 259,    // CZK
          'sk-SK': 9.99,   // EUR
          'ro-RO': 49.99,  // RON
          'bg-BG': 19.99,  // BGN
          'hr-HR': 9.99,   // EUR
          'sl-SI': 9.99,   // EUR
          'et-EE': 9.99,   // EUR
          'lv-LV': 9.99,   // EUR
          'lt-LT': 9.99,   // EUR
          'fi-FI': 9.99,   // EUR
          'sv-SE': 119.99, // SEK
          'da-DK': 79.99,  // DKK
          'mt-MT': 9.99,   // EUR
          'cy-CY': 9.99,   // EUR
          'be-BE': 9.99,   // EUR
          'lu-LU': 9.99,   // EUR
        }
      },
      {
        id: 'pro-yearly',
        interval: 'yearly',
        price: {
          'en-GB': 99.99,   // GBP
          'en-US': 119.99,  // USD
          'en-CA': 159.99,  // CAD
          'en-AU': 169.99,  // AUD
          'en-NZ': 179.99,  // NZD
          'en-IE': 99.99,   // EUR
          'en-ZA': 1999.99, // ZAR
          'en-IN': 9999,    // INR
          'en-SG': 159.99,  // SGD
          'de-DE': 99.99,   // EUR
          'fr-FR': 99.99,   // EUR
          'it-IT': 99.99,   // EUR
          'es-ES': 99.99,   // EUR
          'pt-PT': 99.99,   // EUR
          'nl-NL': 99.99,   // EUR
          'el-GR': 99.99,   // EUR
          'pl-PL': 399.99,  // PLN
          'hu-HU': 35999,   // HUF
          'cs-CZ': 2599,    // CZK
          'sk-SK': 99.99,   // EUR
          'ro-RO': 499.99,  // RON
          'bg-BG': 199.99,  // BGN
          'hr-HR': 99.99,   // EUR
          'sl-SI': 99.99,   // EUR
          'et-EE': 99.99,   // EUR
          'lv-LV': 99.99,   // EUR
          'lt-LT': 99.99,   // EUR
          'fi-FI': 99.99,   // EUR
          'sv-SE': 1199.99, // SEK
          'da-DK': 799.99,  // DKK
          'mt-MT': 99.99,   // EUR
          'cy-CY': 99.99,   // EUR
          'be-BE': 99.99,   // EUR
          'lu-LU': 99.99,   // EUR
        }
      }
    ]
  }
]
