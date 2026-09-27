import type { LucideIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle, CardValue } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function KpiCard({
  label,
  value,
  icon: Icon,
  accentClassName,
  hint,
}: {
  label: string
  value: string | number
  icon?: LucideIcon
  accentClassName?: string
  hint?: string
}) {
  return (
    <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-0">
        <CardTitle>{label}</CardTitle>
        {Icon && (
          <span
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-transform duration-300',
              accentClassName,
            )}
          >
            <Icon className="h-4 w-4" />
          </span>
        )}
      </CardHeader>
      <CardContent className="pt-1">
        <CardValue>{value}</CardValue>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </CardContent>
    </Card>
  )
}
