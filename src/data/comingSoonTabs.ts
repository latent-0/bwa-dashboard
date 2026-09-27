import type { ComingSoonTab } from '@/types/comingSoon'

/**
 * These are real tab names from the Video Tracker workbook (visible in the
 * sheet's tab bar), but we don't yet have access to their contents. Each gets
 * a generic placeholder page so the dashboard's structure is ready to receive
 * the real data once access is granted.
 */
export const comingSoonTabs: ComingSoonTab[] = [
  {
    slug: 'hsl-videos',
    name: 'HSL_videos',
    description: 'Home Service Live video asset library. Not yet migrated.',
  },
  {
    slug: 'temp-ringba-api',
    name: 'Temp Ringba API',
    description: 'Working scratch pad for Ringba API and number pool setup. Not yet migrated.',
  },
  {
    slug: 'priority-list',
    name: 'Priority List',
    description: 'Prioritized queue of which offers to bring live next. Not yet migrated.',
  },
  {
    slug: 'urls-brands',
    name: 'URLs/Brands',
    description: 'Master list of brand domains and URL variants. Not yet migrated.',
  },
  {
    slug: 'vm-recordings',
    name: 'VM Recordings',
    description: 'Voicemail and call recording references. Not yet migrated.',
  },
  {
    slug: 'ringba',
    name: 'Ringba',
    description: 'Ringba call routing configuration reference. Not yet migrated.',
  },
  {
    slug: 'video-on-url',
    name: 'Video on URL',
    description: 'Mapping of which video is embedded on which landing page. Not yet migrated.',
  },
  {
    slug: 'production-list-a-z',
    name: 'Production List A-Z',
    description: 'Alphabetical production and build queue across all brands. Not yet migrated.',
  },
  {
    slug: 'hsl-video-tracker',
    name: 'HSL Video Tracker',
    description: 'Home Service Live specific video tracking detail. Not yet migrated.',
  },
]
