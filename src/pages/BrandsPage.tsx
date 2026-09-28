import { Check, X } from 'lucide-react'

import { KpiCard } from '@/components/common/KpiCard'
import { PageHeader } from '@/components/common/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { brandPriority } from '@/data/brandPriority'
import { brands } from '@/data/brands'
import { ringbaBrands } from '@/data/ringbaBrands'

const priorityByBrand = new Map(brandPriority.map((p) => [p.brand, p.status]))
const ringbaByBrand = new Set(ringbaBrands.map((r) => r.brand))

function priorityVariant(status: string | null): 'default' | 'outline' | 'muted' {
  if (status === 'Done') return 'default'
  if (status === '*') return 'outline'
  return 'muted'
}

export function BrandsPage() {
  const websiteUpCount = brands.filter((b) => b.websiteUp).length
  const ringbaSetUpCount = brands.filter((b) => ringbaByBrand.has(b.name)).length

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Brands"
        description="The real brand directory: which sites are live, which verticals they cover, and where each one stands in the rollout priority. Merges the URLs/Brands, Priority List, and Ringba sheets."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard label="Total Brands" value={brands.length} />
        <KpiCard label="Websites Up" value={`${websiteUpCount} / ${brands.length}`} />
        <KpiCard label="Ringba Set Up" value={`${ringbaSetUpCount} / ${brands.length}`} />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brand</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Vertical</TableHead>
                <TableHead>Buyers</TableHead>
                <TableHead>Website Up</TableHead>
                <TableHead>Ringba</TableHead>
                <TableHead>Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brands.map((brand) => (
                <TableRow key={`${brand.name}-${brand.url}`}>
                  <TableCell className="font-medium">{brand.name}</TableCell>
                  <TableCell>
                    {brand.url ? (
                      <a
                        href={brand.url.startsWith('http') ? brand.url : `https://${brand.url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-brand-700 hover:underline"
                      >
                        {brand.url}
                      </a>
                    ) : (
                      <span className="text-muted-foreground">Not set</span>
                    )}
                  </TableCell>
                  <TableCell className="max-w-[10rem] whitespace-normal text-muted-foreground">
                    {brand.vertical ?? 'Not set'}
                  </TableCell>
                  <TableCell className="max-w-[12rem] whitespace-normal text-muted-foreground">
                    {brand.buyers ?? 'None yet'}
                  </TableCell>
                  <TableCell>
                    {brand.websiteUp ? (
                      <Check className="h-4 w-4 text-status-green" />
                    ) : (
                      <X className="h-4 w-4 text-status-red" />
                    )}
                  </TableCell>
                  <TableCell>
                    {ringbaByBrand.has(brand.name) ? (
                      <Check className="h-4 w-4 text-status-green" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground/40" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={priorityVariant(priorityByBrand.get(brand.name) ?? null)}>
                      {priorityByBrand.get(brand.name) ?? 'Unranked'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
