import { Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { missingSignals } from '@/lib/status'
import type { Offer, OfferStatus } from '@/types/offer'

/**
 * A contextual assistant, not a generic chatbot: the message is computed
 * directly from this offer's real signals, so it never invents information.
 * The input is a stub for a future real chat integration.
 */
export function OfferAssistantDialog({
  offer,
  status,
  open,
  onOpenChange,
}: {
  offer: Offer
  status: OfferStatus
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const navigate = useNavigate()
  const missing = missingSignals(offer)

  const message =
    status === 'green'
      ? `${offer.campaign} is fully live. Ringba, the landing page, and a buyer are all in place, nothing is blocking it.`
      : status === 'red'
        ? `${offer.campaign} hasn't started yet. It's missing ${missing.join(', ')}. Once those are set it'll move to In Progress automatically.`
        : `${offer.campaign} is in progress. It still needs ${missing.join(' and ')}. Set that in Inventory Tracker and status will flip to Live on its own.`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader className="flex-row items-center gap-3 space-y-0">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            style={{
              background:
                'radial-gradient(circle at 34% 28%, #f4ecff 0%, #c09dfd 16%, #7a2dfd 42%, #5f01fb 68%, #2b0173 100%)',
            }}
          >
            <Sparkles className="h-4 w-4 text-white/90" />
          </span>
          <div>
            <DialogTitle>Assistant</DialogTitle>
            <p className="text-xs text-muted-foreground">
              {offer.brand}, {offer.campaign}
            </p>
          </div>
        </DialogHeader>

        <div className="rounded-2xl bg-muted px-4 py-3 text-sm leading-relaxed">{message}</div>

        <div className="mt-4 flex flex-col gap-2">
          <Button
            onClick={() => {
              onOpenChange(false)
              navigate('/inventory')
            }}
          >
            Open Inventory Tracker
          </Button>
          <Input disabled placeholder="Ask about this offer (full chat coming soon)" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
