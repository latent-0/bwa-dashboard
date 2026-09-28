import { Check, Mic, ListOrdered, X, Globe } from 'lucide-react'

import { PageHeader } from '@/components/common/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { productionQueue } from '@/data/productionQueue'
import { videoOnUrlBrands, videoOnUrlStatus } from '@/data/videoOnUrl'
import { vmRecordings } from '@/data/vmRecordings'

const PRIORITY_ORDER = ['High', 'Medium', 'Low']
const PRIORITY_VARIANT: Record<string, 'default' | 'outline' | 'muted'> = {
  High: 'default',
  Medium: 'outline',
  Low: 'muted',
}

export function OpsChecklistsPage() {
  const recordedCount = vmRecordings.filter((v) => v.recordingLink).length

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Ops Checklists"
        description="Three real working checklists from the sheet: voicemail scripts still needed, which brand sites are confirmed working, and the production queue by priority."
      />

      <Tabs defaultValue="vm">
        <TabsList>
          <TabsTrigger value="vm" className="gap-1.5">
            <Mic className="h-3.5 w-3.5" /> VM Recordings ({recordedCount}/{vmRecordings.length})
          </TabsTrigger>
          <TabsTrigger value="video-on-url" className="gap-1.5">
            <Globe className="h-3.5 w-3.5" /> Video on URL ({videoOnUrlBrands.length})
          </TabsTrigger>
          <TabsTrigger value="production" className="gap-1.5">
            <ListOrdered className="h-3.5 w-3.5" /> Production Queue ({productionQueue.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vm">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Brand</TableHead>
                    <TableHead>Angle</TableHead>
                    <TableHead>Recorded</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vmRecordings.map((v, i) => (
                    <TableRow key={`${v.brand}-${i}`}>
                      <TableCell className="font-medium">{v.brand}</TableCell>
                      <TableCell className="max-w-md whitespace-normal">{v.angle}</TableCell>
                      <TableCell>
                        {v.recordingLink ? (
                          <Check className="h-4 w-4 text-status-green" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground/40" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="video-on-url">
          <div className="flex flex-col gap-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Brand</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>Vertical</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {videoOnUrlBrands.map((v, i) => (
                      <TableRow key={`${v.brand}-${i}`}>
                        <TableCell className="font-medium">{v.brand}</TableCell>
                        <TableCell className="text-muted-foreground">{v.url}</TableCell>
                        <TableCell className="text-muted-foreground">{v.vertical}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className="p-5">
              <p className="mb-3 text-sm font-medium text-muted-foreground">Vertical Status</p>
              <div className="flex flex-wrap gap-2">
                {videoOnUrlStatus.map((s) => (
                  <Badge key={s.label} variant={s.status === 'Done' ? 'default' : 'muted'}>
                    {s.label}: {s.status ?? 'Not started'}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="production">
          <div className="flex flex-col gap-4">
            {PRIORITY_ORDER.map((priority) => {
              const items = productionQueue.filter((p) => p.priority === priority)
              if (items.length === 0) return null
              return (
                <Card key={priority} className="p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Badge variant={PRIORITY_VARIANT[priority]}>{priority}</Badge>
                    <p className="text-xs text-muted-foreground">{items.length} campaigns</p>
                  </div>
                  <ul className="flex flex-col gap-1.5 text-sm">
                    {items.map((item, i) => (
                      <li key={i} className="text-foreground">
                        {item.campaign}
                      </li>
                    ))}
                  </ul>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
