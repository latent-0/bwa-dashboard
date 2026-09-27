import { Check, Image, Megaphone, Send, X } from 'lucide-react'

import { LinkChip } from '@/components/common/LinkChip'
import { PageHeader } from '@/components/common/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useOffers } from '@/context/OffersContext'
import { cn } from '@/lib/utils'
import type { Offer } from '@/types/offer'

function FlagRow({ offer }: { offer: Offer }) {
  const flags = [
    { label: 'Creatives', done: offer.creativesMade },
    { label: 'Video Ads', done: offer.videoAdsMade },
    { label: 'Outreach Sent', done: offer.outreachSequenceSent },
  ]
  return (
    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
      {flags.map((flag) => (
        <span key={flag.label} className="inline-flex items-center gap-1">
          {flag.done ? (
            <Check className="h-3 w-3 text-status-green" />
          ) : (
            <X className="h-3 w-3 text-muted-foreground/50" />
          )}
          {flag.label}
        </span>
      ))}
    </div>
  )
}

function AssetCard({
  offer,
  link,
  sent,
}: {
  offer: Offer
  link: string
  sent: boolean
}) {
  return (
    <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <CardHeader className="flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-sm font-semibold text-foreground">{offer.campaign}</CardTitle>
          <p className="text-xs text-muted-foreground">{offer.brand}</p>
        </div>
        <Badge variant={sent ? 'default' : 'muted'} className={cn(sent && 'bg-status-green-bg text-status-green')}>
          {sent ? (
            <>
              <Send className="h-3 w-3" /> Sent
            </>
          ) : (
            'Not sent'
          )}
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <LinkChip href={link} label="Open kit" />
        <FlagRow offer={offer} />
      </CardContent>
    </Card>
  )
}

export function MediaKitsPage() {
  const { offers } = useOffers()
  const mediaKitOffers = offers.filter((o) => o.mediaKitMade && o.mediaKitLink)
  const offerKitOffers = offers.filter((o) => o.offerKitMade && o.offerKitLink)

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Media Kits & Outreach"
        description="Media Kits recruit publishers to send us traffic; Offer Kits recruit buyers to purchase our calls."
      />

      <Tabs defaultValue="media-kits">
        <TabsList>
          <TabsTrigger value="media-kits" className="gap-1.5">
            <Megaphone className="h-3.5 w-3.5" /> Media Kits ({mediaKitOffers.length})
          </TabsTrigger>
          <TabsTrigger value="offer-kits" className="gap-1.5">
            <Image className="h-3.5 w-3.5" /> Offer Kits ({offerKitOffers.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="media-kits">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {mediaKitOffers.map((offer) => (
              <AssetCard key={offer.id} offer={offer} link={offer.mediaKitLink!} sent={offer.mediaKitSentToPubs} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="offer-kits">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {offerKitOffers.map((offer) => (
              <AssetCard key={offer.id} offer={offer} link={offer.offerKitLink!} sent={offer.outreachSequenceSent} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
