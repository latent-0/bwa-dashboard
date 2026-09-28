import { AlertTriangle, CheckCircle2 } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Brand } from '@/types/brand'

/**
 * Surfaces the brands the sheet has flagged as actually broken ("Site Down"
 * or a 404 note), not just "not yet confirmed up". A spreadsheet buries this
 * in a Note column nobody re-reads; here it is impossible to miss.
 */
export function SiteAlertsCard({ brands }: { brands: Brand[] }) {
  const broken = brands.filter((b) => b.note)

  if (broken.length === 0) {
    return (
      <Card className="p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-status-green-bg text-status-green">
            <CheckCircle2 className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold">All brand sites are healthy</p>
            <p className="text-xs text-muted-foreground">No sites flagged down in the sheet.</p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="border-status-red-border/60 p-5">
      <CardHeader className="flex-row items-center gap-3 space-y-0 p-0 pb-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-status-red-bg text-status-red">
          <AlertTriangle className="h-4 w-4" />
        </span>
        <div>
          <CardTitle className="text-sm font-semibold text-foreground">
            {broken.length} site{broken.length > 1 ? 's' : ''} flagged down
          </CardTitle>
          <p className="text-xs text-muted-foreground">Straight from the sheet's own notes column.</p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-0">
        {broken.map((b) => (
          <div key={`${b.name}-${b.url}`} className="flex items-center justify-between gap-2 text-sm">
            <div className="min-w-0">
              <p className="truncate font-medium">{b.name}</p>
              <p className="truncate text-xs text-muted-foreground">{b.url}</p>
            </div>
            <span className="shrink-0 rounded-full bg-status-red-bg px-2.5 py-0.5 text-xs font-medium text-status-red">
              {b.note}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
