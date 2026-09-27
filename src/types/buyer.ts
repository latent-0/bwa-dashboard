export type PricingModel = 'per_call_dynamic' | 'fixed_per_zip'
export type BuyerPipelineStage = 'mapping' | 'outreach' | 'terms' | 'active'

export interface Buyer {
  id: string
  name: string
  offerIds: string[]
  pricingModel: PricingModel
  exclusionCriteria: string | null
  pipelineStage: BuyerPipelineStage
}
