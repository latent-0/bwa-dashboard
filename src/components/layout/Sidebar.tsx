import { Radio } from 'lucide-react'

import { navItems } from './nav-config'
import { NavItem } from './NavItem'

export function Sidebar() {
  return (
    <aside className="fixed inset-y-4 left-4 z-30 hidden w-64 flex-col rounded-[28px] border border-border bg-dock p-3 shadow-xl shadow-black/5 lg:flex">
      <div className="mb-4 flex items-center gap-2.5 rounded-2xl px-3 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-sm">
          <Radio className="h-4 w-4" />
        </div>
        <div className="leading-tight">
          <p className="font-heading text-sm font-semibold">Blue Wing Ads</p>
          <p className="text-xs text-muted-foreground">Ops Dashboard</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </nav>

      <div className="rounded-2xl bg-muted px-3.5 py-3 text-xs leading-relaxed text-muted-foreground">
        Live view of the real Video Tracker workbook. All 10 tabs are wired up.
      </div>
    </aside>
  )
}
