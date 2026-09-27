import { PageHeader } from '@/components/common/PageHeader'
import { ComingSoonCard } from '@/components/common/ComingSoonCard'
import { comingSoonTabs } from '@/data/comingSoonTabs'

export function ComingSoonIndexPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="More Tabs"
        description="Real tabs from the Video Tracker workbook that we don't have access to yet. Each will get a proper page once we can see their contents."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {comingSoonTabs.map((tab) => (
          <ComingSoonCard key={tab.slug} tab={tab} />
        ))}
      </div>
    </div>
  )
}
