import { Route, HashRouter as Router, Routes } from 'react-router-dom'

import { AppShell } from '@/components/layout/AppShell'
import { OffersProvider } from '@/context/OffersContext'
import { BuyersPage } from '@/pages/BuyersPage'
import { ComingSoonDetailPage } from '@/pages/ComingSoonDetailPage'
import { ComingSoonIndexPage } from '@/pages/ComingSoonIndexPage'
import { InventoryTrackerPage } from '@/pages/InventoryTrackerPage'
import { MediaKitsPage } from '@/pages/MediaKitsPage'
import { OverviewPage } from '@/pages/OverviewPage'
import { RolloutRoadmapPage } from '@/pages/RolloutRoadmapPage'
import { VideoTrackerPage } from '@/pages/VideoTrackerPage'

function App() {
  return (
    <OffersProvider>
      <Router>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<OverviewPage />} />
            <Route path="inventory" element={<InventoryTrackerPage />} />
            <Route path="video-tracker" element={<VideoTrackerPage />} />
            <Route path="buyers" element={<BuyersPage />} />
            <Route path="media-kits" element={<MediaKitsPage />} />
            <Route path="rollout-roadmap" element={<RolloutRoadmapPage />} />
            <Route path="coming-soon" element={<ComingSoonIndexPage />} />
            <Route path="coming-soon/:slug" element={<ComingSoonDetailPage />} />
          </Route>
        </Routes>
      </Router>
    </OffersProvider>
  )
}

export default App
