import { Clock } from 'lucide-react'

import { LinkChip } from '@/components/common/LinkChip'
import { PageHeader } from '@/components/common/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useOffers } from '@/context/OffersContext'

export function BuyersPage() {
  const { offers } = useOffers()
  const withBuyer = offers.filter((o) => o.pioneerBuyerName || o.pioneerBuyerLink)
  const withAffiliatePayout = offers.filter((o) => o.affiliatePayoutLink)

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Buyers & Payouts"
        description="Real pioneer buyers and affiliate payout terms, pulled straight from the Inventory Draft sheet."
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Pioneer Buyers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Buyer</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Deal Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {withBuyer.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                    No pioneer buyers set yet.
                  </TableCell>
                </TableRow>
              )}
              {withBuyer.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell className="font-medium">
                    {offer.pioneerBuyerName ? (
                      offer.pioneerBuyerLink ? (
                        <LinkChip href={offer.pioneerBuyerLink} label={offer.pioneerBuyerName} />
                      ) : (
                        offer.pioneerBuyerName
                      )
                    ) : (
                      <LinkChip href={offer.pioneerBuyerLink!} label="Buyer sheet" />
                    )}
                  </TableCell>
                  <TableCell>{offer.brand}</TableCell>
                  <TableCell className="max-w-xs whitespace-normal">{offer.campaign}</TableCell>
                  <TableCell className="max-w-xs whitespace-normal text-muted-foreground">
                    {offer.dealNotes ?? 'None'}
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
                <TableHead>Brand</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Our Revenue</TableHead>
                <TableHead>Affiliate Payout</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {withAffiliatePayout.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                    No affiliate payout terms set yet.
                  </TableCell>
                </TableRow>
              )}
              {withAffiliatePayout.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell className="font-medium">{offer.brand}</TableCell>
                  <TableCell className="max-w-xs whitespace-normal">{offer.campaign}</TableCell>
                  <TableCell>{offer.revenuePerCallDisplay ?? 'Not set'}</TableCell>
                  <TableCell>
                    {offer.affiliatePayoutLink!.startsWith('http') ? (
                      <LinkChip href={offer.affiliatePayoutLink!} label="Payout sheet" />
                    ) : (
                      offer.affiliatePayoutLink
                    )}
                  </TableCell>
                </TableRow>
              ))}
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
              70/30 revenue share, fixed price per zip code, updated weekly by the buyer. That's a separate
              external spreadsheet we don't have access to yet. Coming soon.
            </p>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}
