import { pricing } from '../config/pricing'
import { locales } from '../config/locales'

export function formatPrice(amount: number, locale: string): string {
  const localeConfig = locales[locale]
  if (!localeConfig) return `$${amount}`

  const numberFormat = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: localeConfig.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return numberFormat.format(amount)
}

export function getCurrencyCode(locale: string): string {
  const localeConfig = locales[locale]
  if (!localeConfig) return 'USD'
  return localeConfig.currency
}

export function getPriceForLocale(planId: string, interval: 'monthly' | 'yearly', locale: string): number {
  const plan = pricing.find(p => p.id === planId)
  if (!plan) return 0

  const tier = plan.tiers.find(t => t.interval === interval)
  if (!tier) return 0

  return tier.price[locale] || tier.price['en-US'] // fallback to USD if locale not found
}

export function getFormattedPriceForLocale(
  planId: string,
  interval: 'monthly' | 'yearly',
  locale: string
): string {
  const price = getPriceForLocale(planId, interval, locale)
  return formatPrice(price, locale)
}
