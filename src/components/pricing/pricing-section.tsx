import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { pricing } from '@/lib/config/pricing'
import { PricingCard } from './pricing-card'
import { Switch } from '@/components/ui/switch'

export function PricingSection() {
  const { t } = useTranslation()
  const [interval, setInterval] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <section className="container py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">{t('pricing.choosePlan')}</h2>
        <p className="mt-4 text-muted-foreground">{t('pricing.pricingDescription')}</p>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <span className={interval === 'monthly' ? 'font-semibold' : ''}>
          {t('pricing.monthly')}
        </span>
        <Switch
          checked={interval === 'yearly'}
          onCheckedChange={(checked: boolean) => setInterval(checked ? 'yearly' : 'monthly')}
        />
        <span className={interval === 'yearly' ? 'font-semibold' : ''}>
          {t('pricing.yearly')}
          <span className="ml-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-sm text-primary">
            {t('pricing.save20')}
          </span>
        </span>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:gap-12">
        {pricing.map((plan) => (
          <PricingCard
            key={plan.id}
            planId={plan.id}
            name={t(`pricing.plans.${plan.id}.name`)}
            description={t(`pricing.plans.${plan.id}.description`)}
            features={plan.features.map((f) => t(`pricing.plans.${plan.id}.features.${f}`))}
            interval={interval}
            isPopular={plan.id === 'pro'}
          />
        ))}
      </div>
    </section>
  )
}
