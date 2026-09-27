import type { Offer, OfferStatus } from '@/types/offer'

/**
 * Mirrors Jeff's manual green-highlighting habit on the Inventory Draft sheet:
 * an offer is only "green" once the number pool, the landing page + video, and
 * a buyer are all in place. Partial progress is yellow, nothing done is red.
 */
export function computeOfferStatus(offer: Offer): OfferStatus {
  const hasBuyer = Boolean(offer.pioneerBuyerName || offer.pioneerBuyerLink)
  const signals = [offer.ringbaNumberPoolSetup, offer.campaignReady, hasBuyer]
  const done = signals.filter(Boolean).length

  if (done === signals.length) return 'green'
  if (done === 0) return 'red'
  return 'yellow'
}

/**
 * Powers the "Next to Unlock" panel: the exact signals still missing before
 * an offer would flip to green, in the same order computeOfferStatus checks.
 */
export function missingSignals(offer: Offer): string[] {
  const hasBuyer = Boolean(offer.pioneerBuyerName || offer.pioneerBuyerLink)
  const missing: string[] = []
  if (!offer.ringbaNumberPoolSetup) missing.push('Ringba setup')
  if (!offer.campaignReady) missing.push('landing page')
  if (!hasBuyer) missing.push('a buyer')
  return missing
}

export const STATUS_META: Record<
  OfferStatus,
  { label: string; dotClass: string; badgeClass: string }
> = {
  green: {
    label: 'Live',
    dotClass: 'bg-status-green',
    badgeClass: 'bg-status-green-bg text-status-green border-status-green-border',
  },
  yellow: {
    label: 'In Progress',
    dotClass: 'bg-status-yellow',
    badgeClass: 'bg-status-yellow-bg text-status-yellow border-status-yellow-border',
  },
  red: {
    label: 'Not Started',
    dotClass: 'bg-status-red',
    badgeClass: 'bg-status-red-bg text-status-red border-status-red-border',
  },
}
