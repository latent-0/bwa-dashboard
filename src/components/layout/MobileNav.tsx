import { Menu, Radio } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'

import { navItems } from './nav-config'
import { NavItem } from './NavItem'

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full lg:hidden"
        aria-label="Open navigation"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>
      <DialogContent className="left-3 top-3 h-[calc(100%-1.5rem)] max-w-64 -translate-x-0 -translate-y-0 rounded-[28px] border border-border bg-dock p-4 shadow-2xl">
        <div className="mb-6 flex items-center gap-2.5 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-brand-600 shadow-sm">
            <Radio className="h-4 w-4 text-white" />
          </div>
          <div className="leading-tight">
            <p className="font-heading text-sm font-semibold text-foreground">Blue Wing Ads</p>
            <p className="text-xs text-muted-foreground">Ops Dashboard</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1" onClick={() => setOpen(false)}>
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>
      </DialogContent>
    </Dialog>
  )
}
