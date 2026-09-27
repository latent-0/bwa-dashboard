import type { Affiliate, AffiliatePayout } from '@/types/affiliate'

/**
 * Mock/placeholder. The two payout rates ($45/call, $55/call) are the exact
 * figures Jeff used as an example of variance between affiliate deals; the
 * calls_only / forms_enabled split reflects the fraud-control trust tiering
 * he described for new vs. proven affiliates.
 */
export const affiliates: Affiliate[] = [
  { id: 'acme-inc', name: 'Acme Inc', trustTier: 'calls_only' },
  { id: 'brightpath-media', name: 'BrightPath Media', trustTier: 'forms_enabled' },
  { id: 'northline-traffic', name: 'Northline Traffic', trustTier: 'calls_only' },
  { id: 'vertex-affiliates', name: 'Vertex Affiliates', trustTier: 'forms_enabled' },
  { id: 'pinnacle-leads-co', name: 'Pinnacle Leads Co', trustTier: 'calls_only' },
]

export const affiliatePayouts: AffiliatePayout[] = [
  { id: 'p1', affiliateId: 'acme-inc', offerId: 'final-expense-store-landing-page', payoutPerCall: 45 },
  { id: 'p2', affiliateId: 'brightpath-media', offerId: 'final-expense-store-landing-page', payoutPerCall: 55 },
  { id: 'p3', affiliateId: 'northline-traffic', offerId: 'debt-center-5', payoutPerCall: 40 },
  { id: 'p4', affiliateId: 'vertex-affiliates', offerId: 'home-service-live-roofing', payoutPerCall: 60 },
  { id: 'p5', affiliateId: 'pinnacle-leads-co', offerId: 'first-legal-tylenol', payoutPerCall: 150 },
]
