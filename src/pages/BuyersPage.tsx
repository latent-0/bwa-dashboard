import { Clock } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PageHeader } from '@/components/common/PageHeader'
import { affiliatePayouts, affiliates } from '@/data/affiliates'
import { buyers } from '@/data/buyers'
import { useOffers } from '@/context/OffersContext'
import { formatCurrency } from '@/lib/utils'
import type { BuyerPipelineStage } from '@/types/buyer'

const affiliateById = Object.fromEntries(affiliates.map((a) => [a.id, a]))

const STAGE_LABEL: Record<BuyerPipelineStage, string> = {
  mapping: 'Buyer Mapping',
  outreach: 'Outreach',
  terms: 'Commercial Terms',
  active: 'Active',
}

const STAGE_VARIANT: Record<BuyerPipelineStage, 'muted' | 'default' | 'outline'> = {
  mapping: 'muted',
  outreach: 'outline',
  terms: 'outline',
  active: 'default',
}

export function BuyersPage() {
  const { offers } = useOffers()
  const offerById = Object.fromEntries(offers.map((o) => [o.id, o]))

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Buyers & Payouts"
        description="Who buys our calls, on what pricing model, and what we pay affiliates who send us traffic."
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Buyers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Buyer</TableHead>
                <TableHead>Offers</TableHead>
                <TableHead>Pricing Model</TableHead>
                <TableHead>Exclusion Criteria</TableHead>
                <TableHead>Pipeline Stage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buyers.map((buyer) => (
                <TableRow key={buyer.id}>
                  <TableCell className="font-medium">{buyer.name}</TableCell>
                  <TableCell className="whitespace-normal">
                    {buyer.offerIds.map((id) => offerById[id]?.campaign).filter(Boolean).join(', ')}
                  </TableCell>
                  <TableCell>
                    {buyer.pricingModel === 'per_call_dynamic' ? 'Dynamic per-call' : 'Fixed per zip'}
                  </TableCell>
                  <TableCell className="max-w-xs whitespace-normal text-muted-foreground">
                    {buyer.exclusionCriteria ?? 'None'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={STAGE_VARIANT[buyer.pipelineStage]}>
                      {STAGE_LABEL[buyer.pipelineStage]}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Affiliate Payouts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Affiliate</TableHead>
                <TableHead>Trust Tier</TableHead>
                <TableHead>Offer</TableHead>
                <TableHead>Payout / Call</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {affiliatePayouts.map((payout) => {
                const affiliate = affiliateById[payout.affiliateId]
                const offer = offerById[payout.offerId]
                return (
                  <TableRow key={payout.id}>
                    <TableCell className="font-medium">{affiliate?.name}</TableCell>
                    <TableCell>
                      <Badge variant={affiliate?.trustTier === 'forms_enabled' ? 'default' : 'muted'}>
                        {affiliate?.trustTier === 'forms_enabled' ? 'Forms Enabled' : 'Calls Only'}
                      </Badge>
                    </TableCell>
                    <TableCell>{offer?.campaign}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(payout.payoutPerCall)}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="border-dashed">
        <CardHeader className="flex-row items-center gap-3 space-y-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <Clock className="h-4 w-4" />
          </span>
          <div>
            <CardTitle className="text-sm font-semibold text-foreground">
              Buyer Pricing Reference (eLocal)
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              70/30 revenue share, fixed price per zip code, updated weekly by the buyer. Not yet wired
              in. Coming soon.
            </p>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}
