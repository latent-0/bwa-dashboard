export interface Brand {
  name: string
  url: string | null
  vertical: string | null
  buyers: string | null
  websiteUp: boolean
  jeffReviewed: boolean
  verticalsCovered: string[]
  note: string | null
}

export interface BrandPriority {
  brand: string
  status: string | null
}

export interface RingbaBrand {
  brand: string
  url: string
  vertical: string
}

export interface VmRecording {
  brand: string
  angle: string
  recordingLink: string | null
}

export interface VideoOnUrlBrand {
  brand: string
  url: string
  vertical: string
}

export interface VideoOnUrlStatus {
  label: string
  status: string | null
}

export interface ProductionQueueItem {
  priority: string
  campaign: string
}

export interface CallTransferRecording {
  vertical: string
  folderLink: string | null
}

export interface HslStateMatrix {
  categories: string[]
  states: { state: string; values: boolean[] }[]
}

export interface HslVideo {
  brand: string
  videoIdea: string
  productionStage: string | null
  finalVideoLabel: string | null
  notes: string | null
  copyrightSubmittedDate: string | null
  landingPageDraftLink: string | null
  ourPayout: string | null
  affiliatePayout: string | null
  buyersList: string | null
}
