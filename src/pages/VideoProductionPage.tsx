import { useMemo, useState } from 'react'

import { DataTable, type DataTableColumn, sortRows } from '@/components/common/DataTable'
import { KpiCard } from '@/components/common/KpiCard'
import { PageHeader } from '@/components/common/PageHeader'
import { Input } from '@/components/ui/input'
import { hslVideos } from '@/data/hslVideos'
import { useSort } from '@/hooks/useSort'
import { formatDate } from '@/lib/utils'
import type { HslVideo } from '@/types/brand'

export function VideoProductionPage() {
  const [search, setSearch] = useState('')
  const { sort, toggleSort } = useSort({ key: 'brand', direction: 'asc' })

  const approvedCount = hslVideos.filter((v) => v.productionStage === 'Approved').length

  const rows = useMemo(
    () =>
      hslVideos
        .map((v, i) => ({ ...v, _key: `${v.brand}-${i}` }))
        .filter((v) => `${v.brand} ${v.videoIdea}`.toLowerCase().includes(search.toLowerCase())),
    [search],
  )

  const columns: DataTableColumn<HslVideo & { _key: string }>[] = [
    {
      key: 'brand',
      header: 'Brand',
      sortAccessor: (v) => v.brand,
      render: (v) => <span className="font-medium">{v.brand}</span>,
    },
    {
      key: 'videoIdea',
      header: 'Video Idea',
      sortAccessor: (v) => v.videoIdea,
      render: (v) => <span className="block max-w-xs whitespace-normal">{v.videoIdea}</span>,
    },
    {
      key: 'productionStage',
      header: 'Production Stage',
      sortAccessor: (v) => v.productionStage ?? '',
      render: (v) => v.productionStage ?? <span className="text-muted-foreground">Not set</span>,
    },
    {
      key: 'finalVideoLabel',
      header: 'Final Video',
      render: (v) => (
        <span className="block max-w-[12rem] truncate text-muted-foreground">
          {v.finalVideoLabel ?? 'Not set'}
        </span>
      ),
    },
    {
      key: 'copyrightSubmittedDate',
      header: 'Copyright Submitted',
      render: (v) => <span className="text-muted-foreground">{formatDate(v.copyrightSubmittedDate)}</span>,
    },
    {
      key: 'ourPayout',
      header: 'Our Payout',
      render: (v) => v.ourPayout ?? <span className="text-muted-foreground">Not set</span>,
    },
    {
      key: 'affiliatePayout',
      header: 'Affiliate Payout',
      render: (v) => v.affiliatePayout ?? <span className="text-muted-foreground">Not set</span>,
    },
    {
      key: 'notes',
      header: 'Notes',
      render: (v) => (
        <span className="block max-w-xs whitespace-normal text-muted-foreground">{v.notes ?? '—'}</span>
      ),
    },
  ]

  const sortedRows = sortRows(rows, sort, columns)

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Video Production"
        description="The real HSL_videos tab: every Home Service Live video in production, revision, or review, with payout terms once negotiated."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard label="Total Videos" value={hslVideos.length} />
        <KpiCard label="Approved" value={approvedCount} />
        <KpiCard label="In Review or Revision" value={hslVideos.length - approvedCount} />
      </div>

      <Input
        placeholder="Search brand or video idea"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-xs"
      />

      <DataTable columns={columns} rows={sortedRows} getRowId={(v) => v._key} sort={sort} onSortChange={toggleSort} />
    </div>
  )
}
