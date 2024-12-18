import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { ArrowRight, Brain, BookOpen, Sparkles } from 'lucide-react'
import { useTranslation } from '../lib/hooks/use-translation'
import { cn } from '../lib/utils'

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Content */}
          <div className="flex-1 px-4 py-12 sm:px-6 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <div className="hidden sm:mb-8 sm:flex">
                <div className={cn("relative rounded-full px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-border hover:ring-foreground/20")}>
                  {t('home.hero.announcement')}{' '}
                  <Link to="/blog" className="font-semibold">
                    {t('home.hero.learnMore')} <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                {t('home.hero.title')}
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                {t('home.hero.subtitle')}
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Button size="lg" className="gap-2" asChild>
                  <Link to="/auth/register">
                    {t('home.hero.cta')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/features">{t('common.navigation.features')}</Link>
                </Button>
              </div>

              {/* Feature list */}
              <div className="mt-12 lg:mt-16">
                <dl className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
                  {[
                    { icon: Brain, text: t('home.hero.feature1') },
                    { icon: Sparkles, text: t('home.hero.feature2') },
                    { icon: BookOpen, text: t('home.hero.feature3') },
                  ].map((feature, index) => (
                    <div key={index} className="flex gap-x-3">
                      <feature.icon
                        className="h-5 w-5 flex-none text-primary"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-6">{feature.text}</span>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 lg:mt-0 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-primary/10 to-background" />
            <div className="relative h-full flex items-center justify-center p-8">
              <div className="w-full max-w-lg rounded-xl shadow-2xl ring-1 ring-gray-900/10 bg-card p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Brain className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-lg font-medium">{t('features.feature1.title')}</div>
                      <div className="text-sm text-muted-foreground">{t('features.feature1.description')}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-lg font-medium">{t('features.feature2.title')}</div>
                      <div className="text-sm text-muted-foreground">{t('features.feature2.description')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background effects */}
        <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
          <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" />
        </div>
      </section>
    </div>
  )
}
