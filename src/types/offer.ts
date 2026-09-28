export type OfferStatus = 'red' | 'yellow' | 'green'

/**
 * One row per Brand + Campaign, parsed directly from the real "Inventory
 * Draft" tab of the Video Tracker workbook. Most signal fields are
 * genuinely blank in the source sheet for most rows, only a handful of
 * offers have Ringba, a buyer, or a negotiated rate filled in so far.
 */
export interface Offer {
  id: string
  brand: string
  campaign: string

  productionStage: string | null
  finalVideoLabel: string | null
  finalVideoLink: string | null
  notes: string | null

  landingPageUrl: string | null
  landingPageMissing: boolean
  copyrightSubmittedDate: string | null

  ringbaNumberPoolSetup: boolean
  campaignReady: boolean // "LP w/VID + Ringba"

  pioneerBuyerName: string | null
  pioneerBuyerLink: string | null

  revenuePerCall: number
  revenuePerCallDisplay: string | null

  mediaKitLink: string | null
  mediaKitSentToPubs: boolean

  affiliatePayoutLink: string | null
  dealNotes: string | null

  offerKitLink: string | null
  buyerProspectListLink: string | null
  buyerOutreachNote: string | null

  manualGreenFlag: boolean // Jeff's own "ONE CALL! Light it up green!!!" column

  creativesLink: string | null
  videoAdsLink: string | null

  newLandingPageUrl: string | null
  updatedLandingPageProductionLink: string | null
  updatedLandingPageReviewLink: string | null
  jeffLandingPageFeedback: string | null

  lastUpdated: string
}
