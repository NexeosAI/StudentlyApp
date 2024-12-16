import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLocale } from '@/lib/store/locale-store'
import { locales } from '@/lib/config/locales'
import { Globe } from 'lucide-react'

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale()
  const currentLocale = locales[locale]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Globe className="h-4 w-4" />
          <span className="absolute -bottom-1 -right-1 text-xs">
            {currentLocale.flag}
          </span>
          <span className="sr-only">Switch locale</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.values(locales).map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => setLocale(l.code)}
            className="flex items-center gap-2"
          >
            <span>{l.flag}</span>
            <span>{l.country}</span>
            <span className="ml-auto text-xs text-muted-foreground">
              {l.code}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
