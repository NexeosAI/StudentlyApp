import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const plans = [
  {
    name: 'Free',
    price: '0',
    description: 'Perfect for trying out StudentlyAI',
    features: [
      'AI Study Assistant (10 questions/month)',
      'Basic Content Generation',
      'Personal Study Dashboard',
      'Community Support',
    ],
  },
  {
    name: 'Pro',
    price: '9.99',
    description: 'Best for individual students',
    features: [
      'Unlimited AI Study Assistant',
      'Advanced Content Generation',
      'Personal Study Dashboard',
      'Progress Analytics',
      'Priority Support',
      'Collaborative Study Tools',
      'Custom Study Plans',
      'Citation Management',
    ],
    popular: true,
  },
  {
    name: 'Team',
    price: '29.99',
    description: 'Perfect for study groups and tutors',
    features: [
      'Everything in Pro',
      'Group Study Rooms',
      'Team Analytics',
      'Resource Sharing',
      'Admin Dashboard',
      'API Access',
      'Custom Integrations',
      'Dedicated Support',
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that best fits your needs. All plans include access to
            our core features and regular updates.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-lg border bg-card p-8 ${
                plan.popular
                  ? 'border-primary shadow-lg scale-105'
                  : 'border-border'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0">
                  <div className="mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Most Popular
                  </div>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline justify-center">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>
              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="mt-8 w-full"
                variant={plan.popular ? 'default' : 'outline'}
                asChild
              >
                <Link to="/auth/register">Get Started</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-semibold mb-2">
                Can I switch plans at any time?
              </h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade, downgrade, or cancel your plan at any time.
                Changes take effect at the start of the next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Is there a student discount?
              </h3>
              <p className="text-muted-foreground">
                Yes! Students with a valid .edu email address get 20% off any paid
                plan.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-muted-foreground">
                We accept all major credit cards, PayPal, and select regional
                payment methods.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Is there a money-back guarantee?
              </h3>
              <p className="text-muted-foreground">
                Yes, we offer a 30-day money-back guarantee for all paid plans.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
