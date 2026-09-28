import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const STAGE_COLORS: Record<string, string> = {
  Approved: '#10b981',
  'Mir Working': '#5f01fb',
  'Jeff Review': '#f59e0b',
  Pending: '#9c5cfd',
  'Revision Pending': '#f43f5e',
  'Needs Revision': '#f43f5e',
  'Not set': '#94a3b8',
}

export function ProductionStageChart({ data }: { data: { stage: string; count: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16 }}>
        <CartesianGrid horizontal={false} stroke="var(--color-border)" strokeDasharray="4 4" />
        <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }} tickLine={false} axisLine={false} />
        <YAxis
          type="category"
          dataKey="stage"
          width={110}
          tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          cursor={{ fill: 'var(--color-muted)' }}
          contentStyle={{
            borderRadius: 12,
            border: '1px solid var(--color-border)',
            fontSize: 12,
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          }}
        />
        <Bar dataKey="count" radius={[0, 8, 8, 0]} maxBarSize={20}>
          {data.map((d) => (
            <Cell key={d.stage} fill={STAGE_COLORS[d.stage] ?? '#5f01fb'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
