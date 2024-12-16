import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Link } from 'react-router-dom'

interface MobileMenuProps {
  navigation?: Array<{ name: string; href: string }>
  children?: React.ReactNode
}

export function MobileMenu({ navigation, children }: MobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col gap-4">
          {navigation?.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-lg font-medium text-muted-foreground hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
          {children}
        </div>
      </SheetContent>
    </Sheet>
  )
}
