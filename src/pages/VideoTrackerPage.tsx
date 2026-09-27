import { Check, X } from 'lucide-react'
import { useMemo } from 'react'

import { DataTable, type DataTableColumn, sortRows } from '@/components/common/DataTable'
import { KpiCard } from '@/components/common/KpiCard'
import { LinkChip } from '@/components/common/LinkChip'
import { PageHeader } from '@/components/common/PageHeader'
import { StatusPill } from '@/components/common/StatusPill'
import { useOffers } from '@/context/OffersContext'
import { useSort } from '@/hooks/useSort'
import { computeOfferStatus } from '@/lib/status'
import type { Offer, OfferStatus } from '@/types/offer'

function BooleanCell({ value }: { value: boolean }) {
  return value ? (
    <Check className="h-4 w-4 text-status-green" />
  ) : (
    <X className="h-4 w-4 text-muted-foreground/50" />
  )
}

export function VideoTrackerPage() {
  const { offers } = useOffers()
  const { sort, toggleSort } = useSort({ key: 'brand', direction: 'asc' })

  const rows = useMemo(
    () => offers.map((offer) => ({ offer, status: computeOfferStatus(offer) })),
    [offers],
  )

  const videoAdsCount = offers.filter((o) => o.videoAdsMade).length
  const readyCount = offers.filter((o) => o.campaignReady).length

  const columns: DataTableColumn<{ offer: Offer; status: OfferStatus }>[] = [
    {
      key: 'status',
      header: 'Status',
      sortAccessor: (r) => r.status,
      render: (r) => <StatusPill status={r.status} />,
    },
    {
      key: 'brand',
      header: 'Brand',
      sortAccessor: (r) => r.offer.brand,
      render: (r) => <span className="font-medium">{r.offer.brand}</span>,
    },
    {
      key: 'campaign',
      header: 'Campaign',
      sortAccessor: (r) => r.offer.campaign,
      render: (r) => r.offer.campaign,
    },
    {
      key: 'landingPageUrl',
      header: 'Landing Page',
      render: (r) => <LinkChip href={r.offer.landingPageUrl} label="View LP" />,
    },
    {
      key: 'campaignReady',
      header: 'LP + Video Ready',
      render: (r) => <BooleanCell value={r.offer.campaignReady} />,
    },
    {
      key: 'videoAdsMade',
      header: 'Video Ads Made',
      render: (r) =>
        r.offer.videoAdsMade && r.offer.videoAdsLink ? (
          <LinkChip href={r.offer.videoAdsLink} label="Video Ads" />
        ) : (
          <BooleanCell value={r.offer.videoAdsMade} />
        ),
    },
    {
      key: 'ringbaNumberPoolSetup',
      header: 'Ringba Setup',
      render: (r) => <BooleanCell value={r.offer.ringbaNumberPoolSetup} />,
    },
  ]

  const sortedRows = sortRows(rows, sort, columns)

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Video Tracker"
        description="Landing page and video readiness across every offer, framed around what's needed before it can go live."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard label="Total Campaigns" value={offers.length} />
        <KpiCard label="LP + Video Ready" value={readyCount} />
        <KpiCard label="Video Ads Made" value={videoAdsCount} />
      </div>

      <DataTable
        columns={columns}
        rows={sortedRows}
        getRowId={(r) => r.offer.id}
        sort={sort}
        onSortChange={toggleSort}
      />
    </div>
  )
}
