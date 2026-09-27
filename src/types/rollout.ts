import type { RolloutStage } from './offer'

export const ROLLOUT_STAGES: { key: RolloutStage; label: string; description: string }[] = [
  {
    key: 'category_page',
    label: 'Category Page',
    description: 'Main category page live (e.g. homeservicelive.com/roofing)',
  },
  {
    key: 'state_video',
    label: 'Statewide Video',
    description: 'State-specific video variant recorded and live',
  },
  {
    key: 'zip_targeting',
    label: 'Zip Targeting',
    description: 'High-value zip codes within the state individually targeted',
  },
]

export interface RolloutGroup {
  brand: string
  category: string
  currentStage: RolloutStage
}
