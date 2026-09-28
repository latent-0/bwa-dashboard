import {
  Activity,
  CircleDollarSign,
  ListChecks,
  Radio,
  Sparkles,
  PencilLine,
  Zap,
  ArrowUpRight,
} from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { ProductionStageChart } from '@/components/charts/ProductionStageChart'
import { RevenueByBrandChart } from '@/components/charts/RevenueByBrandChart'
import { StatusDistributionChart } from '@/components/charts/StatusDistributionChart'
import { KpiCard } from '@/components/common/KpiCard'
import { OfferCard } from '@/components/common/OfferCard'
import { OfferSpotlight } from '@/components/common/OfferSpotlight'
import { PageHeader } from '@/components/common/PageHeader'
import { SiteAlertsCard } from '@/components/common/SiteAlertsCard'
import { StatusPill } from '@/components/common/StatusPill'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useOffers } from '@/context/OffersContext'
import { brands } from '@/data/brands'
import { computeOfferStatus, missingSignals } from '@/lib/status'
import { formatCurrency, timeAgo } from '@/lib/utils'
import type { OfferStatus } from '@/types/offer'

const STAGE_ORDER = ['Approved', 'Mir Working', 'Jeff Review', 'Pending', 'Revision Pending', 'Needs Revision', 'Not set']

const VALUE_PROPS = [
  {
    icon: Sparkles,
    title: 'Status computes itself',
    body: 'Green, yellow, and red update live from real signals. No one hand paints a cell.',
    accent: 'bg-brand-50 text-brand-600',
  },
  {
    icon: PencilLine,
    title: 'Edit once, sync everywhere',
    body: 'Flip a toggle on Inventory Tracker and Overview, Video Tracker, and every chart update instantly.',
    accent: 'bg-accent-violet/10 text-accent-violet',
  },
  {
    icon: Zap,
    title: 'Tells you what to do next',
    body: 'The Next To Unlock panel below surfaces exactly what is blocking each offer from going live.',
    accent: 'bg-accent-teal/10 text-accent-teal',
  },
]

export function OverviewPage() {
  const { offers } = useOffers()

  const offersWithStatus = useMemo(
    () => offers.map((offer) => ({ offer, status: computeOfferStatus(offer) })),
    [offers],
  )

  const statusCounts = useMemo(
    () =>
      offersWithStatus.reduce(
        (acc, { status }) => {
          acc[status] += 1
          return acc
        },
        { green: 0, yellow: 0, red: 0 } as Record<OfferStatus, number>,
      ),
    [offersWithStatus],
  )

  const totalRevenuePotential = useMemo(() => offers.reduce((sum, o) => sum + o.revenuePerCall, 0), [offers])

  const brandGroups = useMemo(
    () =>
      Object.values(
        offersWithStatus.reduce<Record<string, { brand: string; items: typeof offersWithStatus }>>(
          (acc, entry) => {
            const key = entry.offer.brand
            if (!acc[key]) acc[key] = { brand: key, items: [] }
            acc[key].items.push(entry)
            return acc
          },
          {},
        ),
      ),
    [offersWithStatus],
  )

  const revenueByBrand = useMemo(
    () =>
      brandGroups
        .map((group) => ({
          brand: group.brand,
          total: group.items.reduce((sum, { offer }) => sum + offer.revenuePerCall, 0),
        }))
        .sort((a, b) => b.total - a.total),
    [brandGroups],
  )

  const recentlyUpdated = useMemo(
    () =>
      [...offersWithStatus]
        .sort((a, b) => new Date(b.offer.lastUpdated).getTime() - new Date(a.offer.lastUpdated).getTime())
        .slice(0, 6),
    [offersWithStatus],
  )

  const nextToUnlock = useMemo(
    () =>
      offersWithStatus
        .filter(({ status }) => status === 'yellow')
        .map(({ offer, status }) => ({ offer, status, missing: missingSignals(offer) }))
        .sort((a, b) => a.missing.length - b.missing.length)
        .slice(0, 5),
    [offersWithStatus],
  )

  const productionStageData = useMemo(() => {
    const counts = new Map<string, number>()
    offers.forEach((o) => {
      const key = o.productionStage ?? 'Not set'
      counts.set(key, (counts.get(key) ?? 0) + 1)
    })
    return STAGE_ORDER.filter((stage) => counts.has(stage)).map((stage) => ({
      stage,
      count: counts.get(stage)!,
    }))
  }, [offers])

  const spotlight = useMemo(() => {
    if (nextToUnlock.length > 0) return nextToUnlock[0]
    const liveEntry = recentlyUpdated.find((entry) => entry.status === 'green')
    return liveEntry ?? offersWithStatus[0]
  }, [nextToUnlock, recentlyUpdated, offersWithStatus])

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Overview"
        description="One screen for the whole operation. Everything a spreadsheet cannot compute for you, done automatically."
      />

      {spotlight && <OfferSpotlight offer={spotlight.offer} status={spotlight.status} />}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {VALUE_PROPS.map((item, i) => (
          <Card
            key={item.title}
            className="animate-fade-up border-none bg-gradient-to-br from-card to-muted/60 shadow-sm"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <CardContent className="flex items-start gap-3 pt-5">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.accent}`}>
                <item.icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <SiteAlertsCard brands={brands} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Total Offers" value={offers.length} icon={ListChecks} />
        <KpiCard
          label="Live"
          value={statusCounts.green}
          icon={Radio}
          accentClassName="bg-status-green-bg text-status-green"
          hint={`${statusCounts.yellow} in progress, ${statusCounts.red} not started`}
        />
        <KpiCard label="In Progress" value={statusCounts.yellow} icon={Activity} />
        <KpiCard
          label="Revenue Potential"
          value={formatCurrency(totalRevenuePotential)}
          icon={CircleDollarSign}
          hint="Sum of revenue per call across every offer"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base font-semibold text-foreground">Next to Unlock</CardTitle>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Closest offers to going live and exactly what stands in the way.
              </p>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {nextToUnlock.length === 0 && (
              <p className="py-6 text-center text-sm text-muted-foreground">
                Nothing in progress right now. Every offer is either live or not started.
              </p>
            )}
            {nextToUnlock.map(({ offer, missing }) => (
              <Link
                key={offer.id}
                to="/inventory"
                className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-muted/40 px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50/60 hover:shadow-sm"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{offer.campaign}</p>
                  <p className="truncate text-xs text-muted-foreground">{offer.brand}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="rounded-full bg-status-yellow-bg px-2.5 py-1 text-xs font-medium text-status-yellow">
                    Needs {missing.join(' and ')}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground">Readiness Split</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusDistributionChart counts={statusCounts} />
            <div className="mt-2 flex justify-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-status-green" /> {statusCounts.green} Live
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-status-yellow" /> {statusCounts.yellow} In Progress
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-status-red" /> {statusCounts.red} Not Started
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h2 className="font-heading text-lg font-semibold">All Offers</h2>
          <p className="text-sm text-muted-foreground">
            Every campaign as a card. Click a signal dot to toggle it, click Manage for the full record.
          </p>
        </div>
        {brandGroups.map((group) => (
          <div key={group.brand}>
            <div className="mb-3 flex items-center justify-between px-1">
              <h3 className="font-heading text-sm font-semibold">{group.brand}</h3>
              <p className="text-xs text-muted-foreground">{group.items.length} campaigns</p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {group.items.map(({ offer, status }) => (
                <OfferCard key={offer.id} offer={offer} status={status} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground">Revenue Potential by Brand</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueByBrandChart data={revenueByBrand} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground">Production Pipeline</CardTitle>
            <p className="text-xs text-muted-foreground">Where every video stands right now.</p>
          </CardHeader>
          <CardContent>
            <ProductionStageChart data={productionStageData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground">Recently Updated</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {recentlyUpdated.map(({ offer, status }) => (
              <div key={offer.id} className="flex items-start justify-between gap-2 text-sm">
                <div className="min-w-0">
                  <p className="truncate font-medium">{offer.campaign}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {offer.brand}, {timeAgo(offer.lastUpdated)}
                  </p>
                </div>
                <StatusPill status={status} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
