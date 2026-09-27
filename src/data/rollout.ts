import type { RolloutGroup } from '@/types/rollout'

/**
 * Illustrative. Visualizes the rollout hierarchy Jeff described: get the main
 * category page live, then statewide video variants, then drill into specific
 * high-value zip codes within each state. Lawn care and pool care are
 * deliberately absent, Jeff named those as verticals not yet started.
 */
export const rolloutGroups: RolloutGroup[] = [
  { brand: 'Home Service Live', category: 'Roofing', currentStage: 'zip_targeting' },
  { brand: 'Home Service Live', category: 'HVAC', currentStage: 'state_video' },
  { brand: 'Home Service Live', category: 'Plumbing', currentStage: 'state_video' },
  { brand: 'Home Service Live', category: 'Electrician', currentStage: 'category_page' },
  { brand: 'Home Service Live', category: 'Solar', currentStage: 'category_page' },
  { brand: 'Home Service Live', category: 'Garage Doors', currentStage: 'category_page' },
  { brand: 'Home Service Live', category: 'Pest Control', currentStage: 'category_page' },
]
