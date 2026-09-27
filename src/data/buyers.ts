import type { Buyer } from '@/types/buyer'

/**
 * Mock/placeholder. Reflects the two pricing models Jeff described (dynamic
 * per-call bidding vs. a fixed price per zip code, as in the external eLocal
 * arrangement) and the 4-week buyer-activation cadence Kunal walked through
 * (mapping -> outreach -> terms -> active).
 */
export const buyers: Buyer[] = [
  {
    id: 'thomas-k-mcknight-llp',
    name: 'Thomas K McKnight LLP',
    offerIds: ['debt-center-5'],
    pricingModel: 'per_call_dynamic',
    exclusionCriteria: null,
    pipelineStage: 'active',
  },
  {
    id: 'elocal-network',
    name: 'eLocal Network',
    offerIds: ['home-service-live-roofing'],
    pricingModel: 'fixed_per_zip',
    exclusionCriteria: null,
    pipelineStage: 'active',
  },
  {
    id: 'shift44',
    name: 'Shift44',
    offerIds: ['final-expense-store-landing-page'],
    pricingModel: 'per_call_dynamic',
    exclusionCriteria: 'No active smokers; no existing cancer diagnosis.',
    pipelineStage: 'terms',
  },
  {
    id: 'summit-final-expense-partners',
    name: 'Summit Final Expense Partners',
    offerIds: ['christian-insurance-final-expense-2'],
    pricingModel: 'per_call_dynamic',
    exclusionCriteria: 'No active smokers; no existing cancer diagnosis.',
    pipelineStage: 'outreach',
  },
  {
    id: 'apex-mass-tort-intake',
    name: 'Apex Mass Tort Intake',
    offerIds: ['first-legal-tylenol', 'first-legal-firefighter-foam', 'first-legal-mva'],
    pricingModel: 'per_call_dynamic',
    exclusionCriteria: 'Must have documented diagnosis/incident within statute of limitations.',
    pipelineStage: 'mapping',
  },
]
