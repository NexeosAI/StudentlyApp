import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing - StudentlyAI',
  description: 'Choose the perfect plan for your needs',
}

export default function PricingPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Pricing Plans</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PriceCard 
          title="Free"
          price="£0"
          description="Perfect for trying out StudentlyAI"
          features={[
            "Basic content generation",
            "Limited study tools",
            "Community support"
          ]}
        />
        <PriceCard 
          title="Pro"
          price="£9.99"
          description="Great for serious students"
          features={[
            "Advanced content generation",
            "All study tools",
            "Priority support",
            "Custom templates"
          ]}
          highlighted
        />
        <PriceCard 
          title="Team"
          price="£19.99"
          description="Ideal for study groups"
          features={[
            "Everything in Pro",
            "Team collaboration",
            "Admin dashboard",
            "API access"
          ]}
        />
      </div>
    </div>
  )
}

function PriceCard({ 
  title, 
  price, 
  description, 
  features,
  highlighted = false 
}: { 
  title: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
}) {
  return (
    <div className={`p-6 rounded-lg border ${
      highlighted 
        ? 'border-primary shadow-lg scale-105' 
        : 'border-border'
    }`}>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">{price}</span>
        <span className="text-muted-foreground">/month</span>
      </div>
      <p className="text-muted-foreground mb-6">{description}</p>
      <ul className="space-y-2 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center">
            <svg
              className="h-4 w-4 mr-2 text-green-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-2 px-4 rounded-md ${
          highlighted
            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        }`}
      >
        Get Started
      </button>
    </div>
  )
}
