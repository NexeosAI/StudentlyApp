import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, Brain, Sparkles } from 'lucide-react'
import { useTranslation } from '@/lib/hooks/use-translation'

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('home.hero.title')}{' '}
            <span className="text-primary">AI-Powered Education</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/auth/register">
                {t('home.hero.cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/features">See How It Works</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('home.features.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg border">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t('home.features.items.0.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('home.features.items.0.description')}
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg border">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Smart Content Generation
              </h3>
              <p className="text-muted-foreground">
                Generate study notes, flashcards, and practice questions
                automatically from your learning materials.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg border">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t('home.features.items.1.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('home.features.items.1.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students already using StudentlyAI to achieve their
            academic goals.
          </p>
          <Button size="lg" asChild>
            <Link to="/auth/register">{t('home.hero.cta')}</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
