import { Loader2, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { OrbErrorBoundary } from '@/components/common/OrbErrorBoundary'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Orb } from '@/components/ui/orb'
import { useOffers } from '@/context/OffersContext'
import { STATUS_META, computeOfferStatus, missingSignals } from '@/lib/status'
import { cn } from '@/lib/utils'
import type { Offer, OfferStatus } from '@/types/offer'

/**
 * A compact, cheap-to-send summary of the WHOLE book, not just this offer.
 * This is the actual differentiator versus the spreadsheet: a spreadsheet
 * can't answer "what else needs a buyer" or "what should I unlock next"
 * without the person manually filtering, but the assistant can reason over
 * all of it in one shot because we hand it this digest every time.
 */
function buildDatasetSummary(offers: Offer[]): string {
  const withStatus = offers.map((o) => ({ offer: o, status: computeOfferStatus(o) }))
  const counts = withStatus.reduce(
    (acc, { status }) => {
      acc[status] += 1
      return acc
    },
    { green: 0, yellow: 0, red: 0 } as Record<OfferStatus, number>,
  )
  const closest = withStatus
    .filter((w) => w.status === 'yellow')
    .map((w) => ({ ...w, missing: missingSignals(w.offer) }))
    .sort((a, b) => a.missing.length - b.missing.length)
    .slice(0, 8)
    .map((w) => `${w.offer.brand} / ${w.offer.campaign} (needs ${w.missing.join(', ')})`)
    .join('; ')

  return `Across the whole book: ${offers.length} offers total, ${counts.green} live, ${counts.yellow} in progress, ${counts.red} not started. Offers closest to going live: ${closest || 'none in progress right now'}.`
}

type ChatMessage = { role: 'user' | 'assistant'; content: string }

/**
 * A contextual assistant: the first message is computed directly from this
 * offer's real signals (never invented), and follow-up questions go through
 * /api/assistant, a serverless function that calls OpenRouter server-side so
 * the API key never reaches the browser.
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
  const { offers } = useOffers()
  const missing = missingSignals(offer)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const openingMessage =
    status === 'green'
      ? `${offer.campaign} is fully live. Ringba, the landing page, and a buyer are all in place, nothing is blocking it.`
      : status === 'red'
        ? `${offer.campaign} hasn't started yet. It's missing ${missing.join(', ')}. Once those are set it'll move to In Progress automatically.`
        : `${offer.campaign} is in progress. It still needs ${missing.join(' and ')}. Set that in Inventory Tracker and status will flip to Live on its own.`

  const suggestedQuestions = [
    'What is blocking this offer?',
    'What else needs a buyer right now?',
    'What should I unlock next across the whole book?',
  ]

  async function sendQuestion(question: string) {
    if (!question || loading) return

    setInput('')
    setError(null)
    setMessages((prev) => [...prev, { role: 'user', content: question }])
    setLoading(true)

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          context: {
            brand: offer.brand,
            campaign: offer.campaign,
            status: STATUS_META[status].label,
            missing,
            revenuePerCallDisplay: offer.revenuePerCallDisplay,
            dealNotes: offer.dealNotes,
            notes: offer.notes,
            productionStage: offer.productionStage,
            datasetSummary: buildDatasetSummary(offers),
          },
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Request failed')
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Try again in a moment.')
    } finally {
      setLoading(false)
    }
  }

  function handleSend(e: FormEvent) {
    e.preventDefault()
    void sendQuestion(input.trim())
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] max-w-md flex-col">
        <DialogHeader className="flex-row items-center gap-3 space-y-0">
          <span className="h-9 w-9 shrink-0 overflow-hidden rounded-full">
            <OrbErrorBoundary
              fallback={
                <div
                  className="h-full w-full"
                  style={{
                    background:
                      'radial-gradient(circle at 32% 26%, #ffffff 0%, #e4d3ff 10%, #c09dfd 22%, #5f01fb 42%, #1c0a3d 66%, #0b0d1b 100%)',
                  }}
                />
              }
            >
              <Orb colors={['#ffffff', '#c09dfd']} bgColor="#0b0d1b" seed={7} className="h-full w-full" />
            </OrbErrorBoundary>
          </span>
          <div>
            <DialogTitle>Assistant</DialogTitle>
            <p className="text-xs text-muted-foreground">
              {offer.brand}, {offer.campaign}
            </p>
          </div>
        </DialogHeader>

        <div className="flex-1 space-y-2 overflow-y-auto">
          <div className="rounded-2xl bg-muted px-4 py-3 text-sm leading-relaxed">{openingMessage}</div>
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                m.role === 'user' ? 'ml-auto bg-brand-600 text-white' : 'bg-muted',
              )}
            >
              {m.content}
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking…
            </div>
          )}
          {error && <p className="text-xs text-status-red">{error}</p>}

          {messages.length === 0 && !loading && (
            <div className="flex flex-col gap-1.5 pt-1">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => sendQuestion(q)}
                  className="rounded-xl border border-border bg-card px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false)
              navigate('/inventory')
            }}
          >
            Open Inventory Tracker
          </Button>
          <form onSubmit={handleSend} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about this offer…"
              disabled={loading}
            />
            <Button type="submit" size="icon" disabled={loading || !input.trim()} aria-label="Send">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
