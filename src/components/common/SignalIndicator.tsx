import { Check, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

import { cn } from '@/lib/utils'

interface SignalProps {
  label: string
  icon: LucideIcon
  active: boolean
  onToggle?: () => void
  href?: string
}

/** Labeled square tile used on the Overview Spotlight hero card. */
export function SignalTile({ label, icon: Icon, active, onToggle, href }: SignalProps) {
  const classes = cn(
    'flex flex-1 flex-col items-center gap-1.5 rounded-2xl border px-3 py-3 transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-95',
    active
      ? 'border-status-green-border bg-status-green-bg text-status-green'
      : 'border-border bg-muted text-muted-foreground hover:border-status-red-border hover:text-status-red',
  )
  const content = (
    <>
      <span className="relative flex h-5 w-5 items-center justify-center">
        <Icon className="h-4 w-4" />
        <span
          className={cn(
            'absolute -right-1.5 -top-1.5 flex h-3 w-3 items-center justify-center rounded-full',
            active ? 'bg-status-green text-white' : 'bg-status-red text-white',
          )}
        >
          {active ? <Check className="h-2 w-2" /> : <X className="h-2 w-2" />}
        </span>
      </span>
      <span className="text-[11px] font-medium">{label}</span>
    </>
  )

  if (href) {
    return (
      <Link to={href} title="Set this in Inventory Tracker" className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onToggle} title="Click to toggle" className={classes}>
      {content}
    </button>
  )
}

/** Compact circular indicator used on the dense offer-card grid. */
export function SignalDot({ label, icon: Icon, active, onToggle, href }: SignalProps) {
  const classes = cn(
    'flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-200 ease-out hover:scale-110 active:scale-95',
    active
      ? 'border-status-green-border bg-status-green-bg text-status-green'
      : 'border-border bg-muted text-muted-foreground/60 hover:border-status-red-border hover:text-status-red',
  )

  if (href) {
    return (
      <Link to={href} title={`${label}: set this in Inventory Tracker`} className={classes}>
        <Icon className="h-3.5 w-3.5" />
      </Link>
    )
  }

  return (
    <button type="button" onClick={onToggle} title={`${label}: click to toggle`} className={classes}>
      <Icon className="h-3.5 w-3.5" />
    </button>
  )
}
