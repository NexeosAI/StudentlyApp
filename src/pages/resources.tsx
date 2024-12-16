import { Book, Video, FileText, Download } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

interface ResourceItem {
  title: string
  description: string
  type: string
  icon: LucideIcon
  duration?: string
}

interface ResourceSection {
  title: string
  items: ResourceItem[]
}

const resources: ResourceSection[] = [
  {
    title: 'Study Guides',
    items: [
      {
        title: 'Effective Note-Taking Strategies',
        description: 'Learn how to take better notes with our comprehensive guide.',
        type: 'PDF',
        icon: FileText,
      },
      {
        title: 'Time Management for Students',
        description: 'Master the art of managing your study time effectively.',
        type: 'PDF',
        icon: FileText,
      },
      {
        title: 'Research Paper Writing Guide',
        description: 'Step-by-step guide to writing excellent research papers.',
        type: 'PDF',
        icon: FileText,
      },
    ],
  },
  {
    title: 'Video Tutorials',
    items: [
      {
        title: 'Getting Started with StudentlyAI',
        description: 'A complete walkthrough of our platform\'s features.',
        type: 'Video',
        icon: Video,
        duration: '10:23',
      },
      {
        title: 'AI-Powered Study Techniques',
        description: 'Learn how to leverage AI for better learning outcomes.',
        type: 'Video',
        icon: Video,
        duration: '15:45',
      },
      {
        title: 'Advanced Research Skills',
        description: 'Master academic research with these advanced techniques.',
        type: 'Video',
        icon: Video,
        duration: '12:30',
      },
    ],
  },
  {
    title: 'Templates & Tools',
    items: [
      {
        title: 'Study Schedule Template',
        description: 'Customizable template for organizing your study time.',
        type: 'Template',
        icon: Download,
      },
      {
        title: 'Research Paper Template',
        description: 'Professional template for academic papers.',
        type: 'Template',
        icon: Download,
      },
      {
        title: 'Citation Generator',
        description: 'Tool for creating accurate citations in various formats.',
        type: 'Tool',
        icon: Book,
      },
    ],
  },
]

export default function ResourcesPage() {
  const [resourcesLoaded, setResourcesLoaded] = useState(false)

  useEffect(() => {
    const loadResources = async () => {
      // Simulate loading resources from an API or database
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setResourcesLoaded(true)
    }
    loadResources()
  }, [])

  return (
    <div className="py-20">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Learning Resources</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access our collection of study guides, tutorials, and tools to enhance
            your learning experience.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <input
              type="search"
              placeholder="Search resources..."
              className="w-full rounded-lg border bg-background px-4 py-3 pl-12"
            />
            <svg
              className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Resources Grid */}
        {resourcesLoaded ? (
          <div className="space-y-16">
            {resources.map((section) => (
              <div key={section.title}>
                <h2 className="text-2xl font-bold mb-8">{section.title}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {section.items.map((item) => (
                    <div
                      key={item.title}
                      className="p-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground mb-4">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {item.type}
                          {item.duration && ` · ${item.duration}`}
                        </span>
                        <Button variant="ghost" size="sm">
                          Access Resource
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p>Loading resources...</p>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-24 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <Button variant="outline" size="lg">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  )
}
