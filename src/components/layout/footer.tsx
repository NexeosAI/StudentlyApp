import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col items-center gap-4 py-6 md:h-16 md:flex-row md:justify-between">
        <p className="text-sm text-muted-foreground">
          © {currentYear} StudentlyAI. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://twitter.com/studentlyai" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://facebook.com/studentlyai" target="_blank" rel="noopener noreferrer">
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Facebook</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://instagram.com/studentlyai" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-4 w-4" />
              <span className="sr-only">Instagram</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://linkedin.com/company/studentlyai" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </Button>
        </div>
      </div>
    </footer>
  )
}
