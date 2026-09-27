import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { STATUS_META } from '@/lib/status'
import type { OfferStatus } from '@/types/offer'

const STATUS_ORDER: OfferStatus[] = ['green', 'yellow', 'red']
const STATUS_HEX: Record<OfferStatus, string> = {
  green: '#10b981',
  yellow: '#f59e0b',
  red: '#f43f5e',
}

export function StatusDistributionChart({ counts }: { counts: Record<OfferStatus, number> }) {
  const data = STATUS_ORDER.map((status) => ({
    name: STATUS_META[status].label,
    value: counts[status],
    status,
  }))
  const total = data.reduce((sum, d) => sum + d.value, 0)
  const livePercent = total > 0 ? Math.round((counts.green / total) * 100) : 0

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={62}
            outerRadius={86}
            paddingAngle={4}
            cornerRadius={6}
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry) => (
              <Cell key={entry.status} fill={STATUS_HEX[entry.status]} stroke="none" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: '1px solid var(--color-border)',
              fontSize: 12,
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-heading text-2xl font-semibold">{livePercent}%</span>
        <span className="text-xs text-muted-foreground">Live</span>
      </div>
    </div>
  )
}
