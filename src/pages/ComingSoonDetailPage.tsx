import { Clock } from 'lucide-react'
import { Navigate, useParams } from 'react-router-dom'

import { EmptyState } from '@/components/common/EmptyState'
import { PageHeader } from '@/components/common/PageHeader'
import { comingSoonTabs } from '@/data/comingSoonTabs'

export function ComingSoonDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const tab = comingSoonTabs.find((t) => t.slug === slug)

  if (!tab) return <Navigate to="/coming-soon" replace />

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title={tab.name} description={tab.description} />
      <EmptyState
        icon={Clock}
        title="Not migrated yet"
        description="We don't have access to this tab's contents yet. Once we do, this page will show the same kind of tracker as Inventory Tracker or Video Tracker."
      />
    </div>
  )
}
