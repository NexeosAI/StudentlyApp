import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useLocale } from '../../lib/store/locale-store'
import { locales } from '../../lib/config/locales'
import { Globe } from 'lucide-react'

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale()
  const currentLocale = locales[locale] || locales['en-US'] // Fallback to en-US if locale not found

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
      <DropdownMenuContent align="end" className="max-h-[300px] overflow-y-auto scrollbar-custom">
        {Object.entries(locales)
          .sort(([, a], [, b]) => a.country.localeCompare(b.country))
          .map(([code, l]) => (
            <DropdownMenuItem
              key={code}
              onClick={() => setLocale(code)}
              className={`flex items-center gap-2 ${code === locale ? 'bg-accent' : ''}`}
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
