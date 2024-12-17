import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Features - StudentlyAI',
  description: 'Explore the features of StudentlyAI',
}

export default function FeaturesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Features</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard 
          title="Content Creation" 
          description="Generate high-quality educational content with AI assistance"
        />
        <FeatureCard 
          title="Study Tools" 
          description="Access powerful tools to enhance your learning experience"
        />
        <FeatureCard 
          title="Personalization" 
          description="Get personalized learning recommendations"
        />
      </div>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
