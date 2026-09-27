import { NavLink } from 'react-router-dom'

import { cn } from '@/lib/utils'

import type { NavItemConfig } from './nav-config'

export function NavItem({ label, to, icon: Icon, end }: NavItemConfig) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          'group relative flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium text-dock-foreground transition-all duration-200 ease-out hover:translate-x-0.5 hover:bg-muted',
          isActive && 'bg-dock-active text-dock-active-foreground shadow-sm hover:translate-x-0 hover:bg-dock-active',
        )
      }
    >
      <Icon className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110" />
      <span className="truncate">{label}</span>
    </NavLink>
  )
}
