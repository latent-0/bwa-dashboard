import { Check, RotateCcw, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'

import { DataTable, type DataTableColumn, sortRows } from '@/components/common/DataTable'
import { LinkChip } from '@/components/common/LinkChip'
import { PageHeader } from '@/components/common/PageHeader'
import { StatusPill } from '@/components/common/StatusPill'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useOffers } from '@/context/OffersContext'
import { useSort } from '@/hooks/useSort'
import { computeOfferStatus } from '@/lib/status'
import { cn, formatDate } from '@/lib/utils'
import type { Offer, OfferStatus } from '@/types/offer'

function ToggleCell({ value, onToggle }: { value: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      title="Click to toggle"
      className={cn(
        'flex h-6 w-6 items-center justify-center rounded-full border transition-all hover:scale-110 active:scale-95',
        value
          ? 'border-status-green-border bg-status-green-bg text-status-green'
          : 'border-border bg-muted text-muted-foreground/50 hover:border-status-red-border hover:text-status-red',
      )}
    >
      {value ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
    </button>
  )
}

export function InventoryTrackerPage() {
  const { offers, updateOffer, hasEdits, resetToSample } = useOffers()
  const [search, setSearch] = useState('')
  const [brandFilter, setBrandFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const { sort, toggleSort } = useSort({ key: 'brand', direction: 'asc' })

  const brands = useMemo(() => Array.from(new Set(offers.map((o) => o.brand))).sort(), [offers])

  const rows = useMemo(() => {
    const withStatus = offers.map((offer) => ({ offer, status: computeOfferStatus(offer) }))
    return withStatus.filter(({ offer, status }) => {
      const matchesSearch = `${offer.brand} ${offer.campaign}`.toLowerCase().includes(search.toLowerCase())
      const matchesBrand = brandFilter === 'all' || offer.brand === brandFilter
      const matchesStatus = statusFilter === 'all' || status === statusFilter
      return matchesSearch && matchesBrand && matchesStatus
    })
  }, [offers, search, brandFilter, statusFilter])

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
      key: 'copyrightSubmittedDate',
      header: 'Copyright Submitted',
      sortAccessor: (r) => r.offer.copyrightSubmittedDate ?? '',
      render: (r) => (
        <span className="text-muted-foreground">{formatDate(r.offer.copyrightSubmittedDate)}</span>
      ),
    },
    {
      key: 'ringbaNumberPoolSetup',
      header: 'Ringba Setup',
      render: (r) => (
        <ToggleCell
          value={r.offer.ringbaNumberPoolSetup}
          onToggle={() => updateOffer(r.offer.id, { ringbaNumberPoolSetup: !r.offer.ringbaNumberPoolSetup })}
        />
      ),
    },
    {
      key: 'campaignReady',
      header: 'Campaign Ready',
      render: (r) => (
        <ToggleCell
          value={r.offer.campaignReady}
          onToggle={() => updateOffer(r.offer.id, { campaignReady: !r.offer.campaignReady })}
        />
      ),
    },
    {
      key: 'pioneerBuyerName',
      header: 'Pioneer Buyer',
      sortAccessor: (r) => r.offer.pioneerBuyerName ?? '',
      render: (r) =>
        r.offer.pioneerBuyerName ? (
          r.offer.pioneerBuyerLink ? (
            <LinkChip href={r.offer.pioneerBuyerLink} label={r.offer.pioneerBuyerName} />
          ) : (
            r.offer.pioneerBuyerName
          )
        ) : (
          <span className="text-muted-foreground">Not set</span>
        ),
    },
    {
      key: 'revenuePerCall',
      header: 'Our Revenue',
      sortAccessor: (r) => r.offer.revenuePerCall,
      render: (r) => <span className="font-medium">{r.offer.revenuePerCallDisplay}</span>,
    },
    {
      key: 'mediaKitMade',
      header: 'Media Kit',
      render: (r) =>
        r.offer.mediaKitMade && r.offer.mediaKitLink ? (
          <LinkChip href={r.offer.mediaKitLink} label="Media Kit" />
        ) : (
          <span className="text-muted-foreground">Not made</span>
        ),
    },
    {
      key: 'mediaKitSentToPubs',
      header: 'Sent to Pubs',
      render: (r) => (
        <ToggleCell
          value={r.offer.mediaKitSentToPubs}
          onToggle={() => updateOffer(r.offer.id, { mediaKitSentToPubs: !r.offer.mediaKitSentToPubs })}
        />
      ),
    },
  ]

  const sortedRows = sortRows(rows, sort, columns)

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Inventory Tracker"
        description="The full working record. Click any green or red circle to update it and status recalculates instantly for everyone."
        actions={
          hasEdits ? (
            <Button variant="outline" size="sm" onClick={resetToSample} className="gap-1.5">
              <RotateCcw className="h-3.5 w-3.5" /> Reset sample data
            </Button>
          ) : undefined
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search brand or campaign"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={brandFilter} onValueChange={setBrandFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All brands</SelectItem>
            {brands.map((b) => (
              <SelectItem key={b} value={b}>
                {b}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="green">Live</SelectItem>
            <SelectItem value="yellow">In Progress</SelectItem>
            <SelectItem value="red">Not Started</SelectItem>
          </SelectContent>
        </Select>
        <p className="ml-auto text-xs text-muted-foreground">
          {sortedRows.length} of {offers.length} offers
        </p>
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
