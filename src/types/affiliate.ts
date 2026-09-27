/**
 * Trust tiering described by Jeff: brand-new affiliates only ever get inbound
 * call tracking (a dynamic Ringba pool number) since a lead form is trivial to
 * fake; once they prove real call volume they "graduate" to form campaigns too.
 */
export type TrustTier = 'calls_only' | 'forms_enabled'

export interface Affiliate {
  id: string
  name: string
  trustTier: TrustTier
}

export interface AffiliatePayout {
  id: string
  affiliateId: string
  offerId: string
  payoutPerCall: number
}
