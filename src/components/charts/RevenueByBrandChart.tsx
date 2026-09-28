import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export function RevenueByBrandChart({ data }: { data: { brand: string; total: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ left: -20, top: 8 }} barCategoryGap="28%">
        <defs>
          <linearGradient id="revenueBarFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5f01fb" stopOpacity={1} />
            <stop offset="100%" stopColor="#5f01fb" stopOpacity={0.55} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="4 4" />
        <XAxis
          dataKey="brand"
          tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
          tickLine={false}
          axisLine={false}
          interval={0}
          angle={-20}
          textAnchor="end"
          height={54}
        />
        <YAxis
          tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `$${v}`}
        />
        <Tooltip
          cursor={{ fill: 'var(--color-muted)' }}
          formatter={(value) => [`$${value}/call`, 'Revenue potential']}
          contentStyle={{
            borderRadius: 12,
            border: '1px solid var(--color-border)',
            fontSize: 12,
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          }}
        />
        <Bar dataKey="total" fill="url(#revenueBarFill)" radius={[10, 10, 4, 4]} maxBarSize={48} />
      </BarChart>
    </ResponsiveContainer>
  )
}
