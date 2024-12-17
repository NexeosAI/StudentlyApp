import { useTranslation } from '@/lib/hooks/use-translation'
import { Button } from '../ui/button'

export function Hero() {
  const { t } = useTranslation()

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            {t('home.hero.title')}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {t('home.hero.subtitle')}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg">
              {t('home.hero.cta')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
