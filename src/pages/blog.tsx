import { Button } from '@/components/ui/button'

const posts = [
  {
    id: 1,
    title: 'How AI is Transforming Education',
    excerpt:
      'Explore the ways artificial intelligence is revolutionizing the way we learn and teach.',
    author: 'Sarah Johnson',
    date: '2023-12-15',
    category: 'AI in Education',
    image: 'https://source.unsplash.com/random/800x600?education',
  },
  {
    id: 2,
    title: '5 Effective Study Techniques Backed by Science',
    excerpt:
      'Discover research-proven methods to improve your learning and retention.',
    author: 'Michael Chen',
    date: '2023-12-10',
    category: 'Study Tips',
    image: 'https://source.unsplash.com/random/800x600?study',
  },
  {
    id: 3,
    title: 'The Future of Personalized Learning',
    excerpt:
      'How technology is enabling truly personalized educational experiences.',
    author: 'Emily Rodriguez',
    date: '2023-12-05',
    category: 'EdTech',
    image: 'https://source.unsplash.com/random/800x600?technology',
  },
  {
    id: 4,
    title: 'Building Better Study Habits',
    excerpt:
      'Learn how to develop and maintain effective study habits for long-term success.',
    author: 'David Kim',
    date: '2023-12-01',
    category: 'Study Tips',
    image: 'https://source.unsplash.com/random/800x600?habits',
  },
]

const categories = [
  'All',
  'AI in Education',
  'Study Tips',
  'EdTech',
  'Student Success',
  'Research',
]

export default function BlogPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">StudentlyAI Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights, tips, and news about education, technology, and learning
            techniques.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === 'All' ? 'default' : 'outline'}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src="https://source.unsplash.com/random/1200x600?education,technology"
              alt="Featured post"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-8 text-white">
                <div className="mb-2">
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm">
                    Featured
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-2">
                  The Evolution of Learning in the Digital Age
                </h2>
                <p className="text-white/80 mb-4">
                  A comprehensive look at how digital technologies are reshaping
                  education and what it means for the future of learning.
                </p>
                <Button variant="secondary">Read More</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-lg border bg-card overflow-hidden"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-primary">{post.category}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    By {post.author} · {post.date}
                  </div>
                  <Button variant="ghost" size="sm">
                    Read More
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-muted-foreground mb-6">
              Get the latest articles, study tips, and educational insights
              delivered to your inbox.
            </p>
            <form className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-md border bg-background px-3 py-2"
              />
              <Button>Subscribe</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
