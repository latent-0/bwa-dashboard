import { Moon, Sun } from 'lucide-react'
import { useLocation } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/useTheme'

import { MobileNav } from './MobileNav'
import { navItems } from './nav-config'

function usePageTitle() {
  const { pathname } = useLocation()
  const match = navItems.find((item) => (item.end ? pathname === item.to : pathname.startsWith(item.to)))
  return match?.label ?? 'Dashboard'
}

export function Topbar() {
  const title = usePageTitle()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-20 mx-4 mt-4 flex h-14 shrink-0 items-center justify-between rounded-2xl border border-border bg-card/80 px-4 shadow-sm backdrop-blur lg:mx-6 lg:mt-4 lg:px-5">
      <div className="flex items-center gap-2">
        <MobileNav />
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <span className="hidden sm:inline">Blue Wing Ads</span>
          <span className="hidden sm:inline">/</span>
          <h1 className="font-heading font-semibold text-foreground">{title}</h1>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="rounded-full transition-transform duration-200 hover:scale-110"
      >
        {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
    </header>
  )
}
