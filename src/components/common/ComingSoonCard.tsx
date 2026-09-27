import { Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ComingSoonTab } from '@/types/comingSoon'

export function ComingSoonCard({ tab }: { tab: ComingSoonTab }) {
  return (
    <Link to={`/coming-soon/${tab.slug}`}>
      <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:bg-brand-50/40 hover:shadow-md">
        <CardHeader className="flex-row items-center gap-3 space-y-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <Clock className="h-4 w-4" />
          </span>
          <CardTitle className="text-sm font-semibold text-foreground">{tab.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">{tab.description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
