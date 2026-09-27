import { STATUS_META } from '@/lib/status'
import { cn } from '@/lib/utils'
import type { OfferStatus } from '@/types/offer'

export function StatusPill({ status, className }: { status: OfferStatus; className?: string }) {
  const meta = STATUS_META[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-all duration-200',
        meta.badgeClass,
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        {status === 'green' && (
          <span className={cn('absolute inline-flex h-full w-full animate-ping rounded-full opacity-75', meta.dotClass)} />
        )}
        <span className={cn('relative inline-flex h-1.5 w-1.5 rounded-full', meta.dotClass)} />
      </span>
      {meta.label}
    </span>
  )
}
