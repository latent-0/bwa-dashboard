import {
  LayoutDashboard,
  ListChecks,
  Video,
  Film,
  Users,
  Megaphone,
  Map,
  Building2,
  ClipboardCheck,
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
  { label: 'Video Production', to: '/video-production', icon: Film },
  { label: 'Buyers & Payouts', to: '/buyers', icon: Users },
  { label: 'Media Kits & Outreach', to: '/media-kits', icon: Megaphone },
  { label: 'Rollout Roadmap', to: '/rollout-roadmap', icon: Map },
  { label: 'Brands', to: '/brands', icon: Building2 },
  { label: 'Ops Checklists', to: '/ops-checklists', icon: ClipboardCheck },
]
