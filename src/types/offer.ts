export type OfferStatus = 'red' | 'yellow' | 'green'

export type RolloutStage = 'category_page' | 'state_video' | 'zip_targeting'

/**
 * One row per Brand + Campaign. Mirrors the real "Inventory Draft" tab of the
 * Video Tracker workbook, plus the extra fields Jeff described verbally in the
 * 2026-09-25 team call (payouts, deal notes, offer kit, creatives, etc.) that
 * live on the same row in the source sheet.
 */
export interface Offer {
  id: string
  brand: string
  campaign: string
  category: string
  landingPageUrl: string
  copyrightSubmittedDate: string | null

  ringbaNumberPoolSetup: boolean
  campaignReady: boolean // "LP w/VID + Ringba"

  pioneerBuyerName: string | null
  pioneerBuyerLink: string | null

  revenuePerCall: number
  revenuePerCallDisplay: string

  mediaKitMade: boolean
  mediaKitLink: string | null
  mediaKitSentToPubs: boolean

  offerKitMade: boolean
  offerKitLink: string | null

  outreachSequenceSent: boolean

  creativesMade: boolean
  creativesLink: string | null

  videoAdsMade: boolean
  videoAdsLink: string | null

  dealNotes: string | null
  rolloutStage: RolloutStage | null

  lastUpdated: string
}
