import { ExternalLink } from 'lucide-react'

import { cn } from '@/lib/utils'

export function LinkChip({
  href,
  label = 'Open link',
  className,
}: {
  href: string
  label?: string
  className?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium text-brand-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 hover:shadow-sm',
        className,
      )}
    >
      {label}
      <ExternalLink className="h-3 w-3" />
    </a>
  )
}
