import { Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    details: 'support@studentlyai.com',
    description: 'Email us for general inquiries and support.',
  },
  {
    icon: Phone,
    title: 'Phone',
    details: '+1 (555) 123-4567',
    description: 'Mon-Fri from 8am to 5pm.',
  },
  {
    icon: MapPin,
    title: 'Office',
    details: 'San Francisco, CA',
    description: 'Come say hello at our office.',
  },
]

export default function ContactPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll
            respond as soon as possible.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((item) => (
            <div
              key={item.title}
              className="text-center p-6 rounded-lg border bg-card"
            >
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="font-medium mb-1">{item.details}</p>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <div className="rounded-lg border bg-card p-8">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium mb-2"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full rounded-md border bg-background px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full rounded-md border bg-background px-3 py-2"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-md border bg-background px-3 py-2"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full rounded-md border bg-background px-3 py-2"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full rounded-md border bg-background px-3 py-2"
                  required
                ></textarea>
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-semibold mb-2">
                What are your support hours?
              </h3>
              <p className="text-muted-foreground">
                Our support team is available Monday through Friday, 8am to 5pm PT.
                We typically respond to all inquiries within 24 hours.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                How can I report a technical issue?
              </h3>
              <p className="text-muted-foreground">
                You can report technical issues through our support portal or by
                emailing support@studentlyai.com with details about the problem.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Do you offer phone support?
              </h3>
              <p className="text-muted-foreground">
                Yes, phone support is available for our Pro and Team plan
                subscribers during regular business hours.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                How can I request a feature?
              </h3>
              <p className="text-muted-foreground">
                We love hearing from our users! You can submit feature requests
                through our feedback form or by contacting our support team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
