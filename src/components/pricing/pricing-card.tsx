import { useTranslation } from 'react-i18next'
import { useLocale } from '@/lib/hooks/use-locale'
import { getFormattedPriceForLocale } from '@/lib/utils/price-formatter'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CheckIcon } from 'lucide-react'

interface PricingCardProps {
  planId: string
  name: string
  description: string
  features: string[]
  interval: 'monthly' | 'yearly'
  isPopular?: boolean
  className?: string
}

export function PricingCard({
  planId,
  name,
  description,
  features,
  interval,
  isPopular,
  className,
}: PricingCardProps) {
  const { t } = useTranslation()
  const { locale } = useLocale()

  const price = getFormattedPriceForLocale(planId, interval, locale)
  const intervalLabel = interval === 'monthly' ? t('pricing.monthly') : t('pricing.yearly')

  return (
    <Card className={cn('flex flex-col', isPopular && 'border-primary', className)}>
      {isPopular && (
        <div className="rounded-t-lg bg-primary px-3 py-1 text-center text-sm text-primary-foreground">
          {t('pricing.mostPopular')}
        </div>
      )}
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="mb-4">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-muted-foreground">/{intervalLabel}</span>
        </div>
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={isPopular ? 'default' : 'outline'}>
          {t('pricing.getStarted')}
        </Button>
      </CardFooter>
    </Card>
  )
}
