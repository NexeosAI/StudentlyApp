import { GraduationCap, Users, Target, Heart } from 'lucide-react'

const values = [
  {
    icon: GraduationCap,
    title: 'Education First',
    description:
      'We believe in the transformative power of education and strive to make quality learning accessible to everyone.',
  },
  {
    icon: Users,
    title: 'Student Success',
    description:
      'Every feature and decision is guided by our commitment to helping students achieve their academic goals.',
  },
  {
    icon: Target,
    title: 'Innovation',
    description:
      'We continuously explore and implement cutting-edge AI technologies to enhance the learning experience.',
  },
  {
    icon: Heart,
    title: 'Community',
    description:
      'We foster a supportive community where students can learn, grow, and succeed together.',
  },
]

const team = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Co-founder',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    description:
      'Former educator with 10+ years of experience in EdTech.',
  },
  {
    name: 'Michael Chen',
    role: 'CTO & Co-founder',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    description:
      'AI researcher and engineer with a passion for educational technology.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of Product',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    description:
      'Product leader focused on creating intuitive learning experiences.',
  },
  {
    name: 'David Kim',
    role: 'Head of AI',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    description:
      'Machine learning expert specializing in educational AI systems.',
  },
]

export default function AboutPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto">
        {/* Mission Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Our Mission</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            To revolutionize education by combining artificial intelligence with
            proven learning techniques, making quality education accessible to
            students worldwide.
          </p>
        </div>

        {/* Values Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="text-center p-6 rounded-lg border bg-card"
              >
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Our Story</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground mb-6">
              StudentlyAI was born from a simple observation: traditional education
              isn't keeping pace with modern learning needs. Founded in 2023, we
              set out to create a platform that combines the power of artificial
              intelligence with proven learning techniques.
            </p>
            <p className="text-muted-foreground mb-6">
              Our team of educators, technologists, and AI experts work together to
              develop tools that make learning more effective, engaging, and
              accessible. We believe that every student deserves access to
              high-quality educational support, regardless of their location or
              circumstances.
            </p>
            <p className="text-muted-foreground">
              Today, StudentlyAI serves thousands of students worldwide, helping
              them achieve their academic goals through personalized learning
              experiences powered by AI.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="text-center p-6 rounded-lg border bg-card"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-sm text-primary mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
