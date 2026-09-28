import { ExternalLink, Phone, Radio, User, Video } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Card } from '@/components/ui/card'
import { useOffers } from '@/context/OffersContext'
import { STATUS_META } from '@/lib/status'
import { cn, getHostname } from '@/lib/utils'
import type { Offer, OfferStatus } from '@/types/offer'

import { AgentOrb } from './AgentOrb'
import { HeroNotch } from './HeroNotch'
import { OfferAssistantDialog } from './OfferAssistantDialog'
import { SignalDot } from './SignalIndicator'

export function OfferCard({ offer, status }: { offer: Offer; status: OfferStatus }) {
  const { updateOffer } = useOffers()
  const [assistantOpen, setAssistantOpen] = useState(false)
  const hasBuyer = Boolean(offer.pioneerBuyerName || offer.pioneerBuyerLink)
  const meta = STATUS_META[status]
  const domain = getHostname(offer.landingPageUrl)

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <HeroNotch
        heightClass="h-14"
        avatarSize={48}
        orb={<AgentOrb size={48} onClick={() => setAssistantOpen(true)} />}
        topLeft={
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/15 text-white backdrop-blur">
            <Radio className="h-3 w-3" />
          </span>
        }
        topRight={
          <span className={cn('rounded-full border px-2 py-0.5 text-[10px] font-medium', meta.badgeClass)}>
            {meta.label}
          </span>
        }
      />

      <div className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-8 text-center">
        <a
          href={offer.landingPageUrl}
          target="_blank"
          rel="noreferrer"
          className="mx-auto inline-flex items-center gap-1 rounded-full bg-foreground px-2.5 py-0.5 text-[11px] font-semibold text-background shadow-sm transition-transform hover:-translate-y-0.5"
        >
          {domain}
          <ExternalLink className="h-2.5 w-2.5" />
        </a>

        <div>
          <h4 className="truncate font-heading text-sm font-semibold" title={offer.campaign}>
            {offer.campaign}
          </h4>
          <p className="truncate text-xs text-muted-foreground">{offer.revenuePerCallDisplay}</p>
        </div>

        <div className="flex items-center justify-center gap-2">
          <SignalDot
            label="Ringba"
            icon={Phone}
            active={offer.ringbaNumberPoolSetup}
            onToggle={() => updateOffer(offer.id, { ringbaNumberPoolSetup: !offer.ringbaNumberPoolSetup })}
          />
          <SignalDot
            label="LP + Video"
            icon={Video}
            active={offer.campaignReady}
            onToggle={() => updateOffer(offer.id, { campaignReady: !offer.campaignReady })}
          />
          <SignalDot label="Buyer" icon={User} active={hasBuyer} href="/inventory" />
        </div>

        <Link
          to="/inventory"
          className="mt-auto rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-50 hover:text-brand-700 active:scale-95"
        >
          Manage
        </Link>
      </div>

      <OfferAssistantDialog
        offer={offer}
        status={status}
        open={assistantOpen}
        onOpenChange={setAssistantOpen}
      />
    </Card>
  )
}
