import dayjs from 'dayjs'
import { locales } from '@/lib/config/locales'

export function formatDate(date: Date | string, locale: string): string {
  const localeConfig = locales[locale]
  if (!localeConfig) return dayjs(date).format('DD/MM/YYYY')
  return dayjs(date).format(localeConfig.dateFormat)
}

export function formatTime(date: Date | string, locale: string): string {
  const localeConfig = locales[locale]
  if (!localeConfig) return dayjs(date).format('HH:mm')
  return dayjs(date).format(localeConfig.timeFormat)
}

export function formatNumber(
  number: number,
  locale: string,
  options?: Intl.NumberFormatOptions
): string {
  const localeConfig = locales[locale]
  if (!localeConfig) return number.toString()

  const formatter = new Intl.NumberFormat(locale, {
    ...options,
    useGrouping: true,
  })

  return formatter.format(number)
}

export function formatCurrency(
  amount: number,
  locale: string,
  options?: Intl.NumberFormatOptions
): string {
  const localeConfig = locales[locale]
  if (!localeConfig) return amount.toString()

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: localeConfig.currency,
    ...options,
  })

  return formatter.format(amount)
}

export function formatPercent(
  number: number,
  locale: string,
  options?: Intl.NumberFormatOptions
): string {
  const localeConfig = locales[locale]
  if (!localeConfig) return `${number}%`

  const formatter = new Intl.NumberFormat(locale, {
    style: 'percent',
    ...options,
  })

  return formatter.format(number)
}
