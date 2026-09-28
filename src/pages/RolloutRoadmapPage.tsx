import { Check, X } from 'lucide-react'

import { KpiCard } from '@/components/common/KpiCard'
import { PageHeader } from '@/components/common/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { hslStateMatrix } from '@/data/hslStateMatrix'

export function RolloutRoadmapPage() {
  const { categories, states } = hslStateMatrix
  const totalCells = states.length * categories.length
  const doneCells = states.reduce((sum, s) => sum + s.values.filter(Boolean).length, 0)
  const categoryTotals = categories.map((cat, i) => ({
    category: cat,
    count: states.filter((s) => s.values[i]).length,
  }))

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Rollout Roadmap"
        description="Parsed directly from the real HSL Video Tracker sheet: which state-specific video variant exists for each Home Service Live category."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard label="States Tracked" value={states.length} />
        <KpiCard label="Categories" value={categories.length} />
        <KpiCard
          label="Coverage"
          value={`${Math.round((doneCells / totalCells) * 100)}%`}
          hint={`${doneCells} of ${totalCells} state/category combinations live`}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {categoryTotals.map(({ category, count }) => (
          <Card key={category} className="p-4 text-center">
            <p className="text-xs font-medium text-muted-foreground">{category}</p>
            <p className="mt-1 font-heading text-xl font-semibold">{count}</p>
            <p className="text-[11px] text-muted-foreground">of {states.length} states</p>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 bg-muted">State</TableHead>
                {categories.map((cat) => (
                  <TableHead key={cat} className="text-center">
                    {cat}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {states.map((row) => (
                <TableRow key={row.state}>
                  <TableCell className="sticky left-0 bg-card font-medium">{row.state}</TableCell>
                  {row.values.map((done, i) => (
                    <TableCell key={categories[i]} className="text-center">
                      {done ? (
                        <Check className="mx-auto h-4 w-4 text-status-green" />
                      ) : (
                        <X className="mx-auto h-4 w-4 text-muted-foreground/40" />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
