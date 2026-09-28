import { ExternalLink, Phone, Radio, User, Video } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Card } from '@/components/ui/card'
import { useOffers } from '@/context/OffersContext'
import { STATUS_META, missingSignals } from '@/lib/status'
import { cn, getHostname } from '@/lib/utils'
import type { Offer, OfferStatus } from '@/types/offer'

import { SignalTile } from './SignalIndicator'

export function OfferSpotlight({ offer, status }: { offer: Offer; status: OfferStatus }) {
  const { offers, updateOffer } = useOffers()
  const hasBuyer = Boolean(offer.pioneerBuyerName || offer.pioneerBuyerLink)
  const missing = missingSignals(offer)
  const meta = STATUS_META[status]
  const domain = getHostname(offer.landingPageUrl)
  const maxRevenue = Math.max(...offers.map((o) => o.revenuePerCall))
  const revenueBarWidth = Math.round((offer.revenuePerCall / maxRevenue) * 100)
  const signalsDone = [offer.ringbaNumberPoolSetup, offer.campaignReady, hasBuyer].filter(Boolean).length

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <Card className="overflow-hidden lg:col-span-2">
        <div className="relative h-32 overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-burgundy-700">
          <div className="absolute -right-10 -top-16 h-40 w-40 rounded-full bg-burgundy-400/30 blur-2xl" />
          <div className="absolute -left-6 bottom-0 h-28 w-28 rounded-full bg-brand-300/20 blur-2xl" />
          <div className="relative flex items-center justify-between p-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur">
              <Radio className="h-4 w-4" />
            </span>
            <a
              href={offer.landingPageUrl}
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
              title="Open landing page"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <span className={cn('absolute right-4 top-16 rounded-full border px-2.5 py-0.5 text-xs font-medium', meta.badgeClass)}>
            {meta.label}
          </span>
        </div>

        <div className="relative flex justify-center">
          <div className="absolute -top-9 flex flex-col items-center">
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-4 border-card bg-brand-50 font-heading text-2xl font-semibold text-brand-700 shadow-md">
              {offer.brand.charAt(0)}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center pb-2 pt-11 text-center">
          <a
            href={offer.landingPageUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background shadow-sm transition-transform hover:-translate-y-0.5"
          >
            {domain}
          </a>
        </div>

        <div className="flex flex-col gap-4 px-5 pb-5">
          <div className="text-center">
            <h3 className="font-heading text-lg font-semibold">{offer.campaign}</h3>
            <p className="text-sm text-muted-foreground">
              {offer.brand}, {offer.revenuePerCallDisplay}
            </p>
          </div>

          <div className="flex gap-2">
            <SignalTile
              label="Ringba"
              icon={Phone}
              active={offer.ringbaNumberPoolSetup}
              onToggle={() => updateOffer(offer.id, { ringbaNumberPoolSetup: !offer.ringbaNumberPoolSetup })}
            />
            <SignalTile
              label="LP + Video"
              icon={Video}
              active={offer.campaignReady}
              onToggle={() => updateOffer(offer.id, { campaignReady: !offer.campaignReady })}
            />
            <SignalTile label="Buyer" icon={User} active={hasBuyer} href="/inventory" />
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/inventory"
              className="flex-1 rounded-full bg-brand-600 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-md active:scale-95"
            >
              Manage in Inventory Tracker
            </Link>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-status-green" />
              <span className="h-2 w-2 rounded-full bg-status-yellow" />
              <span className="h-2 w-2 rounded-full bg-status-red" />
            </div>
          </div>
        </div>
      </Card>

      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="text-sm font-medium text-muted-foreground">Revenue at Stake</p>
          <p className="mt-1 font-heading text-2xl font-semibold">{offer.revenuePerCallDisplay}</p>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700 transition-all duration-700 ease-out"
              style={{ width: `${revenueBarWidth}%` }}
            />
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">Compared to the highest offer in the book</p>
        </Card>

        <Card className="p-5">
          <p className="text-sm font-medium text-muted-foreground">What Is Left</p>
          <p className="mt-1 font-heading text-2xl font-semibold">{signalsDone} of 3 signals</p>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-burgundy-400 to-burgundy-700 transition-all duration-700 ease-out"
              style={{ width: `${(signalsDone / 3) * 100}%` }}
            />
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            {missing.length === 0 ? 'Fully live, nothing left to unlock.' : `Still needs ${missing.join(' and ')}.`}
          </p>
        </Card>
      </div>
    </div>
  )
}
