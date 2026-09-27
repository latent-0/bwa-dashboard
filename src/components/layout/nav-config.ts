import {
  LayoutDashboard,
  ListChecks,
  Video,
  Users,
  Megaphone,
  Map,
  MoreHorizontal,
  type LucideIcon,
} from 'lucide-react'

export interface NavItemConfig {
  label: string
  to: string
  icon: LucideIcon
  end?: boolean
}

export const navItems: NavItemConfig[] = [
  { label: 'Overview', to: '/', icon: LayoutDashboard, end: true },
  { label: 'Inventory Tracker', to: '/inventory', icon: ListChecks },
  { label: 'Video Tracker', to: '/video-tracker', icon: Video },
  { label: 'Buyers & Payouts', to: '/buyers', icon: Users },
  { label: 'Media Kits & Outreach', to: '/media-kits', icon: Megaphone },
  { label: 'Rollout Roadmap', to: '/rollout-roadmap', icon: Map },
  { label: 'More Tabs', to: '/coming-soon', icon: MoreHorizontal },
]
