import { Brain, Sparkles, BookOpen, Target, Clock, Users, Shield, Zap } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI Study Assistant',
    description:
      'Get instant help with any subject through our advanced AI tutor that adapts to your learning style.',
  },
  {
    icon: Sparkles,
    title: 'Smart Content Generation',
    description:
      'Automatically generate study notes, flashcards, and practice questions from your learning materials.',
  },
  {
    icon: BookOpen,
    title: 'Personalized Learning',
    description:
      'Track your progress and receive personalized recommendations to improve your study habits.',
  },
  {
    icon: Target,
    title: 'Goal Setting & Tracking',
    description:
      'Set academic goals and track your progress with detailed analytics and insights.',
  },
  {
    icon: Clock,
    title: 'Time Management',
    description:
      'Optimize your study schedule with smart reminders and productivity tracking.',
  },
  {
    icon: Users,
    title: 'Collaborative Learning',
    description:
      'Connect with peers, share resources, and participate in group study sessions.',
  },
  {
    icon: Shield,
    title: 'Academic Integrity',
    description:
      'Built-in features to ensure original work and proper citation management.',
  },
  {
    icon: Zap,
    title: 'Performance Analytics',
    description:
      'Detailed insights into your learning patterns and academic performance.',
  },
]

export default function FeaturesPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Features that Transform Learning
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover how StudentlyAI combines artificial intelligence with proven
            learning techniques to help you achieve your academic goals.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* How It Works Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p className="text-muted-foreground">
                Create your account and tell us about your academic goals and
                learning preferences.
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Learning</h3>
              <p className="text-muted-foreground">
                Upload your study materials or start a conversation with our AI
                tutor.
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor your improvement and adjust your study strategy based on AI
                recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
